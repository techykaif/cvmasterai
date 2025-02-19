"use client"

import { useState, useMemo } from "react"
import { Button } from "../components/Button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"

const templateData = [
  {
    id: "modern-professional",
    name: "Modern Professional",
    description: "Clean and modern template perfect for corporate roles",
    category: "Professional",
    rating: 4.9,
    downloads: "15k+",
    image: "/placeholder.svg",
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
    popular: true,
  },
  {
    id: "creative-edge-1",
    name: "Dancer Creative Resume",
    description: "",
    category: "Creative",
    rating: 4.9,
    downloads: "10k+",
    image: "https://www.my-resume-templates.com/wp-content/uploads/2023/12/dancer-resume-example-296.jpg",
    wordFile: "/templates-data/creative1.docx",  // Add the Word file URL here
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
    wordFile: "/templates-data/creative2.docx",  // Add the Word file URL here
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
    wordFile: "/templates-data/creative3.docx",  // Add the Word file URL here
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
    wordFile: "/templates-data/creative4.docx",  // Add the Word file URL here
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
    wordFile: "/templates-data/creative5.docx",  // Add the Word file URL here
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
    wordFile: "/templates-data/creative6.docx",  // Add the Word file URL here
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
    wordFile: "/templates-data/creative7.docx",  // Add the Word file URL here
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
    wordFile: "/templates-data/creative8.docx",  // Add the Word file URL here
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
    wordFile: "/templates-data/creative9.docx",  // Add the Word file URL here
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
    wordFile: "/templates-data/creative10.docx",  // Add the Word file URL here
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
    wordFile: "/templates-data/creative11.docx",  // Add the Word file URL here
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
    wordFile: "/templates-data/creative12.docx",  // Add the Word file URL here
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
    wordFile: "/templates-data/creative13.docx",  // Add the Word file URL here
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
    wordFile: "/templates-data/creative14.docx",  // Add the Word file URL here
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
    popular: false,
  },
]

const categories = ["All Templates", "Professional", "Creative", "Academic", "Entry Level", "Executive", "Technical"]

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Templates")
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState("")

  // Efficient filtering with useMemo
  const filteredTemplates = useMemo(() => {
    return templateData.filter((template) => {
      const matchesCategory = selectedCategory === "All Templates" || template.category === selectedCategory
      const matchesSearch =
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  // Open Modal for image preview
  const openModal = (image: string) => {
    setCurrentImage(image)
    setIsModalOpen(true)
  }

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 text-gray-900">Resume Templates</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our collection of 100+ professionally designed templates. Each template is ATS-friendly and
              optimized for maximum impact.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center items-center">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue>{selectedCategory}</SelectValue>
              </SelectTrigger>
<<<<<<< HEAD
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
=======
              <SelectContent className="bg-white border border-gray-300 shadow-lg">
                {categories.map((category) => (
                  <SelectItem
                    key={category}
                    value={category}
                    className="cursor-pointer hover:bg-gray-100 hover:shadow-md transition-all duration-200 rounded-md px-2 py-1 data-[state=checked]:bg-gray-200"
                  >
                    {category}
                  </SelectItem>

                ))}
              </SelectContent>

>>>>>>> 21d9fab (updated footer)
            </Select>
            <Input
              type="text"
              placeholder="Search templates..."
              className="w-full md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="group relative">
              <div className="relative overflow-hidden rounded-lg shadow-lg bg-white border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {template.popular && (
                  <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Popular
                  </div>
                )}
                <div className="aspect-[3/4] relative bg-gray-50">
                  <img
                    src={template.image}
                    alt={`${template.name} template`}
                    className="absolute inset-0 w-full h-full object-cover"
                    onClick={() => openModal(template.image)} // Trigger modal on image click
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{template.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <span>⭐ {template.rating}</span>
                      <span className="mx-1">•</span>
                      <span>{template.downloads}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{template.description}</p>
                  <div className="flex gap-3">
                    <Button href={`/editor/${template.id}`} text="Use Template" />
                    <Button
                      type="button"
                      text="Preview"
                      variant="secondary"
                      onClick={() => openModal(template.image)} // Trigger modal on button click
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for image preview */}
      {isModalOpen && (
        <Dialog open={isModalOpen} onOpenChange={closeModal}>
          <DialogContent className="border-none bg-transparent bg-opacity-80">
            <DialogTitle className="text-white">Resume Preview</DialogTitle>
            <DialogDescription>
              <img src={currentImage} alt="Preview" className="w-full h-auto" />
            </DialogDescription>
            <Button text="Close" onClick={closeModal} className="mt-1 text-sm py-1 px-3" />

          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
