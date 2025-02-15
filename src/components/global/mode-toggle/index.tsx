"use client";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if(!mounted){
    return null
  }

  return (
    <div>
      <Switch checked={theme ==='light'}
      className="h-10 w-20 pl-1 data-[state=checked]:bg-primary-foreground"
      onCheckedChange={()=>setTheme(theme=== 'dark'?'light':'dark')}
      aria-label="Toggle dark mode">

      </Switch>
    </div>
  );
};

export default ThemeSwitcher;
