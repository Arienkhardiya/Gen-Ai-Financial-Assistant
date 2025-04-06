"use client"

import Link from "next/link"
import Image from "next/image"
import { BarChart2, PieChart, TrendingUp, DollarSign, ArrowRight, Brain, Sparkles } from "lucide-react"
import { FeatureCard } from "@/components/feature-card"
import { StatsCard } from "@/components/stats-card"
import { AIInsightCard } from "@/components/ai-insight-card"
import { MarketChart } from "@/components/market-chart"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { AnimatedGradientBackground } from "@/components/animated-gradient-background"

// Generate fake chart data
const generateChartData = (days: number, trend: "up" | "down" | "volatile") => {
  const data = []
  let value = 100 + Math.random() * 50

  for (let i = 0; i < days; i++) {
    const date = new Date()
    date.setDate(date.getDate() - (days - i - 1))

    if (trend === "up") {
      value += Math.random() * 3 - 0.5 // Mostly up
    } else if (trend === "down") {
      value -= Math.random() * 3 - 0.5 // Mostly down
    } else {
      value += Math.random() * 8 - 4 // Volatile
    }

    data.push({
      date: date.toISOString().split("T")[0],
      value: Math.max(50, value),
    })
  }

  return data
}

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <AnimatedGradientBackground className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Badge variant="info" className="mb-4">
                AI-Powered Finance
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Revolutionize Your <span className="text-blue-200">Financial Future</span> with AI
              </h1>
              <p className="text-lg text-blue-50 mb-8">
                Get personalized financial advice, real-time stock market analysis, and expert insights—all powered by
                advanced AI technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/signup" className="btn-primary inline-block">
                    Get Started Free
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/login"
                    className="btn-secondary bg-white/20 backdrop-blur-sm flex items-center justify-center border-white/30 text-white hover:bg-white/30"
                  >
                    Log in <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative h-[300px] md:h-[400px]"
            >
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Financial dashboard"
                fill
                className="object-contain"
              />

              {/* Floating elements */}
              <motion.div
                className="absolute top-10 right-10 bg-white rounded-lg shadow-lg p-3 z-10"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4 }}
              >
                <TrendingUp className="h-5 w-5 text-green-500" />
              </motion.div>

              <motion.div
                className="absolute bottom-20 left-5 bg-white rounded-lg shadow-lg p-3 z-10"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5 }}
              >
                <Brain className="h-5 w-5 text-blue-500" />
              </motion.div>

              <motion.div
                className="absolute bottom-40 right-20 bg-white rounded-lg shadow-lg p-3 z-10"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3.5 }}
              >
                <DollarSign className="h-5 w-5 text-amber-500" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </AnimatedGradientBackground>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="secondary" className="mb-2">
                Powered by AI
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Smart Financial Tools at Your Fingertips</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our platform leverages cutting-edge artificial intelligence to provide you with actionable insights and
                powerful financial tools.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <FeatureCard
                icon={<BarChart2 className="h-6 w-6 text-blue-500" />}
                title="AI Market Analysis"
                description="Get real-time insights and predictions based on advanced AI algorithms analyzing market trends."
                link="/features/ai-analysis"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <FeatureCard
                icon={<PieChart className="h-6 w-6 text-blue-500" />}
                title="Portfolio Management"
                description="Track and optimize your investments with personalized recommendations tailored to your goals."
                link="/features/portfolio-management"
                hoverColor="rgba(59, 130, 246, 0.08)"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <FeatureCard
                icon={<TrendingUp className="h-6 w-6 text-blue-500" />}
                title="Stock Tracking"
                description="Monitor your favorite stocks and receive alerts on important changes and market movements."
                link="/features/stock-tracking"
                hoverColor="rgba(59, 130, 246, 0.06)"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <FeatureCard
                icon={<DollarSign className="h-6 w-6 text-blue-500" />}
                title="Budgeting Tools"
                description="Plan and track your expenses with smart budgeting recommendations to help you save more."
                link="/features/budgeting-tools"
                hoverColor="rgba(59, 130, 246, 0.04)"
              />
            </motion.div>
          </div>

          <div className="text-center mt-12">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <Link href="/features" className="btn-primary">
                Explore All Features
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Market Overview Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="mb-2">
                Real-time Data
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Market Overview</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Stay informed with real-time market data and AI-powered insights
              </p>
            </motion.div>
          </div>

          <div className="mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <MarketChart data={generateChartData(30, "up")} name="S&P 500" symbol="SPY" color="#22c55e" />
            </motion.div>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <StatsCard
                title="Active Users"
                value="10K+"
                change="+24%"
                changeType="increase"
                description="Month over month"
                icon={<Users className="h-5 w-5" />}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <StatsCard
                title="AI Insights Generated"
                value="5M+"
                change="+42%"
                changeType="increase"
                description="Last 30 days"
                icon={<Brain className="h-5 w-5" />}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <StatsCard
                title="Prediction Accuracy"
                value="92%"
                change="+3.5%"
                changeType="increase"
                description="Year over year"
                icon={<Sparkles className="h-5 w-5" />}
                info="Based on our backtesting of market prediction algorithms across major indices"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <StatsCard
                title="Markets Analyzed"
                value="50+"
                change="Global coverage"
                description="Across 15 countries"
                icon={<Globe className="h-5 w-5" />}
              />
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <AIInsightCard
                title="Market Trend Analysis"
                summary="Based on recent market data and economic indicators, our AI has identified the following insights for your consideration."
                insights={[
                  {
                    text: "Technology sector showing strong momentum with potential for continued growth",
                    type: "positive",
                  },
                  { text: "Recent volatility in energy stocks suggests caution", type: "negative" },
                  { text: "Healthcare stocks appear undervalued based on fundamentals", type: "positive" },
                  { text: "Bond yields indicate potential interest rate stabilization", type: "neutral" },
                ]}
                confidence={87}
                actionText="View Detailed Analysis"
                onAction={() => (window.location.href = "/market-data")}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <AIInsightCard
                title="Portfolio Optimization"
                summary="Our AI has analyzed typical investment portfolios and identified potential improvements to maximize returns while managing risk."
                insights={[
                  { text: "Portfolios are currently overweight in large-cap tech stocks", type: "negative" },
                  { text: "Increasing international exposure could improve diversification", type: "positive" },
                  { text: "Allocation to alternatives may help hedge against inflation", type: "positive" },
                  { text: "Bond duration adjustment recommended given yield curve", type: "neutral" },
                ]}
                confidence={92}
                actionText="Get Personalized Insights"
                onAction={() => (window.location.href = "/signup")}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-500 text-white">
        <div className="container mx-auto px-4 text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-white"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-white"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative z-10"
          >
            <Badge variant="secondary" className="bg-white/20 text-white border-white/20 mb-4">
              Start Your Journey
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your financial future?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of investors who are making smarter decisions with FinAI Advisor.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <Link
                href="/signup"
                className="bg-white text-blue-500 hover:bg-blue-50 font-medium py-3 px-8 rounded-md transition-colors inline-block shadow-lg"
              >
                Get Started Free
              </Link>
            </motion.div>

            <div className="mt-8 pt-8 border-t border-white/20 max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                <div className="flex items-center">
                  <img src="/placeholder.svg?height=40&width=40" alt="Avatar" className="w-10 h-10 rounded-full mr-3" />
                  <p className="text-sm">"The AI recommendations have been incredibly accurate."</p>
                </div>
                <div className="flex items-center">
                  <img src="/placeholder.svg?height=40&width=40" alt="Avatar" className="w-10 h-10 rounded-full mr-3" />
                  <p className="text-sm">"My portfolio performance improved by 24% in 6 months."</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

function Users(props) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function Globe(props) {
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
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

