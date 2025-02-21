"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FileText, Palette, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateResume() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Create Your Resume
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Choose how you want to create your professional resume and stand out from the crowd
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Custom Resume Card */}
        <Card className="relative group hover:shadow-lg transition-shadow">
          <Link href="/create/custom" className="absolute inset-0">
            <span className="sr-only">Create custom resume</span>
          </Link>
          <CardHeader className="text-center pb-4">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Palette className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Create Custom</CardTitle>
            <CardDescription>Design your resume from scratch</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <ul className="text-sm text-muted-foreground space-y-2 mb-6">
              <li>Start with a blank canvas</li>
              <li>Full customization options</li>
              <li>AI-powered content suggestions</li>
              <li>Real-time preview</li>
            </ul>
            <Button className="w-full" variant="outline">
              Start Fresh
            </Button>
          </CardContent>
        </Card>

        {/* Templates Card */}
        <Card className="relative group hover:shadow-lg transition-shadow">
          <CardHeader className="text-center pb-4">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Use Template</CardTitle>
            <CardDescription>Choose from professional templates</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <ul className="text-sm text-muted-foreground space-y-2 mb-6">
              <li>Professional designs</li>
              <li>Industry-specific templates</li>
              <li>Easy customization</li>
              <li>ATS-friendly formats</li>
            </ul>
            <Button className="w-full" variant="outline" onClick={() => router.push("/templates")}>
              Browse Templates
            </Button>
          </CardContent>
        </Card>

        {/* AI-Powered Resume Card */}
        <Card className="relative group hover:shadow-lg transition-shadow">
          <CardHeader className="text-center pb-4">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">AI-Powered Resume</CardTitle>
            <CardDescription>Let AI build your resume in seconds</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <ul className="text-sm text-muted-foreground space-y-2 mb-6">
              <li>Smart AI suggestions</li>
              <li>Optimized for your industry</li>
              <li>Instant resume creation</li>
              <li>Customizable sections</li>
            </ul>
            <Button className="w-full" variant="outline" onClick={() => router.push("/create/ai")}> 
              Generate with AI
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}