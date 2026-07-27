"use client";

import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { InteractiveHoverButton } from "../components/ui/InteractiveHoverButton";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      window.location.href = "mailto:support@cvmasterai.com";
    }, 500);
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

      <div className="container mx-auto px-6 py-16 max-w-5xl">
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Get in Touch
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground">
            We'd Love to Hear From You
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Have a question about our resume builder or need help with your account? Our team is here to support your career journey.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Contact Info (2 columns) */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-card rounded-3xl border border-border shadow-sm p-8 hover:shadow-lg hover:border-primary/50 transition-all duration-300 group">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-500">
                <Mail className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1">Email Us</h3>
              <p className="text-muted-foreground mb-3 text-sm">Our friendly team is here to help.</p>
              <a href="mailto:support@cvmasterai.com" className="text-primary font-medium hover:underline">
                support@cvmasterai.com
              </a>
            </div>

            <div className="bg-card rounded-3xl border border-border shadow-sm p-8 hover:shadow-lg hover:border-primary/50 transition-all duration-300 group">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-500">
                <MapPin className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1">Visit Us</h3>
              <p className="text-muted-foreground mb-3 text-sm">Come say hello at our office HQ.</p>
              <p className="text-foreground font-medium">
                100 Innovation Way<br />
                San Francisco, CA 94105
              </p>
            </div>
          </div>

          {/* Contact Form (3 columns) */}
          <div className="md:col-span-3">
            <div className="bg-card rounded-3xl border border-border shadow-sm p-8 md:p-10">
              <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">First Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-foreground"
                      placeholder="Jane"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-foreground"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-foreground"
                    placeholder="jane@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Message</label>
                  <textarea 
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-foreground resize-none"
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                </div>

                <InteractiveHoverButton
                  type="submit"
                  disabled={isSubmitting}
                  text={isSubmitting ? "Sending..." : "Send Message"}
                  className="w-full"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
