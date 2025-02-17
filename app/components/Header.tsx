"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "./Button"
import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme")
    if (storedTheme) {
      setIsDarkMode(storedTheme === "dark")
      document.documentElement.classList.toggle("dark", storedTheme === "dark")
    } else {
      document.documentElement.classList.toggle("dark", isDarkMode)
    }
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev)
    localStorage.setItem("theme", isDarkMode ? "light" : "dark")
    document.documentElement.classList.toggle("dark", !isDarkMode)
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full py-4 px-6 bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          ResumeAI
        </Link>
        <nav>
          <ul className="flex space-x-6 items-center">
            <li>
              <Link href="/templates" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 hover:underline">
                Templates
              </Link>
            </li>

            <li>
              <Link href="/about" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 hover:underline">
                About
              </Link>
            </li>
            <li>
              <Button text="Sign In" href="/signin" variant="secondary" size="small" />
            </li>
            <li>
              <Button text="Sign Up" href="/signup" size="small" />
            </li>
            <li className="ml-auto">
              <motion.button
                onClick={toggleTheme}
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle Theme"
              >
                {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
              </motion.button>
            </li>
          </ul>
        </nav>
      </div>
    </motion.header>
  )
}
