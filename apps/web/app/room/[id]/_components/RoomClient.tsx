"use client";

import { usePreferenceStore } from "@/store/userPreferenceStore";
import { useEffect, useState } from "react";
import { RoomDevice } from "../types";
import { useDevicesStore } from "@/store/useDevicesStore";



interface RoomClientProps {
    roomId: string;
}

const RoomClient = ({ roomId }: RoomClientProps) => {
    const displayName = usePreferenceStore.use.displayName();
    const selectedDevices = useDevicesStore(state => state);
    const [devices, setDevices] = useState<{
        video: RoomDevice
        audio: RoomDevice
    }>({
        video: {
            id: "",
            label: "",
            kind: "videoinput",
            track: null,
            enabled: false
        },
        audio: {
            id: "",
            label: "",
            kind: "audioinput",
            track: null,
            enabled: false
        }
    });

    useEffect(() => {
        const initDevices = async () => {
            const devices = await navigator.mediaDevices.enumerateDevices();


            const deviceInit = { video: null, audio: null }
            if (selectedDevices.video) {
                const videoDevices = devices.filter((device) => device.kind === "videoinput");
                const videoDevice = videoDevices.find((device) => device.deviceId === selectedDevices.video?.deviceId);
                deviceInit.video = {
                    id: videoDevice?.deviceId,
                    label: videoDevice?.label,
                    kind: "videoinput",
                    track: null,
                    enabled: selectedDevices.video?.enabled
                }
            }
            if (selectedDevices.audio) {
                const audioDevices = devices.filter((device) => device.kind === "audioinput");
                const audioDevice = audioDevices.find((device) => device.deviceId === selectedDevices.audio?.deviceId);


                deviceInit.audio = {
                    id: audioDevice?.deviceId,
                    label: audioDevice?.label,
                    kind: "audioinput",
                    track: null,
                    enabled: selectedDevices.audio?.enabled
                }
            }
            setDevices(deviceInit);
        };
        initDevices();

    }, [selectedDevices]);


    return <div><p>Connecté à la salle {roomId} par {displayName}</p><p>Appareils: </p>
        <div>
            <p>Video: {devices.video.label} {devices.video.enabled ? "Activé" : "Désactivé"}</p>
            <p>Audio: {devices.audio.label} {devices.audio.enabled ? "Activé" : "Désactivé"}</p>
        </div>
    </div>;
};

export default RoomClient;