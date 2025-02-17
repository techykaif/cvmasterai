"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-br from-blue-50 to-purple-100"
    >
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 drop-shadow-lg mb-6"
      >
        About Us
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-xl text-gray-700 max-w-3xl text-center mb-8 leading-relaxed"
      >
        Our AI-powered resume builder helps job seekers create, optimize, and enhance resumes effortlessly. 
        Whether you're starting from scratch or refining your existing resume, our AI-driven features 
        ensure that you stand out in the job market.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Link
          href="/"
          className="text-lg font-semibold text-white bg-blue-600 px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          ← Back to Home
        </Link>
      </motion.div>
    </motion.div>
  )
}
