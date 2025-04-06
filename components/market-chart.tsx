"use client"

import { useState } from "react"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface MarketChartProps {
  data?: Array<{
    date: string
    value: number
  }>
  symbol?: string
  name?: string
  color?: string
  height?: number
  loading?: boolean
  timeRanges?: string[]
}

export function MarketChart({
  data,
  symbol = "",
  name = "",
  color = "#3b82f6",
  height = 400,
  loading = false,
  timeRanges = ["1D", "1W", "1M", "3M", "6M", "1Y", "5Y", "All"],
}: MarketChartProps) {
  const [selectedRange, setSelectedRange] = useState(timeRanges[0])

  // Demo data if no data provided
  const demoData = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    value: 100 + Math.random() * 50 * Math.sin(i / 5),
  }))

  const chartData = data || demoData

  if (loading) {
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <div>
            <Skeleton className="h-6 w-24 mb-2" />
            <Skeleton className="h-9 w-32" />
          </div>
          <Skeleton className="h-10 w-20" />
        </div>
        <Skeleton className="h-[400px] w-full rounded-lg" />
        <div className="flex justify-center mt-4">
          <Skeleton className="h-8 w-56" />
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          {symbol && <p className="text-sm text-gray-500 mb-1">{symbol}</p>}
          <div className="flex items-center">
            <h2 className="text-2xl font-bold mr-3">{name || "Market Data"}</h2>
            <Badge variant={chartData[chartData.length - 1].value > chartData[0].value ? "success" : "destructive"}>
              {chartData[chartData.length - 1].value > chartData[0].value ? "↑" : "↓"}
              {Math.abs(
                ((chartData[chartData.length - 1].value - chartData[0].value) / chartData[0].value) * 100,
              ).toFixed(2)}
              %
            </Badge>
          </div>
        </div>
        <div className="text-2xl font-bold">${chartData[chartData.length - 1].value.toFixed(2)}</div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md transition-all hover:shadow-lg">
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`gradient-${name}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => {
                // Format based on selected range
                if (selectedRange === "1D") {
                  return new Date(value).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                } else if (["1W", "1M"].includes(selectedRange)) {
                  return new Date(value).toLocaleDateString([], { month: "short", day: "numeric" })
                } else {
                  return new Date(value).toLocaleDateString([], { month: "short", year: "numeric" })
                }
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `$${value.toFixed(0)}`}
              domain={["dataMin - 10", "dataMax + 10"]}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <Card className="p-2 border shadow-lg bg-white">
                      <p className="text-sm text-gray-500">
                        {new Date(payload[0].payload.date).toLocaleDateString([], {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <p className="font-bold text-lg">${payload[0].value.toFixed(2)}</p>
                    </Card>
                  )
                }
                return null
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              fill={`url(#gradient-${name})`}
              activeDot={{ r: 6, stroke: color, strokeWidth: 2, fill: "#fff" }}
            />
          </AreaChart>
        </ResponsiveContainer>

        <div className="flex justify-center mt-6">
          <div className="inline-flex bg-gray-100 p-1 rounded-md">
            {timeRanges.map((range) => (
              <button
                key={range}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  selectedRange === range ? "bg-blue-100 text-blue-700" : "hover:bg-gray-200 text-gray-600"
                }`}
                onClick={() => setSelectedRange(range)}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

