import Link from "next/link";

interface ButtonProps {
  text: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "custom"; // Allow for custom variant
  size?: "small" | "medium" | "large";
  type?: "button" | "submit" | "reset";
  className?: string;
  customStyles?: {
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    hoverBackgroundColor?: string;
    hoverTextColor?: string;
    hoverScale?: string;
    borderRadius?: string;
    padding?: string;
    boxShadow?: string;
  };
}

export function Button({
  text,
  href,
  onClick,
  variant = "primary",
  size = "medium",
  type = "button",
  className = "",
  customStyles = {}, // Custom styles object
}: ButtonProps) {
  const baseClasses =
    "font-semibold transition-all ease-in-out transform inline-flex items-center justify-center relative overflow-hidden";

  // Define default styles for variants
  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-lg",
    secondary:
      "bg-gray-200 text-gray-800 border border-gray-400 hover:bg-gray-300 shadow-md",
    custom: "", // Custom button uses the customStyles prop for styling
  };

  // Size classes
  const sizeClasses = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  };

  // Combine custom styles with default styles for custom button
  const customClasses = variant === "custom" ? `${baseClasses} ${customStyles?.backgroundColor} ${customStyles?.textColor} ${customStyles?.borderColor} ${customStyles?.boxShadow}` : `${baseClasses} ${variantClasses[variant]}`;

  const hoverClasses = variant === "custom" ? `${customStyles?.hoverBackgroundColor} ${customStyles?.hoverTextColor} hover:scale-${customStyles?.hoverScale || '105'}` : "hover:scale-105";

  const classes = `${customClasses} ${sizeClasses[size]} ${className} ${hoverClasses}`;

  // Button rendering logic
  if (href) {
    return (
      <Link href={href} className={classes}>
        {text}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {text}
    </button>
  );
}
