"use client";

import { motion } from "framer-motion";
import { FileText, Sparkles, Upload, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth, db } from "@/app/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function CreatePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateScratch = async () => {
    setError(null);
    console.log("[Create Flow] Started");

    if (!auth?.currentUser) {
      console.log("[Create Flow] auth.currentUser is null, redirecting...");
      router.push("/signin?redirected=true");
      return;
    }

    console.log("[Create Flow] Auth user present:", auth.currentUser.uid);
    setLoading(true);

    try {
      const user = auth.currentUser;
      const collectionRef = collection(db, "users", user.uid, "resumes");
      console.log("[Create Flow] About to create Firestore document in:", collectionRef.path);

      const payload = {
        templateId: "minimal-impact",
        name: "Untitled Resume",
        updatedAt: serverTimestamp(),
        personal: {
          name: "", title: "", email: "", phone: "", website: "", address: "", summary: ""
        },
        experience: [],
        education: [],
        skills: ""
      };

      const addDocPromise = addDoc(collectionRef, payload);
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("addDoc timeout: Firebase operation hung for 10s")), 10000)
      );

      const docRef = await Promise.race([addDocPromise, timeoutPromise]) as any;
      console.log("[Create Flow] Firestore document created successfully. resumeId:", docRef.id);

      const targetUrl = `/editor/minimal-impact?resumeId=${docRef.id}`;
      console.log("[Create Flow] About to navigate to:", targetUrl);
      router.push(targetUrl);
      console.log("[Create Flow] Navigation triggered.");

    } catch (err: any) {
      console.error("[Create Flow] Error creating resume:", err);
      const errorMessage = err?.message || "Failed to create resume.";
      setError(`Unable to create your resume: ${errorMessage}`);
      setLoading(false);
    }
    // We do NOT use finally { setLoading(false) } here because router.push is asynchronous
    // and does not return a Promise. If we reset loading to false here, the button will
    // re-enable BEFORE the page navigates, allowing duplicate clicks and creating a stale UI state.
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
              onClick={handleCreateScratch}
              disabled={loading}
              className="w-full py-3 px-4 rounded-full text-foreground font-medium bg-secondary hover:bg-secondary/80 border border-border transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Custom"
              )}
            </button>
            {error && (
              <p className="mt-3 text-sm text-red-500 font-medium">
                {error}
              </p>
            )}
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
