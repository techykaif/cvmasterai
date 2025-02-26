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
    <div className="flex h-[calc(100vh-4rem)] bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar setIsLoggingOut={setIsLoggingOut} />

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        <main className="flex-1 bg-gray-100 flex items-center justify-center text-xl font-semibold text-gray-700">
          {isLoggingOut ? "Logging out..." : children}
        </main>
      </div>
    </div>
  )
}
