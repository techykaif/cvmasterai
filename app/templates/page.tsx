"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Download, Star, X } from "lucide-react"

import { Button } from "../components/Button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog"

const templateData = [
  {
    id: "creative-edge-1",
    name: "Dancer Creative Resume",
    description: "",
    category: "Creative",
    rating: 4.9,
    downloads: "10k+",
    image: "https://www.my-resume-templates.com/wp-content/uploads/2023/12/dancer-resume-example-296.jpg",
    wordFile: "/templates-data/creative1.docx",
    popular: true,
  },
  {
    id: "creative-edge-2",
    name: "Administrative Resume Sample",
    description: "",
    category: "Creative",
    rating: 4.9,
    downloads: "10k+",
    image: "https://www.my-resume-templates.com/wp-content/uploads/2023/12/administrative-assistant-example-280-1.jpg",
    wordFile: "/templates-data/creative2.docx",
    popular: true,
  },
  {
    id: "creative-edge-3",
    name: "Free CV Pattern For Job",
    description: "",
    category: "Creative",
    rating: 4.9,
    downloads: "10k+",
    image: "https://www.my-resume-templates.com/wp-content/uploads/2024/01/cv-pattern-285.jpg",
    wordFile: "/templates-data/creative3.docx",
    popular: true,
  },
  {
    id: "creative-edge-4",
    name: "Free CV Layout",
    description: "",
    category: "Creative",
    rating: 4.9,
    downloads: "10k+",
    image: "https://www.my-resume-templates.com/wp-content/uploads/2023/05/cv-layout-word.jpg",
    wordFile: "/templates-data/creative4.docx",
    popular: true,
  },
  {
    id: "creative-edge-5",
    name: "Artist Creative Template",
    description: "",
    category: "Creative",
    rating: 4.9,
    downloads: "10k+",
    image: "https://www.my-resume-templates.com/wp-content/uploads/2023/12/artist-resume-template-235.jpg",
    wordFile: "/templates-data/creative5.docx",
    popular: true,
  },
  {
    id: "creative-edge-6",
    name: "Creative CV Outline Template",
    description: "",
    category: "Creative",
    rating: 4.9,
    downloads: "10k+",
    image: "https://www.my-resume-templates.com/wp-content/uploads/2024/01/cv-outline-297.jpg",
    wordFile: "/templates-data/creative6.docx",
    popular: true,
  },
  {
    id: "creative-edge-7",
    name: "Graduate Resume Template",
    description: "",
    category: "Creative",
    rating: 4.9,
    downloads: "10k+",
    image: "https://www.my-resume-templates.com/wp-content/uploads/2024/01/graduate-resume-template-298.jpg",
    wordFile: "/templates-data/creative7.docx",
    popular: true,
  },
  {
    id: "creative-edge-8",
    name: "Creative Engineer Resume",
    description: "",
    category: "Creative",
    rating: 4.9,
    downloads: "10k+",
    image: "https://www.my-resume-templates.com/wp-content/uploads/2023/12/software-engineer-resume-example-263.jpg",
    wordFile: "/templates-data/creative8.docx",
    popular: true,
  },
  {
    id: "creative-edge-9",
    name: "Resume Microsoft Word",
    description: "",
    category: "Creative",
    rating: 4.9,
    downloads: "10k+",
    image: "https://www.my-resume-templates.com/wp-content/uploads/2024/01/resume-microsoft-word-268.jpg",
    wordFile: "/templates-data/creative9.docx",
    popular: true,
  },
  {
    id: "creative-edge-10",
    name: "CV Modal",
    description: "",
    category: "Creative",
    rating: 4.9,
    downloads: "10k+",
    image: "https://www.my-resume-templates.com/wp-content/uploads/2023/05/cv-model-for-job.jpg",
    wordFile: "/templates-data/creative10.docx",
    popular: true,
  },
  {
    id: "creative-edge-11",
    name: "Sports Resume",
    description: "",
    category: "Creative",
    rating: 4.9,
    downloads: "10k+",
    image: "https://www.my-resume-templates.com/wp-content/uploads/2019/07/64-sports-coaching-resume.jpg",
    wordFile: "/templates-data/creative11.docx",
    popular: true,
  },
  {
    id: "creative-edge-12",
    name: "Sample Resume Format",
    description: "",
    category: "Creative",
    rating: 4.9,
    downloads: "10k+",
    image: "https://www.my-resume-templates.com/wp-content/uploads/2023/05/sample-resume-word.jpg",
    wordFile: "/templates-data/creative12.docx",
    popular: true,
  },
  {
    id: "creative-edge-13",
    name: "Skriva CV Template",
    description: "",
    category: "Creative",
    rating: 4.9,
    downloads: "10k+",
    image: "https://www.my-resume-templates.com/wp-content/uploads/2020/03/81-curriculum-vitae-skriva.jpg",
    wordFile: "/templates-data/creative13.docx",
    popular: true,
  },
  {
    id: "creative-edge-14",
    name: "Student Resume Example",
    description: "",
    category: "Creative",
    rating: 4.9,
    downloads: "10k+",
    image: "https://www.my-resume-templates.com/wp-content/uploads/2023/05/student-resume-example.jpg",
    wordFile: "/templates-data/creative14.docx",
    popular: true,
  },
  {
    id: "executive-pro",
    name: "Executive Pro",
    description: "Sophisticated design for senior positions",
    category: "Executive",
    rating: 5.0,
    downloads: "8k+",
    image: "/placeholder.svg",
    wordFile: "/templates-data/executive-pro.docx",
    popular: false,
  },
  {
    id: "minimal-impact",
    name: "Minimal Impact",
    description: "Clean and impactful design",
    category: "Professional",
    rating: 4.9,
    downloads: "11k+",
    image: "/placeholder.svg",
    wordFile: "/templates-data/minimal-impact.docx",
    popular: false,
  },
  {
    id: "academic-excellence",
    name: "Academic Excellence",
    description: "Perfect for research and academia",
    category: "Academic",
    rating: 4.9,
    downloads: "7k+",
    image: "/placeholder.svg",
    wordFile: "/templates-data/academic-excellence.docx",
    popular: false,
  },
  {
    id: "modern-professional",
    name: "Modern Professional",
    description: "Clean and modern template perfect for corporate roles",
    category: "Professional",
    rating: 4.9,
    downloads: "15k+",
    image: "/placeholder.svg",
    wordFile: "/templates-data/modern-professional.docx",
    popular: true,
  },
  {
    id: "tech-innovator",
    name: "Tech Innovator",
    description: "Perfect for IT and software roles",
    category: "Technical",
    rating: 4.8,
    downloads: "12k+",
    image: "/placeholder.svg",
    wordFile: "/templates-data/tech-innovator.docx",
    popular: true,
  },
]

const categories = ["All Templates", "Professional", "Creative", "Academic", "Entry Level", "Executive", "Technical"]

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Templates")
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState("")

  const filteredTemplates = useMemo(() => {
    return templateData.filter((template) => {
      const matchesCategory = selectedCategory === "All Templates" || template.category === selectedCategory
      const matchesSearch =
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  const openModal = (image: string) => {
    setCurrentImage(image)
    setIsModalOpen(true)
  }

  
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="pt-16 pb-12 border-b border-border/40">
        <motion.div 
          className="container mx-auto px-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex px-3 py-1 mb-6 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Professional Designs
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
            Resume Templates
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Choose from our collection of professionally designed templates. Each template is ATS-friendly and
            optimized for maximum impact.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[220px] rounded-xl border-border bg-card focus:ring-primary h-12">
                <SelectValue>{selectedCategory}</SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-card border-border shadow-xl rounded-xl">
                {categories.map((category) => (
                  <SelectItem
                    key={category}
                    value={category}
                    className="cursor-pointer hover:bg-secondary focus:bg-secondary rounded-lg px-3 py-2 my-1"
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="text"
              placeholder="Search templates..."
              className="w-full md:flex-1 rounded-xl border-border bg-card focus:ring-primary h-12 px-4 shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="group relative bg-card rounded-3xl border border-border shadow-sm hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/50 hover:-translate-y-1 transition-all duration-500 flex flex-col overflow-hidden">
              <div className="aspect-[3/4] relative bg-secondary overflow-hidden cursor-pointer" onClick={() => openModal(template.image)}>
                {template.popular && (
                  <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-primary to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                    Popular
                  </div>
                )}
                <img
                  src={template.image}
                  alt={`${template.name} template`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-foreground line-clamp-1">{template.name}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-medium text-foreground">{template.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      <span>{template.downloads}</span>
                    </div>
                  </div>
                </div>
                
                {template.description && (
                  <p className="text-muted-foreground text-sm mb-6 line-clamp-2">{template.description}</p>
                )}
                
                <div className="mt-auto grid grid-cols-2 gap-3">
                  <Button 
                    href={`/editor/${template.id}`} 
                    text="Use Template" 
                    className="w-full text-sm font-medium h-10 flex items-center justify-center rounded-full" 
                  />
                  <Button
                    type="button"
                    text="Preview"
                    variant="secondary"
                    onClick={() => openModal(template.image)}
                    className="w-full text-sm font-medium h-10 flex items-center justify-center rounded-full"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-0 shadow-2xl rounded-3xl">
          <div className="relative bg-card rounded-3xl overflow-hidden flex flex-col border border-border">
            <div className="absolute top-4 right-4 z-50">
              <DialogClose asChild>
                <button className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-colors">
                  <X className="w-5 h-5" />
                  <span className="sr-only">Close</span>
                </button>
              </DialogClose>
            </div>
            <DialogTitle className="sr-only">Template Preview</DialogTitle>
            <div className="max-h-[85vh] overflow-y-auto bg-background/50 p-4 md:p-8 flex justify-center">
              <img src={currentImage} alt="Template Preview" className="max-w-full h-auto object-contain rounded-xl shadow-xl border border-border/50" loading="lazy" />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
