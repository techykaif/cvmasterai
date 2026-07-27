"use client";

import { useState } from "react";
import { ChevronDown, Mail } from "lucide-react";
import { motion } from "framer-motion";

const sections = [
  {
    title: "Information We Collect",
    content: "We may collect personal data such as name, email, and resume information.",
  },
  {
    title: "How We Use Your Information",
    content: "We use the information to improve our services, personalize user experiences, and provide customer support.",
  },
  {
    title: "Third-Party Sharing",
    content: "We do not sell your personal data. We may share it with trusted partners to enhance our services.",
  },
  {
    title: "Your Rights",
    content: "You can request data deletion or modification at any time.",
  },
  {
    title: "Contact Us",
    content: "For questions about our privacy policy, contact us at support@cvmasterai.com.",
  },
];

export default function PrivacyPolicy() {
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
            Privacy Policy
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground">
            How we handle your data
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Your privacy is our priority. Read how we protect your personal information.
          </p>
        </div>

        <div className="space-y-4 mb-16">
          {sections.map((section, index) => {
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
                    {section.title}
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
                      {section.content}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center bg-card rounded-3xl p-8 border border-border shadow-sm">
          <p className="text-foreground text-lg mb-4 font-medium">Have questions about our privacy practices?</p>
          <a
            href="mailto:support@cvmasterai.com"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-background border border-border text-primary font-medium hover:bg-secondary transition-all shadow-sm hover:shadow-md"
          >
            <Mail className="w-5 h-5 mr-2" /> support@cvmasterai.com
          </a>
        </div>
      </div>
    </motion.div>
  );
}
