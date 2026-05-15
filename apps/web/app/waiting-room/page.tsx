
import { redirect } from "next/navigation";
import { ROOM_NAVIGATION } from "@/core/constants";

export default function WaitingRoomPage() {
    redirect(ROOM_NAVIGATION.HOME);
}