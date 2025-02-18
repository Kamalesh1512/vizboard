import React from "react";
import { AnimationControls } from "framer-motion";
import { Theme } from "@/lib/types";

interface ThemeCardProps {
  tittle: string;
  description: string;
  content: React.ReactNode;
  variant: "left" | "main" | "right";
  theme: Theme;
  controls: AnimationControls;
}

const ThemeCard = ({
  content,
  controls,
  description,
  theme,
  tittle,
  variant,
}: ThemeCardProps) => {
    
  return <div>ThemeCard</div>;
};

export default ThemeCard;
