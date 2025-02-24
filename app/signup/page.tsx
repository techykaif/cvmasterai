"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { auth, googleProvider } from "@/app/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { Button } from "@/app/components/Button";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  // 🔒 Password Validator
  const checkPasswordStrength = (password: string) => {
    if (password.length < 6) {
      setPasswordStrength("Too short");
    } else if (password.match(/[A-Za-z]/) && password.match(/[0-9]/)) {
      setPasswordStrength("Strong");
    } else {
      setPasswordStrength("Weak");
    }
  };

  // 🎯 Email/Password Sign-Up
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      alert("Sign-up successful! 🎉");
    } catch (err: any) {
      handleFirebaseError(err.code);
    } finally {
      setLoading(false);
    }
  };

  // 🌐 Google Sign-In
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");

    try {
      await signInWithPopup(auth, googleProvider);
      alert("Google Sign-In successful! 🚀");
    } catch (err: any) {
      handleFirebaseError(err.code);
    } finally {
      setLoading(false);
    }
  };

  // 🛡️ Simplified Firebase Error Messages
  const handleFirebaseError = (code: string) => {
    const errorMessages: { [key: string]: string } = {
      "auth/email-already-in-use": "Email is already in use.",
      "auth/invalid-email": "Invalid email format.",
      "auth/weak-password": "Password is too weak.",
      "auth/network-request-failed": "Network error. Please try again.",
    };

    setError(errorMessages[code] || "An unexpected error occurred.");
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
          Join us and build your AI-powered resume today!
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 transform transition-all duration-500 ease-in-out hover:scale-105"
      >
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSignUp} className="flex flex-col space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-lg font-medium text-gray-700 mb-2">
              Phone Number 
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
  <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">
    Password
  </label>
  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      id="password"
      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
      value={password}
      onChange={(e) => {
        setPassword(e.target.value);
        checkPasswordStrength(e.target.value);
      }}
      required
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute top-3 right-3 text-sm text-blue-500"
    >
      {showPassword ? "Hide" : "Show"}
    </button>
  </div>
  {password && (
    <p
      className={`text-sm mt-2 ${
        passwordStrength === "Strong" ? "text-green-500" : "text-red-500"
      }`}
    >
      Strength: {passwordStrength}
    </p>
  )}
</div>


          <div>
            <label htmlFor="confirmPassword" className="block text-lg font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <Button text={loading ? "Signing Up..." : "Sign Up"} type="submit" disabled={loading} className="w-full py-3" />

          <p className="text-center text-gray-600">OR</p>

          <button
            onClick={handleGoogleSignIn}
            className="w-full py-3 text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-50"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign up with Google"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/signin" className="text-blue-500">
              Sign In
            </Link>
          </p>
        </form>
      </motion.section>
    </div>
  );
};

export default SignUp;
