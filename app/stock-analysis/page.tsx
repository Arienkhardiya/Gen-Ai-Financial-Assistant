import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, BarChart2, PieChart } from "lucide-react"

export default function StockAnalysis() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Stock Analysis</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Get comprehensive stock analysis powered by AI to make informed investment decisions.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <Link href="/stock-analysis/gainers" className="block">
          <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl flex items-center">
                <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                Top Gainers
              </CardTitle>
              <CardDescription>Stocks with the highest daily gains</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">AAPL</p>
                    <p className="text-sm text-gray-500">Apple Inc.</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$182.63</p>
                    <p className="text-sm text-green-500">+2.45%</p>
                  </div>
                </li>
                <li className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">MSFT</p>
                    <p className="text-sm text-gray-500">Microsoft Corp.</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$415.32</p>
                    <p className="text-sm text-green-500">+1.87%</p>
                  </div>
                </li>
                <li className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">NVDA</p>
                    <p className="text-sm text-gray-500">NVIDIA Corp.</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$950.12</p>
                    <p className="text-sm text-green-500">+1.65%</p>
                  </div>
                </li>
                <li className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">GOOGL</p>
                    <p className="text-sm text-gray-500">Alphabet Inc.</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$175.89</p>
                    <p className="text-sm text-green-500">+1.42%</p>
                  </div>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <span className="text-blue-500 hover:underline text-sm">View all gainers →</span>
            </CardFooter>
          </Card>
        </Link>

        <Link href="/stock-analysis/losers" className="block">
          <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl flex items-center">
                <TrendingDown className="h-5 w-5 text-red-500 mr-2" />
                Top Losers
              </CardTitle>
              <CardDescription>Stocks with the highest daily losses</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">META</p>
                    <p className="text-sm text-gray-500">Meta Platforms Inc.</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$472.58</p>
                    <p className="text-sm text-red-500">-1.92%</p>
                  </div>
                </li>
                <li className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">NFLX</p>
                    <p className="text-sm text-gray-500">Netflix Inc.</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$625.43</p>
                    <p className="text-sm text-red-500">-1.45%</p>
                  </div>
                </li>
                <li className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">TSLA</p>
                    <p className="text-sm text-gray-500">Tesla Inc.</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$178.21</p>
                    <p className="text-sm text-red-500">-1.23%</p>
                  </div>
                </li>
                <li className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">AMZN</p>
                    <p className="text-sm text-gray-500">Amazon.com Inc.</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$182.94</p>
                    <p className="text-sm text-red-500">-0.87%</p>
                  </div>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <span className="text-blue-500 hover:underline text-sm">View all losers →</span>
            </CardFooter>
          </Card>
        </Link>

        <Link href="/stock-analysis/recommendations" className="block">
          <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl flex items-center">
                <DollarSign className="h-5 w-5 text-blue-500 mr-2" />
                AI Recommendations
              </CardTitle>
              <CardDescription>Stocks our AI suggests to watch</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">AMD</p>
                    <p className="text-sm text-gray-500">Advanced Micro Devices</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$162.45</p>
                    <p className="text-sm text-blue-500">Strong Buy</p>
                  </div>
                </li>
                <li className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">PYPL</p>
                    <p className="text-sm text-gray-500">PayPal Holdings Inc.</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$65.32</p>
                    <p className="text-sm text-blue-500">Buy</p>
                  </div>
                </li>
                <li className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">DIS</p>
                    <p className="text-sm text-gray-500">Walt Disney Co.</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$112.78</p>
                    <p className="text-sm text-blue-500">Buy</p>
                  </div>
                </li>
                <li className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">INTC</p>
                    <p className="text-sm text-gray-500">Intel Corp.</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$32.15</p>
                    <p className="text-sm text-blue-500">Hold</p>
                  </div>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <span className="text-blue-500 hover:underline text-sm">View all recommendations →</span>
            </CardFooter>
          </Card>
        </Link>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Market Overview</h2>
        <Link href="/stock-analysis/market-overview">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-500">S&P 500</p>
                <p className="text-2xl font-bold">4,738.32</p>
                <p className="text-sm text-green-500">+1.23%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">NASDAQ</p>
                <p className="text-2xl font-bold">16,482.91</p>
                <p className="text-sm text-green-500">+0.87%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">DOW</p>
                <p className="text-2xl font-bold">37,863.80</p>
                <p className="text-sm text-green-500">+0.52%</p>
              </div>
            </div>
            <div className="relative h-[300px] w-full">
              <Image src="/placeholder.svg?height=300&width=1000" alt="Market Chart" fill className="object-contain" />
            </div>
          </div>
        </Link>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Detailed Analysis</h2>
        <Tabs defaultValue="technical">
          <TabsList className="mb-6">
            <TabsTrigger value="technical" className="text-base">
              Technical Analysis
            </TabsTrigger>
            <TabsTrigger value="fundamental" className="text-base">
              Fundamental Analysis
            </TabsTrigger>
            <TabsTrigger value="sentiment" className="text-base">
              Sentiment Analysis
            </TabsTrigger>
          </TabsList>
          <TabsContent value="technical">
            <Link href="/stock-analysis/technical">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center mb-4">
                  <BarChart2 className="h-6 w-6 text-blue-500 mr-2" />
                  <h3 className="text-xl font-bold">Technical Indicators</h3>
                </div>
                <p className="mb-4">
                  Our AI analyzes technical indicators including moving averages, RSI, MACD, and Bollinger Bands to
                  identify potential entry and exit points.
                </p>
                <div className="relative h-[300px] w-full">
                  <Image
                    src="/placeholder.svg?height=300&width=1000"
                    alt="Technical Analysis Chart"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </Link>
          </TabsContent>
          <TabsContent value="fundamental">
            <Link href="/stock-analysis/fundamental">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center mb-4">
                  <DollarSign className="h-6 w-6 text-blue-500 mr-2" />
                  <h3 className="text-xl font-bold">Fundamental Analysis</h3>
                </div>
                <p className="mb-4">
                  Evaluate companies based on financial statements, earnings reports, P/E ratios, and other fundamental
                  metrics to determine intrinsic value.
                </p>
                <div className="relative h-[300px] w-full">
                  <Image
                    src="/placeholder.svg?height=300&width=1000"
                    alt="Fundamental Analysis Chart"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </Link>
          </TabsContent>
          <TabsContent value="sentiment">
            <Link href="/stock-analysis/sentiment">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center mb-4">
                  <PieChart className="h-6 w-6 text-blue-500 mr-2" />
                  <h3 className="text-xl font-bold">Sentiment Analysis</h3>
                </div>
                <p className="mb-4">
                  Our AI scans news articles, social media, and analyst reports to gauge market sentiment and predict
                  potential price movements.
                </p>
                <div className="relative h-[300px] w-full">
                  <Image
                    src="/placeholder.svg?height=300&width=1000"
                    alt="Sentiment Analysis Chart"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </Link>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

