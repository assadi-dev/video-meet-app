"use client";

import { usePreferenceStore } from "@/store/userPreferenceStore";
import { useEffect, useState } from "react";
import { RoomDevice } from "../types";
import { useDevicesStore } from "@/store/useDevicesStore";
import RoomGridContainer from "@/room/_components/RoomGridContainer";
import useInitLocalMedia from "@/room/_hooks/useInitLocalMedia";



interface RoomClientProps {
    roomId: string;
}

const RoomClient = ({ roomId }: RoomClientProps) => {

    const { devices, displayName } = useInitLocalMedia();

    return <RoomGridContainer />
};

export default RoomClient;