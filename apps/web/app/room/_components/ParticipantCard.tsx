"use client"


import FallbackParticipantVideo from "@/components/fallback/FallbackParticipantVideo"
import { ParticipantStream } from "../[id]/types"
import { VideoTrackPlayer } from "./VideoTrackPlayer"
import { MicOff } from "lucide-react"


interface ParticipantCardProps {
    isLocal: boolean
    participant: ParticipantStream
}


const ParticipantCard = ({ isLocal, participant }: ParticipantCardProps) => {
    const USER_LABEL = isLocal ? participant.name + " (YOU) " : participant.name;



    return (
        <div
            key={participant.id}
            className="relative rounded-2xl overflow-hidden bg-card border border-border group h-[320px] w-full"
        >
            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary/10 to-accent/10">
                {participant.isVideoEnabled ? <VideoTrackPlayer participant={participant} /> : <FallbackParticipantVideo name={participant.name} index={0} />}
            </div>
            {!participant.isAudioEnabled && <div className="absolute bottom-3 right-3 bg-danger/10 backdrop-blur p-1.5 rounded-full">
                <MicOff className="h-6 w-6  text-danger" />
            </div>
            }
            {/* Name label */}
            <div className="absolute bottom-3 left-3 bg-background/80 backdrop-blur px-3 py-1 rounded-lg ">
                <span className="text-sm font-medium">
                    {USER_LABEL}
                </span>
            </div>
        </div>
    )
}

export default ParticipantCard



