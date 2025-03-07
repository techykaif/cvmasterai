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
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Trash2, FolderGit2, Calendar, Globe, Tag, X } from "lucide-react"

export default function ProjectsForm() {
  const { resumeData, addProject, updateProject, removeProject } = useResume()
  const { projects } = resumeData

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: [] as string[],
    link: "",
    startDate: "",
    endDate: "",
  })

  const [technology, setTechnology] = useState("")
  const [editMode, setEditMode] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddTechnology = () => {
    if (technology.trim() && !formData.technologies.includes(technology.trim())) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, technology.trim()],
      }))
      setTechnology("")
    }
  }

  const handleRemoveTechnology = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTechnology()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editMode) {
      updateProject(editMode, formData)
      setEditMode(null)
    } else {
      addProject(formData)
    }

    setFormData({
      title: "",
      description: "",
      technologies: [],
      link: "",
      startDate: "",
      endDate: "",
    })
  }

  const handleEdit = (id: string) => {
    const projectItem = projects.find((item) => item.id === id)
    if (projectItem) {
      setFormData({
        title: projectItem.title,
        description: projectItem.description,
        technologies: [...projectItem.technologies],
        link: projectItem.link,
        startDate: projectItem.startDate,
        endDate: projectItem.endDate,
      })
      setEditMode(id)
    }
  }

  const handleCancel = () => {
    setFormData({
      title: "",
      description: "",
      technologies: [],
      link: "",
      startDate: "",
      endDate: "",
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
          <FolderGit2 className="h-5 w-5 text-blue-600" />
          {editMode ? "Edit Project" : "Add Project"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="flex items-center gap-2">
              Project Title
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Project Name"
              className="focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="link" className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-blue-600" />
              Project Link
            </Label>
            <Input
              id="link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="https://github.com/yourusername/project"
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

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="technologies" className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-blue-600" />
              Technologies Used
            </Label>
            <div className="flex gap-2">
              <Input
                id="technologies"
                value={technology}
                onChange={(e) => setTechnology(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add technology and press Enter"
                className="focus:ring-2 focus:ring-blue-500"
              />
              <Button type="button" onClick={handleAddTechnology} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.technologies.map((tech, index) => (
                <Badge key={index} variant="secondary" className="px-2 py-1 flex items-center gap-1">
                  {tech}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveTechnology(tech)}
                    className="h-4 w-4 rounded-full hover:bg-red-100 text-red-500 hover:text-red-700 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
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
            placeholder="Describe the project, your role, and key achievements..."
            className="min-h-[100px] focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-3">
          <Button
            type="submit"
            className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 font-medium hover:from-blue-700 hover:to-purple-700 transition shadow-md hover:shadow-lg"
          >
            {editMode ? "Update Project" : "Add Project"}
          </Button>

          {editMode && (
            <Button type="button" variant="outline" onClick={handleCancel} className="rounded-full px-6 py-2">
              Cancel
            </Button>
          )}
        </div>
      </motion.form>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Projects List</h3>

        {projects.length === 0 ? (
          <p className="text-gray-500 italic">No projects added yet. Add your first project above.</p>
        ) : (
          <AnimatePresence>
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 p-4">
                    <CardTitle className="text-lg font-semibold flex justify-between items-center">
                      <span>{project.title}</span>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(project.id)}
                          className="h-8 w-8 rounded-full hover:bg-blue-100"
                        >
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeProject(project.id)}
                          className="h-8 w-8 rounded-full hover:bg-red-100 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 gap-2">
                      {project.link && (
                        <div>
                          <p className="text-sm font-medium text-gray-500">Link</p>
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {project.link}
                          </a>
                        </div>
                      )}

                      {(project.startDate || project.endDate) && (
                        <div>
                          <p className="text-sm font-medium text-gray-500">Duration</p>
                          <p>
                            {project.startDate ? new Date(project.startDate).toLocaleDateString() : "Not specified"}
                            {" - "}
                            {project.endDate ? new Date(project.endDate).toLocaleDateString() : "Present"}
                          </p>
                        </div>
                      )}

                      {project.technologies.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-gray-500">Technologies</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {project.technologies.map((tech, index) => (
                              <Badge key={index} variant="outline" className="px-2 py-0.5">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {project.description && (
                        <div className="mt-2">
                          <p className="text-sm font-medium text-gray-500">Description</p>
                          <p className="text-sm">{project.description}</p>
                        </div>
                      )}
                    </div>
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

