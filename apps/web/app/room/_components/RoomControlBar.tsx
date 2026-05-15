"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Mic, MicOff, MonitorSpeaker, MoreVertical, PhoneOff, Settings, Video, VideoOff } from "lucide-react";


type RoomControlsBarProps = {
    isAudioEnabled: boolean;
    isVideoEnabled: boolean;
    isScreenSharing: boolean;
    onAudioEnabled: (enabled: boolean) => void;
    onVideoEnabled: (enabled: boolean) => void;
    onScreenShare: (enabled: boolean) => void;
    handleLeaveCall: () => void;
};

const RoomControlBar = ({ isAudioEnabled, isVideoEnabled, isScreenSharing, onAudioEnabled, onVideoEnabled, onScreenShare, handleLeaveCall }: RoomControlsBarProps) => {
    return (
        <div className="flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-full">
            <Button
                variant={isAudioEnabled ? "ghost" : "destructive"}
                size="icon"
                onClick={() => onAudioEnabled(!isAudioEnabled)}
                className="rounded-full h-10 w-10"
            >
                {isAudioEnabled ? (
                    <Mic className="h-5 w-5" />
                ) : (
                    <MicOff className="h-5 w-5" />
                )}
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8"
            >
                <MoreVertical className="h-4 w-4" />
            </Button>
            <Button
                variant={isVideoEnabled ? "ghost" : "destructive"}
                size="icon"
                onClick={() => onVideoEnabled(!isVideoEnabled)}
                className="rounded-full h-10 w-10"
            >
                {isVideoEnabled ? (
                    <Video className="h-5 w-5" />
                ) : (
                    <VideoOff className="h-5 w-5" />
                )}
            </Button>

            <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8"
            >
                <MoreVertical className="h-4 w-4" />
            </Button>

            <Button
                variant="ghost"
                size="icon"
                onClick={() => onScreenShare(!isScreenSharing)}
                className={cn("rounded-full h-10 w-10 transition-colors ", {
                    "bg-green-600": isScreenSharing,
                    "drop-shadow-accent": isScreenSharing,
                    //"drop-shadow-xl": isScreenSharing,
                    "hover:!bg-green-600": isScreenSharing,
                })}
            >
                <MonitorSpeaker className="h-5 w-5" />
            </Button>

            <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8"
            >
                <MoreVertical className="h-4 w-4" />
            </Button>

            <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-10 w-10"
            >
                <Settings className="h-5 w-5" />
            </Button>

            <div className="w-px h-6 bg-border mx-1" />

            <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={handleLeaveCall}
                className="rounded-full h-10 w-10 "
            >
                <PhoneOff className="h-5 w-5" />
            </Button>

            <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8"
            >
                <MoreVertical className="h-4 w-4" />
            </Button>
        </div>
    );
};

export default RoomControlBar;