import Image from "next/image"
import Link from "next/link"
import { Check, PieChart, ArrowRight } from "lucide-react"

export default function PortfolioManagement() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/features" className="text-blue-500 hover:underline mb-4 inline-block">
          ← Back to Features
        </Link>

        <h1 className="text-4xl font-bold mb-6">Portfolio Management</h1>

        <div className="relative h-[300px] w-full mb-8">
          <Image
            src="/placeholder.svg?height=300&width=800"
            alt="Portfolio Management Dashboard"
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-6">
            Our Portfolio Management tools help you track, analyze, and optimize your investments with personalized
            recommendations based on your financial goals and risk tolerance.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Key Features</h2>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span>Comprehensive portfolio tracking across multiple accounts and asset classes</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span>Performance analytics with detailed metrics and benchmarking</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span>Risk assessment and diversification analysis</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span>AI-powered rebalancing recommendations</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span>Tax optimization strategies</span>
            </li>
          </ul>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <PieChart className="h-6 w-6 text-blue-500 mr-2" />
                <h3 className="text-xl font-bold">Asset Allocation</h3>
              </div>
              <p className="mb-4">
                Visualize your portfolio's asset allocation and receive recommendations to optimize your diversification
                based on your risk profile.
              </p>
              <Link
                href="/features/portfolio-management/asset-allocation"
                className="text-blue-500 hover:underline flex items-center"
              >
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <PieChart className="h-6 w-6 text-blue-500 mr-2" />
                <h3 className="text-xl font-bold">Performance Tracking</h3>
              </div>
              <p className="mb-4">
                Monitor your portfolio's performance over time with detailed metrics, including returns, volatility, and
                comparison to benchmarks.
              </p>
              <Link
                href="/features/portfolio-management/performance"
                className="text-blue-500 hover:underline flex items-center"
              >
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">How It Works</h2>

          <div className="relative h-[400px] w-full mb-8">
            <Image
              src="/placeholder.svg?height=400&width=800"
              alt="Portfolio Management Process"
              fill
              className="object-contain"
            />
          </div>

          <ol className="list-decimal pl-6 mb-8 space-y-4">
            <li>
              <strong>Connect Your Accounts</strong> - Securely link your brokerage accounts, retirement plans, and
              other investment accounts to get a holistic view of your portfolio.
            </li>
            <li>
              <strong>Analyze Your Portfolio</strong> - Our AI analyzes your current investments, asset allocation, risk
              exposure, and performance metrics.
            </li>
            <li>
              <strong>Receive Personalized Recommendations</strong> - Based on your financial goals and risk tolerance,
              our system provides tailored recommendations to optimize your portfolio.
            </li>
            <li>
              <strong>Implement Changes</strong> - Execute recommended trades directly through our platform or use our
              guidance to make changes through your existing brokerages.
            </li>
            <li>
              <strong>Monitor and Adjust</strong> - Continuously track your portfolio's performance and receive alerts
              when rebalancing or adjustments are needed.
            </li>
          </ol>

          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-bold mb-3">Success Story</h3>
            <p className="italic mb-4">
              "I've been using FinAI Advisor's portfolio management tools for the past year, and it's completely
              transformed how I manage my investments. The AI recommendations helped me optimize my asset allocation,
              resulting in a 15% increase in returns while actually reducing my portfolio's volatility."
            </p>
            <p className="font-medium">- Michael T., Software Engineer</p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Ready to optimize your investment portfolio?</h2>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/signup" className="btn-primary">
              Get Started
            </Link>
            <Link href="/demo" className="btn-secondary">
              Request a Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

