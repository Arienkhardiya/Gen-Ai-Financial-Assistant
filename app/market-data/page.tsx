"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Globe, DollarSign, Bitcoin } from "lucide-react"

export default function MarketData() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Market Data</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Access real-time market data from global financial markets, powered by our advanced AI analytics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Link href="/market-data/sp500">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                S&P 500
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-3xl font-bold">4,738.32</p>
                  <p className="text-sm text-green-500">+58.48 (+1.23%)</p>
                </div>
                <div className="relative h-16 w-24">
                  <Image
                    src="/placeholder.svg?height=64&width=96"
                    alt="S&P 500 Chart"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/market-data/nasdaq">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                NASDAQ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-3xl font-bold">16,482.91</p>
                  <p className="text-sm text-green-500">+142.33 (+0.87%)</p>
                </div>
                <div className="relative h-16 w-24">
                  <Image src="/placeholder.svg?height=64&width=96" alt="NASDAQ Chart" fill className="object-contain" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/market-data/dow">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                DOW
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-3xl font-bold">37,863.80</p>
                  <p className="text-sm text-green-500">+195.89 (+0.52%)</p>
                </div>
                <div className="relative h-16 w-24">
                  <Image src="/placeholder.svg?height=64&width=96" alt="DOW Chart" fill className="object-contain" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Tabs defaultValue="stocks" className="mb-12">
        <TabsList className="mb-6">
          <TabsTrigger value="stocks" className="text-base">
            Stocks
          </TabsTrigger>
          <TabsTrigger value="forex" className="text-base">
            Forex
          </TabsTrigger>
          <TabsTrigger value="crypto" className="text-base">
            Crypto
          </TabsTrigger>
          <TabsTrigger value="commodities" className="text-base">
            Commodities
          </TabsTrigger>
        </TabsList>

        <TabsContent value="stocks">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Top Stocks</h3>
              <div className="text-sm text-gray-500">Last updated: Today, 3:45 PM</div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Symbol</th>
                    <th className="text-left py-3 px-4">Company</th>
                    <th className="text-right py-3 px-4">Price</th>
                    <th className="text-right py-3 px-4">Change</th>
                    <th className="text-right py-3 px-4">% Change</th>
                    <th className="text-right py-3 px-4">Volume</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => (window.location.href = "/market-data/stocks/AAPL")}
                  >
                    <td className="py-3 px-4 font-medium">AAPL</td>
                    <td className="py-3 px-4">Apple Inc.</td>
                    <td className="py-3 px-4 text-right">$182.63</td>
                    <td className="py-3 px-4 text-right text-green-500">+4.38</td>
                    <td className="py-3 px-4 text-right text-green-500">+2.45%</td>
                    <td className="py-3 px-4 text-right">42.3M</td>
                  </tr>
                  <tr
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => (window.location.href = "/market-data/stocks/MSFT")}
                  >
                    <td className="py-3 px-4 font-medium">MSFT</td>
                    <td className="py-3 px-4">Microsoft Corp.</td>
                    <td className="py-3 px-4 text-right">$415.32</td>
                    <td className="py-3 px-4 text-right text-green-500">+7.62</td>
                    <td className="py-3 px-4 text-right text-green-500">+1.87%</td>
                    <td className="py-3 px-4 text-right">28.7M</td>
                  </tr>
                  <tr
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => (window.location.href = "/market-data/stocks/GOOGL")}
                  >
                    <td className="py-3 px-4 font-medium">GOOGL</td>
                    <td className="py-3 px-4">Alphabet Inc.</td>
                    <td className="py-3 px-4 text-right">$175.89</td>
                    <td className="py-3 px-4 text-right text-green-500">+2.46</td>
                    <td className="py-3 px-4 text-right text-green-500">+1.42%</td>
                    <td className="py-3 px-4 text-right">19.5M</td>
                  </tr>
                  <tr
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => (window.location.href = "/market-data/stocks/META")}
                  >
                    <td className="py-3 px-4 font-medium">META</td>
                    <td className="py-3 px-4">Meta Platforms Inc.</td>
                    <td className="py-3 px-4 text-right">$472.58</td>
                    <td className="py-3 px-4 text-right text-red-500">-9.24</td>
                    <td className="py-3 px-4 text-right text-red-500">-1.92%</td>
                    <td className="py-3 px-4 text-right">22.1M</td>
                  </tr>
                  <tr
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => (window.location.href = "/market-data/stocks/AMZN")}
                  >
                    <td className="py-3 px-4 font-medium">AMZN</td>
                    <td className="py-3 px-4">Amazon.com Inc.</td>
                    <td className="py-3 px-4 text-right">$182.94</td>
                    <td className="py-3 px-4 text-right text-red-500">-1.61</td>
                    <td className="py-3 px-4 text-right text-red-500">-0.87%</td>
                    <td className="py-3 px-4 text-right">31.8M</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="forex">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-6">
              <Globe className="h-6 w-6 text-blue-500 mr-2" />
              <h3 className="text-xl font-bold">Forex Markets</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Pair</th>
                    <th className="text-right py-3 px-4">Rate</th>
                    <th className="text-right py-3 px-4">Change</th>
                    <th className="text-right py-3 px-4">% Change</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => (window.location.href = "/market-data/forex/EURUSD")}
                  >
                    <td className="py-3 px-4 font-medium">EUR/USD</td>
                    <td className="py-3 px-4 text-right">1.0842</td>
                    <td className="py-3 px-4 text-right text-green-500">+0.0023</td>
                    <td className="py-3 px-4 text-right text-green-500">+0.21%</td>
                  </tr>
                  <tr
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => (window.location.href = "/market-data/forex/GBPUSD")}
                  >
                    <td className="py-3 px-4 font-medium">GBP/USD</td>
                    <td className="py-3 px-4 text-right">1.2715</td>
                    <td className="py-3 px-4 text-right text-green-500">+0.0042</td>
                    <td className="py-3 px-4 text-right text-green-500">+0.33%</td>
                  </tr>
                  <tr
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => (window.location.href = "/market-data/forex/USDJPY")}
                  >
                    <td className="py-3 px-4 font-medium">USD/JPY</td>
                    <td className="py-3 px-4 text-right">151.32</td>
                    <td className="py-3 px-4 text-right text-red-500">-0.45</td>
                    <td className="py-3 px-4 text-right text-red-500">-0.30%</td>
                  </tr>
                  <tr
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => (window.location.href = "/market-data/forex/USDCAD")}
                  >
                    <td className="py-3 px-4 font-medium">USD/CAD</td>
                    <td className="py-3 px-4 text-right">1.3642</td>
                    <td className="py-3 px-4 text-right text-red-500">-0.0018</td>
                    <td className="py-3 px-4 text-right text-red-500">-0.13%</td>
                  </tr>
                  <tr
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => (window.location.href = "/market-data/forex/AUDUSD")}
                  >
                    <td className="py-3 px-4 font-medium">AUD/USD</td>
                    <td className="py-3 px-4 text-right">0.6582</td>
                    <td className="py-3 px-4 text-right text-green-500">+0.0015</td>
                    <td className="py-3 px-4 text-right text-green-500">+0.23%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="crypto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-6">
              <Bitcoin className="h-6 w-6 text-blue-500 mr-2" />
              <h3 className="text-xl font-bold">Cryptocurrency Markets</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Symbol</th>
                    <th className="text-right py-3 px-4">Price</th>
                    <th className="text-right py-3 px-4">24h Change</th>
                    <th className="text-right py-3 px-4">Market Cap</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => (window.location.href = "/market-data/crypto/BTC")}
                  >
                    <td className="py-3 px-4 font-medium">Bitcoin</td>
                    <td className="py-3 px-4">BTC</td>
                    <td className="py-3 px-4 text-right">$67,245.32</td>
                    <td className="py-3 px-4 text-right text-green-500">+2.34%</td>
                    <td className="py-3 px-4 text-right">$1.32T</td>
                  </tr>
                  <tr
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => (window.location.href = "/market-data/crypto/ETH")}
                  >
                    <td className="py-3 px-4 font-medium">Ethereum</td>
                    <td className="py-3 px-4">ETH</td>
                    <td className="py-3 px-4 text-right">$3,542.18</td>
                    <td className="py-3 px-4 text-right text-green-500">+1.87%</td>
                    <td className="py-3 px-4 text-right">$425.6B</td>
                  </tr>
                  <tr
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => (window.location.href = "/market-data/crypto/SOL")}
                  >
                    <td className="py-3 px-4 font-medium">Solana</td>
                    <td className="py-3 px-4">SOL</td>
                    <td className="py-3 px-4 text-right">$142.76</td>
                    <td className="py-3 px-4 text-right text-red-500">-0.92%</td>
                    <td className="py-3 px-4 text-right">$62.8B</td>
                  </tr>
                  <tr
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => (window.location.href = "/market-data/crypto/ADA")}
                  >
                    <td className="py-3 px-4 font-medium">Cardano</td>
                    <td className="py-3 px-4">ADA</td>
                    <td className="py-3 px-4 text-right">$0.45</td>
                    <td className="py-3 px-4 text-right text-green-500">+3.21%</td>
                    <td className="py-3 px-4 text-right">$16.2B</td>
                  </tr>
                  <tr
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => (window.location.href = "/market-data/crypto/XRP")}
                  >
                    <td className="py-3 px-4 font-medium">XRP</td>
                    <td className="py-3 px-4">XRP</td>
                    <td className="py-3 px-4 text-right">$0.52</td>
                    <td className="py-3 px-4 text-right text-red-500">-1.45%</td>
                    <td className="py-3 px-4 text-right">$28.7B</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="commodities">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-6">
              <DollarSign className="h-6 w-6 text-blue-500 mr-2" />
              <h3 className="text-xl font-bold">Commodities</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Commodity</th>
                    <th className="text-right py-3 px-4">Price</th>
                    <th className="text-right py-3 px-4">Change</th>
                    <th className="text-right py-3 px-4">% Change</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => (window.location.href = "/market-data/commodities/GOLD")}
                  >
                    <td className="py-3 px-4 font-medium">Gold</td>
                    <td className="py-3 px-4 text-right">$2,345.60</td>
                    <td className="py-3 px-4 text-right text-green-500">+12.40</td>
                    <td className="py-3 px-4 text-right text-green-500">+0.53%</td>
                  </tr>
                  <tr
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => (window.location.href = "/market-data/commodities/SILVER")}
                  >
                    <td className="py-3 px-4 font-medium">Silver</td>
                    <td className="py-3 px-4 text-right">$27.85</td>
                    <td className="py-3 px-4 text-right text-green-500">+0.32</td>
                    <td className="py-3 px-4 text-right text-green-500">+1.16%</td>
                  </tr>
                  <tr
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => (window.location.href = "/market-data/commodities/OIL")}
                  >
                    <td className="py-3 px-4 font-medium">Crude Oil</td>
                    <td className="py-3 px-4 text-right">$78.42</td>
                    <td className="py-3 px-4 text-right text-red-500">-0.86</td>
                    <td className="py-3 px-4 text-right text-red-500">-1.08%</td>
                  </tr>
                  <tr
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => (window.location.href = "/market-data/commodities/NATGAS")}
                  >
                    <td className="py-3 px-4 font-medium">Natural Gas</td>
                    <td className="py-3 px-4 text-right">$2.14</td>
                    <td className="py-3 px-4 text-right text-red-500">-0.05</td>
                    <td className="py-3 px-4 text-right text-red-500">-2.28%</td>
                  </tr>
                  <tr
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => (window.location.href = "/market-data/commodities/COPPER")}
                  >
                    <td className="py-3 px-4 font-medium">Copper</td>
                    <td className="py-3 px-4 text-right">$4.12</td>
                    <td className="py-3 px-4 text-right text-green-500">+0.08</td>
                    <td className="py-3 px-4 text-right text-green-500">+1.98%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div>
        <h2 className="text-2xl font-bold mb-6">Market Insights</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">AI Market Predictions</h3>
              <p className="text-gray-600 mb-4">
                Our AI has analyzed current market trends and predicts a moderate bullish trend for technology and
                healthcare sectors in the coming weeks. Energy stocks may face headwinds due to regulatory changes.
              </p>
              <div className="relative h-[200px] w-full">
                <Image
                  src="/placeholder.svg?height=200&width=500"
                  alt="AI Prediction Chart"
                  fill
                  className="object-contain"
                />
              </div>
              <Link href="/market-data/predictions" className="text-blue-500 hover:underline mt-4 inline-block">
                View detailed predictions
              </Link>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Economic Calendar</h3>
              <ul className="space-y-4">
                <li className="border-b pb-3">
                  <Link
                    href="/market-data/calendar/fed-interest-rate"
                    className="block hover:bg-gray-50 rounded p-2 -m-2"
                  >
                    <div className="flex justify-between">
                      <p className="font-medium">Fed Interest Rate Decision</p>
                      <p className="text-sm text-gray-500">Tomorrow, 2:00 PM</p>
                    </div>
                    <p className="text-sm text-gray-600">Expected: No change (5.25-5.50%)</p>
                  </Link>
                </li>
                <li className="border-b pb-3">
                  <Link
                    href="/market-data/calendar/nonfarm-payrolls"
                    className="block hover:bg-gray-50 rounded p-2 -m-2"
                  >
                    <div className="flex justify-between">
                      <p className="font-medium">US Non-Farm Payrolls</p>
                      <p className="text-sm text-gray-500">Friday, 8:30 AM</p>
                    </div>
                    <p className="text-sm text-gray-600">Expected: +180K jobs</p>
                  </Link>
                </li>
                <li className="border-b pb-3">
                  <Link href="/market-data/calendar/ecb-meeting" className="block hover:bg-gray-50 rounded p-2 -m-2">
                    <div className="flex justify-between">
                      <p className="font-medium">ECB Monetary Policy Meeting</p>
                      <p className="text-sm text-gray-500">Thursday, 7:45 AM</p>
                    </div>
                    <p className="text-sm text-gray-600">Expected: No change in rates</p>
                  </Link>
                </li>
                <li>
                  <Link href="/market-data/calendar/us-cpi" className="block hover:bg-gray-50 rounded p-2 -m-2">
                    <div className="flex justify-between">
                      <p className="font-medium">US CPI Data</p>
                      <p className="text-sm text-gray-500">Next Tuesday, 8:30 AM</p>
                    </div>
                    <p className="text-sm text-gray-600">Expected: +0.3% month-over-month</p>
                  </Link>
                </li>
              </ul>
              <Link href="/market-data/calendar" className="text-blue-500 hover:underline mt-4 inline-block">
                View full economic calendar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

