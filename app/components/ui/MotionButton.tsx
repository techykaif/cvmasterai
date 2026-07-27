"use client";
import { ArrowRight } from "lucide-react";
import React from "react";

export function MotionButton({ label, onClick, className = "" }: { label: string; onClick?: () => void; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-primary px-8 py-3 font-medium text-primary-foreground shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">
        {label}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
      <div className="absolute inset-0 z-0 h-full w-full bg-white/20 scale-0 rounded-full transition-transform duration-500 ease-out group-hover:scale-150"></div>
    </button>
  );
}
