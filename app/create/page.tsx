"use client";

import { motion } from "framer-motion";
import { FileText, Sparkles, Upload } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background relative overflow-hidden"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="container mx-auto px-6 py-20 max-w-5xl">
        <div className="text-center mb-16 space-y-6">
          <span className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium shadow-sm">
            Resume Builder
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            How would you like to start?
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose your preferred method to build a stunning, professional resume.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Option 1: Start from Scratch */}
          <div className="bg-card rounded-3xl border border-border shadow-sm p-8 text-center hover:shadow-lg hover:-translate-y-1 hover:border-primary/50 transition-all duration-300 group flex flex-col h-full">
            <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-sm group-hover:bg-primary transition-colors duration-500">
              <FileText className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">Start from Scratch</h3>
            <p className="text-muted-foreground mb-8 flex-grow">
              Build your resume step-by-step with our easy-to-use editor. Perfect if you are starting fresh.
            </p>
            <button
              onClick={() => router.push("/templates")}
              className="w-full py-3 px-4 rounded-full text-foreground font-medium bg-secondary hover:bg-secondary/80 border border-border transition-all duration-300"
            >
              Browse Templates
            </button>
          </div>

          {/* Option 2: Upload Existing */}
          <div className="bg-card rounded-3xl border border-border shadow-sm p-8 text-center hover:shadow-lg hover:-translate-y-1 hover:border-primary/50 transition-all duration-300 group flex flex-col h-full">
            <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-sm group-hover:bg-primary transition-colors duration-500">
              <Upload className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">Upload Resume</h3>
            <p className="text-muted-foreground mb-8 flex-grow">
              Already have a resume? Upload your PDF and we'll extract the data into our beautiful templates.
            </p>
            <button
              onClick={() => router.push("/upload")}
              className="w-full py-3 px-4 rounded-full text-foreground font-medium bg-secondary hover:bg-secondary/80 border border-border transition-all duration-300"
            >
              Upload PDF
            </button>
          </div>

          {/* Option 3: AI Generate (Coming Soon) */}
          <div className="bg-card rounded-3xl border border-border shadow-sm p-8 text-center transition-all duration-300 relative overflow-hidden flex flex-col h-full opacity-80 cursor-not-allowed">
            <div className="absolute top-4 right-4">
              <span className="inline-flex px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold shadow-sm">
                Coming Soon
              </span>
            </div>
            <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-sm">
              <Sparkles className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">AI Generate</h3>
            <p className="text-muted-foreground mb-8 flex-grow">
              Just paste your LinkedIn profile URL or write a short prompt, and our AI will build it for you.
            </p>
            <button
              disabled
              className="w-full py-3 px-4 rounded-full bg-primary/50 text-primary-foreground relative z-20 border-0 font-medium cursor-not-allowed transition-all"
            >
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
