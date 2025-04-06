"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, LightbulbIcon, Check, ChevronDown, ChevronUp } from "lucide-react"

interface AIInsightCardProps {
  title: string
  summary: string
  insights: {
    text: string
    type?: "positive" | "negative" | "neutral"
  }[]
  confidence?: number
  onAction?: () => void
  actionText?: string
  expanded?: boolean
}

export function AIInsightCard({
  title,
  summary,
  insights,
  confidence = 80,
  onAction,
  actionText = "Apply Insights",
  expanded = false,
}: AIInsightCardProps) {
  const [isExpanded, setIsExpanded] = useState(expanded)

  // Map insight type to badge variant
  const getBadgeVariant = (type?: "positive" | "negative" | "neutral") => {
    switch (type) {
      case "positive":
        return "success"
      case "negative":
        return "destructive"
      case "neutral":
      default:
        return "secondary"
    }
  }

  // Calculate confidence badge color
  const getConfidenceBadge = () => {
    if (confidence >= 80) return "success"
    if (confidence >= 50) return "info"
    return "warning"
  }

  return (
    <Card className="overflow-hidden transition-all duration-300">
      <CardHeader className="pb-3 flex flex-row items-center space-x-3">
        <div className="bg-blue-100 rounded-full p-2">
          <Brain className="h-4 w-4 text-blue-600" />
        </div>
        <div className="flex-1">
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <Badge variant={getConfidenceBadge()}>{confidence}% confidence</Badge>
      </CardHeader>

      <CardContent className="pb-2">
        <p className="text-gray-600 mb-4">{summary}</p>

        <div
          className="flex justify-between items-center text-sm text-blue-600 cursor-pointer hover:text-blue-800 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="font-medium">{isExpanded ? "Hide details" : "View details"}</span>
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </CardContent>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent className="pb-4 pt-2">
              <h4 className="text-sm font-semibold mb-3 flex items-center">
                <LightbulbIcon className="h-4 w-4 mr-1 text-amber-500" />
                Key Insights
              </h4>
              <ul className="space-y-3">
                {insights.map((insight, index) => (
                  <motion.li
                    key={index}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <div
                      className={`bg-${insight.type === "positive" ? "green" : insight.type === "negative" ? "red" : "blue"}-100 p-1 rounded-full mr-3 mt-0.5 flex-shrink-0`}
                    >
                      <Check
                        className={`h-3 w-3 text-${insight.type === "positive" ? "green" : insight.type === "negative" ? "red" : "blue"}-500`}
                      />
                    </div>
                    <div className="flex items-center">
                      <p className="text-sm text-gray-700">{insight.text}</p>
                      {insight.type && (
                        <Badge variant={getBadgeVariant(insight.type)} className="ml-2 text-xs">
                          {insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}
                        </Badge>
                      )}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>

      {onAction && (
        <CardFooter className="pt-0">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full btn-primary"
            onClick={onAction}
          >
            {actionText}
          </motion.button>
        </CardFooter>
      )}
    </Card>
  )
}

