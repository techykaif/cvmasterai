"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Download,
  FileText,
  Briefcase,
  GraduationCap,
  Lightbulb,
  FolderGit2,
  PlusCircle,
  Edit,
  Trash2,
} from "lucide-react"
import PersonalInfoForm from "./resume-sections/personal-info-form"
import EducationForm from "./resume-sections/education-form"
import ExperienceForm from "./resume-sections/experience-form"
import SkillsForm from "./resume-sections/skills-form"
import ProjectsForm from "./resume-sections/projects-form"
import { useResume } from "./resume-context"
import { cn } from "@/lib/utils"

const exportPDF = async () => {
  const element = document.getElementById("resume-preview")
  if (!element) {
    console.error("Resume preview not found!")
    return
  }

  const html2pdf = (await import("html2pdf.js")).default

  html2pdf()
    .from(element)
    .set({
      margin: [10, 10, 10, 10],
      filename: "Resume.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 3, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    })
    .save()
}


type ResumeFormProps = {
  activeSection?: string
  setActiveSection?: (section: string) => void
}

type Section = {
  value: string
  icon: any
  label: string
  custom?: boolean
}

const defaultTabs: Section[] = [
  { value: "personal", icon: FileText, label: "Personal" },
  { value: "education", icon: GraduationCap, label: "Education" },
  { value: "experience", icon: Briefcase, label: "Experience" },
  { value: "skills", icon: Lightbulb, label: "Skills" },
  { value: "projects", icon: FolderGit2, label: "Projects" },
]

export default function ResumeForm({
  activeSection: propActiveSection,
  setActiveSection: propSetActiveSection,
}: ResumeFormProps) {
  const { resumeData, addCustomSection, updateCustomSection, removeCustomSection, exportPDF } = useResume()
  const [internalActiveSection, setInternalActiveSection] = useState<string>("personal")
  const [progress, setProgress] = useState(0)
  const [tabs, setTabs] = useState<Section[]>(defaultTabs)

  // Use either props or internal state for active section
  const activeSection = propActiveSection || internalActiveSection
  const setActiveSection = propSetActiveSection || setInternalActiveSection

  useEffect(() => {
    // Initialize tabs with any custom sections from resumeData
    if (resumeData.customSections.length > 0) {
      const customTabs = resumeData.customSections.map((section) => ({
        value: section.id,
        icon: PlusCircle,
        label: section.title,
        custom: true,
      }))
      setTabs([...defaultTabs, ...customTabs])
    }
  }, [])

  useEffect(() => {
    const currentIndex = tabs.findIndex((tab) => tab.value === activeSection)
    const totalTabs = tabs.length - 1
    setProgress(totalTabs > 0 ? (currentIndex / totalTabs) * 100 : 0)
  }, [activeSection, tabs])

  const handleCustomSectionChange = (id: string, key: "title" | "content", value: string) => {
    updateCustomSection(id, { [key]: value })

    // Update tab label if title changes
    if (key === "title") {
      setTabs(tabs.map((tab) => (tab.value === id ? { ...tab, label: value } : tab)))
    }
  }

  const handleAddCustomSection = () => {
    const id = crypto.randomUUID()
    const newSectionLabel = `Custom Section ${tabs.length - defaultTabs.length + 1}`

    const newSection = {
      value: id,
      icon: PlusCircle,
      label: newSectionLabel,
      custom: true,
    }

    setTabs([...tabs, newSection])
    setActiveSection(newSection.value)
    addCustomSection({ id, title: newSectionLabel, content: "" })
  }

  const handleDeleteCustomSection = (id: string) => {
    setTabs(tabs.filter((tab) => tab.value !== id))
    removeCustomSection(id)

    if (activeSection === id && tabs.length > 1) {
      const newActiveSection = tabs.find((tab) => !tab.custom)?.value || "personal"
      setActiveSection(newActiveSection)
    }
  }

  const navigateToNextTab = () => {
    const currentIndex = tabs.findIndex((tab) => tab.value === activeSection)
    if (currentIndex < tabs.length - 1) {
      setActiveSection(tabs[currentIndex + 1].value)
    }
  }

  const navigateToPrevTab = () => {
    const currentIndex = tabs.findIndex((tab) => tab.value === activeSection)
    if (currentIndex > 0) {
      setActiveSection(tabs[currentIndex - 1].value)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto p-6 md:p-10 bg-white rounded-3xl shadow-lg overflow-hidden"
    >
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-center border-b pb-6 mb-6 gap-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Resume Builder
        </h1>
        <Button
          onClick={exportPDF}
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 font-medium hover:from-blue-700 hover:to-purple-700 transition shadow-md hover:shadow-lg"
        >
          <Download className="w-5 h-5" />
          Export PDF
        </Button>

      </header>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6 overflow-hidden">
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
        <TabsList className="flex overflow-x-auto gap-2 bg-gray-100 rounded-full p-2 mb-6 no-scrollbar">
          {tabs.map((tab) => (
            <div key={tab.value} className="relative flex items-center gap-2">
              <TabsTrigger
                value={tab.value}
                className={cn(
                  "flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full font-medium text-sm transition-all",
                  activeSection === tab.value
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                    : "bg-white text-gray-800 hover:bg-blue-50",
                )}
              >
                <tab.icon className="h-4 w-4 md:h-5 md:w-5" />
                <span>{tab.label}</span>
              </TabsTrigger>

              {tab.custom && (
                <div className="flex gap-1 ml-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      const newLabel = prompt("Enter new section name:", tab.label)
                      if (newLabel) {
                        const updatedTabs = tabs.map((t) => (t.value === tab.value ? { ...t, label: newLabel } : t))
                        setTabs(updatedTabs)
                        handleCustomSectionChange(tab.value, "title", newLabel)
                      }
                    }}
                    className="h-5 w-5 rounded-full hover:bg-blue-100"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      if (confirm("Are you sure you want to delete this section?")) {
                        handleDeleteCustomSection(tab.value)
                      }
                    }}
                    className="h-5 w-5 rounded-full hover:bg-red-100 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          ))}

          <Button
            onClick={handleAddCustomSection}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full font-medium text-sm bg-white text-gray-800 hover:bg-blue-50"
          >
            <PlusCircle className="h-4 w-4 md:h-5 md:w-5" />
            Add Section
          </Button>
        </TabsList>

        {/* Tab Content */}
        <div id="resume-preview" className="p-6 md:p-8 mt-2 bg-gray-50 rounded-2xl shadow-sm max-h-[60vh] overflow-y-auto no-scrollbar">
          <TabsContent value="personal" className="mt-0">
            <PersonalInfoForm />
          </TabsContent>
          <TabsContent value="education" className="mt-0">
            <EducationForm />
          </TabsContent>
          <TabsContent value="experience" className="mt-0">
            <ExperienceForm />
          </TabsContent>
          <TabsContent value="skills" className="mt-0">
            <SkillsForm />
          </TabsContent>
          <TabsContent value="projects" className="mt-0">
            <ProjectsForm />
          </TabsContent>

          {tabs
            .filter((tab) => tab.custom)
            .map((tab) => {
              const customSection = resumeData.customSections.find((section) => section.id === tab.value)
              return (
                <TabsContent key={tab.value} value={tab.value} className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm"
                  >
                    <input
                      type="text"
                      className="w-full p-3 mb-4 text-lg font-semibold border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      value={customSection?.title || ""}
                      onChange={(e) => handleCustomSectionChange(tab.value, "title", e.target.value)}
                      placeholder="Section Title"
                    />
                    <textarea
                      className="w-full p-4 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      rows={8}
                      value={customSection?.content || ""}
                      onChange={(e) => handleCustomSectionChange(tab.value, "content", e.target.value)}
                      placeholder="Enter your content here..."
                    />
                  </motion.div>
                </TabsContent>
              )
            })}
        </div>
      </Tabs>

      {/* Navigation Buttons */}
      <footer className="flex justify-between mt-8 gap-4">
        <Button
          onClick={navigateToPrevTab}
          variant="outline"
          className="px-6 py-2 rounded-full hover:bg-gray-100"
          disabled={tabs.findIndex((tab) => tab.value === activeSection) === 0}
        >
          Previous
        </Button>
        <Button
          onClick={navigateToNextTab}
          className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
          disabled={tabs.findIndex((tab) => tab.value === activeSection) === tabs.length - 1}
        >
          Next
        </Button>
      </footer>
    </motion.div>
  )
}

