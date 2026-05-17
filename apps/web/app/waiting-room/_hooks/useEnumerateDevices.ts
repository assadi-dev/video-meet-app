"use client"

import { useEffect, useState } from "react";
import { DEVICE_STATE_EVENT, DeviceStateEvent, DeviceStateEventPayload } from "../type";

export const useEnumerateDevices = () => {
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const enumerateDevices = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                setDevices(devices);
            } catch (error) {
                setError(error as Error);
            } finally {
                setIsLoading(false);
            }
        };
        enumerateDevices();

        navigator.mediaDevices.addEventListener('devicechange', enumerateDevices);
        window.addEventListener(DEVICE_STATE_EVENT.ready as any, enumerateDevices);

        return () => {
            navigator.mediaDevices.removeEventListener("devicechange", enumerateDevices);
            window.removeEventListener(DEVICE_STATE_EVENT.ready as any, enumerateDevices);
        };
    }, []);

    const refreshDevices = async (callback: (value: string) => void) => {
        const listesDevices = await navigator.mediaDevices.enumerateDevices()
        const newVideoDevices = listesDevices.filter((device) => device.kind === "videoinput")[0];
        const newAudioDevices = listesDevices.filter((device) => device.kind === "audioinput")[0];
        if (newVideoDevices) {
            callback(newVideoDevices?.deviceId)
        };
        if (newAudioDevices) {
            callback(newAudioDevices?.deviceId)
        };
    }


    const emit = (event: DeviceStateEvent, deviceId: string, kind: DeviceStateEventPayload["kind"]) => {
        window.dispatchEvent(new CustomEvent(event, { detail: { deviceId, kind } }));
    }

    return { devices, isLoading, error, emit, refreshDevices };
}