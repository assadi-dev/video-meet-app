

export type DeviceState = {
    id: string | null;
    enabled: boolean;
    stream: MediaStream | null;
};

export type DeviceStateReducer = {
    video: DeviceState;
    audio: DeviceState;
}


export const DEVICE_STATE_EVENT = {
    select: "device:select",
    toggle: "device:toggle",
} as const;

export type DeviceStateEvent = typeof DEVICE_STATE_EVENT[keyof typeof DEVICE_STATE_EVENT];

export type DeviceStateEventPayload = {
    deviceId: string;
    kind: "videoinput" | "audioinput";
}
