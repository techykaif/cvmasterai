"use client"
import type React from "react"
import { useState } from "react"
import { Sidebar } from "@/app/components/dashboard/Sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-[#060606] text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar setIsLoggingOut={setIsLoggingOut} />

      {/* Main content area */}
      <div className="flex flex-col flex-1 relative overflow-y-auto">
        {isLoggingOut && (
          <div className="absolute inset-0 z-50 bg-[#060606]/80 backdrop-blur-sm flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-600 rounded-full animate-spin"></div>
              <p className="text-gray-400 font-medium">Logging out...</p>
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
