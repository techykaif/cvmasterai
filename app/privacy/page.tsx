"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, Mail } from "lucide-react";
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="container mx-auto px-6 py-12 max-w-3xl"
    >
      {/* Hero Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
        <p className="text-gray-600 mt-2 text-lg">
          Your privacy is our priority. Read how we protect your data.
        </p>
      </div>

      {/* Collapsible Sections */}
      <div className="space-y-4">
        {sections.map((section, index) => (
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
              <span className="text-lg font-semibold text-gray-900">{section.title}</span>
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
              <div className="px-5 py-4 text-gray-700">{section.content}</div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-10 text-center"
      >
        <p className="text-gray-700 text-lg">For any concerns, reach out at:</p>
        <a
          href="mailto:support@cvmasterai.com"
          className="inline-flex items-center mt-3 text-blue-600 hover:underline"
        >
          <Mail className="w-5 h-5 mr-2" /> support@cvmasterai.com
        </a>
      </motion.div>
    </motion.div>
  );
}
