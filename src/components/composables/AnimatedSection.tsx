"use client";

import type { Variants } from "framer-motion";
import { motion } from "framer-motion";

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

interface Props {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
}

export default function AnimatedSection({
  children,
  className = "",
  variants = defaultVariants,
}: Props) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
