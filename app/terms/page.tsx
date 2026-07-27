"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
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

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
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
            Terms of Service
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground">
            Terms and Conditions
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            By using CV Master AI, you agree to the following terms.
          </p>
        </div>

        <div className="space-y-4">
          {terms.map((term, index) => {
            const isOpen = openSection === index;
            return (
              <div
                key={index}
                className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden hover:shadow-md hover:border-primary/50 transition-all duration-300"
              >
                <button
                  onClick={() => toggleSection(index)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none group"
                >
                  <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {`${index + 1}. ${term.title}`}
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
                    <div className="px-6 pb-5 text-muted-foreground leading-relaxed">
                      {term.content}
                    </div>
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
