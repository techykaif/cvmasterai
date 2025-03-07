"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AiEdit() {
  const [loading, setLoading] = useState(false);
  const [resumeContent, setResumeContent] = useState<string | null>(null);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const fileName = searchParams.get("fileName");

  useEffect(() => {
    const fetchEditedResume = async () => {
      if (!fileName) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/ai-resume-edit?fileName=${encodeURIComponent(fileName)}`);
        const data = await response.json();

        if (response.ok) {
          setResumeContent(data.editedContent || "No edits found.");
          setDownloadLink(data.downloadUrl);
        } else {
          setResumeContent("Failed to load resume edits.");
        }
      } catch (error) {
        console.error("Error fetching edited resume:", error);
        setResumeContent("An error occurred while fetching the resume.");
      } finally {
        setLoading(false);
      }
    };

    fetchEditedResume();
  }, [fileName]);

  const handleBack = () => {
    router.push("/");
  };

  const handleDownload = () => {
    if (downloadLink) {
      router.push(downloadLink); // Navigates to the file URL for download
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
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          AI Resume Editor
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Your resume has been processed by AI. Fine-tune the edits or download the updated version.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Resume Edits</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading AI edits...</p>
          ) : (
            <pre className="whitespace-pre-wrap text-muted-foreground">{resumeContent}</pre>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-center mt-8 space-x-4">
        <Button onClick={handleBack}>Back to Home</Button>
        <Button variant="secondary" onClick={handleDownload} disabled={!downloadLink || loading}>
          Download Resume
        </Button>
      </div>
    </motion.div>
  );
}
