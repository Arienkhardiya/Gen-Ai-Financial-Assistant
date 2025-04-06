"use client"

import type React from "react"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  link: string
  hoverColor?: string
}

export function FeatureCard({
  icon,
  title,
  description,
  link,
  hoverColor = "rgba(59, 130, 246, 0.1)",
}: FeatureCardProps) {
  return (
    <Link href={link} className="block h-full">
      <motion.div
        className="feature-card h-full flex flex-col"
        whileHover={{
          scale: 1.03,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          backgroundColor: hoverColor,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{description}</p>
        <div className="text-blue-500 font-medium flex items-center group">
          <span className="mr-1">Learn more</span>
          <motion.div initial={{ x: 0 }} animate={{ x: 0 }} whileHover={{ x: 5 }}>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.div>
        </div>
      </motion.div>
    </Link>
  )
}

