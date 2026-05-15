"use client"

import { useEffect, useState } from "react";
import { DeviceStateEvent, DeviceStateEventPayload } from "../type";

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

        return () => {
            navigator.mediaDevices.removeEventListener("devicechange", enumerateDevices);
        };
    }, []);


    const emit = (event: DeviceStateEvent, deviceId: string, kind: DeviceStateEventPayload["kind"]) => {
        window.dispatchEvent(new CustomEvent(event, { detail: { deviceId, kind } }));
    }

    return { devices, isLoading, error, emit };
}