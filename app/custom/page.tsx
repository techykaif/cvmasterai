"use client"

import { useState } from "react"
import { ResumeProvider } from "../components/resume-context"
import ResumeForm from "../components/resume-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Eye } from "lucide-react"
import ResumePreview from "../components/resume-preview"

export default function ResumePage() {
  const [activeSection, setActiveSection] = useState("personal")
  const [activeTab, setActiveTab] = useState("edit")

  return (
    <ResumeProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-7xl mx-auto">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="edit" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Edit Resume
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="mt-0">
            <ResumeForm activeSection={activeSection} setActiveSection={setActiveSection} />
          </TabsContent>

          <TabsContent value="preview" className="mt-0">
            <ResumePreview />
          </TabsContent>
        </Tabs>
      </div>
    </ResumeProvider>
  )
}

