import { ReactNode } from "react";

type ContainerProps = {
  as?: "div" | "main" | "section";
  size?: "narrow" | "default" | "wide" | "full";
  className?: string;
  children: ReactNode;
};

export function Container({
  as = "div",
  size = "default",
  className = "",
  children,
}: ContainerProps) {
  const Component = as;

  const widthClass =
    size === "full"
      ? "w-full"
      : size === "narrow"
      ? "w-full max-w-3xl mx-auto"
      : size === "wide"
      ? "w-full max-w-[96rem] mx-auto"
      : "w-full max-w-6xl mx-auto";

  return (
    <Component
      className={`${widthClass} px-4 md:px-6 lg:px-8 ${className}`}
    >
      {children}
    </Component>
  );
}

