"use client";
import { useState } from "react";
import { Check, Loader2, Save } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function SaveButton({ onSave, className = "" }: { onSave?: () => Promise<void> | void; className?: string }) {
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  const handleClick = async () => {
    if (status !== "idle") return;
    setStatus("saving");
    if (onSave) {
      await onSave();
    } else {
      await new Promise((r) => setTimeout(r, 1500));
    }
    setStatus("saved");
    setTimeout(() => setStatus("idle"), 2000);
  };

  return (
    <button
      onClick={handleClick}
      className={`relative flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-2.5 font-medium transition-all ${
        status === "idle" ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:-translate-y-0.5 shadow-md" : 
        status === "saving" ? "bg-muted text-muted-foreground cursor-wait" : 
        "bg-green-500 text-white"
      } ${className}`}
    >
      <AnimatePresence mode="wait">
        {status === "idle" && (
          <motion.div key="idle" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            <span>Save</span>
          </motion.div>
        )}
        {status === "saving" && (
          <motion.div key="saving" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Saving...</span>
          </motion.div>
        )}
        {status === "saved" && (
          <motion.div key="saved" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="flex items-center gap-2">
            <Check className="h-4 w-4" />
            <span>Saved!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
