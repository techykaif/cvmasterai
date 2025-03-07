"use client"

import React, { createContext, useContext, useState, type ReactNode } from "react"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"

// Define types for resume data
export type PersonalInfo = {
  fullName: string
  email: string
  phone: string
  address: string
  website: string
  summary: string
}

export type Education = {
  id: string
  institution: string
  degree: string
  fieldOfStudy: string
  startDate: string
  endDate: string
  description: string
}

export type Experience = {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

export type Skill = {
  id: string
  name: string
  level: number // 1-5
}

export type Project = {
  id: string
  title: string
  description: string
  technologies: string[]
  link: string
  startDate: string
  endDate: string
}

export type CustomSection = {
  id: string
  title: string
  content: string
}

export type ResumeData = {
  personalInfo: PersonalInfo
  education: Education[]
  experience: Experience[]
  skills: Skill[]
  projects: Project[]
  customSections: CustomSection[]
}

// Default empty resume data
const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    summary: "",
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  customSections: [],
}

// Context type
type ResumeContextType = {
  resumeData: ResumeData
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void
  addEducation: (education: Omit<Education, "id">) => void
  updateEducation: (id: string, education: Partial<Education>) => void
  removeEducation: (id: string) => void
  addExperience: (experience: Omit<Experience, "id">) => void
  updateExperience: (id: string, experience: Partial<Experience>) => void
  removeExperience: (id: string) => void
  addSkill: (skill: Omit<Skill, "id">) => void
  updateSkill: (id: string, skill: Partial<Skill>) => void
  removeSkill: (id: string) => void
  addProject: (project: Omit<Project, "id">) => void
  updateProject: (id: string, project: Partial<Project>) => void
  removeProject: (id: string) => void
  addCustomSection: (section: CustomSection) => void
  updateCustomSection: (id: string, section: Partial<CustomSection>) => void
  removeCustomSection: (id: string) => void
  exportPDF: () => void
}

// Create context
const ResumeContext = createContext<ResumeContextType | undefined>(undefined)

// Provider component
export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    // Try to load from localStorage if available
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("resumeData")
      return savedData ? JSON.parse(savedData) : defaultResumeData
    }
    return defaultResumeData
  })

  // Save to localStorage whenever resumeData changes
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("resumeData", JSON.stringify(resumeData))
    }
  }, [resumeData])

  // Personal Info
  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }))
  }

  // Education
  const addEducation = (education: Omit<Education, "id">) => {
    const newEducation = { ...education, id: crypto.randomUUID() }
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, newEducation],
    }))
  }

  const updateEducation = (id: string, education: Partial<Education>) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((item) => (item.id === id ? { ...item, ...education } : item)),
    }))
  }

  const removeEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((item) => item.id !== id),
    }))
  }

  // Experience
  const addExperience = (experience: Omit<Experience, "id">) => {
    const newExperience = { ...experience, id: crypto.randomUUID() }
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExperience],
    }))
  }

  const updateExperience = (id: string, experience: Partial<Experience>) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((item) => (item.id === id ? { ...item, ...experience } : item)),
    }))
  }

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((item) => item.id !== id),
    }))
  }

  // Skills
  const addSkill = (skill: Omit<Skill, "id">) => {
    const newSkill = { ...skill, id: crypto.randomUUID() }
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }))
  }

  const updateSkill = (id: string, skill: Partial<Skill>) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((item) => (item.id === id ? { ...item, ...skill } : item)),
    }))
  }

  const removeSkill = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((item) => item.id !== id),
    }))
  }

  // Projects
  const addProject = (project: Omit<Project, "id">) => {
    const newProject = { ...project, id: crypto.randomUUID() }
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }))
  }

  const updateProject = (id: string, project: Partial<Project>) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((item) => (item.id === id ? { ...item, ...project } : item)),
    }))
  }

  const removeProject = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((item) => item.id !== id),
    }))
  }

  // Custom Sections
  const addCustomSection = (section: CustomSection) => {
    setResumeData((prev) => ({
      ...prev,
      customSections: [...prev.customSections, section],
    }))
  }

  const updateCustomSection = (id: string, section: Partial<CustomSection>) => {
    setResumeData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((item) => (item.id === id ? { ...item, ...section } : item)),
    }))
  }

  const removeCustomSection = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      customSections: prev.customSections.filter((item) => item.id !== id),
    }))
  }

  // Export to PDF
  const exportPDF = async () => {
    // This is a placeholder for the actual PDF export functionality
    // In a real implementation, you would target the resume preview element
    const resumeElement = document.getElementById("resume-preview")

    if (!resumeElement) {
      alert("Resume preview not found. Please try again.")
      return
    }

    try {
      const canvas = await html2canvas(resumeElement, {
        scale: 2,
        logging: false,
        useCORS: true,
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const imgWidth = 210
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
      pdf.save(`${resumeData.personalInfo.fullName || "Resume"}.pdf`)

      alert("Resume exported successfully!")
    } catch (error) {
      console.error("Error exporting PDF:", error)
      alert("Failed to export PDF. Please try again.")
    }
  }

  const value = {
    resumeData,
    updatePersonalInfo,
    addEducation,
    updateEducation,
    removeEducation,
    addExperience,
    updateExperience,
    removeExperience,
    addSkill,
    updateSkill,
    removeSkill,
    addProject,
    updateProject,
    removeProject,
    addCustomSection,
    updateCustomSection,
    removeCustomSection,
    exportPDF,
  }

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
}

// Custom hook to use the resume context
export function useResume() {
  const context = useContext(ResumeContext)
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider")
  }
  return context
}

