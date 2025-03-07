"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Upload, FileType, AlertCircle, Wand2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function UploadResume() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const allowedFormats = [".tex", ".docx", ".md"];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    console.log("📂 File selected:", selectedFile?.name || "No file");

    if (selectedFile) {
      const fileExtension = "." + selectedFile.name.split(".").pop()?.toLowerCase();
      if (allowedFormats.includes(fileExtension)) {
        setFile(selectedFile);
        setError(null);
        console.log("✅ File accepted:", selectedFile.name);
      } else {
        setFile(null);
        setError("Invalid file format. Please upload a .tex, .docx, or .md file.");
        console.error("❌ Invalid file format:", fileExtension);
      }
    }
  };

  const handleNavigation = (path: string, extraParams: Record<string, string> = {}) => {
    const queryParams = new URLSearchParams(extraParams).toString();
    console.log("🔀 Navigating to:", path, "with params:", queryParams);
    router.push(`${path}${queryParams ? `?${queryParams}` : ""}`);
  };

  const uploadFile = async (endpoint: string, redirectPath: string) => {
    if (!file) {
      setError("No file selected.");
      console.error("❌ Upload attempt without a file.");
      return;
    }

    setIsLoading(true);
    console.log("📤 Uploading file to:", endpoint);

    try {
      const formData = new FormData();
      formData.append("file", file);

      console.log("📡 Sending file:", file.name, "to", endpoint);

      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to process file.");
      }

      const result = await response.json();
      console.log("✅ Server response:", result);

      if (result.tunedResume) {
        console.log("📝 AI edited resume received. Navigating to:", redirectPath);
        handleNavigation(redirectPath, {
          fileName: file.name,
          tunedResume: encodeURIComponent(result.tunedResume),
        });
      } else {
        throw new Error("AI processing failed. No tuned resume received.");
      }
    } catch (err) {
      setError((err as Error).message);
      console.error("❌ Upload error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-16 md:py-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-3xl mx-auto text-center space-y-6 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Upload or Edit Your Resume
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Upload your resume in LaTeX, DOCX, or MD format to get started.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {["Upload", "Edit with AI"].map((action) => (
          <motion.div key={action} whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>{action} Resume</CardTitle>
                <CardDescription>
                  {action === "Upload"
                    ? "Choose a file to upload."
                    : "Let AI enhance your resume."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <Label htmlFor={action}>{`${action} File`}</Label>
                  <Input id={action} type="file" accept=".tex,.docx,.md" onChange={handleFileChange} />
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  {file && !error && (
                    <Alert>
                      <FileType className="h-4 w-4" />
                      <AlertTitle>File selected</AlertTitle>
                      <AlertDescription>{file.name}</AlertDescription>
                    </Alert>
                  )}
                  <Button
                    onClick={() =>
                      uploadFile(
                        action === "Upload" ? "/api/upload-resume" : "/api/ai-resume-edit",
                        action === "Upload" ? "/edit-resume" : "/ai-edit"
                      )
                    }
                    disabled={!file || isLoading}
                  >
                    {isLoading ? "Processing..." : (
                      <>
                        {action === "Upload" ? (
                          <Upload className="mr-2 h-4 w-4" />
                        ) : (
                          <Wand2 className="mr-2 h-4 w-4" />
                        )}
                        {action} Resume
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
