"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Info } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  change?: string | number
  changeType?: "increase" | "decrease" | "neutral"
  description?: string
  icon?: React.ReactNode
  info?: string
}

export function StatsCard({ title, value, change, changeType = "neutral", description, icon, info }: StatsCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <TooltipProvider>
      <motion.div whileHover={{ y: -5 }} onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)}>
        <Card className="overflow-hidden transition-shadow hover:shadow-lg">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm text-gray-500 flex items-center">
              {title}
              {info && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      <Info className="h-3.5 w-3.5 ml-1 text-gray-400" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{info}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </CardTitle>
            {icon && <div className="text-gray-400">{icon}</div>}
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <motion.div
                animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="text-2xl font-bold"
              >
                {value}
              </motion.div>

              {change && (
                <div className="flex items-center mt-1">
                  <Badge
                    variant={
                      changeType === "increase" ? "success" : changeType === "decrease" ? "destructive" : "secondary"
                    }
                    className="rounded-sm font-medium"
                  >
                    {changeType === "increase" ? "↑" : changeType === "decrease" ? "↓" : "•"} {change}
                  </Badge>

                  {description && <span className="text-xs text-gray-500 ml-2">{description}</span>}
                </div>
              )}

              <AnimatePresence>
                {isHovered && description && !change && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs text-gray-500 mt-1"
                  >
                    {description}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </TooltipProvider>
  )
}

