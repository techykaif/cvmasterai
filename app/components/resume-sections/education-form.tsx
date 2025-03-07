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
import { PlusCircle, Trash2, GraduationCap, Calendar, BookOpen, School } from "lucide-react"

export default function EducationForm() {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResume()
  const { education } = resumeData

  const [formData, setFormData] = useState({
    institution: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    description: "",
  })

  const [editMode, setEditMode] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editMode) {
      updateEducation(editMode, formData)
      setEditMode(null)
    } else {
      addEducation(formData)
    }

    setFormData({
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      description: "",
    })
  }

  const handleEdit = (id: string) => {
    const educationItem = education.find((item) => item.id === id)
    if (educationItem) {
      setFormData({
        institution: educationItem.institution,
        degree: educationItem.degree,
        fieldOfStudy: educationItem.fieldOfStudy,
        startDate: educationItem.startDate,
        endDate: educationItem.endDate,
        description: educationItem.description,
      })
      setEditMode(id)
    }
  }

  const handleCancel = () => {
    setFormData({
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
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
          <GraduationCap className="h-5 w-5 text-blue-600" />
          {editMode ? "Edit Education" : "Add Education"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="institution" className="flex items-center gap-2">
              <School className="h-4 w-4 text-blue-600" />
              Institution
            </Label>
            <Input
              id="institution"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              placeholder="University or School Name"
              className="focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="degree" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-blue-600" />
              Degree
            </Label>
            <Input
              id="degree"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              placeholder="Bachelor's, Master's, etc."
              className="focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fieldOfStudy" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-blue-600" />
              Field of Study
            </Label>
            <Input
              id="fieldOfStudy"
              name="fieldOfStudy"
              value={formData.fieldOfStudy}
              onChange={handleChange}
              placeholder="Computer Science, Business, etc."
              className="focus:ring-2 focus:ring-blue-500"
              required
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
              />
            </div>
          </div>
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
            placeholder="Describe your achievements, courses, or activities..."
            className="min-h-[100px] focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-3">
          <Button
            type="submit"
            className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 font-medium hover:from-blue-700 hover:to-purple-700 transition shadow-md hover:shadow-lg"
          >
            {editMode ? "Update Education" : "Add Education"}
          </Button>

          {editMode && (
            <Button type="button" variant="outline" onClick={handleCancel} className="rounded-full px-6 py-2">
              Cancel
            </Button>
          )}
        </div>
      </motion.form>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Education History</h3>

        {education.length === 0 ? (
          <p className="text-gray-500 italic">No education entries yet. Add your first one above.</p>
        ) : (
          <AnimatePresence>
            {education.map((edu) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 p-4">
                    <CardTitle className="text-lg font-semibold flex justify-between items-center">
                      <span>{edu.institution}</span>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(edu.id)}
                          className="h-8 w-8 rounded-full hover:bg-blue-100"
                        >
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeEducation(edu.id)}
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
                        <p className="text-sm font-medium text-gray-500">Degree</p>
                        <p>{edu.degree}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Field of Study</p>
                        <p>{edu.fieldOfStudy}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Duration</p>
                        <p>
                          {new Date(edu.startDate).toLocaleDateString()} -{" "}
                          {edu.endDate ? new Date(edu.endDate).toLocaleDateString() : "Present"}
                        </p>
                      </div>
                    </div>
                    {edu.description && (
                      <div className="mt-3">
                        <p className="text-sm font-medium text-gray-500">Description</p>
                        <p className="text-sm">{edu.description}</p>
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

