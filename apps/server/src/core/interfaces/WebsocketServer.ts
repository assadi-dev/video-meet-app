import { Peer } from "@services/MediasoupServices";
import { Router } from "mediasoup/types";
import { Socket } from "socket.io";

export type Room = { id: string; router: Router; peers: Map<string, Peer> };
export interface WebsocketMessageContent {
  type: string;
  message: any;
}

export type WebsocketClient = Socket;
export interface WebsocketSendMessage {
  room?: string;
  contents: WebsocketMessageContent;
  client: WebsocketClient;
}

export type JoinUserRole = "host" | "guest";
export type JoinData = {
  room: string;
  role?: JoinUserRole;
  displayName?: string;
};

export interface WebsocketServer {
  start(): void;
  onConnection(): void;
  onLeave({
    peerId,
    client,
    room,
  }: {
    peerId: string;
    client: WebsocketClient;
    room: Room;
  }): void;
  sendToRoom?({ room, contents }: WebsocketSendMessage): void;
  sendToClient?({ client, contents }: WebsocketSendMessage): void;
  sendBroadcast?(msg: string, excludeSocket: WebsocketClient): void;
  joinTo?(id: string, socket: any, data: JoinData): void;
  close(): void;
}
