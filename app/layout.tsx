import type React from "react"
import "./globals.css"
import { Outfit } from "next/font/google"
import Header from "./components/Header"
import Footer from "./components/Footer"

const outfit = Outfit({ subsets: ["latin"] })

export const metadata = {
  title: "AI-Powered Resume Builder",
  description: "Create, customize, and optimize your resume effortlessly using AI."
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${outfit.className} flex flex-col min-h-screen bg-background text-foreground relative overflow-x-hidden antialiased`}>
        {/* Global Ambient Glows */}
        <div className="fixed inset-0 -z-20 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px]" />
        </div>
        
        <Header />
        <main className="flex-grow relative z-0">{children}</main>
        <Footer />
      </body>
    </html>
  )
}



import './globals.css'