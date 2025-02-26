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
      className={`bg-gray-900 text-white shadow-lg ${
        isOpen ? "w-64" : "w-20"
      } transition-all duration-300 ease-in-out rounded-r-lg overflow-hidden ${
        isLoggingOut ? "opacity-50 translate-y-2" : "opacity-100"
      }`}
    >
      <div className="p-4 flex flex-col h-full">

        {/* Collapse Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-blue-400 hover:text-blue-500 transition-colors text-lg mb-6 self-start flex items-center gap-2"
        >
          {isOpen ? <ChevronLeft className="w-5 h-5 rotate-180 transition-transform duration-300" /> : <ChevronRight className="w-5 h-5 transition-transform duration-300" />}
          {isOpen && <span className="transition-opacity duration-300 ease-in-out opacity-100">Collapse</span>}
        </button>

        {/* Navigation items */}
        <nav className="flex-grow">
          <ul>
            {menuItems.map((item) => (
              <li key={item.href} className="mb-3">
                <button
                  onClick={() => handleNavigation(item.href)}
                  className={`flex items-center gap-4 p-3 rounded-lg w-full text-left text-sm font-medium transition-all duration-300 ${
                    pathname === item.href
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <item.icon className={`w-6 h-6 transform transition-transform duration-300 ${pathname === item.href ? "scale-110" : ""}`} />
                  <span className={`transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-100" : "opacity-0 hidden"}`}>
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout button */}
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-4 p-3 rounded-lg w-full text-left text-sm font-medium hover:bg-red-600 transition-all duration-300 ${
              isLoggingOut ? "opacity-50 translate-y-2" : "opacity-100"
            }`}
          >
            <LogOut className={`w-6 h-6 transform transition-transform duration-300 ${isLoggingOut ? "rotate-90" : "hover:rotate-12"}`} />
            <span className={`transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-100" : "opacity-0 hidden"}`}>
              Logout
            </span>
          </button>
        </div>
      </div>
    </aside>
  )
}
