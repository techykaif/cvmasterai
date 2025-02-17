import Link from "next/link"

interface ButtonProps {
  text: string
  href?: string
  onClick?: () => void
  variant?: "primary" | "secondary"
  size?: "small" | "medium" | "large"
}

export function Button({ text, href, onClick, variant = "primary", size = "medium" }: ButtonProps) {
  const baseClasses = "font-semibold rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
  const variantClasses =
    variant === "primary" ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
  const sizeClasses = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-5 py-2.5 text-base",
    large: "px-8 py-3.5 text-lg",
  }

  const classes = `${baseClasses} ${variantClasses} ${sizeClasses[size]}`

  if (href) {
    return (
      <Link href={href} className={classes}>
        {text}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={classes}>
      {text}
    </button>
  )
}

