"use client"

import { FileText, LayoutTemplate, Wand2, Eye, PlusCircle, Layout, UploadCloud } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const stats = [
    { label: "Resumes Created", value: "3", icon: FileText },
    { label: "Templates Used", value: "2", icon: LayoutTemplate },
    { label: "AI Enhancements", value: "12", icon: Wand2 },
    { label: "Profile Views", value: "48", icon: Eye },
  ]

  const actions = [
    {
      title: "Create Resume",
      description: "Build a new resume from scratch with our AI assistant.",
      icon: PlusCircle,
      href: "/create",
      color: "text-indigo-500"
    },
    {
      title: "Use Template",
      description: "Choose from our premium collection of ATS-friendly templates.",
      icon: Layout,
      href: "/templates",
      color: "text-purple-500"
    },
    {
      title: "Upload Resume",
      description: "Import your existing resume to enhance it with AI.",
      icon: UploadCloud,
      href: "/upload",
      color: "text-blue-500"
    }
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8 pt-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome back!</h1>
        <p className="text-muted-foreground mt-2">Here is what is happening with your resumes today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-card/50 backdrop-blur-xl rounded-3xl border border-border shadow-sm p-6 flex items-center gap-4 transition-all duration-300 hover:shadow-lg hover:border-primary/30 group">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 group-hover:bg-primary transition-colors duration-500">
              <stat.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {actions.map((action, i) => (
            <div key={i} className="bg-card/50 backdrop-blur-xl rounded-3xl border border-border shadow-sm p-6 flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:border-primary/50 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-secondary group-hover:bg-primary flex items-center justify-center mb-4 transition-colors duration-500 border border-border">
                <action.icon className={`w-6 h-6 ${action.color} group-hover:text-primary-foreground transition-colors duration-500`} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{action.title}</h3>
              <p className="text-muted-foreground text-sm mb-6 flex-grow leading-relaxed">{action.description}</p>
              <Link 
                href={action.href}
                className="inline-flex items-center justify-center w-full py-3 px-4 bg-secondary hover:bg-primary text-secondary-foreground hover:text-primary-foreground font-medium rounded-full transition-all duration-300 text-sm"
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="pb-12">
        <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h2>
        <div className="bg-card/30 backdrop-blur-md rounded-3xl border border-border border-dashed shadow-sm p-12 text-center transition-all duration-300 hover:border-primary/50 hover:bg-card/50">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 border border-border">
            <FileText className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-1">No recent activity yet</h3>
          <p className="text-muted-foreground">Create your first resume to get started!</p>
        </div>
      </div>
    </div>
  )
}
