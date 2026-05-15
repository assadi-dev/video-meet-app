"use client"

import { usePreferenceStore } from "@/store/userPreferenceStore";
import useSettingMediaDevice from "../_hooks/useSettingDevice";
import { ConfigurationFormType } from "../schema";
import ConfigurationForm from "./form/ConfigurationForm";
import PreviewDevices from "./PreviewDevices";
import { DEVICE_STATE_EVENT } from "../type";
import { useDevicesStore } from "@/store/useDevicesStore";



type WaitingRoomPageProps = {
    roomId: string;
};
const WaitingPageClient = ({ roomId }: WaitingRoomPageProps) => {

    const { video, audio, enableMediaStream, emit } = useSettingMediaDevice();
    const displayName = usePreferenceStore((state) => state.displayName);



    const handleClickCamera = (checked: boolean) => {
        enableMediaStream("video", checked);
        emit(DEVICE_STATE_EVENT.toggle, video.id!, "videoinput", checked);
    };
    const handleClickMic = (checked: boolean) => {
        enableMediaStream("audio", checked);
        emit(DEVICE_STATE_EVENT.toggle, audio.id!, "audioinput", checked);
    };

    const defaultValues = {
        displayName: displayName || "",
        videoSource: video.id,
        videoEnabled: video.enabled,
        audioSource: audio.id,
        audioEnabled: audio.enabled,
    } satisfies ConfigurationFormType;


    return (
        <main className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Aperçu vidéo */}
                    <PreviewDevices
                        video={video}
                        audio={audio}
                        handleClickCamera={handleClickCamera}
                        handleClickMic={handleClickMic}
                    />

                    {/* Configuration */}
                    <ConfigurationForm defaultValues={defaultValues} />
                </div>
            </div>
        </main>
    )
}

export default WaitingPageClient