import { Settings, Video } from "lucide-react";
import React from "react";

import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { getInitials } from "@/lib/format";
import CallDuration from "./CallDuration";

type RoomHeaderProps = {
  username: string;
  room: {
    id: string;
    title?: string | null;
  };
};
const RoomHeader = ({ username, room }: RoomHeaderProps) => {
  const showRoom = () => {
    if (!room) throw Error("Room undefined");
    if (room.title) return room.title;
    return room.id;
  };
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
            <Video className="h-4 w-4" />
          </div>
          <h1 className="text-sm font-medium">{showRoom()}</h1>
        </div>
        <div className="flex items-center gap-4">
          <CallDuration />
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <Settings className="h-5 w-5" />
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {getInitials(username)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default RoomHeader;
