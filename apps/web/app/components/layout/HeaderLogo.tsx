"use client";
import { Video } from "lucide-react";
import BackButton from "./BackButton";

type HeaderLogoProps = { back?: boolean };
const HeaderLogo = ({ back }: HeaderLogoProps) => {
  return (
    <div className="flex items-center space-x-2">
      {back && <BackButton />}
      <Video className="h-8 w-8 text-primary" />
      <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
        VideoMeet
      </h1>
    </div>
  );
};

export default HeaderLogo;
