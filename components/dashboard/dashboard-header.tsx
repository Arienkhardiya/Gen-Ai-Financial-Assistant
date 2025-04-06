"use client"

import { useState } from "react"
import { StatsCard } from "@/components/stats-card"
import { Button } from "@/components/ui/button"
import { DollarSign, TrendingUp, PieChart, RefreshCw } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface DashboardHeaderProps {
  user: any
  profile: any
}

export default function DashboardHeader({ user, profile }: DashboardHeaderProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const refreshData = async () => {
    setIsRefreshing(true)
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, {profile?.first_name || user?.displayName?.split(" ")[0] || "there"}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Here's an overview of your finances</p>
        </div>
        <Button
          variant="outline"
          className="mt-4 md:mt-0 flex items-center"
          onClick={refreshData}
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh Data
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Assets"
          value={formatCurrency(125750.42)}
          change="+5.3%"
          changeType="increase"
          description="vs. last month"
          icon={<DollarSign className="h-5 w-5" />}
        />
        <StatsCard
          title="Monthly Income"
          value={formatCurrency(8250.0)}
          change="+2.1%"
          changeType="increase"
          description="vs. last month"
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <StatsCard
          title="Portfolio Performance"
          value="+12.4%"
          change="+3.2%"
          changeType="increase"
          description="vs. market average"
          icon={<PieChart className="h-5 w-5" />}
        />
      </div>
    </div>
  )
}

