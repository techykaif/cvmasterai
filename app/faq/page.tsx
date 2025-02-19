"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What is CV Master AI?",
    answer: "CV Master AI is an AI-powered resume builder that helps you create professional resumes quickly and efficiently.",
  },
  {
    question: "Is CV Master AI free to use?",
    answer: "Yes, creating and editing a resume is free. However, some premium templates may require a small fee.",
  },
  {
    question: "Can I download my resume as a Word file?",
    answer: "Yes, you can download your resume in multiple formats including Word and PDF.",
  },
  {
    question: "How do I contact support?",
    answer: "You can reach out to our support team at support@cvmasterai.com.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="container mx-auto px-6 py-12 max-w-3xl"
    >
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
        Frequently Asked Questions
      </h1>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
            className="bg-white p-5 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-transform"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                {faq.question}
              </h2>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </div>

            {openIndex === index && (
              <motion.p
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-gray-700 mt-3"
              >
                {faq.answer}
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
