import { buttonVariants } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";
import { LucideProps } from "lucide-react";
import React from "react";

export type LucidIconType = React.ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
>;

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };
