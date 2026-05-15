"use client";

import React from "react";
import BackButton from "./BackButton";
import { LucideIcon, Video } from "lucide-react";

type HeaderNavTitleProps = {
  title: string;
  back?: boolean;
  Icon?: LucideIcon;
};
const HeaderNavTitle = ({ title, Icon, back }: HeaderNavTitleProps) => {
  return (
    <div className="flex items-center space-x-2">
      {back && <BackButton />}
      {Icon ? (
        <Icon className="h-6 w-6 text-primary" />
      ) : (
        <Video className="h-6 w-6 text-primary" />
      )}
      <h1 className="text-xl font-bold">{title}</h1>
    </div>
  );
};

export default HeaderNavTitle;
