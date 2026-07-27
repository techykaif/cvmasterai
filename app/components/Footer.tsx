"use client"

import Link from "next/link"
import { Sparkles, ArrowUp, Github, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      const start = window.scrollY
      const duration = 800
      let startTime: number | null = null

      const easeOutCubic = (time: number) => 1 - Math.pow(1 - time, 3)

      const animation = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / duration, 1)
        const easedProgress = easeOutCubic(progress)

        window.scrollTo(0, start * (1 - easedProgress))

        if (timeElapsed < duration) {
          requestAnimationFrame(animation)
        }
      }

      requestAnimationFrame(animation)
    }
  }

  const footerLinks = {
    Product: [
      { href: "/create", label: "Create Resume" },
      { href: "/templates", label: "Templates" },
      { href: "/upload", label: "Upload Resume" },
      { href: "/faq", label: "FAQ" },
    ],
    Company: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  }

  return (
    <footer className="w-full bg-gray-950 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-4">
              <img src="/icon.jpg" alt="CV Master AI Logo" className="w-8 h-8 rounded-lg shadow-sm" />
              <span className="text-xl font-bold text-white">
                CV Master<span className="text-indigo-400">AI</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed mb-6">
              Build professional, ATS-optimized resumes in minutes with the power of AI.
              Your next career move starts here.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Twitter, label: "Twitter" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Github, label: "GitHub" },
              ].map((social) => (
                <button
                  key={social.label}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-xl bg-gray-800/80 hover:bg-indigo-600 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-indigo-400 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} CV Master AI. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-indigo-400 transition-colors group"
          >
            Back to top
            <span className="w-7 h-7 rounded-lg bg-gray-800 group-hover:bg-indigo-600 flex items-center justify-center transition-all duration-300">
              <ArrowUp className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  )
}
