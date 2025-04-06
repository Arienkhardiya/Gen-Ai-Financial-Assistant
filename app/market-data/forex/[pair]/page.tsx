import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Globe, ArrowRight } from "lucide-react"

export default function ForexPairDetail({ params }: { params: { pair: string } }) {
  // This would normally fetch data based on the pair
  const pairData = {
    pair: params.pair,
    name:
      params.pair === "EURUSD"
        ? "EUR/USD"
        : params.pair === "GBPUSD"
          ? "GBP/USD"
          : params.pair === "USDJPY"
            ? "USD/JPY"
            : params.pair === "USDCAD"
              ? "USD/CAD"
              : params.pair === "AUDUSD"
                ? "AUD/USD"
                : "Unknown Pair",
    rate:
      params.pair === "EURUSD"
        ? "1.0842"
        : params.pair === "GBPUSD"
          ? "1.2715"
          : params.pair === "USDJPY"
            ? "151.32"
            : params.pair === "USDCAD"
              ? "1.3642"
              : params.pair === "AUDUSD"
                ? "0.6582"
                : "1.0000",
    change:
      params.pair === "EURUSD"
        ? "+0.0023"
        : params.pair === "GBPUSD"
          ? "+0.0042"
          : params.pair === "USDJPY"
            ? "-0.45"
            : params.pair === "USDCAD"
              ? "-0.0018"
              : params.pair === "AUDUSD"
                ? "+0.0015"
                : "0.0000",
    percentChange:
      params.pair === "EURUSD"
        ? "+0.21%"
        : params.pair === "GBPUSD"
          ? "+0.33%"
          : params.pair === "USDJPY"
            ? "-0.30%"
            : params.pair === "USDCAD"
              ? "-0.13%"
              : params.pair === "AUDUSD"
                ? "+0.23%"
                : "0.00%",
    isPositive: params.pair === "EURUSD" || params.pair === "GBPUSD" || params.pair === "AUDUSD",
    dayHigh:
      params.pair === "EURUSD"
        ? "1.0865"
        : params.pair === "GBPUSD"
          ? "1.2742"
          : params.pair === "USDJPY"
            ? "151.95"
            : params.pair === "USDCAD"
              ? "1.3680"
              : params.pair === "AUDUSD"
                ? "0.6598"
                : "1.0000",
    dayLow:
      params.pair === "EURUSD"
        ? "1.0810"
        : params.pair === "GBPUSD"
          ? "1.2680"
          : params.pair === "USDJPY"
            ? "150.85"
            : params.pair === "USDCAD"
              ? "1.3620"
              : params.pair === "AUDUSD"
                ? "0.6560"
                : "1.0000",
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Link href="/market-data" className="text-blue-500 hover:underline mb-4 inline-block">
          ← Back to Market Data
        </Link>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">{pairData.name}</h1>
            <div className="flex items-center mt-2">
              <span className="text-2xl font-bold mr-3">{pairData.rate}</span>
              <span className={`text-lg ${pairData.isPositive ? "text-green-500" : "text-red-500"}`}>
                {pairData.change} ({pairData.percentChange})
              </span>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button className="btn-primary">Trade</button>
            <button className="btn-secondary">Add to Watchlist</button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="relative h-[400px] w-full">
          <Image
            src="/placeholder.svg?height=400&width=1200"
            alt={`${pairData.name} Chart`}
            fill
            className="object-contain"
          />
        </div>
        <div className="flex justify-center mt-4">
          <div className="flex space-x-2">
            <button className="px-3 py-1 rounded-md bg-blue-100 text-blue-700 text-sm font-medium">1H</button>
            <button className="px-3 py-1 rounded-md hover:bg-gray-100 text-sm font-medium">4H</button>
            <button className="px-3 py-1 rounded-md hover:bg-gray-100 text-sm font-medium">1D</button>
            <button className="px-3 py-1 rounded-md hover:bg-gray-100 text-sm font-medium">1W</button>
            <button className="px-3 py-1 rounded-md hover:bg-gray-100 text-sm font-medium">1M</button>
            <button className="px-3 py-1 rounded-md hover:bg-gray-100 text-sm font-medium">3M</button>
            <button className="px-3 py-1 rounded-md hover:bg-gray-100 text-sm font-medium">1Y</button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Day Range</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base font-medium">
              {pairData.dayLow} - {pairData.dayHigh}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">52 Week Range</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base font-medium">1.0500 - 1.1200</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Volatility (30d)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base font-medium">8.2%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Interest Rate Differential</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base font-medium">-1.75%</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="overview" className="text-base">
            Overview
          </TabsTrigger>
          <TabsTrigger value="technical" className="text-base">
            Technical Analysis
          </TabsTrigger>
          <TabsTrigger value="news" className="text-base">
            News
          </TabsTrigger>
          <TabsTrigger value="forecast" className="text-base">
            Forecast
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Pair Overview</h2>
            <p className="text-gray-600 mb-6">
              The {pairData.name} pair represents the exchange rate between the {pairData.name.split("/")[0]} and the{" "}
              {pairData.name.split("/")[1]}. It is one of the most traded currency pairs in the forex market, with high
              liquidity and tight spreads.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold mb-3">Key Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Base Currency</span>
                    <span className="font-medium">{pairData.name.split("/")[0]}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Quote Currency</span>
                    <span className="font-medium">{pairData.name.split("/")[1]}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Pip Value (Standard Lot)</span>
                    <span className="font-medium">$10.00</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Average Spread</span>
                    <span className="font-medium">0.8 pips</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Trading Hours</span>
                    <span className="font-medium">24/5</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-3">Market Sentiment</h3>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center mb-2">
                    {pairData.isPositive ? (
                      <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-red-500 mr-2" />
                    )}
                    <span className="font-bold">{pairData.isPositive ? "Bullish" : "Bearish"}</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Our analysis indicates a {pairData.isPositive ? "bullish" : "bearish"} sentiment based on recent
                    central bank policies, economic indicators, and technical analysis.{" "}
                    {pairData.isPositive
                      ? "Positive economic data from the " +
                        pairData.name.split("/")[0] +
                        " region is supporting the currency."
                      : "Weaker economic data from the " +
                        pairData.name.split("/")[0] +
                        " region is putting pressure on the currency."}
                  </p>
                </div>
                <Link
                  href={`/market-data/forex/${params.pair}/sentiment`}
                  className="text-blue-500 hover:underline flex items-center text-sm"
                >
                  View detailed sentiment analysis <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="technical">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Technical Analysis</h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 rounded-md bg-blue-100 text-blue-700 text-sm font-medium">1H</button>
                <button className="px-3 py-1 rounded-md hover:bg-gray-100 text-sm font-medium">4H</button>
                <button className="px-3 py-1 rounded-md hover:bg-gray-100 text-sm font-medium">1D</button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-bold mb-4">Technical Indicators</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Moving Averages</span>
                      <span className={`font-medium ${pairData.isPositive ? "text-green-500" : "text-red-500"}`}>
                        {pairData.isPositive ? "BUY" : "SELL"}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-gray-600">MA5</p>
                        <p className="font-medium">{pairData.isPositive ? "Buy" : "Sell"}</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-gray-600">MA10</p>
                        <p className="font-medium">{pairData.isPositive ? "Buy" : "Sell"}</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-gray-600">MA20</p>
                        <p className="font-medium">{pairData.isPositive ? "Buy" : "Neutral"}</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-gray-600">MA50</p>
                        <p className="font-medium">Neutral</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-gray-600">MA100</p>
                        <p className="font-medium">{pairData.isPositive ? "Neutral" : "Sell"}</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-gray-600">MA200</p>
                        <p className="font-medium">{pairData.isPositive ? "Buy" : "Sell"}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Oscillators</span>
                      <span className="font-medium text-gray-500">NEUTRAL</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-gray-600">RSI</p>
                        <p className="font-medium">Neutral</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-gray-600">MACD</p>
                        <p className="font-medium">{pairData.isPositive ? "Buy" : "Sell"}</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-gray-600">Stochastic</p>
                        <p className="font-medium">{pairData.isPositive ? "Buy" : "Sell"}</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-gray-600">CCI</p>
                        <p className="font-medium">Neutral</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-gray-600">ADX</p>
                        <p className="font-medium">{pairData.isPositive ? "Strong" : "Weak"}</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-gray-600">ATR</p>
                        <p className="font-medium">0.00082</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-4">Support & Resistance</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Resistance Levels</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-red-50 p-2 rounded text-center">
                        <p className="text-xs text-gray-600">R3</p>
                        <p className="font-medium">{(Number.parseFloat(pairData.rate) + 0.012).toFixed(4)}</p>
                      </div>
                      <div className="bg-red-50 p-2 rounded text-center">
                        <p className="text-xs text-gray-600">R2</p>
                        <p className="font-medium">{(Number.parseFloat(pairData.rate) + 0.008).toFixed(4)}</p>
                      </div>
                      <div className="bg-red-50 p-2 rounded text-center">
                        <p className="text-xs text-gray-600">R1</p>
                        <p className="font-medium">{(Number.parseFloat(pairData.rate) + 0.004).toFixed(4)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="py-2 border-y border-gray-200 text-center">
                    <p className="text-sm text-gray-600">Current Price</p>
                    <p className="font-bold">{pairData.rate}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Support Levels</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-green-50 p-2 rounded text-center">
                        <p className="text-xs text-gray-600">S1</p>
                        <p className="font-medium">{(Number.parseFloat(pairData.rate) - 0.004).toFixed(4)}</p>
                      </div>
                      <div className="bg-green-50 p-2 rounded text-center">
                        <p className="text-xs text-gray-600">S2</p>
                        <p className="font-medium">{(Number.parseFloat(pairData.rate) - 0.008).toFixed(4)}</p>
                      </div>
                      <div className="bg-green-50 p-2 rounded text-center">
                        <p className="text-xs text-gray-600">S3</p>
                        <p className="font-medium">{(Number.parseFloat(pairData.rate) - 0.012).toFixed(4)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-medium mb-2">Pivot Points (Daily)</h4>
                  <div className="relative h-[120px] w-full">
                    <Image
                      src="/placeholder.svg?height=120&width=400"
                      alt="Pivot Points Chart"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href={`/market-data/forex/${params.pair}/technical`}
                className="text-blue-500 hover:underline flex items-center"
              >
                View detailed technical analysis <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="news">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-6">Latest News</h2>

            <div className="space-y-6">
              <div className="border-b pb-6">
                <h3 className="font-bold text-lg mb-2">
                  <Link href="#" className="hover:text-blue-500">
                    {pairData.name.split("/")[0]} Central Bank Signals Potential Rate Hike in Next Meeting
                  </Link>
                </h3>
                <p className="text-gray-600 mb-2">
                  The central bank has indicated it may raise interest rates at its next policy meeting, citing concerns
                  about inflation and strong economic growth. This has strengthened the {pairData.name.split("/")[0]}{" "}
                  against major currencies.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>3 hours ago</span>
                  <span className="mx-2">•</span>
                  <span>Financial Times</span>
                </div>
              </div>

              <div className="border-b pb-6">
                <h3 className="font-bold text-lg mb-2">
                  <Link href="#" className="hover:text-blue-500">
                    {pairData.name.split("/")[1]} Economic Data Shows Mixed Signals
                  </Link>
                </h3>
                <p className="text-gray-600 mb-2">
                  Recent economic indicators from the {pairData.name.split("/")[1]} economy have shown mixed results,
                  with strong employment figures but weaker-than-expected manufacturing data, creating volatility in the
                  currency pair.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>8 hours ago</span>
                  <span className="mx-2">•</span>
                  <span>Bloomberg</span>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">
                  <Link href="#" className="hover:text-blue-500">
                    Trade Tensions Impact Global Currency Markets
                  </Link>
                </h3>
                <p className="text-gray-600 mb-2">
                  Escalating trade tensions between major economies are causing ripple effects across forex markets,
                  with safe-haven currencies gaining strength while emerging market currencies face pressure.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>1 day ago</span>
                  <span className="mx-2">•</span>
                  <span>Reuters</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href={`/market-data/forex/${params.pair}/news`}
                className="text-blue-500 hover:underline flex items-center"
              >
                View all news <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="forecast">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-6">Currency Pair Forecast</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-bold mb-4">AI-Powered Forecast</h3>
                <div className="relative h-[250px] w-full mb-4">
                  <Image
                    src="/placeholder.svg?height=250&width=500"
                    alt="Forecast Chart"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Our AI model analyzes historical price data, economic indicators, central bank policies, and market
                  sentiment to generate forecasts for the {pairData.name} pair.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">1 Week Forecast</span>
                    <span className="text-sm font-medium">
                      {(Number.parseFloat(pairData.rate) + (pairData.isPositive ? 0.0035 : -0.0035)).toFixed(4)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">1 Month Forecast</span>
                    <span className="text-sm font-medium">
                      {(Number.parseFloat(pairData.rate) + (pairData.isPositive ? 0.0085 : -0.0085)).toFixed(4)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">3 Month Forecast</span>
                    <span className="text-sm font-medium">
                      {(Number.parseFloat(pairData.rate) + (pairData.isPositive ? 0.015 : -0.015)).toFixed(4)}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-4">Key Factors Influencing Forecast</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Central Bank Policies</h4>
                    <p className="text-sm text-gray-600">
                      The {pairData.name.split("/")[0]} Central Bank is expected to{" "}
                      {pairData.isPositive ? "maintain a hawkish stance" : "adopt a more dovish approach"} in upcoming
                      meetings, while the {pairData.name.split("/")[1]} Central Bank is likely to{" "}
                      {pairData.isPositive ? "remain dovish" : "continue its tightening cycle"}.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Economic Indicators</h4>
                    <p className="text-sm text-gray-600">
                      Recent {pairData.name.split("/")[0]} economic data has shown{" "}
                      {pairData.isPositive ? "stronger-than-expected growth" : "signs of slowing momentum"}, while{" "}
                      {pairData.name.split("/")[1]} indicators point to{" "}
                      {pairData.isPositive ? "potential economic challenges" : "robust economic activity"}.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Market Sentiment</h4>
                    <p className="text-sm text-gray-600">
                      Overall market sentiment toward the {pairData.name} pair is{" "}
                      {pairData.isPositive ? "bullish" : "bearish"}, with institutional positioning showing a{" "}
                      {pairData.isPositive ? "net long" : "net short"} bias according to recent COT reports.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href={`/market-data/forex/${params.pair}/forecast`}
                className="text-blue-500 hover:underline flex items-center"
              >
                View detailed forecast analysis <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-blue-50 p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <Globe className="h-6 w-6 text-blue-500 mr-2" />
          <h2 className="text-xl font-bold">Economic Calendar</h2>
        </div>
        <p className="text-gray-700 mb-6">Upcoming economic events that may impact the {pairData.name} pair:</p>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{pairData.name.split("/")[0]} Interest Rate Decision</p>
                <p className="text-sm text-gray-600">Expected: No Change</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Tomorrow, 12:00 PM GMT</p>
                <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                  High Impact
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{pairData.name.split("/")[1]} Non-Farm Payrolls</p>
                <p className="text-sm text-gray-600">Expected: +180K</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Friday, 8:30 AM GMT</p>
                <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                  High Impact
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{pairData.name.split("/")[0]} GDP (QoQ)</p>
                <p className="text-sm text-gray-600">Expected: +0.3%</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Next Tuesday, 9:00 AM GMT</p>
                <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                  Medium Impact
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Link href="/market-data/calendar" className="text-blue-500 hover:underline flex items-center">
            View full economic calendar <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

