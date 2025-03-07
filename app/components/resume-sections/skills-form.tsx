"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useResume } from "../resume-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Trash2, Lightbulb, Star } from "lucide-react"

const skillSuggestions = [
  "JavaScript",
  "Python",
  "React",
  "Node.js",
  "TypeScript",
  "HTML",
  "CSS",
  "Next.js",
  "Tailwind CSS",
  "SQL",
  "MongoDB",
  "Docker",
  "Kubernetes",
  "AWS",
  "Firebase",
]

export default function SkillsForm() {
  const { resumeData, addSkill, updateSkill, removeSkill } = useResume()
  const { skills } = resumeData

  const [formData, setFormData] = useState({
    name: "",
    level: 3,
  })

  const [editMode, setEditMode] = useState<string | null>(null)
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === "name") {
      const filtered = skillSuggestions.filter((skill) =>
        skill.toLowerCase().startsWith(value.toLowerCase())
      )
      setFilteredSuggestions(filtered)
      setShowSuggestions(!!value)
    }
  }

  const handleSelectSuggestion = (skill: string) => {
    setFormData((prev) => ({ ...prev, name: skill }))
    setShowSuggestions(false)
  }

  const handleSliderChange = (value: number[]) => {
    setFormData((prev) => ({ ...prev, level: value[0] }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) return

    if (editMode) {
      updateSkill(editMode, formData)
      setEditMode(null)
    } else {
      addSkill(formData)
    }

    setFormData({
      name: "",
      level: 3,
    })
    setShowSuggestions(false)
  }

  const handleEdit = (id: string) => {
    const skillItem = skills.find((item) => item.id === id)
    if (skillItem) {
      setFormData({
        name: skillItem.name,
        level: skillItem.level,
      })
      setEditMode(id)
    }
  }

  const handleCancel = () => {
    setFormData({
      name: "",
      level: 3,
    })
    setEditMode(null)
    setShowSuggestions(false)
  }

  const getLevelLabel = (level: number) => {
    switch (level) {
      case 1:
        return "Beginner"
      case 2:
        return "Basic"
      case 3:
        return "Intermediate"
      case 4:
        return "Advanced"
      case 5:
        return "Expert"
      default:
        return "Intermediate"
    }
  }

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-gray-200 text-gray-800"
      case 2:
        return "bg-blue-200 text-blue-800"
      case 3:
        return "bg-green-200 text-green-800"
      case 4:
        return "bg-purple-200 text-purple-800"
      case 5:
        return "bg-orange-200 text-orange-800"
      default:
        return "bg-green-200 text-green-800"
    }
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
          <Lightbulb className="h-5 w-5 text-blue-600" />
          {editMode ? "Edit Skill" : "Add Skill"}
        </h3>

        <div className="space-y-4">
          <div className="space-y-2 relative">
            <Label htmlFor="name" className="flex items-center gap-2">
              Skill Name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., JavaScript, Project Management, Photoshop"
              className="focus:ring-2 focus:ring-blue-500"
              required
            />
            {showSuggestions && (
              <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-40 overflow-auto">
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((skill) => (
                    <li
                      key={skill}
                      onClick={() => handleSelectSuggestion(skill)}
                      className="px-4 py-2 cursor-pointer hover:bg-blue-100 text-sm"
                    >
                      {skill}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-sm text-gray-500">No suggestions</li>
                )}
              </ul>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="level" className="flex items-center gap-2">
                Proficiency Level
              </Label>
              <span className="text-sm font-medium">{getLevelLabel(formData.level)}</span>
            </div>

            <Slider
              id="level"
              min={1}
              max={5}
              step={1}
              value={[formData.level]}
              onValueChange={handleSliderChange}
              className="w-full h-3 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 cursor-pointer"
            />

            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Beginner</span>
              <span>Expert</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            type="submit"
            className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 font-medium hover:from-blue-700 hover:to-purple-700 transition shadow-md hover:shadow-lg"
          >
            {editMode ? "Update Skill" : "Add Skill"}
          </Button>

          {editMode && (
            <Button type="button" variant="outline" onClick={handleCancel} className="rounded-full px-6 py-2">
              Cancel
            </Button>
          )}
        </div>
      </motion.form>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Skills List</h3>

        {skills.length === 0 ? (
          <p className="text-gray-500 italic">No skills added yet. Add your first skill above.</p>
        ) : (
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-3">
                <AnimatePresence>
                  {skills.map((skill) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className="group relative"
                    >
                      <Badge
                        className={`px-3 py-1.5 text-sm font-medium rounded-full cursor-pointer ${getLevelColor(skill.level)}`}
                        onClick={() => handleEdit(skill.id)}
                      >
                        {skill.name}
                        <div className="ml-1.5 inline-flex">
                          {Array.from({ length: skill.level }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-current" />
                          ))}
                        </div>
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSkill(skill.id)}
                        className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-100 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
