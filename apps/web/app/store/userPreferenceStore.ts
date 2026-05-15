import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createSelectors } from "./utils";




type UserPreferenceState = {

    displayName?: string | null;
    language: string;
    theme: "dark" | "light" | "system";
};

const usePreferenceStoreBase = create(
    persist(
        () => ({
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


