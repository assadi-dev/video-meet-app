export enum MediasoupCase {
  getRouterRtpCapabilities = "getRouterRtpCapabilities",
  storeClientCapabilities = "storeClientCapabilities",
  createWebRtcTransport = "createWebRtcTransport",
  createRecvTransport = "createRecvTransport",
  connectRecvTransport = "connectRecvTransport",
  connectSendTransport = "connectSendTransport",
  createSendTransport = "createSendTransport",
  connectTransport = "connectTransport",
  produce = "produce",
  consume = "consume",
  resume = "resume",
}
export type MediasoupCaseUnion = keyof typeof MediasoupCase;

export type DirectionType = "send" | "recv";
