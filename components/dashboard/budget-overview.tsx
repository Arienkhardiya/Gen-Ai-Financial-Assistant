"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"

interface Budget {
  id: string
  category: string
  allocated: number
  spent: number
  remaining: number
  period: string
}

interface BudgetOverviewProps {
  userId: string
}

export default function BudgetOverview({ userId }: BudgetOverviewProps) {
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBudgets = async () => {
      setIsLoading(true)

      // In a real app, you would fetch from your database
      // For now, we'll use mock data
      const mockBudgets: Budget[] = [
        {
          id: "1",
          category: "Housing",
          allocated: 1800,
          spent: 1800,
          remaining: 0,
          period: "Monthly",
        },
        {
          id: "2",
          category: "Food & Dining",
          allocated: 800,
          spent: 650,
          remaining: 150,
          period: "Monthly",
        },
        {
          id: "3",
          category: "Transportation",
          allocated: 400,
          spent: 320,
          remaining: 80,
          period: "Monthly",
        },
        {
          id: "4",
          category: "Entertainment",
          allocated: 300,
          spent: 275,
          remaining: 25,
          period: "Monthly",
        },
      ]

      setBudgets(mockBudgets)
      setIsLoading(false)
    }

    fetchBudgets()
  }, [userId])

  const getProgressColor = (spent: number, allocated: number) => {
    const percentage = (spent / allocated) * 100
    if (percentage >= 100) return "bg-red-500"
    if (percentage >= 80) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getTotalBudget = () => {
    return budgets.reduce((total, budget) => total + budget.allocated, 0)
  }

  const getTotalSpent = () => {
    return budgets.reduce((total, budget) => total + budget.spent, 0)
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Budget Overview</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : budgets.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No budgets found</p>
            <button className="mt-4 text-blue-500 hover:underline">Create a budget</button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Total Budget</span>
                <span className="text-sm font-medium">
                  {formatCurrency(getTotalSpent())} / {formatCurrency(getTotalBudget())}
                </span>
              </div>
              <Progress value={(getTotalSpent() / getTotalBudget()) * 100} className="h-2" />
            </div>

            <div className="space-y-4">
              {budgets.map((budget) => (
                <div key={budget.id}>
                  <div className="flex justify-between mb-1">
                    <div className="flex items-center">
                      <span className="font-medium">{budget.category}</span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        {budget.period}
                      </Badge>
                    </div>
                    <span className="text-sm">
                      {formatCurrency(budget.spent)} / {formatCurrency(budget.allocated)}
                    </span>
                  </div>
                  <Progress
                    value={(budget.spent / budget.allocated) * 100}
                    className={`h-2 ${getProgressColor(budget.spent, budget.allocated)}`}
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">
                      {((budget.spent / budget.allocated) * 100).toFixed(0)}% used
                    </span>
                    <span className="text-xs text-gray-500">
                      {budget.remaining > 0 ? `${formatCurrency(budget.remaining)} remaining` : "Budget used"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

