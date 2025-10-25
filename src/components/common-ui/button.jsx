import React from "react";
import { cn } from "./utils";

export function Button({
  variant = "default",
  className = "",
  children,
  ...props
}) {
  const baseStyle =
    "inline-flex items-center justify-center px-4 py-2 rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    default: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
    outline:
      "border border-gray-300 text-gray-800 hover:bg-gray-100 focus:ring-gray-400",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
  };

  const finalClass = cn(baseStyle, variants[variant], className);

  return (
    <button className={finalClass} {...props}>
      {children}
    </button>
  );
}
