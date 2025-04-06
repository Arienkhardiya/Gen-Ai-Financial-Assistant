"use client"

import { useState, useEffect } from "react"
import { createClientSupabaseClient } from "@/lib/supabase-client"
import { subscribeToPortfolio } from "@/lib/realtime"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarketChart } from "@/components/market-chart"
import { Badge } from "@/components/ui/badge"
import { PieChart } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

type Portfolio = {
  id: string
  name: string
  description: string | null
  is_default: boolean
  assets: PortfolioAsset[]
}

type PortfolioAsset = {
  id: string
  symbol: string
  quantity: number
  purchase_price: number
  purchase_date: string
  asset_type: string
  current_price?: number
  change_percent?: number
}

export default function PortfolioSummary({ userId }: { userId: string }) {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [activePortfolio, setActivePortfolio] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [totalValue, setTotalValue] = useState(0)
  const [totalGain, setTotalGain] = useState(0)
  const [totalGainPercent, setTotalGainPercent] = useState(0)

  useEffect(() => {
    const fetchPortfolios = async () => {
      setIsLoading(true)
      const supabase = createClientSupabaseClient()

      // Fetch portfolios
      const { data: portfoliosData, error: portfoliosError } = await supabase
        .from("portfolios")
        .select("*")
        .eq("user_id", userId)

      if (portfoliosError) {
        console.error("Error fetching portfolios:", portfoliosError)
        setIsLoading(false)
        return
      }

      // Fetch assets for each portfolio
      const portfolioIds = portfoliosData.map((p) => p.id)

      const { data: assetsData, error: assetsError } = await supabase
        .from("portfolio_assets")
        .select("*")
        .in("portfolio_id", portfolioIds)

      if (assetsError) {
        console.error("Error fetching portfolio assets:", assetsError)
        setIsLoading(false)
        return
      }

      // Group assets by portfolio
      const portfoliosWithAssets = portfoliosData.map((portfolio) => ({
        ...portfolio,
        assets: assetsData.filter((asset) => asset.portfolio_id === portfolio.id),
      }))

      // Set default active portfolio
      const defaultPortfolio = portfoliosWithAssets.find((p) => p.is_default) || portfoliosWithAssets[0]

      setPortfolios(portfoliosWithAssets)
      setActivePortfolio(defaultPortfolio?.id || null)
      setIsLoading(false)

      // Fetch current prices for all assets
      await fetchCurrentPrices(portfoliosWithAssets)
    }

    const fetchCurrentPrices = async (portfolios: Portfolio[]) => {
      // Get unique symbols across all portfolios
      const allAssets = portfolios.flatMap((p) => p.assets)
      const uniqueSymbols = [...new Set(allAssets.map((a) => a.symbol))]

      // Fetch current prices for all symbols
      const pricePromises = uniqueSymbols.map(async (symbol) => {
        try {
          const response = await fetch(`/api/market-data?symbol=${symbol}`)
          if (!response.ok) throw new Error("Failed to fetch price")
          const data = await response.json()

          const currentPrice = data.chart.result[0].meta.regularMarketPrice
          const previousClose = data.chart.result[0].meta.previousClose
          const changePercent = ((currentPrice - previousClose) / previousClose) * 100

          return { symbol, currentPrice, changePercent }
        } catch (error) {
          console.error(`Error fetching price for ${symbol}:`, error)
          return { symbol, currentPrice: 0, changePercent: 0 }
        }
      })

      const prices = await Promise.all(pricePromises)

      // Update portfolios with current prices
      const updatedPortfolios = portfolios.map((portfolio) => ({
        ...portfolio,
        assets: portfolio.assets.map((asset) => {
          const priceData = prices.find((p) => p.symbol === asset.symbol)
          return {
            ...asset,
            current_price: priceData?.currentPrice || 0,
            change_percent: priceData?.changePercent || 0,
          }
        }),
      }))

      setPortfolios(updatedPortfolios)

      // Calculate total value and gain
      if (updatedPortfolios.length > 0) {
        calculatePortfolioMetrics(updatedPortfolios)
      }
    }

    const calculatePortfolioMetrics = (portfolios: Portfolio[]) => {
      let totalCurrentValue = 0
      let totalInvestedValue = 0

      portfolios.forEach((portfolio) => {
        portfolio.assets.forEach((asset) => {
          const currentValue = asset.quantity * (asset.current_price || 0)
          const investedValue = asset.quantity * asset.purchase_price

          totalCurrentValue += currentValue
          totalInvestedValue += investedValue
        })
      })

      const gain = totalCurrentValue - totalInvestedValue
      const gainPercent = totalInvestedValue > 0 ? (gain / totalInvestedValue) * 100 : 0

      setTotalValue(totalCurrentValue)
      setTotalGain(gain)
      setTotalGainPercent(gainPercent)
    }

    fetchPortfolios()

    // Set up real-time subscriptions
    const subscriptions = portfolios.map((portfolio) =>
      subscribeToPortfolio(portfolio.id, () => {
        fetchPortfolios()
      }),
    )

    return () => {
      subscriptions.forEach((sub) => sub.unsubscribe())
    }
  }, [userId])

  const activePortfolioData = portfolios.find((p) => p.id === activePortfolio)

  // Generate chart data for active portfolio
  const generateChartData = () => {
    if (!activePortfolioData) return []

    // In a real app, you would fetch historical data
    // This is a placeholder that creates mock data
    const data = []
    let value = 10000

    for (let i = 30; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)

      // Random daily change between -2% and +2%
      const change = (Math.random() * 4 - 2) / 100
      value = value * (1 + change)

      data.push({
        date: date.toISOString().split("T")[0],
        value,
      })
    }

    return data
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Portfolio Summary</CardTitle>
            <CardDescription>Track your investments in real-time</CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{formatCurrency(totalValue)}</div>
            <div className={totalGain >= 0 ? "text-green-500" : "text-red-500"}>
              {totalGain >= 0 ? "+" : ""}
              {formatCurrency(totalGain)} ({totalGainPercent.toFixed(2)}%)
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-[300px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : portfolios.length === 0 ? (
          <div className="text-center py-8">
            <PieChart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No portfolios yet</h3>
            <p className="text-gray-500 mb-4">Create your first portfolio to start tracking your investments</p>
            <button className="btn-primary">Create Portfolio</button>
          </div>
        ) : (
          <Tabs value={activePortfolio || undefined} onValueChange={setActivePortfolio}>
            <TabsList className="mb-4">
              {portfolios.map((portfolio) => (
                <TabsTrigger key={portfolio.id} value={portfolio.id}>
                  {portfolio.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {portfolios.map((portfolio) => (
              <TabsContent key={portfolio.id} value={portfolio.id}>
                <div className="mb-6">
                  <MarketChart data={generateChartData()} name={portfolio.name} color="#3b82f6" height={250} />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Symbol</th>
                        <th className="text-left py-3 px-4">Type</th>
                        <th className="text-right py-3 px-4">Quantity</th>
                        <th className="text-right py-3 px-4">Avg. Price</th>
                        <th className="text-right py-3 px-4">Current Price</th>
                        <th className="text-right py-3 px-4">Value</th>
                        <th className="text-right py-3 px-4">Gain/Loss</th>
                      </tr>
                    </thead>
                    <tbody>
                      {portfolio.assets.map((asset) => {
                        const currentValue = asset.quantity * (asset.current_price || 0)
                        const investedValue = asset.quantity * asset.purchase_price
                        const gain = currentValue - investedValue
                        const gainPercent = investedValue > 0 ? (gain / investedValue) * 100 : 0

                        return (
                          <tr key={asset.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium">{asset.symbol}</td>
                            <td className="py-3 px-4">
                              <Badge variant="secondary">{asset.asset_type}</Badge>
                            </td>
                            <td className="py-3 px-4 text-right">{asset.quantity}</td>
                            <td className="py-3 px-4 text-right">{formatCurrency(asset.purchase_price)}</td>
                            <td className="py-3 px-4 text-right">
                              <div>{formatCurrency(asset.current_price || 0)}</div>
                              <div
                                className={
                                  asset.change_percent && asset.change_percent >= 0
                                    ? "text-green-500 text-xs"
                                    : "text-red-500 text-xs"
                                }
                              >
                                {asset.change_percent && asset.change_percent >= 0 ? "+" : ""}
                                {asset.change_percent?.toFixed(2) || 0}%
                              </div>
                            </td>
                            <td className="py-3 px-4 text-right">{formatCurrency(currentValue)}</td>
                            <td className="py-3 px-4 text-right">
                              <div className={gain >= 0 ? "text-green-500" : "text-red-500"}>
                                {gain >= 0 ? "+" : ""}
                                {formatCurrency(gain)}
                              </div>
                              <div className={gain >= 0 ? "text-green-500 text-xs" : "text-red-500 text-xs"}>
                                {gain >= 0 ? "+" : ""}
                                {gainPercent.toFixed(2)}%
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}

