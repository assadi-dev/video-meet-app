"use client";
import React from "react";
import RoomHeader from "../layout/RoomHeader";


type TemplateRoomPageProps = {
    username: string;
    roomId: string;
    roomTitle?: string;
    children: React.ReactNode;
};
const TemplateRoomPage = ({
    username,
    roomId,
    roomTitle,
    children,
}: TemplateRoomPageProps) => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <RoomHeader
                username={username}
                room={{ id: roomId, title: `${roomTitle}` }}
            />
            <div className="flex-1 flex overflow-hidden">
                <div className="flex-1 flex flex-col p-6 gap-4"> {children}</div>
            </div>
        </div>
    );
};

export default TemplateRoomPage;
