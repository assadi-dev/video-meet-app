"use client"

import { useEffect, useRef, useState } from "react"
import FallbackParticipantVideo from "@/components/fallback/FallbackParticipantVideo"
import { ParticipantStream } from "../[id]/types"
import { VideoTrackPlayer } from "./VideoTrackPlayer"
import { Maximize2, Minimize2, MicOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ParticipantCardProps {
    isLocal: boolean
    isScreenShare?: boolean
    participant: ParticipantStream
}

const ParticipantCard = ({ isLocal, isScreenShare, participant }: ParticipantCardProps) => {
    const USER_LABEL = isLocal ? participant.name + " (YOU) " : participant.name;
    const containerRef = useRef<HTMLDivElement>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const onFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener("fullscreenchange", onFullscreenChange);
        return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
    }, []);

    const toggleFullscreen = async () => {
        if (!isFullscreen) {
            await containerRef.current?.requestFullscreen();
        } else {
            await document.exitFullscreen();
        }
    };

    return (
        <div
            ref={containerRef}
            key={participant.id}
            className={cn(
                "relative rounded-2xl overflow-hidden bg-card border border-border group h-[320px] w-full",
                isFullscreen && "rounded-none h-full w-full"
            )}
        >
            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary/10 to-accent/10">
                {participant.isVideoEnabled
                    ? <VideoTrackPlayer participant={participant} />
                    : <FallbackParticipantVideo name={participant.name} index={0} />
                }
            </div>

            {/* Fullscreen toggle — visible on hover, screen share cards only */}
            {isScreenShare && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleFullscreen}
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-background/70 backdrop-blur rounded-full h-8 w-8"
                >
                    {isFullscreen
                        ? <Minimize2 className="h-4 w-4" />
                        : <Maximize2 className="h-4 w-4" />
                    }
                </Button>
            )}

            {!participant.isAudioEnabled && (
                <div className="absolute bottom-3 right-3 bg-danger/10 backdrop-blur p-1.5 rounded-full">
                    <MicOff className="h-6 w-6 text-danger" />
                </div>
            )}

            {/* Name label */}
            <div className="absolute bottom-3 left-3 bg-background/80 backdrop-blur px-3 py-1 rounded-lg">
                <span className="text-sm font-medium">{USER_LABEL}</span>
            </div>
        </div>
    )
}

export default ParticipantCard



