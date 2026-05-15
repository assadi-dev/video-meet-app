"use client"

import useSettingMediaDevice from "../_hooks/useSettingDevice";
import { ConfigurationFormType } from "../schema";
import ConfigurationForm from "./form/ConfigurationForm";
import PreviewDevices from "./PreviewDevices";



type WaitingRoomPageProps = {
    roomId: string;
};
const WaitingPageClient = ({ roomId }: WaitingRoomPageProps) => {

    const { video, audio, enableMediaStream } = useSettingMediaDevice();
    const handleClickCamera = (checked: boolean) => {
        enableMediaStream("video", checked);
    };
    const handleClickMic = (checked: boolean) => {
        enableMediaStream("audio", checked);
    };

    const defaultValues = {
        displayName: "",
        videoSource: video.id,
        audioSource: audio.id,
    } satisfies ConfigurationFormType;

    console.log(video.id, audio.id);
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
                    {video.id && audio.id && <ConfigurationForm defaultValues={defaultValues} />}
                </div>
            </div>
        </main>
    )
}

export default WaitingPageClient