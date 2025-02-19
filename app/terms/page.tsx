"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

const terms = [
  {
    title: "Use of Service",
    content: "Our platform allows users to create, edit, and download resumes.",
  },
  {
    title: "User Responsibilities",
    content: "Users must not upload offensive or copyrighted content without permission.",
  },
  {
    title: "Account Termination",
    content: "We reserve the right to terminate accounts that violate our policies.",
  },
  {
    title: "Limitation of Liability",
    content: "We are not responsible for job application outcomes based on our generated resumes.",
  },
  {
    title: "Changes to Terms",
    content: "We may update these terms, and continued use means you accept the changes.",
  },
];

export default function TermsOfService() {
  const [openSection, setOpenSection] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="container mx-auto px-6 py-12 max-w-3xl"
    >
      {/* Hero Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Terms of Service</h1>
        <p className="text-gray-600 mt-2 text-lg">
          By using CV Master AI, you agree to the following terms.
        </p>
      </div>

      {/* Collapsible Sections */}
      <div className="space-y-4">
        {terms.map((term, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-transform"
          >
            <button
              onClick={() => setOpenSection(openSection === index ? null : index)}
              className="flex justify-between items-center w-full px-5 py-4 bg-gray-100 hover:bg-gray-200 transition-colors duration-300 rounded-lg"
            >
              <span className="text-lg font-semibold text-gray-900">{`${index + 1}. ${term.title}`}</span>
              {openSection === index ? (
                <ChevronUp className="w-6 h-6 text-gray-600" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-600" />
              )}
            </button>

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={openSection === index ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`overflow-hidden`}
            >
              <div className="px-5 py-4 text-gray-700">{term.content}</div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
