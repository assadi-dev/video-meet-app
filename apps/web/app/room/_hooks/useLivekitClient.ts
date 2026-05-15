"use client";

import { useEffect, useRef, useState } from "react";
import { Room, RoomEvent, Track, Participant } from "livekit-client";
import { useDevicesStore } from "@/store/useDevicesStore";
import { ParticipantStream } from "../[id]/types";

const LIVEKIT_URL = process.env.NEXT_PUBLIC_LIVEKIT_URL ?? "ws://localhost:7880";

const buildParticipantStream = (participant: Participant): ParticipantStream => {
    const videoTrack = participant.getTrackPublication(Track.Source.Camera)?.track;
    const audioTrack = participant.getTrackPublication(Track.Source.Microphone)?.track;
    const screenShareTrack = participant.getTrackPublication(Track.Source.ScreenShare)?.track;

    const stream = new MediaStream();
    if (videoTrack?.mediaStreamTrack) stream.addTrack(videoTrack.mediaStreamTrack);
    if (audioTrack?.mediaStreamTrack) stream.addTrack(audioTrack.mediaStreamTrack);
    if (screenShareTrack?.mediaStreamTrack) stream.addTrack(screenShareTrack.mediaStreamTrack);

    return {
        id: participant.sid,
        name: participant.identity,
        mediaStream: stream.getTracks().length > 0 ? stream : null,
        isVideoEnabled: participant.isCameraEnabled,
        isAudioEnabled: participant.isMicrophoneEnabled,
    };
};

type UseLivekitClientOptions = {
    roomName: string;
    token: string | null;
};

const useLivekitClient = ({ token }: UseLivekitClientOptions) => {
    const room = useRef<Room>(new Room());
    const selectedDevices = useDevicesStore((state) => state);
    const [localParticipant, setLocalParticipant] = useState<ParticipantStream | null>(null);
    const [participants, setParticipants] = useState<ParticipantStream[]>([]);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const syncParticipants = () => {
        const lk = room.current;
        setLocalParticipant(buildParticipantStream(lk.localParticipant));
        setParticipants(
            Array.from(lk.remoteParticipants.values()).map((p) => buildParticipantStream(p))
        );
    };

    useEffect(() => {
        if (!token) return;

        const lk = room.current;

        const connect = async () => {
            setIsConnecting(true);
            setError(null);
            try {
                await lk.connect(LIVEKIT_URL, token);

                await lk.localParticipant.setCameraEnabled(
                    selectedDevices.video?.enabled !== false,
                    selectedDevices.video?.deviceId ? { deviceId: selectedDevices.video.deviceId } : undefined
                );
                await lk.localParticipant.setMicrophoneEnabled(
                    selectedDevices.audio?.enabled !== false,
                    selectedDevices.audio?.deviceId ? { deviceId: selectedDevices.audio.deviceId } : undefined
                );



                setIsConnected(true);
                syncParticipants();
            } catch (err) {
                setError(err instanceof Error ? err.message : "Connection failed");
            } finally {
                setIsConnecting(false);
            }
        };

        lk.on(RoomEvent.ParticipantConnected, syncParticipants);
        lk.on(RoomEvent.ParticipantDisconnected, syncParticipants);
        lk.on(RoomEvent.TrackSubscribed, syncParticipants);
        lk.on(RoomEvent.TrackUnsubscribed, syncParticipants);
        lk.on(RoomEvent.TrackMuted, syncParticipants);
        lk.on(RoomEvent.TrackUnmuted, syncParticipants);
        lk.on(RoomEvent.LocalTrackPublished, syncParticipants);
        lk.on(RoomEvent.Disconnected, () => {
            setIsConnected(false);
            setLocalParticipant(null);
            setParticipants([]);
        });

        connect();

        return () => {
            lk.removeAllListeners();
            lk.disconnect();
        };
    }, [token]);

    return {
        room: room.current,
        localParticipant,
        participants,
        isConnecting,
        isConnected,
        error,
    };
};

export default useLivekitClient;
