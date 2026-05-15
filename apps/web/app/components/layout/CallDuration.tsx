import { formatDuration } from "@/lib/format";
import { Circle } from "lucide-react";
import React from "react";

const CallDuration = () => {
    const [callDuration, setCallDuration] = React.useState(0);
    React.useEffect(() => {
        const interval = setInterval(() => {
            setCallDuration((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="flex items-center gap-2 bg-destructive/20 text-destructive px-3 py-1.5 rounded-full">
            <Circle className="h-2 w-2 fill-destructive animate-pulse" />
            <span className="text-xs font-medium">
                LIVE {formatDuration(callDuration)}
            </span>
        </div>
    );
};

export default CallDuration;