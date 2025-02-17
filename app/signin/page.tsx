"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/app/components/Button";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle your authentication logic here (API call, validation, etc.)
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8 md:py-16">
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-6">
          Sign In to Your Account
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-1">
          Enter your credentials to access your AI-powered resume builder and start creating your dream resume.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-white rounded-lg shadow-xl p-8"
      >
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6">
          <div className="w-full">
            <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="w-full">
            <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Sign In Button */}
          <div className="w-full flex justify-center">
            <Button text="Sign In" type="submit" className="w-3/4 py-2 text-lg" />
          </div>

          {/* OR Divider */}
          <div className="w-full text-center text-gray-600">
            <p className="text-sm">OR</p>
          </div>

          {/* Google Sign-In Button */}
          <div className="w-full flex justify-center">
            <button className="w-3/4 py-2 px-4 bg-white text-blue-500 border border-blue-500 rounded-lg shadow-md hover:bg-blue-50 hover:shadow-lg transition-all">
              Sign in with Google
            </button>
          </div>

          {/* Forgot Password Option */}
          <div className="text-center w-full">
            <p className="text-sm text-gray-600">
              <Link href="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</Link>
            </p>
          </div>
        </form>
      </motion.section>
    </div>
  );
};

export default SignIn;
