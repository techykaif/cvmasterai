"use client"

import Link from "next/link"

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      const start = window.scrollY
      const duration = 800 // Adjust duration for smoother scroll
      let startTime: number | null = null

      const easeOutCubic = (time: number) => 1 - Math.pow(1 - time, 3) // Smoother easing function

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

  return (
    <footer className="w-full bg-gray-900 text-white py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo and copyright */}
        <div className="text-center md:text-left">
          <Link href="/" className="text-2xl font-bold text-blue-500 hover:text-blue-400 transition-colors">
            CV Master AI
          </Link>
          <p className="text-sm text-gray-400 mt-2">
            © {new Date().getFullYear()} CV Master AI. All rights reserved.
          </p>
        </div>

        {/* Navigation links */}
        <nav>
          <ul className="flex flex-wrap justify-center space-x-6 text-sm">
            {[
              { href: "/privacy", label: "Privacy Policy" },
              { href: "/terms", label: "Terms of Service" },
              { href: "/contact", label: "Contact Us" },
              { href: "/faq", label: "FAQ" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-gray-400 hover:text-blue-400 transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Back to Top button */}
        <button
          onClick={scrollToTop}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded transition-transform transform hover:scale-105"
        >
          Back to Top ↑
        </button>
      </div>
    </footer>
  )
}
