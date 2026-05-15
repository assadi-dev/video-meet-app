"use client";

import { useEffect, useReducer, useRef } from "react";
import { DeviceStateReducer } from "../type";

const useSettingMediaDevice = () => {
    const userDevicesVideo = useRef<MediaDeviceInfo[]>([]);
    const userDevicesAudio = useRef<MediaDeviceInfo[]>([]);
    const userMediaStream = useRef<MediaStream | null>(null);
    const [state, setState] = useReducer((prev: DeviceStateReducer, next: Partial<DeviceStateReducer>) => {
        return {
            ...prev,
            ...next
        };
    }, {
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
                setState(payload);
                console.log("mediaStream initialized!");

            } catch (error) {
                console.error("Error accessing media devices.", error);
            }
        };
        initDevice();

        return () => {
            userMediaStream.current?.getTracks().forEach((track) => {
                track.stop();
            });
        };
    }, []);


    const enableMediaStream = (kind: "audio" | "video", enabled: boolean) => {
        const stream = userMediaStream.current;

        switch (kind) {
            case "video":
                stream?.getVideoTracks().forEach((track) => {
                    track.enabled = enabled;
                });
                setState({ video: { ...state.video, enabled, stream } });
                break;
            case "audio":
                stream?.getAudioTracks().forEach((track) => {
                    track.enabled = enabled;
                });
                setState({ audio: { ...state.audio, enabled, stream } });
                break;
        }
    };


    return {
        video: state.video,
        audio: state.audio,
        userDevicesVideo: userDevicesVideo.current,
        userDevicesAudio: userDevicesAudio.current,
        setVideo: (video: DeviceStateReducer["video"]) => setState({ video }),
        setAudio: (audio: DeviceStateReducer["audio"]) => setState({ audio }),
        enableMediaStream
    };
};

export default useSettingMediaDevice;