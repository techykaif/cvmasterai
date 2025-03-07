"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useResume } from "../resume-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { User, Mail, Phone, MapPin, Globe, FileText } from "lucide-react"

export default function PersonalInfoForm() {
  const { resumeData, updatePersonalInfo } = useResume()
  const { personalInfo } = resumeData

  const [formData, setFormData] = useState({
    fullName: personalInfo.fullName || "",
    email: personalInfo.email || "",
    phone: personalInfo.phone || "",
    address: personalInfo.address || "",
    website: personalInfo.website || "",
    summary: personalInfo.summary || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updatePersonalInfo(formData)
  }

  const handleBlur = () => {
    updatePersonalInfo(formData)
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="flex items-center gap-2">
            <User className="h-4 w-4 text-blue-600" />
            Full Name
          </Label>
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="John Doe"
            className="focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-blue-600" />
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="john.doe@example.com"
            className="focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-blue-600" />
            Phone
          </Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="(123) 456-7890"
            className="focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address" className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-600" />
            Address
          </Label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="123 Main St, City, State"
            className="focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website" className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-blue-600" />
            Website/Portfolio
          </Label>
          <Input
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="https://johndoe.com"
            className="focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary" className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-blue-600" />
          Professional Summary
        </Label>
        <Textarea
          id="summary"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="A brief summary of your professional background and career goals..."
          className="min-h-[150px] focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <Button
        type="submit"
        className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 font-medium hover:from-blue-700 hover:to-purple-700 transition shadow-md hover:shadow-lg"
      >
        Save Personal Information
      </Button>
    </motion.form>
  )
}

