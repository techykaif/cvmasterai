"use client";
import React from "react";
import { ArrowRight } from "lucide-react";

export function InteractiveHoverButton({ text = "Button", className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { text?: string }) {
  return (
    <button
      className={`group relative w-auto min-w-[140px] cursor-pointer overflow-hidden rounded-full border border-border bg-background px-6 py-3 text-center font-semibold transition-all hover:border-primary shadow-sm hover:shadow-md ${className}`}
      {...props}
    >
      <span className="inline-block translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 text-foreground">
        {text}
      </span>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-2 group-hover:opacity-100">
        <span>{text}</span>
        <ArrowRight className="h-4 w-4" />
      </div>
      <div className="absolute left-[15%] top-[40%] h-2 w-2 scale-[1] rounded-full bg-primary transition-all duration-300 group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[2.5] group-hover:bg-primary z-0"></div>
    </button>
  );
}
