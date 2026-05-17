"use client";

import { useEffect, useReducer, useRef } from "react";
import { DEVICE_STATE_EVENT, DeviceReadyPayload, DeviceStateEvent, DeviceStateEventPayload, DeviceStateReducer } from "../type";
import { useDevicesStore } from "@/store/useDevicesStore";


type DeviceStateAction = "SET_VIDEO" | "SET_AUDIO" | "ENABLE_MEDIA_STREAM" | "SELECT_DEVICE" | "INIT_DEVICES";

type DeviceStateActionPayload = {
    type: DeviceStateAction;
    payload: DeviceStateReducer;
}

const deviceStateReducer = (state: DeviceStateReducer, action: DeviceStateActionPayload) => {
    switch (action.type) {
        case "SET_VIDEO":
            return {
                ...state,
                video: { ...state.video, ...action.payload.video }
            };
        case "SET_AUDIO":
            return {
                ...state,
                audio: { ...state.audio, ...action.payload.audio }
            };

        case "INIT_DEVICES":
            return {
                ...state,
                video: { ...state.video, ...action.payload.video },
                audio: { ...state.audio, ...action.payload.audio }
            };
        default:
            return state;
    }
};


const useSettingMediaDevice = () => {
    const userDevicesVideo = useRef<MediaDeviceInfo[]>([]);
    const userDevicesAudio = useRef<MediaDeviceInfo[]>([]);
    const userMediaStream = useRef<MediaStream | null>(null);

    const userDevicePreference = useDevicesStore((state) => state);

    const [state, dispatch] = useReducer<DeviceStateReducer, any>(deviceStateReducer, {
        video: { id: null, enabled: false, stream: null },
        audio: { id: null, enabled: false, stream: null }
    });


    useEffect(() => {
        const initDevice = async () => {
            try {
                userMediaStream.current = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                });

                const userDevices = await navigator.mediaDevices.enumerateDevices();
                userDevices.forEach((device) => {
                    if (device.kind === "videoinput") {
                        userDevicesVideo.current.push(device);
                    }
                    if (device.kind === "audioinput") {
                        userDevicesAudio.current.push(device);
                    }
                });

                const payload: DeviceStateReducer = { ...state };
                userMediaStream.current.getTracks().forEach((track) => {
                    const stream = userMediaStream.current;
                    if (track.kind === "video") {
                        const device = userDevicesVideo.current.find((d) => d.label === track.label);
                        payload.video = { enabled: track.enabled, stream, id: device?.deviceId || null };
                    }
                    if (track.kind === "audio") {
                        const device = userDevicesAudio.current.find((d) => d.label === track.label);
                        payload.audio = { enabled: track.enabled, stream, id: device?.deviceId || null };
                    }
                });
                dispatch({ type: "INIT_DEVICES", payload });

                const readyPayload: DeviceReadyPayload = {
                    videoDeviceId: payload.video?.id ?? null,
                    audioDeviceId: payload.audio?.id ?? null,
                };
                window.dispatchEvent(new CustomEvent(DEVICE_STATE_EVENT.ready, { detail: readyPayload }));

            } catch (error) {
                console.error("Error accessing media devices.", error);
            }
        };
        initDevice();

        const onSelectDevice = (event: CustomEvent<DeviceStateEventPayload>) => {
            selectDevice(event.detail.deviceId, event.detail.kind);

        };


        window.addEventListener(DEVICE_STATE_EVENT.select as any, onSelectDevice);



        return () => {
            userMediaStream.current?.getTracks().forEach((track) => {
                track.stop();
            });
            window.removeEventListener(DEVICE_STATE_EVENT.select as any, onSelectDevice);
        };
    }, []);


    const enableMediaStream = (kind: "audio" | "video", enabled: boolean) => {
        const stream = userMediaStream.current;

        switch (kind) {
            case "video":
                stream?.getVideoTracks().forEach((track) => {
                    track.enabled = enabled;
                });
                dispatch({ type: "SET_VIDEO", payload: { video: { enabled, stream } } });

                break;
            case "audio":
                stream?.getAudioTracks().forEach((track) => {
                    track.enabled = enabled;
                });
                dispatch({ type: "SET_AUDIO", payload: { audio: { enabled, stream } } });

                break;
        }
    };

    const selectDevice = async (deviceId: string, kind: DeviceStateEventPayload["kind"]) => {
        const stream = userMediaStream.current;
        switch (kind) {
            case "videoinput":
                {
                    stream?.getVideoTracks().forEach((track) => {
                        track.stop();
                    });
                    const newStream = await navigator.mediaDevices.getUserMedia({
                        video: { deviceId: { exact: deviceId } },
                    });
                    dispatch({ type: "SET_VIDEO", payload: { video: { id: deviceId, stream: newStream } } });

                    break;
                }
            case "audioinput":
                {
                    stream?.getAudioTracks().forEach((track) => {
                        track.stop();
                    });
                    const newStreamAudio = await navigator.mediaDevices.getUserMedia({
                        audio: { deviceId: { exact: deviceId } },
                    });
                    dispatch({ type: "SET_AUDIO", payload: { audio: { ...state.audio, id: deviceId, stream: newStreamAudio } } });
                    break;
                }
        }
    }

    const emit = (event: DeviceStateEvent, deviceId: string, kind: DeviceStateEventPayload["kind"], enabled?: boolean) => {
        window.dispatchEvent(new CustomEvent(event, { detail: { deviceId, kind, enabled } }));
    }

    return {
        video: state.video,
        audio: state.audio,
        userDevicesVideo: userDevicesVideo.current,
        userDevicesAudio: userDevicesAudio.current,
        setVideo: (video: DeviceStateReducer["video"]) => dispatch({ type: "SET_VIDEO", payload: { video } }),
        setAudio: (audio: DeviceStateReducer["audio"]) => dispatch({ type: "SET_AUDIO", payload: { audio } }),
        enableMediaStream,
        selectDevice,
        emit
    };
};

export default useSettingMediaDevice;