"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarketChart } from "@/components/market-chart"
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface MarketData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  data: Array<{ date: string; value: number }>
}

export default function MarketOverview() {
  const [marketData, setMarketData] = useState<Record<string, MarketData>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState("SPY")

  useEffect(() => {
    const fetchMarketData = async () => {
      setIsLoading(true)

      // In a real app, you would fetch from your API
      // For now, we'll use mock data
      const mockData: Record<string, MarketData> = {
        SPY: {
          symbol: "SPY",
          name: "S&P 500 ETF",
          price: 452.78,
          change: 3.45,
          changePercent: 0.77,
          data: generateMockChartData(452.78, 30),
        },
        QQQ: {
          symbol: "QQQ",
          name: "Nasdaq 100 ETF",
          price: 378.25,
          change: 5.12,
          changePercent: 1.37,
          data: generateMockChartData(378.25, 30),
        },
        DIA: {
          symbol: "DIA",
          name: "Dow Jones ETF",
          price: 348.92,
          change: -1.23,
          changePercent: -0.35,
          data: generateMockChartData(348.92, 30, false),
        },
        BTC: {
          symbol: "BTC",
          name: "Bitcoin",
          price: 42568.75,
          change: 1250.45,
          changePercent: 3.02,
          data: generateMockChartData(42568.75, 30),
        },
      }

      setMarketData(mockData)
      setIsLoading(false)
    }

    fetchMarketData()
  }, [])

  // Generate mock chart data
  function generateMockChartData(currentPrice: number, days: number, uptrend = true) {
    const data = []
    let price = currentPrice * 0.9 // Start at 90% of current price

    for (let i = days; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)

      // Random daily change between -2% and +3%
      const changeMultiplier = uptrend ? 1.5 : 0.5
      const change = ((Math.random() * 5 - 2) * changeMultiplier) / 100
      price = price * (1 + change)

      data.push({
        date: date.toISOString().split("T")[0],
        value: price,
      })
    }

    return data
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Market Overview</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : (
          <Tabs defaultValue={activeIndex} onValueChange={setActiveIndex}>
            <TabsList className="mb-4">
              {Object.keys(marketData).map((symbol) => (
                <TabsTrigger key={symbol} value={symbol}>
                  {symbol}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(marketData).map(([symbol, data]) => (
              <TabsContent key={symbol} value={symbol} className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold">{data.name}</h3>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold mr-2">{formatCurrency(data.price)}</span>
                      <div className={`flex items-center ${data.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {data.change >= 0 ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        <span>
                          {data.change >= 0 ? "+" : ""}
                          {formatCurrency(data.change)} ({data.changePercent.toFixed(2)}%)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <MarketChart
                  data={data.data}
                  symbol={data.symbol}
                  name={data.name}
                  color={data.change >= 0 ? "#22c55e" : "#ef4444"}
                  height={300}
                />
              </TabsContent>
            ))}
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}

