"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ButtonProps } from "@/types/global";
import { LucideIcon } from "lucide-react";
import React, { SVGProps } from "react";

type SwitchButtonProps = {
  defaultChecked: boolean;
  IconOn: LucideIcon;
  IconOff: LucideIcon;
  children: React.ReactNode;
  onChecked?: (checked: boolean) => void;
} & ButtonProps;
const SwitchClickButton = ({
  defaultChecked,
  IconOn,
  IconOff,
  children,
  onChecked,
  ...props
}: SwitchButtonProps) => {
  const Icon = ({ ...props }: SVGProps<SVGSVGElement>) => {
    if (defaultChecked) return <IconOn {...props} />;
    return <IconOff {...props} />;
  };

  const handleClick = () => {
    onChecked && onChecked(!defaultChecked);
  };

  return (
    <Button
      variant={defaultChecked ? "outline" : "destructive"}
      {...props}
      className={cn("flex items-center gap-3", props.className)}
      onClick={handleClick}
    >
      <Icon className="h-4 w-4" /> {children}
    </Button>
  );
};

export default SwitchClickButton;
