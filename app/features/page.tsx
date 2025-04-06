import Link from "next/link"
import { BarChart2, PieChart, TrendingUp, DollarSign, Shield, Clock, Users, BookOpen } from "lucide-react"

export default function Features() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Features</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Discover the powerful tools and features that make FinAI Advisor the leading AI-powered financial assistant.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Link href="/features/ai-analysis" className="feature-card">
          <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
            <BarChart2 className="h-6 w-6 text-blue-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">AI Market Analysis</h3>
          <p className="text-gray-600 mb-4">
            Get real-time insights and predictions based on advanced AI algorithms that analyze market trends and
            patterns.
          </p>
          <span className="text-blue-500 font-medium flex items-center">
            Learn more <ArrowRight className="ml-2 h-4 w-4" />
          </span>
        </Link>

        <Link href="/features/portfolio-management" className="feature-card">
          <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
            <PieChart className="h-6 w-6 text-blue-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">Portfolio Management</h3>
          <p className="text-gray-600 mb-4">
            Track and optimize your investments with personalized recommendations based on your financial goals.
          </p>
          <span className="text-blue-500 font-medium flex items-center">
            Learn more <ArrowRight className="ml-2 h-4 w-4" />
          </span>
        </Link>

        <Link href="/features/stock-tracking" className="feature-card">
          <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
            <TrendingUp className="h-6 w-6 text-blue-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">Stock Tracking</h3>
          <p className="text-gray-600 mb-4">
            Monitor your favorite stocks and receive alerts on important changes, earnings reports, and market
            movements.
          </p>
          <span className="text-blue-500 font-medium flex items-center">
            Learn more <ArrowRight className="ml-2 h-4 w-4" />
          </span>
        </Link>

        <Link href="/features/budgeting-tools" className="feature-card">
          <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
            <DollarSign className="h-6 w-6 text-blue-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">Budgeting Tools</h3>
          <p className="text-gray-600 mb-4">
            Plan and track your expenses with smart budgeting recommendations that help you save more and spend wisely.
          </p>
          <span className="text-blue-500 font-medium flex items-center">
            Learn more <ArrowRight className="ml-2 h-4 w-4" />
          </span>
        </Link>

        <Link href="/features/security" className="feature-card">
          <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
            <Shield className="h-6 w-6 text-blue-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">Advanced Security</h3>
          <p className="text-gray-600 mb-4">
            Your financial data is protected with bank-level encryption and advanced security protocols.
          </p>
          <span className="text-blue-500 font-medium flex items-center">
            Learn more <ArrowRight className="ml-2 h-4 w-4" />
          </span>
        </Link>

        <Link href="/features/real-time-alerts" className="feature-card">
          <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
            <Clock className="h-6 w-6 text-blue-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">Real-time Alerts</h3>
          <p className="text-gray-600 mb-4">
            Stay informed with instant notifications about market changes, price movements, and investment
            opportunities.
          </p>
          <span className="text-blue-500 font-medium flex items-center">
            Learn more <ArrowRight className="ml-2 h-4 w-4" />
          </span>
        </Link>

        <Link href="/features/community" className="feature-card">
          <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
            <Users className="h-6 w-6 text-blue-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">Investor Community</h3>
          <p className="text-gray-600 mb-4">
            Connect with other investors, share insights, and learn from the community's collective wisdom.
          </p>
          <span className="text-blue-500 font-medium flex items-center">
            Learn more <ArrowRight className="ml-2 h-4 w-4" />
          </span>
        </Link>

        <Link href="/features/learning-resources" className="feature-card">
          <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
            <BookOpen className="h-6 w-6 text-blue-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">Learning Resources</h3>
          <p className="text-gray-600 mb-4">
            Access a wealth of educational content to improve your financial literacy and investment knowledge.
          </p>
          <span className="text-blue-500 font-medium flex items-center">
            Learn more <ArrowRight className="ml-2 h-4 w-4" />
          </span>
        </Link>
      </div>
    </div>
  )
}

function ArrowRight(props) {
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
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

