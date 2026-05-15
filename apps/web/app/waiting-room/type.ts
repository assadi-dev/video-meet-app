

export type DeviceState = {
    id: string | null;
    enabled: boolean;
    stream: MediaStream | null;
};

export type DeviceStateReducer = {
    video: DeviceState;
    audio: DeviceState;
}