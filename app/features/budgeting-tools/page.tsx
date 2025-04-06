import Image from "next/image"
import Link from "next/link"
import { Check, DollarSign, PieChart, ArrowRight } from "lucide-react"

export default function BudgetingTools() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/features" className="text-blue-500 hover:underline mb-4 inline-block">
          ← Back to Features
        </Link>

        <h1 className="text-4xl font-bold mb-6">Budgeting Tools</h1>

        <div className="relative h-[300px] w-full mb-8">
          <Image
            src="/placeholder.svg?height=300&width=800"
            alt="Budgeting Tools Dashboard"
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-6">
            Our Smart Budgeting Tools help you take control of your finances with AI-powered insights, automated expense
            tracking, and personalized recommendations to save more and spend wisely.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Key Features</h2>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span>Automated expense categorization and tracking</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span>Customizable budget creation for different spending categories</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span>Real-time spending alerts and notifications</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span>Goal-based savings plans with progress tracking</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span>AI-powered spending insights and optimization recommendations</span>
            </li>
          </ul>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <DollarSign className="h-6 w-6 text-blue-500 mr-2" />
                <h3 className="text-xl font-bold">Smart Budget Creator</h3>
              </div>
              <p className="mb-4">
                Our AI analyzes your income and spending patterns to create a personalized budget that's realistic and
                aligned with your financial goals.
              </p>
              <Link
                href="/features/budgeting-tools/budget-creator"
                className="text-blue-500 hover:underline flex items-center"
              >
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <PieChart className="h-6 w-6 text-blue-500 mr-2" />
                <h3 className="text-xl font-bold">Expense Analytics</h3>
              </div>
              <p className="mb-4">
                Visualize your spending patterns with detailed breakdowns by category, merchant, and time period to
                identify areas for optimization.
              </p>
              <Link
                href="/features/budgeting-tools/expense-analytics"
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
              alt="Budgeting Process"
              fill
              className="object-contain"
            />
          </div>

          <ol className="list-decimal pl-6 mb-8 space-y-4">
            <li>
              <strong>Connect Your Accounts</strong> - Securely link your bank accounts, credit cards, and other
              financial accounts to automatically import transactions.
            </li>
            <li>
              <strong>Categorize Expenses</strong> - Our AI automatically categorizes your transactions, with the
              ability to customize categories to match your preferences.
            </li>
            <li>
              <strong>Create Your Budget</strong> - Set up budget limits for different spending categories based on your
              income and financial goals.
            </li>
            <li>
              <strong>Track Your Spending</strong> - Monitor your spending in real-time and receive alerts when you're
              approaching budget limits.
            </li>
            <li>
              <strong>Optimize Your Finances</strong> - Get personalized recommendations to reduce unnecessary expenses
              and increase savings based on your spending patterns.
            </li>
          </ol>

          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-bold mb-3">Success Story</h3>
            <p className="italic mb-4">
              "Before using FinAI Advisor's budgeting tools, I was constantly overspending without realizing where my
              money was going. The expense tracking and alerts helped me identify unnecessary subscriptions and impulse
              purchases. I've managed to save an extra $450 per month since I started using the platform!"
            </p>
            <p className="font-medium">- David R., Marketing Manager</p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Ready to take control of your finances?</h2>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/signup" className="btn-primary">
              Start Budgeting
            </Link>
            <Link href="/demo" className="btn-secondary">
              See a Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

