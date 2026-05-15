

export type RoomDevice = {
    id: string
    label: string
    kind: MediaDeviceKind
    track: MediaStreamTrack | null
    enabled: boolean
}

export type ParticipantStream = {
    id: string;
    name: string;
    mediaStream: MediaStream | null;
    isAudioEnabled: boolean;
    isVideoEnabled: boolean;
}