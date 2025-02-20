"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/app/components/Button"


export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev)

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-full py-4 px-4 sm:px-6 bg-background/80 backdrop-blur-md sticky top-0 z-50 shadow-lg"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            CV Master AI
          </motion.span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6 items-center">
            <NavItems />
          </ul>
        </nav>

        {/* Mobile Menu */}
        <div className="flex items-center md:hidden">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleMobileMenu}
            className="ml-4 text-foreground p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>{isMobileMenuOpen && <MobileMenu toggleMobileMenu={toggleMobileMenu} />}</AnimatePresence>
    </motion.header>
  )
}

// Navigation Items
function NavItems() {
  return (
    <>
      <NavLink href="/templates">Templates</NavLink>
      <NavLink href="/about">About</NavLink>
      <li>
      <Button text="Sign In" href="/signin" variant="secondary" size="small" />
      </li>
      <li>
      <Button text="Sign Up" href="/signup" size="small" />
      </li>
    </>
  )
}

// Individual Nav Link
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-muted-foreground hover:text-primary transition-colors">
        <motion.span whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
          {children}
        </motion.span>
      </Link>
    </li>
  )
}

// Mobile Menu Component
function MobileMenu({ toggleMobileMenu }: { toggleMobileMenu: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="md:hidden overflow-hidden bg-background/95 backdrop-blur-md shadow-lg"
    >
      <nav className="p-4">
        <ul className="flex flex-col space-y-4">
          <MobileNavLink href="/templates" onClick={toggleMobileMenu}>
            Templates
          </MobileNavLink>
          <MobileNavLink href="/about" onClick={toggleMobileMenu}>
            About
          </MobileNavLink>
          <li>
          <Button text="Sign In" href="/signin" variant="secondary" size="small" />
          </li>
          <li>
          <Button text="Sign Up" href="/signup" size="small" />
          </li>
        </ul>
      </nav>
    </motion.div>
  )
}

// Mobile Nav Links
function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <motion.li whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
      <Link
        href={href}
        className="text-muted-foreground hover:text-primary block py-2 transition-colors"
        onClick={onClick}
      >
        {children}
      </Link>
    </motion.li>
  )
}