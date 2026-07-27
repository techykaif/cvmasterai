"use client";
import { useState } from "react";
import { Download, Loader2, Check } from "lucide-react";

export function DownloadButton({ onDownload, className = "" }: { onDownload?: () => Promise<void> | void; className?: string }) {
  const [status, setStatus] = useState<"idle" | "downloading" | "complete">("idle");
  const [progress, setProgress] = useState(0);

  const handleClick = async () => {
    if (status !== "idle") return;
    setStatus("downloading");
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress((p) => (p >= 90 ? 90 : p + 10));
    }, 200);

    if (onDownload) await onDownload();
    else await new Promise(r => setTimeout(r, 2000));
    
    clearInterval(interval);
    setProgress(100);
    setStatus("complete");
    setTimeout(() => {
      setStatus("idle");
      setProgress(0);
    }, 2500);
  };

  return (
    <button
      onClick={handleClick}
      className={`relative flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-2.5 font-medium transition-all ${
        status === "idle" ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:-translate-y-0.5" : 
        "bg-secondary text-secondary-foreground"
      } ${className}`}
    >
      {/* Progress Bar Background */}
      {status === "downloading" && (
        <div className="absolute left-0 top-0 h-full bg-primary/20 transition-all duration-200" style={{ width: `${progress}%` }} />
      )}
      
      <div className="relative z-10 flex items-center gap-2">
        {status === "idle" && (
          <>
            <Download className="h-4 w-4" />
            <span>Download PDF</span>
          </>
        )}
        {status === "downloading" && (
          <>
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            <span className="text-primary">Downloading... {progress}%</span>
          </>
        )}
        {status === "complete" && (
          <>
            <Check className="h-4 w-4 text-green-600" />
            <span className="text-green-600">Downloaded</span>
          </>
        )}
      </div>
    </button>
  );
}
