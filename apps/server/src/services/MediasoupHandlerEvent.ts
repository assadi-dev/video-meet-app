import { Socket } from "socket.io";
import MediasoupServices, { Peer } from "./MediasoupServices";
import { Room } from "@core/interfaces/WebsocketServer";
import { Router, RtpCapabilities } from "mediasoup/types";

export class MediasoupHandlerEvent {
  private socket: Socket;
  private mediasoupServices: MediasoupServices;
  private peer: Peer | null = null;
  private room: Room | null = null;
  private router: Router;
  private eventsBound = false;

  constructor({
    mediasoupServices,
    socket,
  }: {
    socket?: Socket | null;
    mediasoupServices: MediasoupServices;
  }) {
    this.socket = socket;
    this.mediasoupServices = mediasoupServices;
  }

  // ✅ AJOUT : Méthode pour initialiser peer et room
  initialize(peer: Peer, room: Room, router: Router) {
    this.peer = peer;
    this.room = room;
    this.router = router;
  }

  setSocket(socket: Socket) {
    this.socket = socket;
  }

  private send(type: string, data?: any) {
    this.socket.emit(type, data);
  }

  private notifyRoomMembers(type: string, data: any) {
    if (!this.room) return;
    this.socket.to(this.room.id).emit(type, data);
  }

  handleEvent() {
    if (this.eventsBound) return;
    this.eventsBound = true;

    // 1) Get Router RTP Capabilities
    this.socket.on("getRouterRtpCapabilities", async (callback: any) => {
      try {
        // ✅ Utilise le router existant
        callback({ ok: true, rtpCapabilities: this.router.rtpCapabilities });
      } catch (error) {
        callback({ ok: false, error: error.message });
      }
    });

    // 2) Create Send Transport
    this.socket.on("createSendTransport", async (callback: any) => {
      try {
        console.log(this.room);

        if (!this.peer) throw new Error("Peer not initialized");

        const { transport, params } =
          await this.mediasoupServices.createWebRtcTransport(this.router);

        this.peer.sendTransport = transport;

        transport.on("dtlsstatechange", (state) => {
          if (state === "closed" || state === "failed") {
            transport.close();
          }
        });

        callback({ ok: true, params });
      } catch (error) {
        callback({ ok: false, error: error.message });
      }
    });

    // 3) Connect Send Transport
    this.socket.on(
      "connectSendTransport",
      async ({ dtlsParameters }, callback) => {
        try {
          if (!this.peer?.sendTransport) {
            return callback?.({ ok: false, error: "No send transport" });
          }

          const transport = this.peer.sendTransport;

          if (
            transport.dtlsState === "connected" ||
            transport.dtlsState === "connecting"
          ) {
            return callback({
              ok: true,
              message: "Send transport already connected",
            });
          }

          await transport.connect({ dtlsParameters });
          callback({ ok: true, message: "Send transport connected" });
        } catch (error) {
          // ✅ CORRECTION : ok: false au lieu de ok: true
          callback({
            ok: false,
            error: `Send transport error: ${error.message}`,
          });
        }
      }
    );

    // 4) Produce
    this.socket.on(
      "produce",
      async ({ kind, rtpParameters, appData }, callback) => {
        try {
          if (!this.peer?.sendTransport) {
            return callback?.({ ok: false, error: "No send transport" });
          }

          const producer = await this.peer.sendTransport.produce({
            kind,
            rtpParameters,
            appData,
          });

          this.peer.producers.set(kind, producer);

          // ✅ Gestion de la fermeture du producer
          producer.on("transportclose", () => {
            console.log(`Producer ${producer.id} transport closed`);
            this.peer?.producers.delete(kind);
          });

          this.notifyRoomMembers("newProducer", {
            producerId: producer.id,
            kind: producer.kind,
            peerId: this.peer.id,
            displayName: this.peer.displayName,
          });

          callback?.({ ok: true, id: producer.id, kind: producer.kind });
        } catch (error) {
          callback?.({ ok: false, error: `Producer error: ${error.message}` });
        }
      }
    );

    // 5) Create Recv Transport
    this.socket.on("createRecvTransport", async (callback: any) => {
      try {
        if (!this.peer) throw new Error("Peer not initialized");

        const { transport, params } =
          await this.mediasoupServices.createWebRtcTransport(this.router);

        this.peer.recvTransport = transport;

        transport.on("dtlsstatechange", (state) => {
          if (state === "closed" || state === "failed") {
            transport.close();
          }
        });

        callback({ ok: true, params });
      } catch (error) {
        callback({ ok: false, error: error.message });
      }
    });

    // 6) Connect Recv Transport
    this.socket.on(
      "connectRecvTransport",
      async ({ dtlsParameters }, callback) => {
        try {
          if (!this.peer?.recvTransport) {
            return callback?.({ ok: false, error: "No recv transport" });
          }

          const transport = this.peer.recvTransport;

          if (
            transport.dtlsState === "connected" ||
            transport.dtlsState === "connecting"
          ) {
            return callback({
              ok: true,
              message: "Recv transport already connected",
            });
          }

          await transport.connect({ dtlsParameters });
          callback({ ok: true, message: "Recv transport connected" });
        } catch (error) {
          callback({
            ok: false,
            error: `Recv transport error: ${error.message}`,
          });
        }
      }
    );

    // 7) Consume
    this.socket.on(
      "consume",
      async ({ producerId, rtpCapabilities }, callback) => {
        try {
          if (!this.room || !this.peer?.recvTransport) {
            return callback({
              ok: false,
              error: "Room or transport not ready",
            });
          }

          const producer = [...this.room.peers.values()]
            .flatMap((p) => [...p.producers.values()])
            .find((p) => p.id === producerId);

          if (!producer) {
            return callback({ ok: false, error: "Producer not found" });
          }

          if (!this.router.canConsume({ producerId, rtpCapabilities })) {
            return callback({ ok: false, error: "Cannot consume" });
          }

          const consumer = await this.peer.recvTransport.consume({
            producerId,
            rtpCapabilities,
            paused: true,
          });

          this.peer.consumers.set(consumer.id, consumer);

          consumer.on("transportclose", () => {
            console.log(`Consumer ${consumer.id} transport closed`);
            this.peer?.consumers.delete(consumer.id);
          });

          consumer.on("producerclose", () => {
            console.log(`Consumer ${consumer.id} producer closed`);
            this.peer?.consumers.delete(consumer.id);
          });

          const params = {
            id: consumer.id,
            producerId,
            kind: consumer.kind,
            rtpParameters: consumer.rtpParameters,
          };

          callback({ ok: true, params });
        } catch (error) {
          console.error("Consume error:", error);
          callback({
            ok: false,
            error: error.message,
          });
        }
      }
    );

    // 8) Resume
    this.socket.on("resume", async ({ consumerId }, callback) => {
      try {
        const consumer = this.peer?.consumers.get(consumerId);
        if (!consumer) {
          return callback?.({ ok: false, error: "Consumer not found" });
        }
        console.log("resume consumer: ", consumer.id);

        await consumer.resume();
        callback({ ok: true, message: `Consumer ${consumerId} resumed` });
      } catch (error) {
        callback({
          ok: false,
          error: `Resume error for ${consumerId}: ${error.message}`,
        });
      }
    });
    // Le disconnect est géré par SignalingServer qui appelle onLeave
  }

  // ✅ AJOUT : Méthode de nettoyage
  private cleanup() {
    if (!this.room || !this.peer) return;

    console.log(`Peer ${this.peer.id} disconnecting from event`);

    // Fermer tous les producers
    this.peer.producers.forEach((producer) => {
      producer.close();
    });

    // Fermer tous les consumers
    this.peer.consumers.forEach((consumer) => {
      consumer.close();
    });

    // Fermer les transports
    this.peer.sendTransport?.close();
    this.peer.recvTransport?.close();

    // Retirer le peer de la room
    this.room.peers.delete(this.peer.id);

    // ✅ Notifier les autres peers
    this.notifyRoomMembers("peerLeft", {
      peerId: this.peer.id,
      displayName: this.peer.displayName,
    });

    // Fermeture du router gérée par SignalingServer.onLeave
  }

  // ✅ AJOUT : Méthode publique pour cleanup manuel
  public destroy() {
    this.cleanup();
    this.socket.removeAllListeners();
  }
}
