"use client";

import type React from "react";
import { useState } from "react";
import { Upload, FileType, AlertCircle, Wand2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function UploadResume() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const allowedFormats = [".tex", ".docx", ".md"];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const fileExtension = "." + selectedFile.name.split(".").pop()?.toLowerCase();
      if (allowedFormats.includes(fileExtension)) {
        setFile(selectedFile);
        setError(null);
      } else {
        setFile(null);
        setError("Please upload a .tex, .docx, or .md file.");
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    console.log("Uploading file:", file.name);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push("/edit-resume");
  };

  const handleEditWithAI = async () => {
    if (!file) return;
    console.log("Editing file with AI:", file.name);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push("/ai-edit-resume");
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-16 md:py-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-3xl mx-auto text-center space-y-6 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Upload or Edit Your Resume
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Upload your existing resume in LaTeX, DOCX, or MD format to get started
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Upload Resume Card */}
        <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle>Upload Resume</CardTitle>
              <CardDescription>Choose a .tex, .docx, or .md file to upload</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Label htmlFor="resume" className="cursor-pointer">Resume File</Label>
                <Input id="resume" type="file" accept=".tex,.docx,.md" onChange={handleFileChange} className="cursor-pointer" />
                {error && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}
                {file && !error && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                    <Alert>
                      <FileType className="h-4 w-4" />
                      <AlertTitle>File selected</AlertTitle>
                      <AlertDescription>{file.name}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}
                <Button onClick={handleUpload} disabled={!file || !!error} className="w-full cursor-pointer">
                  <Upload className="mr-2 h-4 w-4" /> Upload Resume
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Edit with AI Card */}
        <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle>Edit with AI</CardTitle>
              <CardDescription>Upload your resume and let AI enhance it</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Label htmlFor="ai-resume" className="cursor-pointer">Resume File</Label>
                <Input id="ai-resume" type="file" accept=".tex,.docx,.md" onChange={handleFileChange} className="cursor-pointer" />
                {error && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}
                {file && !error && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                    <Alert>
                      <FileType className="h-4 w-4" />
                      <AlertTitle>File selected</AlertTitle>
                      <AlertDescription>{file.name}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}
                <Button onClick={handleEditWithAI} disabled={!file || !!error} className="w-full cursor-pointer">
                  <Wand2 className="mr-2 h-4 w-4" /> Edit with AI
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
