"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown } from "lucide-react"
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth"
import { app } from "@/app/firebaseConfig"
import { Button } from "@/app/components/Button"
import { MotionButton } from "@/app/components/ui/MotionButton"

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
      className="w-full py-4 px-4 sm:px-6 sticky top-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-xl border-b border-border/40"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center h-12">
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
            <img src="/icon.jpg" alt="CV Master AI Logo" className="w-9 h-9 rounded-full shadow-sm border border-border/50 group-hover:shadow-indigo-500/25 transition-all duration-300 object-cover" />
          </motion.div>
          <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="text-xl font-bold text-foreground">
            CV Master<span className="text-indigo-600">AI</span>
          </motion.span>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex space-x-1 items-center bg-secondary/30 rounded-full px-2 py-1.5 border border-border/50">
            <NavLink href="/templates">Templates</NavLink>
            <NavLink href="/about">About</NavLink>
            
            <li className="w-px h-5 bg-border mx-2" />

            {user ? (
              <li className="relative pl-1">
                <div className="flex items-center space-x-2 cursor-pointer px-3 py-1.5 rounded-full hover:bg-secondary transition-colors" onClick={toggleDropdown}>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold shadow-sm">
                    {user.email?.[0]?.toUpperCase() || "U"}
                  </div>
                  <span className="text-sm font-medium text-foreground max-w-[120px] truncate">{user.email}</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground transition-colors" />
                </div>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: 5, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-3 w-52 bg-card shadow-xl shadow-black/5 rounded-2xl overflow-hidden border border-border p-1"
                    >
                      <DropdownItem href="/dashboard">Dashboard</DropdownItem>
                      <li className="border-t border-border mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left block px-3 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 hover:text-red-600 transition-colors"
                        >
                          {isLoading ? "Logging out..." : "Sign Out"}
                        </button>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <>
                <li className="pl-2 pr-1">
                  <Button text="Sign In" href="/signin" variant="custom" customStyles={{ backgroundColor: "transparent", textColor: "text-muted-foreground", hoverTextColor: "hover:text-foreground" }} size="small" />
                </li>
                <li>
                  <MotionButton label="Get Started" onClick={() => router.push("/signup")} className="px-4 py-2 text-sm" />
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
      <Link href={href} className="px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all block">
        {children}
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
