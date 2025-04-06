"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingUp, DollarSign, PiggyBank, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Insight {
  id: string
  type: "investment" | "budget" | "savings" | "general"
  content: string
  priority: "low" | "medium" | "high"
  read: boolean
  createdAt: Date
}

interface AIInsightsProps {
  userId: string
}

export default function AIInsights({ userId }: AIInsightsProps) {
  const [insights, setInsights] = useState<Insight[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchInsights = async () => {
      setIsLoading(true)

      // In a real app, you would fetch from your database
      // For now, we'll use mock data
      const mockInsights: Insight[] = [
        {
          id: "1",
          type: "investment",
          content:
            "Based on your risk profile and current market conditions, consider increasing your allocation to technology ETFs by 5%.",
          priority: "high",
          read: false,
          createdAt: new Date(2023, 4, 15),
        },
        {
          id: "2",
          type: "budget",
          content:
            "Your dining expenses have increased by 25% compared to last month. Consider setting a stricter budget for this category.",
          priority: "medium",
          read: false,
          createdAt: new Date(2023, 4, 14),
        },
        {
          id: "3",
          type: "savings",
          content:
            "You're on track to reach your emergency fund goal by September. Consider increasing your monthly contribution to reach it sooner.",
          priority: "low",
          read: false,
          createdAt: new Date(2023, 4, 12),
        },
      ]

      setInsights(mockInsights)
      setIsLoading(false)
    }

    fetchInsights()
  }, [userId])

  const markAsRead = (id: string) => {
    setInsights(insights.map((insight) => (insight.id === id ? { ...insight, read: true } : insight)))
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "investment":
        return <TrendingUp className="h-5 w-5 text-blue-500" />
      case "budget":
        return <DollarSign className="h-5 w-5 text-purple-500" />
      case "savings":
        return <PiggyBank className="h-5 w-5 text-green-500" />
      default:
        return <Brain className="h-5 w-5 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
    }
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          <Brain className="h-5 w-5 text-blue-500 mr-2" />
          AI Insights
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-xs">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : insights.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No insights available</p>
            <Button variant="outline" className="mt-4">
              Generate Insights
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {insights.map((insight) => (
              <div
                key={insight.id}
                className={`p-4 rounded-lg border ${insight.read ? "bg-gray-50 dark:bg-gray-800/50" : "bg-white dark:bg-gray-800"}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center">
                    {getInsightIcon(insight.type)}
                    <span className="font-medium ml-2 capitalize">{insight.type}</span>
                    <Badge className={`ml-2 ${getPriorityColor(insight.priority)}`}>{insight.priority}</Badge>
                  </div>
                  <span className="text-xs text-gray-500">{insight.createdAt.toLocaleDateString()}</span>
                </div>
                <p className="text-sm mb-3">{insight.content}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs flex items-center text-blue-500 hover:text-blue-700"
                  onClick={() => markAsRead(insight.id)}
                >
                  {insight.read ? "Marked as read" : "Mark as read"}
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

