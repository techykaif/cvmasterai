"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown } from "lucide-react"
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth"
import { app } from "@/app/firebaseConfig"
import { Button } from "@/app/components/Button"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<{ email: string | null } | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isAuthChecked, setIsAuthChecked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()
  const pathname = usePathname() // Track the current route

  const auth = getAuth(app)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ? { email: user.email } : null)
      setIsAuthChecked(true)
      setIsLoading(false)
    })
    return () => unsubscribe()
  }, [auth])

  // Close menus when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsDropdownOpen(false)
  }, [pathname])

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev)
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev)

  const handleLogout = async () => {
    try {
      setIsLoading(true)
      await signOut(auth)
      setUser(null)
      router.push("/signin")
    } catch (error) {
      console.error("Logout failed", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isAuthChecked) {
    return <Loader />
  }

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

        <nav className="hidden md:block">
          <ul className="flex space-x-6 items-center">
            <NavLink href="/templates">Templates</NavLink>
            <NavLink href="/about">About</NavLink>
            {user ? (
              <li className="relative">
                <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleDropdown}>
                  <span className="text-muted-foreground">{user.email}</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
                </div>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-6 w-48 bg-background shadow-lg rounded-lg overflow-hidden"
                    >
                      <DropdownItem href="/dashboard">Dashboard</DropdownItem>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left block px-4 py-2 hover:bg-primary/20 transition-colors"
                        >
                          {isLoading ? "Logging out..." : "Logout"}
                        </button>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <>
                <li>
                  <Button text="Sign In" href="/signin" variant="secondary" size="small" />
                </li>
                <li>
                  <Button text="Sign Up" href="/signup" size="small" />
                </li>
              </>
            )}
          </ul>
        </nav>

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

      <AnimatePresence>
        {isMobileMenuOpen && <MobileMenu user={user} handleLogout={handleLogout} />}
      </AnimatePresence>
    </motion.header>
  )
}

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

function DropdownItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="block px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-primary/20 hover:text-primary cursor-pointer"
      >
        {children}
      </Link>
    </li>
  )
}

function MobileMenu({ user, handleLogout }: any) {
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
          <MobileNavLink href="/templates">Templates</MobileNavLink>
          <MobileNavLink href="/about">About</MobileNavLink>
          {user ? (
            <>
              <MobileNavLink href="/dashboard">Dashboard</MobileNavLink>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-muted-foreground hover:text-primary block py-2 transition-colors w-full text-left"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Button text="Sign In" href="/signin" variant="secondary" size="small" />
              </li>
              <li>
                <Button text="Sign Up" href="/signup" size="small" />
              </li>
            </>
          )}
        </ul>
      </nav>
    </motion.div>
  )
}

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.li whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
      <Link href={href} className="text-muted-foreground hover:text-primary block py-2 transition-colors">
        {children}
      </Link>
    </motion.li>
  )
}

function Loader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 flex justify-center items-center bg-background/80 backdrop-blur-lg z-50"
    >
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </motion.div>
  )
}
