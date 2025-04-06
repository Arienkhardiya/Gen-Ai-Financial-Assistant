import Image from "next/image"
import Link from "next/link"
import { Check, TrendingUp, Bell, ArrowRight } from "lucide-react"

export default function StockTracking() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/features" className="text-blue-500 hover:underline mb-4 inline-block">
          ← Back to Features
        </Link>

        <h1 className="text-4xl font-bold mb-6">Stock Tracking</h1>

        <div className="relative h-[300px] w-full mb-8">
          <Image
            src="/placeholder.svg?height=300&width=800"
            alt="Stock Tracking Dashboard"
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-6">
            Our advanced Stock Tracking tools allow you to monitor your favorite stocks in real-time, receive
            personalized alerts, and access detailed analytics to make informed investment decisions.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Key Features</h2>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span>Real-time stock price monitoring with customizable watchlists</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span>Personalized price alerts and notifications for important events</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span>Technical and fundamental analysis tools</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span>Earnings reports and corporate event tracking</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span>AI-powered stock recommendations based on your preferences</span>
            </li>
          </ul>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <TrendingUp className="h-6 w-6 text-blue-500 mr-2" />
                <h3 className="text-xl font-bold">Advanced Charts</h3>
              </div>
              <p className="mb-4">
                Access interactive charts with multiple timeframes, technical indicators, and drawing tools to analyze
                stock price movements and identify trends.
              </p>
              <Link href="/features/stock-tracking/charts" className="text-blue-500 hover:underline flex items-center">
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Bell className="h-6 w-6 text-blue-500 mr-2" />
                <h3 className="text-xl font-bold">Smart Alerts</h3>
              </div>
              <p className="mb-4">
                Set up customizable alerts for price movements, technical indicators, news events, and more to stay
                informed about important changes in your watched stocks.
              </p>
              <Link href="/features/stock-tracking/alerts" className="text-blue-500 hover:underline flex items-center">
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">How It Works</h2>

          <div className="relative h-[400px] w-full mb-8">
            <Image
              src="/placeholder.svg?height=400&width=800"
              alt="Stock Tracking Process"
              fill
              className="object-contain"
            />
          </div>

          <ol className="list-decimal pl-6 mb-8 space-y-4">
            <li>
              <strong>Create Watchlists</strong> - Organize stocks into customized watchlists based on sectors,
              strategies, or personal preferences.
            </li>
            <li>
              <strong>Set Up Alerts</strong> - Configure personalized alerts for price movements, volume changes,
              technical indicators, and news events.
            </li>
            <li>
              <strong>Monitor in Real-Time</strong> - Track your watchlists with real-time data updates and interactive
              charts.
            </li>
            <li>
              <strong>Analyze Performance</strong> - Use our comprehensive analysis tools to evaluate stock performance,
              compare metrics, and identify opportunities.
            </li>
            <li>
              <strong>Act on Insights</strong> - Make informed investment decisions based on real-time data, alerts, and
              AI-powered recommendations.
            </li>
          </ol>

          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-bold mb-3">User Testimonial</h3>
            <p className="italic mb-4">
              "The stock tracking features on FinAI Advisor have completely changed how I monitor my investments. The
              real-time alerts helped me catch a major price movement in one of my holdings, allowing me to lock in
              profits before a significant pullback."
            </p>
            <p className="font-medium">- Jennifer K., Day Trader</p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Ready to track your stocks like a pro?</h2>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/signup" className="btn-primary">
              Get Started
            </Link>
            <Link href="/demo" className="btn-secondary">
              Schedule a Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

