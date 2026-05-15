"use client";
import { VideoOff } from "lucide-react";
import React from "react";

const FallbackCameraOff = () => {
    return (
        <div className="w-full h-full flex items-center justify-center bg-muted">
            <div className="text-center">
                <VideoOff className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Caméra désactivée</p>
            </div>
        </div>
    );
};

export default FallbackCameraOff;
