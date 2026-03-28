"use client";

import type { JSX, ReactNode } from "react";
import { motion, Variants } from "framer-motion";

type AnimatedRevealProps = {
  children: ReactNode;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
};

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.23, 0.82, 0.25, 1],
    },
  },
};

export function AnimatedReveal({
  children,
  delay = 0,
  as = "div",
  className,
}: AnimatedRevealProps) {
  const Component = motion[as as "div"];

  return (
    <Component
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </Component>
  );
}

