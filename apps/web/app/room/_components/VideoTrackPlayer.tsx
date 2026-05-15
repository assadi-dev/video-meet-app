"use client"

import { useEffect, useRef } from "react";
import { ParticipantStream } from "../[id]/types";

type VideoTrackPlayerProps = {
    participant: ParticipantStream
}
export const VideoTrackPlayer = ({ participant }: VideoTrackPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const onReady = () => {
        videoRef.current?.play().catch(() => { });
    };

    useEffect(() => {
        if (videoRef.current && participant.mediaStream) {
            videoRef.current.srcObject = participant.mediaStream;
            videoRef.current.playsInline = true;
            videoRef.current.addEventListener("loadedmetadata", onReady);
            videoRef.current.addEventListener("canplay", onReady);

        }
    }, [participant.mediaStream]);

    return (


        <video ref={videoRef} autoPlay
            playsInline
            className="w-full h-full" />


    )
}