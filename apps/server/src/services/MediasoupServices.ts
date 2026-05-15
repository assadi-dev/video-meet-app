import * as mediasoup from "mediasoup";
import { config } from "@config/mediasoup";
import { WebSocket } from "ws";
import { Router, WebRtcTransport, Worker } from "mediasoup/types";
import { Socket } from "socket.io";

type paramsType = {
  id: any;
  iceParameters: any;
  iceCandidates: any;
  dtlsParameters: any;
};

export const webRtcTransportOptions = {
  listenIps: [
    { ip: "0.0.0.0", announcedIp: process.env.MEDIASOUP_ANNOUNCED_IP },
  ],
  enableUdp: true,
  enableTcp: true,
  preferUdp: true,
};

export type Peer = {
  id: string;
  ws: Socket;
  displayName: string;
  sendTransport?: mediasoup.types.WebRtcTransport;
  recvTransport?: mediasoup.types.WebRtcTransport;
  producers: Map<string, mediasoup.types.Producer>; // kind -> producer
  consumers: Map<string, mediasoup.types.Consumer>;
};
class MediasoupServices {
  nextMediasoupWorkerIdx = 0;
  worker: Worker;
  router: Router;
  transports = new Map<string, WebRtcTransport>();
  producers = new Map<string, any>();
  peers = new Map<string, Peer>();
  consumers = new Map<string, any>();
  deviceCapabilities = new Map<string, any>();

  async createMediasoupWorker(): Promise<Worker> {
    const worker = await mediasoup.createWorker({
      logLevel: config.mediasoup.workerSettings.logLevel,
      logTags: config.mediasoup.workerSettings.logTags,
      disableLiburing: config.mediasoup.workerSettings.disableLiburing,
    });
    worker.on("died", () => {
      console.error(
        `mediasoup worker died, exiting in 3 seconds... [pid:${worker.pid}]`,
        worker.pid
      );
      setTimeout(() => {
        process.exit(1);
      }, 3000);
    });

    return worker;
  }

  async createRouterMediasoup(worker: Worker): Promise<Router> {
    const router = await worker.createRouter({
      mediaCodecs: config.mediasoup.routerOptions.mediaCodecs,
    });

    return router;
  }

  async createWebRtcTransport(
    router: Router
  ): Promise<{ transport: WebRtcTransport; params: paramsType }> {
    const transport = await router.createWebRtcTransport(
      webRtcTransportOptions
    );

    return {
      transport,
      params: {
        id: transport.id,
        iceParameters: transport.iceParameters,
        iceCandidates: transport.iceCandidates,
        dtlsParameters: transport.dtlsParameters,
      },
    };
  }
  setTransport(socketId: string, newTransport: WebRtcTransport) {
    this.transports.set(socketId, newTransport);
  }
  setProducer(socketId: string, newProducer: any) {
    this.producers.set(socketId, newProducer);
  }
  setPeer({ socketId, peer }: { socketId: string; peer: Peer }) {
    this.peers.set(socketId, peer);
  }
  setDeviceCapability = (socketId: string, deviceCapability: any) =>
    this.deviceCapabilities.set(socketId, deviceCapability);
  setConsumer = (socketId: string, consumer: any) =>
    this.consumers.set(socketId, consumer);
  getConsumer = (socketId: string) => this.consumers.get(socketId);
  getDeviceCapability = (socketId: string) =>
    this.deviceCapabilities.get(socketId);
  getTransport = (socketId: string) => this.transports.get(socketId);
  getProducer = (producerId: string) => this.producers.get(producerId);
  getPeer = (socketId: string) => this.peers.get(socketId);
  getProducerFromSocket = (socketId: string) => this.producers.get(socketId);
  deletePeer = (socketId: string) => this.peers.delete(socketId);
  deleteProducerFromSocket = (socketId: string) =>
    this.producers.delete(socketId);
  deleteConsumer = (socketId: string) => this.consumers.delete(socketId);
  deleteDeviceCapability = (socketId: string) =>
    this.deviceCapabilities.delete(socketId);
}

export default MediasoupServices;
