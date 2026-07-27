"use client";

import { motion } from "framer-motion";
import { Upload as UploadIcon, CheckCircle2, Sparkles } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const router = useRouter();
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type === "application/pdf") {
      setFile(file);
    } else {
      alert("Please upload a PDF file.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background relative overflow-hidden"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="container mx-auto px-6 py-20 max-w-4xl">
        <div className="text-center mb-12 space-y-6">
          <span className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium shadow-sm">
            Upload Existing
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground">
            Upload Your Resume
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Upload your current PDF resume. We'll extract your data so you can apply our beautiful templates or use AI to enhance it.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Area */}
          <div className="bg-card rounded-3xl border border-border shadow-sm p-8 flex flex-col items-center justify-center relative group/upload hover:shadow-lg transition-all duration-300">
            <input
              type="file"
              id="resume-upload"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              accept=".pdf"
              onChange={handleChange}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            />
            <div className={`w-full border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-colors duration-300 ${dragActive ? 'border-primary bg-primary/10' : 'border-border bg-background group-hover/upload:border-primary group-hover/upload:bg-primary/5'}`}>
              <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                <UploadIcon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Drag & Drop PDF</h3>
              <p className="text-muted-foreground text-sm mb-4">
                or click to browse your files
              </p>
              {file && (
                <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-4 py-2 rounded-full font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  {file.name}
                </div>
              )}
            </div>
            
            <button
              onClick={() => router.push("/templates")}
              disabled={!file}
              className="w-full mt-6 py-3 px-4 rounded-full bg-primary text-primary-foreground font-medium shadow-md hover:bg-primary/90 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
            >
              Parse & Edit Manually
            </button>
          </div>

          {/* AI Enhance Area */}
          <div className="bg-card rounded-3xl border border-border shadow-sm p-8 flex flex-col justify-between opacity-80 cursor-not-allowed relative">
            <div className="absolute top-4 right-4">
              <span className="inline-flex px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold shadow-sm">
                Coming Soon
              </span>
            </div>
            <div className="text-center mt-4">
              <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">AI Enhance</h3>
              <p className="text-muted-foreground mb-8">
                Let our advanced AI analyze your uploaded resume, fix grammatical errors, and optimize bullet points for ATS systems.
              </p>
            </div>
            <button
              disabled
              className="w-full py-3 px-4 rounded-full bg-primary/50 text-primary-foreground font-medium cursor-not-allowed transition-all duration-300"
            >
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
