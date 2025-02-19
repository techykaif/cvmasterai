"use client";
import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="container mx-auto px-6 py-12 max-w-3xl"
    >
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
        <p className="text-gray-600 mt-2 text-lg">
          Have a question? Fill out the form below or email us at
        </p>
        <a
          href="mailto:support@cvmasterai.com"
          className="inline-flex items-center mt-3 text-blue-600 hover:underline"
        >
          <Mail className="w-5 h-5 mr-2" /> support@cvmasterai.com
        </a>
      </div>

      {/* Contact Form */}
      <motion.form
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        className="bg-white p-6 md:p-8 rounded-xl shadow-2xl transform transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
      >
        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium">
            Name
          </label>
          <motion.input
            whileFocus={{ scale: 1.02, borderColor: "#2563eb" }}
            type="text"
            id="name"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
            placeholder="Enter your name"
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium">
            Email
          </label>
          <motion.input
            whileFocus={{ scale: 1.02, borderColor: "#2563eb" }}
            type="email"
            id="email"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
            placeholder="Enter your email"
          />
        </div>

        {/* Message Field */}
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 font-medium">
            Message
          </label>
          <motion.textarea
            whileFocus={{ scale: 1.02, borderColor: "#2563eb" }}
            id="message"
            required
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:border-blue-500 focus:ring focus:ring-blue-200 transition resize-none"
            placeholder="Your message"
          ></motion.textarea>
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold shadow-md hover:shadow-lg"
        >
          Send Message
        </motion.button>
      </motion.form>
    </motion.div>
  );
}
