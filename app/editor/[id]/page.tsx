"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, FileText, Briefcase, GraduationCap, Code,
  Settings, Save, Download, Plus, Trash2, ArrowUp, ArrowDown, X
} from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/app/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { Button } from "@/app/components/Button";
import TemplateRenderer from "./TemplateRenderer";

type Experience = {
  id: string;
  company: string;
  title: string;
  date: string;
  description: string;
};

type Education = {
  id: string;
  school: string;
  degree: string;
  date: string;
};

export default function EditorPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const urlTemplateId = params.id as string;
  const resumeId = searchParams.get("resumeId");

  const [currentTemplateId, setCurrentTemplateId] = useState(urlTemplateId);
  const [activeTab, setActiveTab] = useState("personal");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [exportingPDF, setExportingPDF] = useState(false);
  const [exportingDOCX, setExportingDOCX] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [personal, setPersonal] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    summary: "",
  });

  const [experience, setExperience] = useState<Experience[]>([]);

  const [education, setEducation] = useState<Education[]>([]);

  const [skills, setSkills] = useState("");

  const addExperience = () => {
    setExperience([...experience, { id: Date.now().toString(), company: "", title: "", date: "", description: "" }]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setExperience(experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
  };

  const removeExperience = (id: string) => {
    setExperience(experience.filter(exp => exp.id !== id));
  };

  const moveExperience = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === experience.length - 1) return;
    const newExp = [...experience];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const temp = newExp[index];
    newExp[index] = newExp[targetIndex];
    newExp[targetIndex] = temp;
    setExperience(newExp);
  };

  const addEducation = () => {
    setEducation([...education, { id: Date.now().toString(), school: "", degree: "", date: "" }]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducation(education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu));
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const moveEducation = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === education.length - 1) return;
    const newEdu = [...education];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const temp = newEdu[index];
    newEdu[index] = newEdu[targetIndex];
    newEdu[targetIndex] = temp;
    setEducation(newEdu);
  };

  useEffect(() => {
    if (!auth) {
      router.push("/signin?redirected=true");
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/signin?redirected=true");
        return;
      }

      if (!resumeId) {
        setError("No resume ID provided.");
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "users", user.uid, "resumes", resumeId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.templateId) setCurrentTemplateId(data.templateId);

          if (data.personal) setPersonal(data.personal);
          if (data.experience) setExperience(data.experience);
          if (data.education) setEducation(data.education);
          if (data.skills) setSkills(data.skills);
        } else {
          setError("Resume not found or you do not have permission to view it.");
        }
      } catch (err) {
        console.error("Error fetching resume:", err);
        setError("Failed to load resume.");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [resumeId, router]);

  const handleSave = async () => {
    if (!auth?.currentUser || !resumeId) return;

    setSaving(true);
    try {
      const docRef = doc(db, "users", auth.currentUser.uid, "resumes", resumeId);
      await updateDoc(docRef, {
        personal,
        experience,
        education,
        skills,
        templateId: currentTemplateId,
        updatedAt: serverTimestamp(),
        name: personal.name ? `${personal.name}'s Resume` : "Untitled Resume"
      });
    } catch (err) {
      console.error("Error saving resume:", err);
      alert("Failed to save resume. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleExportPDF = async () => {
    const element = document.getElementById("resume-preview");
    if (!element) return;

    setExportingPDF(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      await html2pdf()
        .from(element)
        .set({
          margin: 0,
          filename: personal.name ? `${personal.name.replace(/\s+/g, "_")}_Resume.pdf` : "Resume.pdf",
          image: { type: "jpeg", quality: 1 },
          html2canvas: { scale: 3, useCORS: true },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .save();
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Failed to export PDF.");
    } finally {
      setExportingPDF(false);
    }
  };

  const handleExportDOCX = async () => {
    setExportingDOCX(true);
    try {
      const { generateDOCX } = await import("./exportDOCX");
      const blob = await generateDOCX(currentTemplateId, {
        personal,
        experience,
        education,
        skills,
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style.display = "none";
      a.href = url;
      a.download = personal.name ? `${personal.name.replace(/\s+/g, "_")}_Resume.docx` : "Resume.docx";
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error("DOCX generation failed:", err);
      alert("Failed to export DOCX.");
    } finally {
      setExportingDOCX(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-muted-foreground font-medium animate-pulse">Loading editor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6 text-center">
        <div className="max-w-md bg-card border border-border rounded-2xl p-8 shadow-sm">
          <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Error</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button href="/dashboard" text="Back to Dashboard" className="w-full justify-center" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      {/* Header */}
      <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 shrink-0 shadow-sm z-10 relative">
        <div className="flex items-center gap-4">
          <Link href="/templates" className="p-2 hover:bg-secondary rounded-full transition-colors group">
            <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
          </Link>
          <div className="h-6 w-px bg-border mx-1"></div>
          <h1 className="font-semibold text-foreground flex items-center gap-2">
            <span className="text-muted-foreground font-normal">Editing:</span>
            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-sm">{currentTemplateId}</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:bg-secondary/80 text-foreground text-sm font-medium transition-colors border border-border disabled:opacity-50"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4 text-muted-foreground" />
            )}
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            onClick={handleExportDOCX}
            disabled={exportingDOCX || exportingPDF}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:bg-secondary/80 text-foreground text-sm font-medium transition-colors border border-border disabled:opacity-50"
          >
            {exportingDOCX ? (
              <div className="w-4 h-4 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            {exportingDOCX ? "Exporting..." : "DOCX"}
          </button>
          <button
            onClick={handleExportPDF}
            disabled={exportingPDF || exportingDOCX}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium shadow-md transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:-translate-y-0"
          >
            {exportingPDF ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            {exportingPDF ? "Exporting..." : "PDF"}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">

        {/* Editor Sidebar */}
        <div className="w-[450px] border-r border-border bg-card flex flex-col z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
          {/* Tabs */}
          <div className="flex p-4 gap-2 border-b border-border overflow-x-auto no-scrollbar shrink-0">
            {[
              { id: "personal", icon: FileText, label: "Personal" },
              { id: "experience", icon: Briefcase, label: "Experience" },
              { id: "education", icon: GraduationCap, label: "Education" },
              { id: "skills", icon: Code, label: "Skills" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all shrink-0 ${activeTab === tab.id ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
            <AnimatePresence mode="wait">

              {/* Personal Tab */}
              {activeTab === "personal" && (
                <motion.div
                  key="personal"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <h2 className="text-xl font-bold text-foreground mb-6">Personal Details</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-muted-foreground mb-1">Full Name</label>
                      <input type="text" value={personal.name} onChange={(e) => setPersonal({...personal, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-muted-foreground mb-1">Professional Title</label>
                      <input type="text" value={personal.title} onChange={(e) => setPersonal({...personal, title: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
                      <input type="email" value={personal.email} onChange={(e) => setPersonal({...personal, email: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1">Phone</label>
                      <input type="text" value={personal.phone} onChange={(e) => setPersonal({...personal, phone: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1">Location</label>
                      <input type="text" value={personal.address} onChange={(e) => setPersonal({...personal, address: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1">Website / Link</label>
                      <input type="text" value={personal.website} onChange={(e) => setPersonal({...personal, website: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                    </div>
                    <div className="col-span-2 mt-2">
                      <label className="block text-sm font-medium text-muted-foreground mb-1 flex justify-between">
                        Professional Summary
                        <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded">AI Assist (Coming Soon)</span>
                      </label>
                      <textarea rows={5} value={personal.summary} onChange={(e) => setPersonal({...personal, summary: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none leading-relaxed" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Experience Tab */}
              {activeTab === "experience" && (
                <motion.div
                  key="experience"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold text-foreground">Work Experience</h2>
                    <button onClick={addExperience} className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 font-medium">
                      <Plus className="w-4 h-4" /> Add Role
                    </button>
                  </div>

                  <div className="space-y-8">
                    {experience.map((exp, index) => (
                      <div key={exp.id} className="relative p-5 rounded-2xl border border-border bg-background/50 hover:border-primary/30 transition-all group">
                        <div className="absolute -left-3 top-6 bg-card border border-border rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
                          <button onClick={() => moveExperience(index, 'up')} disabled={index === 0} className="hover:bg-secondary p-0.5 rounded disabled:opacity-30">
                            <ArrowUp className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <button onClick={() => moveExperience(index, 'down')} disabled={index === experience.length - 1} className="hover:bg-secondary p-0.5 rounded disabled:opacity-30">
                            <ArrowDown className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </div>
                        <button onClick={() => removeExperience(exp.id)} className="absolute top-4 right-4 text-muted-foreground hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="col-span-2">
                            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Company</label>
                            <input type="text" value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} className="w-full px-3 py-2 border-b border-border bg-transparent focus:border-primary outline-none transition-all font-medium text-foreground" placeholder="e.g. Google" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Title</label>
                            <input type="text" value={exp.title} onChange={(e) => updateExperience(exp.id, 'title', e.target.value)} className="w-full px-3 py-2 border-b border-border bg-transparent focus:border-primary outline-none transition-all text-sm" placeholder="e.g. Software Engineer" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Dates</label>
                            <input type="text" value={exp.date} onChange={(e) => updateExperience(exp.id, 'date', e.target.value)} className="w-full px-3 py-2 border-b border-border bg-transparent focus:border-primary outline-none transition-all text-sm" placeholder="e.g. Jan 2020 - Present" />
                          </div>
                          <div className="col-span-2 mt-2">
                            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 flex justify-between">
                              Description & Achievements
                              <span className="text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded capitalize">AI Rewrite (Soon)</span>
                            </label>
                            <textarea rows={5} value={exp.description} onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} className="w-full px-3 py-3 rounded-lg border border-border bg-background focus:border-primary outline-none transition-all text-sm resize-none leading-relaxed" placeholder="• Led development of..." />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Education Tab */}
              {activeTab === "education" && (
                <motion.div
                  key="education"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold text-foreground">Education</h2>
                    <button onClick={addEducation} className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 font-medium">
                      <Plus className="w-4 h-4" /> Add Degree
                    </button>
                  </div>

                  <div className="space-y-6">
                    {education.map((edu, index) => (
                      <div key={edu.id} className="relative p-5 rounded-2xl border border-border bg-background/50 hover:border-primary/30 transition-all group">
                        <div className="absolute -left-3 top-6 bg-card border border-border rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
                          <button onClick={() => moveEducation(index, 'up')} disabled={index === 0} className="hover:bg-secondary p-0.5 rounded disabled:opacity-30">
                            <ArrowUp className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <button onClick={() => moveEducation(index, 'down')} disabled={index === education.length - 1} className="hover:bg-secondary p-0.5 rounded disabled:opacity-30">
                            <ArrowDown className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </div>
                        <button onClick={() => removeEducation(edu.id)} className="absolute top-4 right-4 text-muted-foreground hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="col-span-2">
                            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Institution</label>
                            <input type="text" value={edu.school} onChange={(e) => updateEducation(edu.id, 'school', e.target.value)} className="w-full px-3 py-2 border-b border-border bg-transparent focus:border-primary outline-none transition-all font-medium text-foreground" placeholder="e.g. Stanford University" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Degree</label>
                            <input type="text" value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} className="w-full px-3 py-2 border-b border-border bg-transparent focus:border-primary outline-none transition-all text-sm" placeholder="e.g. B.S. Computer Science" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Dates</label>
                            <input type="text" value={edu.date} onChange={(e) => updateEducation(edu.id, 'date', e.target.value)} className="w-full px-3 py-2 border-b border-border bg-transparent focus:border-primary outline-none transition-all text-sm" placeholder="e.g. 2018 - 2022" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Skills Tab */}
              {activeTab === "skills" && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-bold text-foreground mb-6">Skills & Expertise</h2>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2 flex justify-between">
                      List your skills (comma separated)
                      <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded">AI Suggestions (Coming Soon)</span>
                    </label>
                    <textarea rows={8} value={skills} onChange={(e) => setSkills(e.target.value)} className="w-full px-4 py-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none leading-relaxed font-medium" placeholder="React, Node.js, Project Management, Graphic Design..." />
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

        {/* Live Preview Area */}
        <div className="flex-1 bg-secondary/40 overflow-y-auto p-4 md:p-8 flex justify-center items-start custom-scrollbar">

          {/* Document Container */}
          <div id="resume-preview">
            <TemplateRenderer
              templateId={currentTemplateId}
              personal={personal}
              experience={experience}
              education={education}
              skills={skills}
            />
          </div>
        </div>
      </div>

      {/* Custom Styles for Scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(120, 120, 120, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(120, 120, 120, 0.4);
        }
      `}} />
    </div>
  );
}
