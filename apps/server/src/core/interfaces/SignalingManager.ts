export interface SignalingManager {
  createSDPOffer(): void;
  sendSDPOffer(): void;
  setRemoteSDP(): void;
  sendICE(): void;
}
