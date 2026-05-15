"use client";

import { Room } from "livekit-client";
import { useState } from "react";
import ParticipantCard from "./ParticipantCard";
import RoomControlBar from "./RoomControlBar";
import useRouterNavigation from "@/hooks/useRefreshRouter";
import { ParticipantStream } from "../[id]/types";
import SpinnerLoader from "@/components/ui/SpinnerLoader";

interface RoomGridContainerProps {
    room: Room;
    localParticipant: ParticipantStream | null;
    participants: ParticipantStream[];
    isConnecting: boolean;
    error: string | null;
}

const RoomGridContainer = ({ room, localParticipant, participants, isConnecting, error }: RoomGridContainerProps) => {
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const { router } = useRouterNavigation();

    const handleLeaveCall = async () => {
        await room.disconnect();
        router.replace("/");
    };

    const handleAudioEnabled = async (enabled: boolean) => {
        await room.localParticipant.setMicrophoneEnabled(enabled);
        setIsAudioEnabled(enabled);
    };

    const handleVideoEnabled = async (enabled: boolean) => {
        await room.localParticipant.setCameraEnabled(enabled);
        setIsVideoEnabled(enabled);
    };

    const handleScreenShare = async (enabled: boolean) => {
        await room.localParticipant.setScreenShareEnabled(enabled);
        setIsScreenSharing(enabled);
    };

    if (isConnecting) {
        return (
            <div className="flex flex-1 items-center justify-center gap-3">
                <SpinnerLoader />
                <span className="text-muted-foreground">Connexion en cours…</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-1 items-center justify-center text-destructive">
                {error}
            </div>
        );
    }

    const allParticipants = [
        ...(localParticipant ? [{ ...localParticipant, isLocal: true }] : []),
        ...participants.map((p) => ({ ...p, isLocal: false })),
    ];

    return (
        <>
            <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 h-full w-full gap-4">
                {allParticipants.map((p, index) => (
                    <ParticipantCard
                        key={p.id || index}
                        isLocal={p.isLocal}
                        participant={p}
                    />
                ))}
            </div>
            <div className="w-full flex items-center justify-center">
                <RoomControlBar
                    isAudioEnabled={isAudioEnabled}
                    isScreenSharing={isScreenSharing}
                    isVideoEnabled={isVideoEnabled}
                    onAudioEnabled={handleAudioEnabled}
                    onScreenShare={handleScreenShare}
                    onVideoEnabled={handleVideoEnabled}
                    handleLeaveCall={handleLeaveCall}
                />
            </div>
        </>
    );
};

export default RoomGridContainer;
