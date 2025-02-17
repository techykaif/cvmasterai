import { type LucideIcon, PenTool, Cpu, Download, FileText, Briefcase, Layers, Zap } from "lucide-react"

interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

const iconComponents: { [key: string]: LucideIcon } = {
  PenTool,
  Cpu,
  Download,
  FileText,
  Briefcase,
  Layers,
  Zap,
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  const IconComponent = iconComponents[icon]

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <div className="bg-blue-100 p-3 rounded-full mr-4">
          <IconComponent className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

