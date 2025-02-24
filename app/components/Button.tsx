import Link from "next/link";

interface ButtonProps {
  text: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "custom";
  size?: "small" | "medium" | "large";
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean; // Add disabled prop
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
  disabled = false, // Default to false
  customStyles = {},
}: ButtonProps) {
  const baseClasses =
    "font-semibold transition-all ease-in-out transform inline-flex items-center justify-center relative overflow-hidden";

  // Define default styles for variants
  const variantClasses = {
    primary: disabled
      ? "bg-blue-300 text-white cursor-not-allowed opacity-50"
      : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-lg",
    secondary: disabled
      ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
      : "bg-gray-200 text-gray-800 border border-gray-400 hover:bg-gray-300 shadow-md",
    custom: disabled ? "cursor-not-allowed opacity-50" : "",
  };

  // Size classes
  const sizeClasses = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  };

  // Combine custom styles with default styles for custom button
  const customClasses =
    variant === "custom"
      ? `${baseClasses} ${customStyles?.backgroundColor} ${customStyles?.textColor} ${customStyles?.borderColor} ${customStyles?.boxShadow}`
      : `${baseClasses} ${variantClasses[variant]}`;

  const hoverClasses =
    !disabled && variant === "custom"
      ? `${customStyles?.hoverBackgroundColor} ${customStyles?.hoverTextColor} hover:scale-${customStyles?.hoverScale || "105"}`
      : !disabled
      ? "hover:scale-105"
      : "";

  const classes = `${customClasses} ${sizeClasses[size]} ${className} ${hoverClasses}`;

  // Disable href-based links by rendering a <span> instead
  if (href) {
    return disabled ? (
      <span className={`${classes} cursor-not-allowed opacity-50`}>{text}</span>
    ) : (
      <Link href={href} className={classes}>
        {text}
      </Link>
    );
  }

  return (
    <button type={type} onClick={disabled ? undefined : onClick} className={classes} disabled={disabled}>
      {text}
    </button>
  );
}
