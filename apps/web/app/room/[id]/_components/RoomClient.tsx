"use client";

import { useEffect, useState } from "react";
import { usePreferenceStore } from "@/store/userPreferenceStore";
import RoomGridContainer from "@/room/_components/RoomGridContainer";
import useLivekitClient from "@/room/_hooks/useLivekitClient";
import { fetchRoomToken } from "@/lib/api";
import useRouterNavigation from "@/hooks/useRefreshRouter";
import SpinnerLoader from "@/components/ui/SpinnerLoader";

interface RoomClientProps {
    roomId: string;
}

const RoomClient = ({ roomId }: RoomClientProps) => {
    const displayName = usePreferenceStore.use.displayName();
    const [token, setToken] = useState<string | null>(null);
    const [hydrated, setHydrated] = useState(false);
    const { router } = useRouterNavigation();
    const { room, localParticipant, participants, isConnecting, isScreenSharing, error } = useLivekitClient({
        roomName: roomId,
        token,
    });

    useEffect(() => {
        setHydrated(true);
    }, []);

    useEffect(() => {
        if (!hydrated) return;
        if (!displayName) {
            router.replace(`/waiting-room/${roomId}`);
            return;
        }
        fetchRoomToken(roomId, displayName)
            .then(setToken)
            .catch(console.error);
    }, [roomId, displayName, hydrated]);

    if (!hydrated) {
        return (
            <div className="flex flex-1 items-center justify-center gap-3">
                <SpinnerLoader />
            </div>
        );
    }

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
