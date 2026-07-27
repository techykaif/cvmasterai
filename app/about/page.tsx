"use client";

import { motion } from "framer-motion";
import { Lightbulb, Shield, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { InteractiveHoverButton } from "../components/ui/InteractiveHoverButton";

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background relative overflow-hidden"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="container mx-auto px-6 py-16 max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            About Us
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground">
            Empowering Your Career Journey
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            We believe everyone deserves a resume that truly reflects their potential. Our platform makes professional resume creation effortless and accessible.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-card rounded-3xl border border-border shadow-sm p-8 md:p-12 mb-16 text-center hover:shadow-lg hover:border-primary/50 transition-all duration-500">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Our Mission</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            To level the playing field in the job market by providing intelligent, intuitive tools that help job seekers stand out to employers and land their dream roles.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-card rounded-3xl border border-border shadow-sm p-8 hover:shadow-lg hover:-translate-y-1 hover:border-primary/50 transition-all duration-500 group">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-500">
              <Lightbulb className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Innovation</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              We leverage cutting-edge technology to analyze industry trends and help generate highly effective resume content.
            </p>
          </div>

          <div className="bg-card rounded-3xl border border-border shadow-sm p-8 hover:shadow-lg hover:-translate-y-1 hover:border-primary/50 transition-all duration-500 group">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-500">
              <Shield className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Privacy</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Your data belongs to you. We maintain strict security protocols to ensure your personal information remains confidential.
            </p>
          </div>

          <div className="bg-card rounded-3xl border border-border shadow-sm p-8 hover:shadow-lg hover:-translate-y-1 hover:border-primary/50 transition-all duration-500 group">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-500">
              <Zap className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Simplicity</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              We've stripped away the complexity. Our clean, intuitive interface lets you focus on what matters: your accomplishments.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mb-8 flex justify-center">
          <InteractiveHoverButton 
            text="Build Your Resume" 
            onClick={() => window.location.href = "/create"}
          />
        </div>
      </div>
    </motion.div>
  );
}
