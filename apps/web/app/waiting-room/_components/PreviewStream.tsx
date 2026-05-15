"use client"

import { Video } from "lucide-react";
import PreviewVideoTrack from "./PreviewVideoTrack";
import FallbackCameraOff from "@/components/fallback/FallbackCameraOff";

type PreviewStreamProps = {
    isVideoEnabled: boolean;
    mediaStream?: MediaStream | null;
};
const PreviewStream = ({ isVideoEnabled, mediaStream }: PreviewStreamProps) => {
    if (!isVideoEnabled) {
        return <FallbackCameraOff />;
    }
    return (
        <div className="w-full h-full bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center relative">
            <PreviewVideoTrack stream={mediaStream} />
            <div className="absolute bottom-4 right-4 bg-online p-2 rounded-full">
                <Video className="h-4 w-4 text-white" />
            </div>
        </div>
    )
}

export default PreviewStream