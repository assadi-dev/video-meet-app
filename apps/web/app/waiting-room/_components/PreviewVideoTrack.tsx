"use client"

import { useEffect, useRef } from "react";

type PreviewVideoTrackProps = {
    mediaStream: MediaStream | null;
};
const PreviewVideoTrack = ({ stream }: { stream?: MediaStream | null }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    useEffect(() => {
        if (!stream || !videoRef.current) return;
        if (stream instanceof MediaStream) {
            videoRef.current.srcObject = stream;
            videoRef.current.load();
            videoRef.current.play();
        }
    }, [stream]);
    if (!stream) return <p>Media stream non détecté</p>;
    return (
        <video
            className="border rounded bg-black my-3"
            ref={videoRef}
        />
    );
};

export default PreviewVideoTrack;
