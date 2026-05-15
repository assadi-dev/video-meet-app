"use client";

import { useState } from "react";
import LocalParticipantCard from "./LocalParticipantCard";
import RoomControlBar from "./RoomControlBar";
import useRouterNavigation from "@/hooks/useRefreshRouter";



const RoomGridContainer = () => {
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [isScreenSharing, setIsScreenSharing] = useState(false);
    const { router } = useRouterNavigation()

    const handleLeaveCall = async () => {
        router.replace("/")
    }


    return (
        <>
            <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 h-full w-full gap-4">
                <LocalParticipantCard />
                {/*      {currentParticipants
          .map((p) => generateParticipant(p))
          .map((participant, index) => (
            <ParticipantCard
              key={participant.id}
              index={index + 1}
              participant={participant}
              mediaStream={participant?.mediaStream ?? null}
            />
          ))} */}

            </div>
            <div className="w-full flex items-center justify-center">
                <RoomControlBar isAudioEnabled={isAudioEnabled}
                    isScreenSharing={isScreenSharing}
                    isVideoEnabled={isVideoEnabled}
                    onAudioEnabled={(enable) => { }}
                    onScreenShare={(enable) => { }}
                    onVideoEnabled={(enable) => { }}
                    handleLeaveCall={handleLeaveCall} />
            </div>
        </>
    );
};

export default RoomGridContainer;