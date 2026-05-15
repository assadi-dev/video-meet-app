"use client";
import SwitchClickButton from "@components/buttons/SwitchClickButton";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";
import React from "react";

type EnableButtonProp<K extends string> = { [P in K]: boolean } & {
    setEnabled: (checked: boolean) => void;
};
export const EnableCameraButton = ({
    isVideoEnabled,
    setEnabled,
}: EnableButtonProp<"isVideoEnabled">) => {
    return (
        <>
            <SwitchClickButton
                defaultChecked={isVideoEnabled}
                IconOn={Video}
                IconOff={VideoOff}
                onChecked={setEnabled}
                className="flex-1"
            >
                {isVideoEnabled ? "Caméra activée" : "Caméra désactivée"}
            </SwitchClickButton>
        </>
    );
};

export const EnableMicButton = ({
    isAudioEnabled,
    setEnabled,
}: EnableButtonProp<"isAudioEnabled">) => {
    return (
        <>
            <SwitchClickButton
                defaultChecked={isAudioEnabled}
                IconOn={Mic}
                IconOff={MicOff}
                onChecked={setEnabled}
                className="flex-1"
            >
                {isAudioEnabled ? "Micro activé" : "Micro désactivé"}
            </SwitchClickButton>
        </>
    );
};
