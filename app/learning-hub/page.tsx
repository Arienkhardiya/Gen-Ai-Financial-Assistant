import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Video, FileText, Users, ArrowRight } from "lucide-react"

export default function LearningHub() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Learning Hub</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Enhance your financial knowledge with our comprehensive learning resources designed for investors of all
          levels.
        </p>
      </div>

      <Tabs defaultValue="courses" className="mb-16">
        <TabsList className="mb-6">
          <TabsTrigger value="courses" className="text-base">
            Courses
          </TabsTrigger>
          <TabsTrigger value="articles" className="text-base">
            Articles
          </TabsTrigger>
          <TabsTrigger value="videos" className="text-base">
            Videos
          </TabsTrigger>
          <TabsTrigger value="webinars" className="text-base">
            Webinars
          </TabsTrigger>
        </TabsList>

        <TabsContent value="courses">
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/learning-hub/courses/investing-fundamentals" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="bg-blue-100 p-2 rounded-full w-fit mb-2">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                  </div>
                  <CardTitle>Investing Fundamentals</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Learn the basics of investing, including stocks, bonds, mutual funds, and ETFs. Perfect for
                    beginners.
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span className="mr-4">8 Modules</span>
                    <span>4.5 Hours</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "0%" }}></div>
                  </div>
                  <p className="text-xs text-gray-500">Not started</p>
                </CardContent>
                <CardFooter>
                  <span className="text-blue-500 hover:underline">Start Course</span>
                </CardFooter>
              </Card>
            </Link>

            <Link href="/learning-hub/courses/technical-analysis" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="bg-blue-100 p-2 rounded-full w-fit mb-2">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                  </div>
                  <CardTitle>Technical Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Master the art of reading charts and using technical indicators to make better trading decisions.
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span className="mr-4">12 Modules</span>
                    <span>6.5 Hours</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "35%" }}></div>
                  </div>
                  <p className="text-xs text-gray-500">35% complete</p>
                </CardContent>
                <CardFooter>
                  <span className="text-blue-500 hover:underline">Continue Course</span>
                </CardFooter>
              </Card>
            </Link>

            <Link href="/learning-hub/courses/retirement-planning" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="bg-blue-100 p-2 rounded-full w-fit mb-2">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                  </div>
                  <CardTitle>Retirement Planning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Develop a comprehensive retirement strategy to ensure financial security in your golden years.
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span className="mr-4">10 Modules</span>
                    <span>5 Hours</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "0%" }}></div>
                  </div>
                  <p className="text-xs text-gray-500">Not started</p>
                </CardContent>
                <CardFooter>
                  <span className="text-blue-500 hover:underline">Start Course</span>
                </CardFooter>
              </Card>
            </Link>
          </div>
          <div className="text-center mt-8">
            <Link
              href="/learning-hub/courses"
              className="text-blue-500 hover:underline flex items-center justify-center"
            >
              View all courses <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </TabsContent>

        <TabsContent value="articles">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <FileText className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="text-xl font-bold">Featured Articles</h3>
              </div>
              <ul className="space-y-4">
                <li className="border-b pb-4">
                  <Link
                    href="/learning-hub/articles/market-volatility"
                    className="block hover:bg-gray-50 rounded p-2 -m-2"
                  >
                    <h4 className="font-medium mb-1">Navigating Market Volatility: Strategies for Uncertain Times</h4>
                    <p className="text-sm text-gray-600">
                      Learn how to protect your portfolio during market downturns and position yourself for recovery.
                    </p>
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <span>10 min read</span>
                      <span className="mx-2">•</span>
                      <span>May 15, 2023</span>
                    </div>
                  </Link>
                </li>
                <li className="border-b pb-4">
                  <Link href="/learning-hub/articles/ai-investing" className="block hover:bg-gray-50 rounded p-2 -m-2">
                    <h4 className="font-medium mb-1">The Rise of AI in Investment Decision-Making</h4>
                    <p className="text-sm text-gray-600">
                      Discover how artificial intelligence is transforming the investment landscape and what it means
                      for individual investors.
                    </p>
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <span>8 min read</span>
                      <span className="mx-2">•</span>
                      <span>April 28, 2023</span>
                    </div>
                  </Link>
                </li>
                <li className="border-b pb-4">
                  <Link
                    href="/learning-hub/articles/tax-strategies"
                    className="block hover:bg-gray-50 rounded p-2 -m-2"
                  >
                    <h4 className="font-medium mb-1">Tax-Efficient Investing: Maximizing Your After-Tax Returns</h4>
                    <p className="text-sm text-gray-600">
                      Learn strategies to minimize your tax burden and keep more of your investment returns.
                    </p>
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <span>12 min read</span>
                      <span className="mx-2">•</span>
                      <span>April 10, 2023</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/learning-hub/articles/crypto-investing"
                    className="block hover:bg-gray-50 rounded p-2 -m-2"
                  >
                    <h4 className="font-medium mb-1">Cryptocurrency Investing: Beyond Bitcoin</h4>
                    <p className="text-sm text-gray-600">
                      Explore the world of alternative cryptocurrencies and blockchain technologies with investment
                      potential.
                    </p>
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <span>15 min read</span>
                      <span className="mx-2">•</span>
                      <span>March 22, 2023</span>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="flex items-center mb-4">
                  <FileText className="h-5 w-5 text-blue-500 mr-2" />
                  <h3 className="text-xl font-bold">Popular Categories</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    href="/learning-hub/articles/category/investing-basics"
                    className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <h4 className="font-medium mb-1">Investing Basics</h4>
                    <p className="text-sm text-gray-600">24 articles</p>
                  </Link>
                  <Link
                    href="/learning-hub/articles/category/market-analysis"
                    className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <h4 className="font-medium mb-1">Market Analysis</h4>
                    <p className="text-sm text-gray-600">18 articles</p>
                  </Link>
                  <Link
                    href="/learning-hub/articles/category/retirement"
                    className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <h4 className="font-medium mb-1">Retirement</h4>
                    <p className="text-sm text-gray-600">15 articles</p>
                  </Link>
                  <Link
                    href="/learning-hub/articles/category/tax-planning"
                    className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <h4 className="font-medium mb-1">Tax Planning</h4>
                    <p className="text-sm text-gray-600">12 articles</p>
                  </Link>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Weekly Newsletter</h3>
                <p className="text-gray-600 mb-4">
                  Subscribe to our weekly newsletter for the latest financial insights and market analysis.
                </p>
                <form className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link
              href="/learning-hub/articles"
              className="text-blue-500 hover:underline flex items-center justify-center"
            >
              View all articles <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </TabsContent>

        <TabsContent value="videos">
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/learning-hub/videos/market-cycles" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative h-48">
                  <Image
                    src="/placeholder.svg?height=192&width=384"
                    alt="Video thumbnail"
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white bg-opacity-80 rounded-full p-3">
                      <Video className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Understanding Market Cycles</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-2">
                    Learn how to identify different market cycles and adjust your investment strategy accordingly.
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>18:45</span>
                    <span className="mx-2">•</span>
                    <span>May 10, 2023</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <span className="text-blue-500 hover:underline">Watch Video</span>
                </CardFooter>
              </Card>
            </Link>

            <Link href="/learning-hub/videos/fundamental-analysis" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative h-48">
                  <Image
                    src="/placeholder.svg?height=192&width=384"
                    alt="Video thumbnail"
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white bg-opacity-80 rounded-full p-3">
                      <Video className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Fundamental Analysis Deep Dive</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-2">
                    A comprehensive guide to analyzing company financials and determining intrinsic value.
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>24:12</span>
                    <span className="mx-2">•</span>
                    <span>April 22, 2023</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <span className="text-blue-500 hover:underline">Watch Video</span>
                </CardFooter>
              </Card>
            </Link>

            <Link href="/learning-hub/videos/diversified-portfolio" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative h-48">
                  <Image
                    src="/placeholder.svg?height=192&width=384"
                    alt="Video thumbnail"
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white bg-opacity-80 rounded-full p-3">
                      <Video className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Building a Diversified Portfolio</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-2">
                    Learn how to create a well-balanced portfolio that can weather market volatility.
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>21:35</span>
                    <span className="mx-2">•</span>
                    <span>April 5, 2023</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <span className="text-blue-500 hover:underline">Watch Video</span>
                </CardFooter>
              </Card>
            </Link>
          </div>
          <div className="text-center mt-8">
            <Link
              href="/learning-hub/videos"
              className="text-blue-500 hover:underline flex items-center justify-center"
            >
              View all videos <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </TabsContent>

        <TabsContent value="webinars">
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="flex items-center mb-6">
              <Users className="h-6 w-6 text-blue-500 mr-2" />
              <h3 className="text-xl font-bold">Upcoming Webinars</h3>
            </div>

            <div className="space-y-6">
              <div className="border-b pb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-medium">Market Outlook 2023: Navigating Uncertainty</h4>
                    <p className="text-gray-600">
                      Join our expert panel as they discuss the market outlook for the remainder of 2023.
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Live</span>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 mb-2 md:mb-0">
                    <span>May 25, 2023</span>
                    <span className="mx-2">•</span>
                    <span>2:00 PM EST</span>
                    <span className="mx-2">•</span>
                    <span>60 minutes</span>
                  </div>
                  <Link href="/learning-hub/webinars/register/market-outlook" className="text-blue-500 hover:underline">
                    Register Now
                  </Link>
                </div>
              </div>

              <div className="border-b pb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-medium">Retirement Planning in Your 40s and 50s</h4>
                    <p className="text-gray-600">
                      Essential strategies for maximizing retirement savings in your peak earning years.
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Live</span>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 mb-2 md:mb-0">
                    <span>June 8, 2023</span>
                    <span className="mx-2">•</span>
                    <span>1:00 PM EST</span>
                    <span className="mx-2">•</span>
                    <span>45 minutes</span>
                  </div>
                  <Link
                    href="/learning-hub/webinars/register/retirement-planning"
                    className="text-blue-500 hover:underline"
                  >
                    Register Now
                  </Link>
                </div>
              </div>

              <div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-medium">AI-Powered Investing: The Future of Finance</h4>
                    <p className="text-gray-600">
                      Discover how AI is revolutionizing investment strategies and decision-making.
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Live</span>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 mb-2 md:mb-0">
                    <span>June 15, 2023</span>
                    <span className="mx-2">•</span>
                    <span>3:00 PM EST</span>
                    <span className="mx-2">•</span>
                    <span>60 minutes</span>
                  </div>
                  <Link href="/learning-hub/webinars/register/ai-investing" className="text-blue-500 hover:underline">
                    Register Now
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-6">
              <Video className="h-6 w-6 text-blue-500 mr-2" />
              <h3 className="text-xl font-bold">On-Demand Webinars</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Link
                href="/learning-hub/webinars/tax-efficient-investing"
                className="border p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <h4 className="font-medium mb-2">Tax-Efficient Investing Strategies</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Learn how to minimize taxes and maximize returns in your investment portfolio.
                </p>
                <div className="flex items-center text-xs text-gray-500 mb-3">
                  <span>Recorded: April 12, 2023</span>
                  <span className="mx-2">•</span>
                  <span>55 minutes</span>
                </div>
                <span className="text-blue-500 hover:underline text-sm">Watch Recording</span>
              </Link>

              <Link
                href="/learning-hub/webinars/esg-investing"
                className="border p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <h4 className="font-medium mb-2">ESG Investing: Profit with Purpose</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Explore how to align your investments with your values while still achieving strong returns.
                </p>
                <div className="flex items-center text-xs text-gray-500 mb-3">
                  <span>Recorded: March 28, 2023</span>
                  <span className="mx-2">•</span>
                  <span>48 minutes</span>
                </div>
                <span className="text-blue-500 hover:underline text-sm">Watch Recording</span>
              </Link>

              <Link
                href="/learning-hub/webinars/crypto-101"
                className="border p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <h4 className="font-medium mb-2">Crypto 101: Understanding Digital Assets</h4>
                <p className="text-sm text-gray-600 mb-3">
                  A beginner's guide to cryptocurrency, blockchain technology, and digital asset investing.
                </p>
                <div className="flex items-center text-xs text-gray-500 mb-3">
                  <span>Recorded: March 15, 2023</span>
                  <span className="mx-2">•</span>
                  <span>62 minutes</span>
                </div>
                <span className="text-blue-500 hover:underline text-sm">Watch Recording</span>
              </Link>

              <Link
                href="/learning-hub/webinars/estate-planning"
                className="border p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <h4 className="font-medium mb-2">Estate Planning Essentials</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Key strategies for protecting your assets and providing for your loved ones.
                </p>
                <div className="flex items-center text-xs text-gray-500 mb-3">
                  <span>Recorded: February 22, 2023</span>
                  <span className="mx-2">•</span>
                  <span>50 minutes</span>
                </div>
                <span className="text-blue-500 hover:underline text-sm">Watch Recording</span>
              </Link>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/learning-hub/webinars"
              className="text-blue-500 hover:underline flex items-center justify-center"
            >
              View all webinars <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-blue-50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Enhance Your Financial Knowledge</h2>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
          Join our community of learners and gain access to premium educational content designed to help you make
          smarter financial decisions.
        </p>
        <Link href="/signup" className="btn-primary">
          Join Free for 7 Days
        </Link>
      </div>
    </div>
  )
}

