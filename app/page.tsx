"use client"

import { Button } from "./components/Button"
import FeatureCard from "./components/FeatureCard"
import TestimonialCard from "./components/TestimonialCard"
import { motion } from "framer-motion"
import { Typewriter } from "react-simple-typewriter"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center px-6">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mt-20 mb-16"
      >
        {/* Fixed width to prevent layout shift */}
        <h1
          className="text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow-lg mb-6 animate-glow"
          style={{ minHeight: "80px" }} // Prevents layout shifts
        >
          <Typewriter
            words={["AI-Powered Resume Builder", "Optimize Your Resume Instantly", "Land Your Dream Job"]}
            loop={true}
          />
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Create, customize, and optimize your resume effortlessly using cutting-edge AI technology. Stand out from the
          crowd and land your dream job!
        </p>
        <div className="flex gap-6 justify-center">
          <Button text="Create New Resume" href="/create" />
          <Button text="Upload Resume" href="/upload" variant="secondary" />
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full max-w-5xl mb-16"
      >
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard icon="PenTool" title="Create or Upload" description="Start from scratch or upload your existing resume to get started." />
          <FeatureCard icon="Cpu" title="AI Enhancement" description="Our AI analyzes and optimizes your resume for maximum impact." />
          <FeatureCard icon="Download" title="Export & Apply" description="Download your polished resume in multiple formats and start applying!" />
        </div>
      </motion.section>

      {/* AI-Powered Features Section */}
      <motion.section
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full max-w-5xl mb-16 bg-gray-50 py-12 px-6 rounded-lg"
      >
        <h2 className="text-3xl font-bold text-center mb-8">AI-Powered Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FeatureCard icon="FileText" title="Content Optimization" description="AI suggests improvements to make your resume more impactful and ATS-friendly." />
          <FeatureCard icon="Briefcase" title="Job Matching" description="Our AI matches your skills and experience with job descriptions for better targeting." />
          <FeatureCard icon="Layers" title="Design Customization" description="AI-powered design suggestions to make your resume visually appealing and professional." />
          <FeatureCard icon="Zap" title="Instant Feedback" description="Get real-time suggestions and improvements as you build your resume." />
        </div>
      </motion.section>

      {/* Testimonials Section (Auto-Scrolling with Navigation Buttons) */}
      <motion.section
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full max-w-5xl mb-16"
      >
        <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }}
          modules={[Navigation]}
          autoplay={{ delay: 3000 }}
        >
          <SwiperSlide>
            <TestimonialCard
              quote="This AI-powered resume builder helped me land my dream job! The suggestions were spot-on and really made my resume stand out."
              author="Sarah J., Software Engineer"
            />
          </SwiperSlide>
          <SwiperSlide>
            <TestimonialCard
              quote="I was skeptical at first, but the AI recommendations truly enhanced my resume. It's like having a professional resume writer at your fingertips!"
              author="Michael T., Marketing Manager"
            />
          </SwiperSlide>
        </Swiper>
        {/* Navigation Buttons */}
        <div className="flex justify-center gap-6 mt-6">
          {/* Previous Button */}
          <button
            className="prev-btn px-3 py-2 bg-blue-400 text-white rounded-full transform transition-all duration-300 ease-in-out hover:bg-blue-700 hover:scale-105 focus:outline-none shadow-md"
            style={{ fontSize: "1.2rem" }}
          >
            ←
          </button>

          {/* Next Button */}
          <button
            className="next-btn px-3 py-2 bg-blue-400 text-white rounded-full transform transition-all duration-300 ease-in-out hover:bg-blue-700 hover:scale-105 focus:outline-none shadow-md"
            style={{ fontSize: "1.2rem" }}
          >
            →
          </button>
        </div>



      </motion.section>

      {/* Call-to-Action Section */}
      <motion.section
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full max-w-3xl mb-20 text-center"
      >
        <h2 className="text-3xl font-bold mb-6">Ready to Supercharge Your Resume?</h2>
        <p className="text-xl text-gray-600 mb-8">
          Join thousands of job seekers who have already boosted their careers with our AI-powered resume builder.
        </p>
        <Button text="Get Started Now" href="/create" size="medium" />
      </motion.section>
    </div>
  )
}
