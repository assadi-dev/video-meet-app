"use client";

import { useEffect, useState } from "react";
import { usePreferenceStore } from "@/store/userPreferenceStore";
import RoomGridContainer from "@/room/_components/RoomGridContainer";
import useLivekitClient from "@/room/_hooks/useLivekitClient";
import { fetchRoomToken } from "@/lib/api";

interface RoomClientProps {
    roomId: string;
}

const RoomClient = ({ roomId }: RoomClientProps) => {
    const displayName = usePreferenceStore.use.displayName();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        if (!displayName) return;
        fetchRoomToken(roomId, displayName).then(setToken).catch(console.error);
    }, [roomId, displayName]);

    const { room, localParticipant, participants, isConnecting, isScreenSharing, error } = useLivekitClient({
        roomName: roomId,
        token,
    });

    return (
        <RoomGridContainer
            room={room}
            localParticipant={localParticipant}
            participants={participants}
            isConnecting={isConnecting}
            isScreenSharing={isScreenSharing}
            error={error}
        />
    );
};

export default RoomClient;
