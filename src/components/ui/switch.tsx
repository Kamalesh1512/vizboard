"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer relative inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full bg-primary/15 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary/15"
    )}
    {...props}
    ref={ref}
  >
    {/* Moon on the Left */}
    <Moon className="absolute left-2 h-4 w-4 fill-white transition-opacity duration-300 ease-in-out data-[state=checked]:opacity-100 data-[state=unchecked]:opacity-50" />
    
    {/* Sun on the Right */}
    <Sun className="absolute right-2 h-4 w-4 stroke-gray-600 fill-black transition-opacity duration-300 ease-in-out data-[state=checked]:opacity-50 data-[state=unchecked]:opacity-100" />

    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-7 w-7 rounded-full bg-white shadow-lg ring-0 transition-transform duration-300 ease-in-out data-[state=checked]:translate-x-8 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
