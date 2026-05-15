"use client";

import LocalParticipantCard from "./LocalParticipantCard";



const RoomGridContainer = () => {
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
        </>
    );
};

export default RoomGridContainer;