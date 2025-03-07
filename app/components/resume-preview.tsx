"use client"

import { motion } from "framer-motion"
import { useResume } from "./resume-context"
import { Button } from "@/components/ui/button"
import { Download, Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Lightbulb, FolderGit2 } from "lucide-react"

export default function ResumePreview() {
  const { resumeData, exportPDF } = useResume()
  const { personalInfo, education, experience, skills, projects, customSections } = resumeData

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <div className="flex justify-end mb-4">
        <Button
          onClick={exportPDF}
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 font-medium hover:from-blue-700 hover:to-purple-700 transition shadow-md hover:shadow-lg"
        >
          <Download className="w-5 h-5" />
          Export PDF
        </Button>
      </div>

      <div id="resume-preview" className="bg-white rounded-lg shadow-lg overflow-hidden p-8 border border-gray-200">
        {/* Header */}
        <header className="mb-6 pb-6 border-b">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{personalInfo.fullName || "Your Name"}</h1>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4 text-blue-600" />
                <span>{personalInfo.email}</span>
              </div>
            )}

            {personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4 text-blue-600" />
                <span>{personalInfo.phone}</span>
              </div>
            )}

            {personalInfo.address && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span>{personalInfo.address}</span>
              </div>
            )}

            {personalInfo.website && (
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4 text-blue-600" />
                <span>{personalInfo.website}</span>
              </div>
            )}
          </div>

          {personalInfo.summary && (
            <div className="mt-4">
              <p className="text-gray-700">{personalInfo.summary}</p>
            </div>
          )}
        </header>

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-600" />
              Experience
            </h2>

            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-blue-600 pl-4 pb-2">
                  <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                  <div className="flex justify-between text-sm">
                    <p className="text-blue-600">{exp.company}</p>
                    <p className="text-gray-500">
                      {new Date(exp.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })} -{" "}
                      {exp.current
                        ? "Present"
                        : exp.endDate
                          ? new Date(exp.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })
                          : ""}
                    </p>
                  </div>
                  {exp.location && <p className="text-sm text-gray-600">{exp.location}</p>}
                  {exp.description && <p className="mt-2 text-sm text-gray-700">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-blue-600" />
              Education
            </h2>

            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="border-l-2 border-blue-600 pl-4 pb-2">
                  <h3 className="font-semibold text-gray-800">{edu.institution}</h3>
                  <p className="text-blue-600">
                    {edu.degree}
                    {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(edu.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })} -{" "}
                    {edu.endDate
                      ? new Date(edu.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })
                      : "Present"}
                  </p>
                  {edu.description && <p className="mt-2 text-sm text-gray-700">{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-blue-600" />
              Skills
            </h2>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <div key={skill.id} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                  {skill.name}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FolderGit2 className="h-5 w-5 text-blue-600" />
              Projects
            </h2>

            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="border-l-2 border-blue-600 pl-4 pb-2">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-gray-800">{project.title}</h3>
                    {(project.startDate || project.endDate) && (
                      <p className="text-sm text-gray-500">
                        {project.startDate
                          ? new Date(project.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })
                          : ""}
                        {" - "}
                        {project.endDate
                          ? new Date(project.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })
                          : "Present"}
                      </p>
                    )}
                  </div>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {project.link}
                    </a>
                  )}

                  {project.description && <p className="mt-2 text-sm text-gray-700">{project.description}</p>}

                  {project.technologies.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Custom Sections */}
        {customSections.length > 0 &&
          customSections.map((section) => (
            <section key={section.id} className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{section.title}</h2>
              <div className="text-gray-700 whitespace-pre-line">{section.content}</div>
            </section>
          ))}
      </div>
    </motion.div>
  )
}

