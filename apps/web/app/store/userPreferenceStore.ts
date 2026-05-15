import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createSelectors } from "./utils";


type DevicePref = {
    deviceId?: string | null;
    enabled?: boolean;
};

type UserPreferenceState = {
    devices: {
        video?: DevicePref | null;
        audio?: DevicePref | null;
    };
    displayName?: string | null;
    language: string;
    theme: "dark" | "light" | "system";
};

const usePreferenceStoreBase = create(
    persist(
        () => ({
            devices: {
                video: { deviceId: null, enabled: true },
                audio: { deviceId: null, enabled: true },
            },
            displayName: null,
            language: "fr",
            theme: "system",
        }),
        {
            name: "user-preferences",
        }
    )
);

export const usePreferenceStore = createSelectors(usePreferenceStoreBase);

export const saveUserPreference = (values: Partial<UserPreferenceState>) =>
    usePreferenceStore.setState((state) => {
        const assertValues = values as Record<string, unknown>;
        return { ...state, ...assertValues };
    });

export const saveUserDevicePreference = (
    kind: "video" | "audio",
    values: Partial<DevicePref>
) =>
    usePreferenceStore.setState((state) => {
        const currentAudio = state.devices.audio;
        const currentVideo = state.devices.video;
        const assertValues = values as Record<string, unknown>;

        switch (kind) {
            case "audio":
                return {
                    ...state,
                    devices: {
                        ...state.devices,
                        audio: { ...currentAudio, ...assertValues },
                    },
                };
            case "video":
                return {
                    ...state,
                    devices: {
                        ...state.devices,
                        video: { ...currentVideo, ...assertValues },
                    },
                };
            default:
                return state;
        }
    });



