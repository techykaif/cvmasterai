"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { KeyRound, Mail, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="max-w-md w-full space-y-8">
        <div className="bg-card rounded-3xl border border-border shadow-sm p-8 md:p-10 relative">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <KeyRound className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Reset Password</h2>
            <p className="mt-3 text-muted-foreground">
              Enter your email and we'll send you a link to reset your password.
            </p>
          </div>

          {!submitted ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-foreground"
                    placeholder="Email address"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-full bg-primary text-primary-foreground font-medium shadow-md hover:bg-primary/90 hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-0.5"
                >
                  {loading ? "Sending link..." : "Send Reset Link"}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <div className="bg-green-500/10 text-green-600 rounded-2xl p-4 font-medium text-sm border border-green-500/20">
                Check your email! We've sent a password reset link to {email}.
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="text-sm font-medium text-primary hover:underline"
              >
                Didn't receive it? Try again
              </button>
            </div>
          )}
          
          <div className="mt-8 text-center text-sm">
            <Link href="/signin" className="inline-flex items-center font-medium text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sign in
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
