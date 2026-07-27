"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Home, PlusCircle, Upload, Settings, LogOut, ChevronLeft, ChevronRight } from "lucide-react"
import { getAuth, signOut } from "firebase/auth"
import { app } from "@/app/firebaseConfig"

const menuItems = [
  { icon: Home, label: "Home", href: "/dashboard" },
  { icon: PlusCircle, label: "Create", href: "/create" },
  { icon: Upload, label: "Upload", href: "/upload" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

export function Sidebar({ setIsLoggingOut }: { setIsLoggingOut: (value: boolean) => void }) {
  const [isOpen, setIsOpen] = useState(true)
  const [isLoggingOut, setLocalLoggingOut] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const auth = getAuth(app)

  const handleLogout = async () => {
    setIsLoggingOut(true) // Notify parent
    setLocalLoggingOut(true) // Trigger sidebar animation

    setTimeout(async () => {
      try {
        await signOut(auth)
        router.push("/signin")
      } catch (error) {
        console.error("Logout failed", error)
        setIsLoggingOut(false)
        setLocalLoggingOut(false)
      }
    }, 800)
  }

  const handleNavigation = (href: string) => {
    router.push(href)
  }

  return (
    <aside
      className={`bg-card text-foreground shadow-lg ${
        isOpen ? "w-64" : "w-20"
      } transition-all duration-300 ease-in-out border-r border-border flex flex-col relative z-20 ${
        isLoggingOut ? "opacity-50 translate-y-2" : "opacity-100"
      }`}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between min-h-[72px]">
        <div className={`flex items-center gap-3 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 hidden"}`}>
          <img src="/icon.jpg" alt="CV Master AI Logo" className="w-8 h-8 shrink-0 rounded-lg shadow-md shadow-primary/20" />
          <span className="font-semibold text-foreground whitespace-nowrap">CV Master AI</span>
        </div>
        
        {/* Collapse Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-1.5 rounded-lg bg-secondary text-muted-foreground hover:text-foreground hover:bg-accent transition-colors ${!isOpen ? "mx-auto" : ""}`}
        >
          {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation items */}
      <nav className="flex-grow px-3 py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <button
                  onClick={() => handleNavigation(item.href)}
                  className={`flex items-center gap-3 p-3 rounded-xl w-full text-left text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  } ${!isOpen ? "justify-center" : ""}`}
                >
                  <item.icon className={`w-5 h-5 shrink-0 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                  {isOpen && (
                    <span className="truncate">
                      {item.label}
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Logout button */}
      <div className="p-3 border-t border-border mt-auto">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 p-3 rounded-xl w-full text-left text-sm font-medium text-muted-foreground hover:bg-red-500/10 hover:text-red-500 transition-all duration-200 ${
            !isOpen ? "justify-center" : ""
          }`}
        >
          <LogOut className={`w-5 h-5 shrink-0 ${isLoggingOut ? "animate-pulse" : ""}`} />
          {isOpen && (
            <span className="truncate">
              Logout
            </span>
          )}
        </button>
      </div>
    </aside>
  )
}
