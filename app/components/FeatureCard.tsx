import { type LucideIcon, PenTool, Cpu, Download, FileText, Briefcase, Layers, Zap } from "lucide-react"

interface FeatureCardProps {
  icon: string
  title: string
  description: string
  step?: number
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

export default function FeatureCard({ icon, title, description, step }: FeatureCardProps) {
  const IconComponent = iconComponents[icon]

  return (
    <div className="relative group overflow-hidden rounded-3xl bg-card border border-border p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
      {/* Gradient Top Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Optional Step Number */}
      {step && (
        <div className="absolute top-4 right-4 text-5xl font-black text-muted/20 pointer-events-none group-hover:text-primary/10 transition-colors duration-500 select-none">
          {step.toString().padStart(2, "0")}
        </div>
      )}

      <div className="flex items-center mb-4 relative z-10">
        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground shadow-sm transition-all duration-500 mr-4">
          {IconComponent && <IconComponent className="w-6 h-6" />}
        </div>
        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">{title}</h3>
      </div>
      
      <p className="text-muted-foreground relative z-10 leading-relaxed text-sm">
        {description}
      </p>
    </div>
  )
}
