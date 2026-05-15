"use client"

import { useEffect, useState } from "react";

export const useEnumerateDevices = () => {
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const enumerateDevices = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                setDevices((prev) => [...prev, ...devices]);
            } catch (error) {
                setError(error as Error);
            } finally {
                setIsLoading(false);
            }
        };
        enumerateDevices();
    }, []);

    return { devices, isLoading, error };
}