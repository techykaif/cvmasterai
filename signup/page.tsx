"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/app/components/Button";

const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle your signup logic here (API call, validation, etc.)
    console.log("Name:", name, "Email:", email, "Phone:", phone, "Password:", password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-16 bg-gray-50">
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-6">
          Create Your Account
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Fill in the details to create your account and start building your dream resume with AI-powered features.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 transform transition-all duration-500 ease-in-out hover:scale-105"
      >
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6">
          {/* Name Field */}
          <div className="w-full">
            <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email Field */}
          <div className="w-full">
            <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Phone Number Field */}
          <div className="w-full">
            <label htmlFor="phone" className="block text-lg font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className="w-full">
            <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password Field */}
          <div className="w-full">
            <label htmlFor="confirmPassword" className="block text-lg font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Sign Up Button */}
          <div className="w-full flex justify-center">
            <Button text="Sign Up" type="submit" className="w-full sm:w-1/2 py-3 mt-4" />
          </div>

          {/* OR Divider */}
          <div className="w-full text-center text-gray-600">
            <p className="text-sm">OR</p>
          </div>

          {/* Google Sign-In Button */}
         <div className="w-full flex justify-center">
            <button className="w-3/4 py-2 px-4 bg-white text-blue-500 border border-blue-500 rounded-lg shadow-md hover:bg-blue-50 hover:shadow-lg transition-all">
              Sign up with Google
            </button>
          </div>

          {/* Already have an account? */}
          <div className="mt-4 text-center w-full">
            <p className="text-sm text-gray-600">
              Already have an account? <Link href="/signin" className="text-blue-500">Sign In</Link>
            </p>
          </div>
        </form>
      </motion.section>
    </div>
  );
};

export default SignUp;
