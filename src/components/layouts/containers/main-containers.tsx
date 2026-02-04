import { cn } from "@/lib/utils";
import type React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function MainContainer({ children, ...props }: Props) {
  return (
    <div {...props} className={cn("w-full min-h-screen bg-slate-100 flex justify-center items-center", props.className)}>
      {children}
    </div>
  );
}
