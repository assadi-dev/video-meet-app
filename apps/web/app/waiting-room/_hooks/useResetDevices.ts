"use client"

import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { ConfigurationFormType } from "../schema";
import { useEnumerateDevices } from "./useEnumerateDevices";
import { DEVICE_STATE_EVENT, DeviceReadyPayload } from "../type";

export const useResetDevices = (form: UseFormReturn<ConfigurationFormType>) => {
    const { emit } = useEnumerateDevices()
    useEffect(() => {
        if (!form) return;

        const resetDevices = async () => {
            const listesDevices = await navigator.mediaDevices.enumerateDevices()
            const newVideoDevices = listesDevices.filter((device) => device.kind === "videoinput")[0];
            const newAudioDevices = listesDevices.filter((device) => device.kind === "audioinput")[0];
            if (newVideoDevices) {
                form.setValue("videoSource", newVideoDevices.deviceId, { shouldDirty: true });
                emit(DEVICE_STATE_EVENT.select, newVideoDevices.deviceId, "videoinput");
            };
            if (newAudioDevices) {
                form.setValue("audioSource", newAudioDevices.deviceId, { shouldDirty: true });
                emit(DEVICE_STATE_EVENT.select, newAudioDevices.deviceId, "audioinput");
            };
        }

        const onDeviceReady = (event: CustomEvent<DeviceReadyPayload>) => {
            const { videoDeviceId, audioDeviceId } = event.detail;
            if (videoDeviceId) {
                form.setValue("videoSource", videoDeviceId, { shouldDirty: true });
            }
            if (audioDeviceId) {
                form.setValue("audioSource", audioDeviceId, { shouldDirty: true });
            }
        };

        navigator.mediaDevices.addEventListener("devicechange", resetDevices);
        window.addEventListener(DEVICE_STATE_EVENT.ready as any, onDeviceReady);

        return () => {
            navigator.mediaDevices.removeEventListener("devicechange", resetDevices);
            window.removeEventListener(DEVICE_STATE_EVENT.ready as any, onDeviceReady);
        }
    }, [form]);
}