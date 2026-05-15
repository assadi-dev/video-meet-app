"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createSelectors } from "./utils";
import { immer } from 'zustand/middleware/immer'

type DevicePref = {
    deviceId?: string | null;
    enabled?: boolean;
};

type DevicesStore = {
    video: DevicePref | null;
    audio: DevicePref | null;
}

export const useDevicesBase = create<DevicesStore>()(
    persist(
        immer(() => ({
            video: { deviceId: null, enabled: true },
            audio: { deviceId: null, enabled: true },
        })),
        {
            name: "selected-devices",
        }
    )
);

export const useDevicesStore = createSelectors(useDevicesBase);




export const saveUserDevice = (values: Partial<DevicesStore>) =>
    useDevicesStore.setState((state) => {
        const assertValues = values as Record<string, unknown>;
        return { ...state, ...assertValues };
    });


