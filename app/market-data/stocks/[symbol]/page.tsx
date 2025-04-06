import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, BarChart2, Clock, ArrowRight } from "lucide-react"

export default function StockDetail({ params }: { params: { symbol: string } }) {
  // This would normally fetch data based on the symbol
  const stockData = {
    symbol: params.symbol,
    name:
      params.symbol === "AAPL"
        ? "Apple Inc."
        : params.symbol === "MSFT"
          ? "Microsoft Corporation"
          : params.symbol === "GOOGL"
            ? "Alphabet Inc."
            : params.symbol === "META"
              ? "Meta Platforms Inc."
              : params.symbol === "AMZN"
                ? "Amazon.com Inc."
                : "Unknown Company",
    price:
      params.symbol === "AAPL"
        ? "$182.63"
        : params.symbol === "MSFT"
          ? "$415.32"
          : params.symbol === "GOOGL"
            ? "$175.89"
            : params.symbol === "META"
              ? "$472.58"
              : params.symbol === "AMZN"
                ? "$182.94"
                : "$100.00",
    change:
      params.symbol === "AAPL"
        ? "+2.45%"
        : params.symbol === "MSFT"
          ? "+1.87%"
          : params.symbol === "GOOGL"
            ? "+1.42%"
            : params.symbol === "META"
              ? "-1.92%"
              : params.symbol === "AMZN"
                ? "-0.87%"
                : "0.00%",
    isPositive: params.symbol === "AAPL" || params.symbol === "MSFT" || params.symbol === "GOOGL",
    volume: "32.5M",
    marketCap: "$2.85T",
    peRatio: "30.2",
    dividend: "0.58%",
    yearHigh: "$198.23",
    yearLow: "$124.17",
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Link href="/market-data" className="text-blue-500 hover:underline mb-4 inline-block">
          ← Back to Market Data
        </Link>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              {stockData.name} ({stockData.symbol})
            </h1>
            <div className="flex items-center mt-2">
              <span className="text-2xl font-bold mr-3">{stockData.price}</span>
              <span className={`text-lg ${stockData.isPositive ? "text-green-500" : "text-red-500"}`}>
                {stockData.change}
              </span>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button className="btn-primary">Buy</button>
            <button className="btn-secondary">Add to Watchlist</button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="relative h-[400px] w-full">
          <Image
            src="/placeholder.svg?height=400&width=1200"
            alt={`${stockData.symbol} Stock Chart`}
            fill
            className="object-contain"
          />
        </div>
        <div className="flex justify-center mt-4">
          <div className="flex space-x-2">
            <button className="px-3 py-1 rounded-md bg-blue-100 text-blue-700 text-sm font-medium">1D</button>
            <button className="px-3 py-1 rounded-md hover:bg-gray-100 text-sm font-medium">1W</button>
            <button className="px-3 py-1 rounded-md hover:bg-gray-100 text-sm font-medium">1M</button>
            <button className="px-3 py-1 rounded-md hover:bg-gray-100 text-sm font-medium">3M</button>
            <button className="px-3 py-1 rounded-md hover:bg-gray-100 text-sm font-medium">6M</button>
            <button className="px-3 py-1 rounded-md hover:bg-gray-100 text-sm font-medium">1Y</button>
            <button className="px-3 py-1 rounded-md hover:bg-gray-100 text-sm font-medium">5Y</button>
            <button className="px-3 py-1 rounded-md hover:bg-gray-100 text-sm font-medium">All</button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">{stockData.volume}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Market Cap</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">{stockData.marketCap}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">P/E Ratio</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">{stockData.peRatio}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Dividend Yield</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">{stockData.dividend}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="overview" className="text-base">
            Overview
          </TabsTrigger>
          <TabsTrigger value="financials" className="text-base">
            Financials
          </TabsTrigger>
          <TabsTrigger value="news" className="text-base">
            News
          </TabsTrigger>
          <TabsTrigger value="analysis" className="text-base">
            Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Company Overview</h2>
            <p className="text-gray-600 mb-6">
              {stockData.name} is a leading technology company that designs, manufactures, and markets consumer
              electronics, software, and online services. The company is known for its innovation and is one of the
              world's most valuable companies.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold mb-3">Key Statistics</h3>
                <div className="space-y-2">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">52-Week High</span>
                    <span className="font-medium">{stockData.yearHigh}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">52-Week Low</span>
                    <span className="font-medium">{stockData.yearLow}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Average Volume</span>
                    <span className="font-medium">45.2M</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">EPS (TTM)</span>
                    <span className="font-medium">$6.05</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Beta</span>
                    <span className="font-medium">1.28</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-3">AI Sentiment Analysis</h3>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                    <span className="font-bold">Bullish</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Our AI analysis indicates a bullish sentiment based on recent earnings reports, analyst upgrades,
                    and positive news sentiment. The company's strong product pipeline and expanding services revenue
                    suggest continued growth potential.
                  </p>
                </div>
                <Link
                  href={`/market-data/stocks/${params.symbol}/sentiment`}
                  className="text-blue-500 hover:underline flex items-center text-sm"
                >
                  View detailed sentiment analysis <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="financials">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Financial Statements</h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 rounded-md bg-blue-100 text-blue-700 text-sm font-medium">
                  Quarterly
                </button>
                <button className="px-3 py-1 rounded-md hover:bg-gray-100 text-sm font-medium">Annual</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Metric</th>
                    <th className="text-right py-3 px-4">Q1 2023</th>
                    <th className="text-right py-3 px-4">Q2 2023</th>
                    <th className="text-right py-3 px-4">Q3 2023</th>
                    <th className="text-right py-3 px-4">Q4 2023</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">Revenue</td>
                    <td className="py-3 px-4 text-right">$94.8B</td>
                    <td className="py-3 px-4 text-right">$81.8B</td>
                    <td className="py-3 px-4 text-right">$89.5B</td>
                    <td className="py-3 px-4 text-right">$119.6B</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">Gross Margin</td>
                    <td className="py-3 px-4 text-right">43.3%</td>
                    <td className="py-3 px-4 text-right">44.3%</td>
                    <td className="py-3 px-4 text-right">45.2%</td>
                    <td className="py-3 px-4 text-right">45.6%</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">Operating Income</td>
                    <td className="py-3 px-4 text-right">$28.3B</td>
                    <td className="py-3 px-4 text-right">$23.1B</td>
                    <td className="py-3 px-4 text-right">$26.4B</td>
                    <td className="py-3 px-4 text-right">$36.0B</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">Net Income</td>
                    <td className="py-3 px-4 text-right">$24.2B</td>
                    <td className="py-3 px-4 text-right">$19.9B</td>
                    <td className="py-3 px-4 text-right">$22.6B</td>
                    <td className="py-3 px-4 text-right">$30.0B</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">EPS (Diluted)</td>
                    <td className="py-3 px-4 text-right">$1.52</td>
                    <td className="py-3 px-4 text-right">$1.26</td>
                    <td className="py-3 px-4 text-right">$1.43</td>
                    <td className="py-3 px-4 text-right">$1.88</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6">
              <Link
                href={`/market-data/stocks/${params.symbol}/financials`}
                className="text-blue-500 hover:underline flex items-center"
              >
                View full financial statements <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="news">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-6">Latest News</h2>

            <div className="space-y-6">
              <div className="border-b pb-6">
                <div className="flex flex-col md:flex-row md:items-start">
                  <div className="relative h-24 w-40 mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                    <Image
                      src="/placeholder.svg?height=96&width=160"
                      alt="News thumbnail"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">
                      <Link href="#" className="hover:text-blue-500">
                        {stockData.name} Reports Record Q1 Earnings, Boosts Dividend
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-2 line-clamp-2">
                      The company reported better-than-expected earnings for the first quarter, with revenue growing 8%
                      year-over-year. The board also approved a 10% increase in the quarterly dividend.
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>2 hours ago</span>
                      <span className="mx-2">•</span>
                      <span>Financial Times</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-b pb-6">
                <div className="flex flex-col md:flex-row md:items-start">
                  <div className="relative h-24 w-40 mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                    <Image
                      src="/placeholder.svg?height=96&width=160"
                      alt="News thumbnail"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">
                      <Link href="#" className="hover:text-blue-500">
                        Analysts Raise Price Targets Following Strong Product Launch
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-2 line-clamp-2">
                      Several Wall Street analysts have raised their price targets for {stockData.symbol} following the
                      successful launch of its latest product line, citing strong consumer demand and positive initial
                      sales data.
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>8 hours ago</span>
                      <span className="mx-2">•</span>
                      <span>Bloomberg</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex flex-col md:flex-row md:items-start">
                  <div className="relative h-24 w-40 mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                    <Image
                      src="/placeholder.svg?height=96&width=160"
                      alt="News thumbnail"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">
                      <Link href="#" className="hover:text-blue-500">
                        {stockData.name} Expands Partnership with Key Supplier
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-2 line-clamp-2">
                      The company announced an expanded partnership with a key component supplier, securing priority
                      access to critical parts amid ongoing supply chain challenges in the industry.
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>1 day ago</span>
                      <span className="mx-2">•</span>
                      <span>Reuters</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href={`/market-data/stocks/${params.symbol}/news`}
                className="text-blue-500 hover:underline flex items-center"
              >
                View all news <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analysis">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-6">Analyst Recommendations</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <span className="text-2xl font-bold text-blue-600">4.2</span>
                  </div>
                  <div>
                    <p className="font-bold text-lg">Buy</p>
                    <p className="text-sm text-gray-600">Average analyst rating</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Strong Buy</span>
                      <span className="text-sm">65%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Buy</span>
                      <span className="text-sm">20%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-300 h-2 rounded-full" style={{ width: "20%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Hold</span>
                      <span className="text-sm">10%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gray-400 h-2 rounded-full" style={{ width: "10%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Sell</span>
                      <span className="text-sm">5%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-300 h-2 rounded-full" style={{ width: "5%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Strong Sell</span>
                      <span className="text-sm">0%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: "0%" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-4">Price Targets</h3>
                <div className="flex items-center justify-between mb-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Low</p>
                    <p className="font-bold text-lg">$150</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Average</p>
                    <p className="font-bold text-lg">$210</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">High</p>
                    <p className="font-bold text-lg">$250</p>
                  </div>
                </div>

                <div className="relative h-[150px] w-full">
                  <Image
                    src="/placeholder.svg?height=150&width=400"
                    alt="Price Target Chart"
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="mt-6">
                  <h3 className="font-bold mb-2">Recent Changes</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center text-sm">
                      <span>Morgan Stanley</span>
                      <span className="font-medium">$230 → $245</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span>Goldman Sachs</span>
                      <span className="font-medium">$215 → $225</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span>JP Morgan</span>
                      <span className="font-medium">$205 → $210</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href={`/market-data/stocks/${params.symbol}/analysis`}
                className="text-blue-500 hover:underline flex items-center"
              >
                View detailed analysis <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-blue-50 p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <BarChart2 className="h-6 w-6 text-blue-500 mr-2" />
          <h2 className="text-xl font-bold">AI-Powered Insights</h2>
        </div>
        <p className="text-gray-700 mb-6">
          Our AI has analyzed recent market trends, news sentiment, and technical indicators for {stockData.symbol}.
          Here are the key insights:
        </p>
        <ul className="space-y-4">
          <li className="flex items-start">
            <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
              <Check className="h-4 w-4 text-blue-500" />
            </div>
            <div>
              <p className="font-medium">
                Strong technical indicators with support at {stockData.isPositive ? "$175" : "$165"} and resistance at{" "}
                {stockData.isPositive ? "$190" : "$180"}.
              </p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
              <Check className="h-4 w-4 text-blue-500" />
            </div>
            <div>
              <p className="font-medium">
                Positive news sentiment with 78% of recent articles showing bullish outlook.
              </p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
              <Check className="h-4 w-4 text-blue-500" />
            </div>
            <div>
              <p className="font-medium">
                Upcoming earnings report expected to exceed analyst expectations based on recent industry trends.
              </p>
            </div>
          </li>
        </ul>
        <div className="mt-6">
          <Link
            href={`/market-data/stocks/${params.symbol}/ai-insights`}
            className="text-blue-500 hover:underline flex items-center"
          >
            View full AI analysis <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

function Check(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

