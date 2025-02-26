"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/app/components/Button";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { app } from "@/app/firebaseConfig";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [redirecting, setRedirecting] = useState<boolean>(false);

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setTimeout(() => setRedirecting(true), 800);
        setTimeout(() => router.push("/dashboard"), 2000);
      }
    });
    return () => unsubscribe();
  }, [auth, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setSuccess(`Welcome back, ${userCredential.user.email}!`);
      setTimeout(() => setRedirecting(true), 800);
      setTimeout(() => router.push("/dashboard"), 2000);
    } catch (err: any) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      setSuccess(`Signed in as ${result.user.displayName || "User"}!`);
      setTimeout(() => setRedirecting(true), 800);
      setTimeout(() => router.push("/dashboard"), 2000);
    } catch (err: any) {
      setError("Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (redirecting) {
    return (
      <motion.div
        className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="text-center"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1.2 }}
          transition={{ yoyo: Infinity, duration: 0.6 }}
        >
          <motion.div
            className="w-16 h-16 border-t-4 border-white rounded-full animate-spin mx-auto"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1 }}
          ></motion.div>
          <motion.p
            className="text-white text-xl font-semibold mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Redirecting to your dashboard...
          </motion.p>
        </motion.div>
      </motion.div>
    );
  }

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
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {success && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-500 text-sm mb-4"
            >
              {success}
            </motion.p>
          )}

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

          <div className="w-full flex justify-center">
            <Button text={loading ? "Signing In..." : "Sign In"} type="submit" className="w-3/4 py-2 text-lg" />
          </div>

          <div className="w-full text-center text-gray-600">
            <p className="text-sm">OR</p>
          </div>

          <div className="w-full flex justify-center">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-3/4 py-2 px-4 bg-white text-blue-500 border border-blue-500 rounded-lg shadow-md hover:bg-blue-50 hover:shadow-lg transition-all"
            >
              {loading ? "Signing in with Google..." : "Sign in with Google"}
            </button>
          </div>

          <div className="text-center w-full">
            <p className="text-sm text-gray-600">
              <Link href="/forgot-password" className="text-blue-500 hover:underline">
                Forgot Password?
              </Link>
            </p>
          </div>

          <div className="text-center w-full mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup" className="text-blue-500 hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </form>
      </motion.section>
    </div>
  );
};

export default SignIn;
