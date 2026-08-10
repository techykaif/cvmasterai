"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/app/firebaseConfig"
import { Sidebar } from "@/app/components/dashboard/Sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (!auth) {
      router.push("/signin")
      return
    }
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true)
      } else {
        router.push("/signin")
      }
    })
    return () => unsubscribe()
  }, [router])

  if (isAuthenticated === null) {
    return <div className="flex h-screen items-center justify-center bg-background"><div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div></div>
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <Sidebar setIsLoggingOut={setIsLoggingOut} />

      {/* Main content area */}
      <div className="flex flex-col flex-1 relative overflow-y-auto">
        {isLoggingOut && (
          <div className="absolute inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              <p className="text-muted-foreground font-medium">Logging out...</p>
            </div>
          </div>
        )}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
