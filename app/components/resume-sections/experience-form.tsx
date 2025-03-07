"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useResume } from "../resume-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { PlusCircle, Trash2, Briefcase, Calendar, MapPin, Building } from "lucide-react"

export default function ExperienceForm() {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResume()
  const { experience } = resumeData

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  })

  const [editMode, setEditMode] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      current: checked,
      endDate: checked ? "" : prev.endDate,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editMode) {
      updateExperience(editMode, formData)
      setEditMode(null)
    } else {
      addExperience(formData)
    }

    setFormData({
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    })
  }

  const handleEdit = (id: string) => {
    const experienceItem = experience.find((item) => item.id === id)
    if (experienceItem) {
      setFormData({
        company: experienceItem.company,
        position: experienceItem.position,
        location: experienceItem.location,
        startDate: experienceItem.startDate,
        endDate: experienceItem.endDate,
        current: experienceItem.current,
        description: experienceItem.description,
      })
      setEditMode(id)
    }
  }

  const handleCancel = () => {
    setFormData({
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    })
    setEditMode(null)
  }

  return (
    <div className="space-y-8">
      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
      >
        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-blue-600" />
          {editMode ? "Edit Experience" : "Add Experience"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="company" className="flex items-center gap-2">
              <Building className="h-4 w-4 text-blue-600" />
              Company
            </Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company Name"
              className="focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="position" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-blue-600" />
              Position
            </Label>
            <Input
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Job Title"
              className="focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-600" />
              Location
            </Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, State or Remote"
              className="focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                Start Date
              </Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                className="focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate" className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                End Date
              </Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                className="focus:ring-2 focus:ring-blue-500"
                disabled={formData.current}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
  <div className="relative flex items-center">
    <input
      type="checkbox"
      id="current"
      checked={formData.current}
      onChange={(e) => handleSwitchChange(e.target.checked)}
      className="sr-only"
    />
    <div
      className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
        formData.current ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg" : "bg-gray-300"
      }`}
      onClick={() => handleSwitchChange(!formData.current)}
    >
      <motion.div
        className="w-6 h-6 bg-white rounded-full shadow-md"
        animate={{
          x: formData.current ? 24 : 0,
          backgroundColor: formData.current ? "#ffffff" : "#ffffff",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </div>
  </div>
  <Label
    htmlFor="current"
    className={`text-sm font-medium transition-colors ${
      formData.current ? "text-blue-700" : "text-gray-800"
    }`}
  >
    I currently work here
  </Label>
</div>


        <div className="space-y-2">
          <Label htmlFor="description" className="flex items-center gap-2">
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your responsibilities, achievements, and skills used..."
            className="min-h-[100px] focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-3">
          <Button
            type="submit"
            className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 font-medium hover:from-blue-700 hover:to-purple-700 transition shadow-md hover:shadow-lg"
          >
            {editMode ? "Update Experience" : "Add Experience"}
          </Button>

          {editMode && (
            <Button type="button" variant="outline" onClick={handleCancel} className="rounded-full px-6 py-2">
              Cancel
            </Button>
          )}
        </div>
      </motion.form>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Experience History</h3>

        {experience.length === 0 ? (
          <p className="text-gray-500 italic">No experience entries yet. Add your first one above.</p>
        ) : (
          <AnimatePresence>
            {experience.map((exp) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 p-4">
                    <CardTitle className="text-lg font-semibold flex justify-between items-center">
                      <span>
                        {exp.position} at {exp.company}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(exp.id)}
                          className="h-8 w-8 rounded-full hover:bg-blue-100"
                        >
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeExperience(exp.id)}
                          className="h-8 w-8 rounded-full hover:bg-red-100 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Location</p>
                        <p>{exp.location || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Duration</p>
                        <p>
                          {new Date(exp.startDate).toLocaleDateString()} -{" "}
                          {exp.current
                            ? "Present"
                            : exp.endDate
                              ? new Date(exp.endDate).toLocaleDateString()
                              : "Not specified"}
                        </p>
                      </div>
                    </div>
                    {exp.description && (
                      <div className="mt-3">
                        <p className="text-sm font-medium text-gray-500">Description</p>
                        <p className="text-sm">{exp.description}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}

