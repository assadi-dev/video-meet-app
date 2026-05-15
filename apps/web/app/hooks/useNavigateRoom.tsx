"use client";

import { generateRoomId } from "@/lib/generator";
import { useRouter } from "next/navigation";
import { ROOM_NAVIGATION } from "@/core/constants";

export const useNavigateRoom = () => {
    const router = useRouter();

    /**
     * Create a new room and navigate to the prepare room page
     */
    const createRoom = () => {
        const roomId = generateRoomId();
        router.push(`${ROOM_NAVIGATION.PREPARE}/${roomId}`);
    };

    const navigateToPrepareRoom = (roomId: string) => {
        router.push(`${ROOM_NAVIGATION.PREPARE}/${roomId}`);
    };

    const navigateToRoom = (roomId: string) => {
        router.push(`${ROOM_NAVIGATION.ROOM}/${roomId}`);
    };

    return { createRoom, navigateToPrepareRoom, navigateToRoom };
};