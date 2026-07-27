"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background relative overflow-hidden"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="container mx-auto px-6 py-16 max-w-3xl">
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            FAQ
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Everything you need to know about the product and billing.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden hover:shadow-md hover:border-primary/50 transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none group"
                >
                  <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground group-hover:text-primary transition-all duration-300 flex-shrink-0 ml-4 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
