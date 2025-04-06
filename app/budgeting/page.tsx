import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, PieChart, TrendingDown, BarChart2, ArrowRight } from "lucide-react"

export default function Budgeting() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Smart Budgeting Tools</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Take control of your finances with our AI-powered budgeting tools that help you save more and spend wisely.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-16 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Plan, Track, and Optimize Your Finances</h2>
          <p className="text-gray-600 mb-6">
            Our intelligent budgeting system analyzes your income and spending patterns to create personalized budgets
            that help you achieve your financial goals.
          </p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start">
              <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                <Check className="h-4 w-4 text-blue-500" />
              </div>
              <span>Automatically categorize transactions for easy tracking</span>
            </li>
            <li className="flex items-start">
              <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                <Check className="h-4 w-4 text-blue-500" />
              </div>
              <span>Set custom budgets for different spending categories</span>
            </li>
            <li className="flex items-start">
              <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                <Check className="h-4 w-4 text-blue-500" />
              </div>
              <span>Receive alerts when you're approaching budget limits</span>
            </li>
            <li className="flex items-start">
              <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                <Check className="h-4 w-4 text-blue-500" />
              </div>
              <span>Get AI-powered recommendations to optimize your spending</span>
            </li>
          </ul>
          <Link href="/signup" className="btn-primary">
            Start Budgeting
          </Link>
        </div>
        <div className="relative h-[400px]">
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="Budgeting Dashboard"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <Tabs defaultValue="monthly" className="mb-16">
        <TabsList className="mb-6">
          <TabsTrigger value="monthly" className="text-base">
            Monthly Budget
          </TabsTrigger>
          <TabsTrigger value="expenses" className="text-base">
            Expense Tracking
          </TabsTrigger>
          <TabsTrigger value="savings" className="text-base">
            Savings Goals
          </TabsTrigger>
        </TabsList>

        <TabsContent value="monthly">
          <Link href="/budgeting/monthly">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center mb-6">
                <DollarSign className="h-6 w-6 text-blue-500 mr-2" />
                <h3 className="text-xl font-bold">Monthly Budget Planner</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="mb-4">
                    Create a personalized monthly budget based on your income and financial goals. Our AI analyzes your
                    spending patterns to suggest realistic budget allocations.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Total Income</p>
                      <p className="text-2xl font-bold">$5,200</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Total Budget</p>
                      <p className="text-2xl font-bold">$4,150</p>
                    </div>
                  </div>
                  <span className="text-blue-500 hover:underline flex items-center">
                    Create your budget <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
                <div className="relative h-[250px]">
                  <Image
                    src="/placeholder.svg?height=250&width=500"
                    alt="Monthly Budget Chart"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </Link>
        </TabsContent>

        <TabsContent value="expenses">
          <Link href="/budgeting/expenses">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center mb-6">
                <PieChart className="h-6 w-6 text-blue-500 mr-2" />
                <h3 className="text-xl font-bold">Expense Tracking</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative h-[250px]">
                  <Image
                    src="/placeholder.svg?height=250&width=500"
                    alt="Expense Categories Chart"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="mb-4">
                    Track your expenses across different categories and get insights into your spending habits. Our AI
                    automatically categorizes transactions and highlights areas where you can save.
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        <span>Housing</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">$1,800</span>
                        <span className="text-gray-500 text-sm ml-2">(35%)</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span>Food</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">$850</span>
                        <span className="text-gray-500 text-sm ml-2">(16%)</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                        <span>Transportation</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">$450</span>
                        <span className="text-gray-500 text-sm ml-2">(9%)</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                        <span>Entertainment</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">$350</span>
                        <span className="text-gray-500 text-sm ml-2">(7%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </TabsContent>

        <TabsContent value="savings">
          <Link href="/budgeting/savings">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center mb-6">
                <TrendingDown className="h-6 w-6 text-blue-500 mr-2" />
                <h3 className="text-xl font-bold">Savings Goals</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="mb-4">
                    Set and track your savings goals with our intelligent goal-setting tools. Whether you're saving for
                    a vacation, a new home, or retirement, we'll help you stay on track.
                  </p>
                  <div className="space-y-4 mb-4">
                    <div className="border p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <p className="font-medium">Emergency Fund</p>
                        <p className="text-green-500">68% complete</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "68%" }}></div>
                      </div>
                      <div className="flex justify-between mt-2 text-sm text-gray-500">
                        <p>$6,800 saved</p>
                        <p>Goal: $10,000</p>
                      </div>
                    </div>
                    <div className="border p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <p className="font-medium">Vacation</p>
                        <p className="text-blue-500">42% complete</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "42%" }}></div>
                      </div>
                      <div className="flex justify-between mt-2 text-sm text-gray-500">
                        <p>$2,100 saved</p>
                        <p>Goal: $5,000</p>
                      </div>
                    </div>
                  </div>
                  <span className="text-blue-500 hover:underline flex items-center">
                    Create a new goal <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
                <div className="relative h-[250px]">
                  <Image
                    src="/placeholder.svg?height=250&width=500"
                    alt="Savings Goals Chart"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </Link>
        </TabsContent>
      </Tabs>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <Link href="/budgeting/income" className="block">
          <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart2 className="h-5 w-5 text-blue-500 mr-2" />
                Income Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Track your income sources and analyze trends over time to optimize your earnings.</p>
              <span className="text-blue-500 hover:underline flex items-center text-sm">
                View income details <ArrowRight className="ml-1 h-4 w-4" />
              </span>
            </CardContent>
          </Card>
        </Link>

        <Link href="/budgeting/debt" className="block">
          <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingDown className="h-5 w-5 text-blue-500 mr-2" />
                Debt Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Create strategies to pay down debt faster and save on interest with our AI-powered recommendations.
              </p>
              <span className="text-blue-500 hover:underline flex items-center text-sm">
                Manage your debt <ArrowRight className="ml-1 h-4 w-4" />
              </span>
            </CardContent>
          </Card>
        </Link>

        <Link href="/budgeting/reports" className="block">
          <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 text-blue-500 mr-2" />
                Financial Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Generate detailed financial reports to understand your financial health and track progress.
              </p>
              <span className="text-blue-500 hover:underline flex items-center text-sm">
                View reports <ArrowRight className="ml-1 h-4 w-4" />
              </span>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="bg-blue-50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to take control of your finances?</h2>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
          Join thousands of users who have improved their financial health with our AI-powered budgeting tools.
        </p>
        <Link href="/signup" className="btn-primary">
          Start Your Free Trial
        </Link>
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

