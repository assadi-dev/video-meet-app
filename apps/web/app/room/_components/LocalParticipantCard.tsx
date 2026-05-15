"use client"

import { useEffect, useRef, useState } from "react";
import ParticipantCard from "./ParticipantCard";
import { ParticipantStream } from "../[id]/types";
import { usePreferenceStore } from "@/store/userPreferenceStore";
import { useDevicesStore } from "@/store/useDevicesStore";


const LocalParticipantCard = () => {
    const [participant, setParticipant] = useState<ParticipantStream>({
        id: "",
        name: "",
        mediaStream: null,
        isAudioEnabled: false,
        isVideoEnabled: false
    });

    const displayName = usePreferenceStore.use.displayName();
    const selectedDevices = useDevicesStore(state => state);

    const mediaStream = useRef<MediaStream | null>(null);

    const initMediaStream = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: { exact: selectedDevices.video?.id! } },
            audio: { deviceId: { exact: selectedDevices.audio?.id! } }
        });

        if (stream) {
            const updateTracks = stream.getTracks().map((track) => {
                if (track.kind === "video") {
                    track.enabled = selectedDevices.video?.enabled!;
                }
                if (track.kind === "audio") {
                    track.enabled = selectedDevices.audio?.enabled!;
                }
                return track;
            });
            mediaStream.current = new MediaStream(updateTracks);

            setParticipant({
                id: "",
                name: displayName || "Anonymous" + Date.now(),
                mediaStream: mediaStream.current,
                isAudioEnabled: selectedDevices.audio?.enabled!,
                isVideoEnabled: selectedDevices.video?.enabled!
            });
        }

    }

    useEffect(() => {

        if (selectedDevices.video || selectedDevices.audio) {
            initMediaStream();

        }

    }, [selectedDevices]);

    return (

        <ParticipantCard isLocal participant={participant} />

    );
};

export default LocalParticipantCard;
