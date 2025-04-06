import Image from "next/image"
import Link from "next/link"
import { Check } from "lucide-react"

export default function AIAnalysis() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/features" className="text-blue-500 hover:underline mb-4 inline-block">
          ← Back to Features
        </Link>

        <h1 className="text-4xl font-bold mb-6">AI Market Analysis</h1>

        <div className="relative h-[300px] w-full mb-8">
          <Image
            src="/placeholder.svg?height=300&width=800"
            alt="AI Market Analysis Dashboard"
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-6">
            Our advanced AI Market Analysis tool uses cutting-edge machine learning algorithms to analyze market trends,
            predict price movements, and identify investment opportunities with remarkable accuracy.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Key Benefits</h2>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span>Real-time market data analysis from global financial markets</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span>Predictive analytics with up to 92% accuracy for short-term market movements</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span>Sentiment analysis of news, social media, and financial reports</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span>Personalized insights based on your investment preferences and risk tolerance</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span>Automated alerts for significant market events and opportunities</span>
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">How It Works</h2>

          <p className="mb-4">
            Our AI Market Analysis tool processes vast amounts of financial data in real-time, including:
          </p>

          <ul className="list-disc pl-6 mb-6">
            <li>Price movements across multiple timeframes</li>
            <li>Trading volume and liquidity metrics</li>
            <li>Technical indicators and chart patterns</li>
            <li>Fundamental data from company reports</li>
            <li>Economic indicators and central bank policies</li>
            <li>News sentiment and social media trends</li>
          </ul>

          <p className="mb-8">
            The system then applies advanced machine learning models to identify patterns, correlations, and anomalies
            that might indicate future market movements. These insights are presented in an intuitive dashboard with
            actionable recommendations tailored to your investment strategy.
          </p>

          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-bold mb-3">Did You Know?</h3>
            <p>
              Users of our AI Market Analysis tool report making 27% more informed investment decisions and achieving an
              average of 18% better returns compared to their previous strategies.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Ready to experience the power of AI-driven market analysis?</h2>

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

