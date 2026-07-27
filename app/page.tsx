"use client"

import { Button } from "./components/Button"
import FeatureCard from "./components/FeatureCard"
import TestimonialCard from "./components/TestimonialCard"
import { motion } from "framer-motion"
import { Typewriter } from "react-simple-typewriter"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import { ArrowRight, Zap } from "lucide-react"
import "swiper/css"
import "swiper/css/navigation"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-5xl text-center mt-12 mb-16 px-6"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6">
          <Zap className="w-3.5 h-3.5" />
          <span>Next-Gen Resume Building</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-tight">
          Ship a resume that <br className="hidden md:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
            <Typewriter
              words={["looks like you.", "beats the ATS.", "lands the job."]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Create, customize, and optimize your resume effortlessly using cutting-edge AI. Built for professionals who want to stand out.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button text="Start Building Free" href="/create" />
          <Button text="View Templates" href="/templates" variant="secondary" />
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-50px" }}
        className="w-full max-w-6xl px-6 mb-20"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-muted-foreground">Three simple steps to your next career move.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard icon="PenTool" title="Create or Upload" description="Start from scratch or upload your existing resume to get started instantly." />
          <FeatureCard icon="Cpu" title="AI Enhancement" description="Our AI analyzes and optimizes your content to match what recruiters want." />
          <FeatureCard icon="Download" title="Export & Apply" description="Download a pristine, ATS-friendly PDF and start applying with confidence." />
        </div>
      </motion.section>

      {/* AI-Powered Features Section */}
      <motion.section
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-50px" }}
        className="w-full max-w-6xl px-6 mb-20"
      >
        <div className="bg-card border border-border/50 shadow-sm py-14 px-6 md:px-12 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          
          <div className="text-center mb-10 relative z-10">
            <h2 className="text-3xl font-bold text-foreground mb-4">AI-Powered Features</h2>
            <p className="text-muted-foreground">Everything you need to bypass filters and impress humans.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <FeatureCard icon="FileText" title="Content Optimization" description="AI rewrites your bullet points to make them more impactful and metrics-driven." />
            <FeatureCard icon="Briefcase" title="Job Matching" description="Paste a job description and let AI tailor your resume to match it perfectly." />
            <FeatureCard icon="Layers" title="Crafted Layouts" description="Pixel-perfect templates designed by industry professionals for maximum readability." />
            <FeatureCard icon="Zap" title="Real-time Feedback" description="Get instant suggestions and ATS scoring as you build your resume." />
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-50px" }}
        className="w-full max-w-4xl px-6 mb-24"
      >
        <h2 className="text-3xl font-bold text-center text-foreground mb-10">What Our Users Say</h2>
        <div className="relative">
          <Swiper
            spaceBetween={24}
            slidesPerView={1}
            navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }}
            modules={[Navigation]}
            className="pb-12"
          >
            <SwiperSlide>
              <TestimonialCard
                quote="This AI builder helped me land my dream job! The suggestions were spot-on and really made my experience stand out."
                author="Sarah J., Software Engineer"
              />
            </SwiperSlide>
            <SwiperSlide>
              <TestimonialCard
                quote="I was skeptical at first, but the AI recommendations truly enhanced my resume. It's like having a professional resume writer."
                author="Michael T., Marketing Manager"
              />
            </SwiperSlide>
          </Swiper>
          {/* Custom Navigation */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4 z-10">
            <button className="prev-btn p-2 rounded-full border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-accent transition-colors shadow-sm">
              <ArrowRight className="w-5 h-5 rotate-180" />
            </button>
            <button className="next-btn p-2 rounded-full border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-accent transition-colors shadow-sm">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-50px" }}
        className="w-full max-w-3xl px-6 mb-24 text-center"
      >
        <h2 className="text-4xl font-bold text-foreground mb-4">Ready to Supercharge Your Career?</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Join thousands of job seekers who have already boosted their interview rates with our AI-powered resume builder.
        </p>
        <Button text="Get Started for Free" href="/create" />
      </motion.section>
    </div>
  )
}
