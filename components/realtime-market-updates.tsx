"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { subscribeToMarketUpdates } from "@/lib/db"
import { getMarketData } from "@/lib/db"

type MarketUpdate = {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  lastUpdated: Date
}

const DEFAULT_SYMBOLS = ["AAPL", "MSFT", "GOOGL", "AMZN", "META"]

export default function RealtimeMarketUpdates({ watchlistSymbols = [] }: { watchlistSymbols?: string[] }) {
  const [marketData, setMarketData] = useState<MarketUpdate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Use provided symbols or defaults
  const symbols = watchlistSymbols.length > 0 ? watchlistSymbols : DEFAULT_SYMBOLS

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Fetch initial data for all symbols
        const initialDataPromises = symbols.map(async (symbol) => {
          try {
            const data = await getMarketData(symbol)

            if (!data) return null

            // Get company name from separate function/API
            const companyName = await getCompanyName(symbol)

            return {
              symbol,
              name: companyName,
              price: data.price,
              change: data.change,
              changePercent: data.changePercent,
              volume: data.volume,
              lastUpdated: data.updatedAt.toDate(),
            }
          } catch (err) {
            console.error(`Error fetching data for ${symbol}:`, err)
            return null
          }
        })

        const initialData = (await Promise.all(initialDataPromises)).filter(Boolean) as MarketUpdate[]
        setMarketData(initialData)
      } catch (err: any) {
        setError(err.message || "Failed to fetch market data")
        console.error("Error fetching initial market data:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchInitialData()

    // Subscribe to real-time updates
    const subscriptions = symbols.map((symbol) =>
      subscribeToMarketUpdates(symbol, (data) => {
        if (!data) return

        setMarketData((prev) => {
          const index = prev.findIndex((item) => item.symbol === symbol)

          if (index === -1) {
            // Add new data
            return [
              ...prev,
              {
                symbol,
                name: data.name || symbol,
                price: data.price,
                change: data.change,
                changePercent: data.changePercent,
                volume: data.volume,
                lastUpdated: new Date(data.timestamp),
              },
            ]
          } else {
            // Update existing data
            const newData = [...prev]
            newData[index] = {
              ...newData[index],
              price: data.price,
              change: data.change,
              changePercent: data.changePercent,
              volume: data.volume,
              lastUpdated: new Date(data.timestamp),
            }
            return newData
          }
        })
      }),
    )

    // Cleanup subscriptions
    return () => {
      subscriptions.forEach((unsubscribe) => unsubscribe())
    }
  }, [symbols])

  // Mock function to get company names - in a real app this would come from an API
  const getCompanyName = async (symbol: string): Promise<string> => {
    const names: Record<string, string> = {
      AAPL: "Apple Inc.",
      MSFT: "Microsoft Corporation",
      GOOGL: "Alphabet Inc.",
      AMZN: "Amazon.com Inc.",
      META: "Meta Platforms Inc.",
      TSLA: "Tesla Inc.",
      NVDA: "NVIDIA Corporation",
      JPM: "JPMorgan Chase & Co.",
      V: "Visa Inc.",
      JNJ: "Johnson & Johnson",
    }

    return names[symbol] || symbol
  }

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
          Real-time Market Updates
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <RefreshCw className="h-8 w-8 text-blue-500 animate-spin" />
            <span className="ml-2">Loading market data...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-800 p-4 rounded-md">{error}</div>
        ) : marketData.length === 0 ? (
          <div className="text-center py-6 text-gray-500">No market data available</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left">Symbol</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-right">Price</th>
                  <th className="py-3 px-4 text-right">Change</th>
                  <th className="py-3 px-4 text-right">Volume</th>
                  <th className="py-3 px-4 text-right">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {marketData.map((item) => (
                  <tr key={item.symbol} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-3 px-4 font-medium">{item.symbol}</td>
                    <td className="py-3 px-4">{item.name}</td>
                    <td className="py-3 px-4 text-right">{formatCurrency(item.price)}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end">
                        {item.change >= 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        <span className={item.change >= 0 ? "text-green-500" : "text-red-500"}>
                          {item.change >= 0 ? "+" : ""}
                          {formatCurrency(item.change)} ({item.changePercent.toFixed(2)}%)
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">{new Intl.NumberFormat().format(item.volume)}</td>
                    <td className="py-3 px-4 text-right">
                      <Badge variant="outline">{new Date(item.lastUpdated).toLocaleTimeString()}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

