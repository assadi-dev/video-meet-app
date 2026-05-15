"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Video } from "lucide-react"
import PreviewStream from "./PreviewStream"
import { EnableCameraButton, EnableMicButton } from "./EnableDeviceButton"

interface PreviewDevicesProps {
    video: {
        enabled: boolean;
        stream: MediaStream | null;
    };
    audio: {
        enabled: boolean;
        stream: MediaStream | null;
    };
    handleClickCamera: (checked: boolean) => void;
    handleClickMic: (checked: boolean) => void;
}
const PreviewDevices = ({ video, audio, handleClickCamera, handleClickMic }: PreviewDevicesProps) => {

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Video className="h-5 w-5 mr-2" />
                    Aperçu de votre caméra
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative aspect-video bg-muted rounded-lg overflow-hidden mb-4">
                    {/* Video Track here ! */}
                    <PreviewStream
                        isVideoEnabled={video.enabled}
                        mediaStream={video?.stream}
                    />
                </div>

                <div className="flex items-center justify-center space-x-4">
                    <EnableCameraButton
                        isVideoEnabled={video.enabled}
                        setEnabled={handleClickCamera}
                    />
                    <EnableMicButton
                        isAudioEnabled={audio.enabled}
                        setEnabled={handleClickMic}
                    />
                </div>
            </CardContent>
        </Card>
    )
}

export default PreviewDevices