"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarketChart } from "@/components/market-chart"
import { StatsCard } from "@/components/stats-card"
import { AIChatbot } from "@/components/ai-chatbot"
import { Badge } from "@/components/ui/badge"
import { getUserProfile } from "@/lib/db"
import { DollarSign, PieChart, TrendingUp, CreditCard, Calendar, AlertTriangle, ArrowRight } from "lucide-react"
import Link from "next/link"

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

export default function Dashboard() {
  const { user, isLoading: authLoading } = useAuth()
  const [profile, setProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
      return
    }

    if (user) {
      const fetchProfile = async () => {
        try {
          const profileData = await getUserProfile(user.id)
          setProfile(profileData || {})
        } catch (error) {
          console.error("Error fetching profile:", error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchProfile()
    }
  }, [user, authLoading, router])

  if (authLoading || isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
          <div className="h-80 bg-gray-200 rounded mb-8"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome, {user?.user_metadata?.first_name || user?.email?.split("@")[0]}
          </h1>
          <p className="text-gray-600">Here's an overview of your financial health</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Badge variant="outline" className="mr-2">
            Account: Free
          </Badge>
          <Link href="/profile" className="text-blue-500 hover:underline">
            View Profile
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Balance"
          value="$12,450.75"
          change="+$1,250.50"
          changeType="increase"
          description="This month"
          icon={<DollarSign className="h-5 w-5" />}
        />
        <StatsCard
          title="Monthly Expenses"
          value="$3,240.89"
          change="-$320.45"
          changeType="decrease"
          description="vs last month"
          icon={<CreditCard className="h-5 w-5" />}
        />
        <StatsCard
          title="Savings Goal"
          value="68%"
          change="$6,800 of $10,000"
          description="Emergency Fund"
          icon={<PieChart className="h-5 w-5" />}
        />
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Overview</CardTitle>
                  <CardDescription>Your financial activity for the past 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <MarketChart
                    data={generateChartData(30, "up")}
                    name="Account Balance"
                    color="#3b82f6"
                    height={300}
                    timeRanges={["1W", "1M", "3M", "6M", "1Y"]}
                  />
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Upcoming</CardTitle>
                  <CardDescription>Bills and payments due soon</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-blue-500 mr-3 mt-1" />
                      <div>
                        <p className="font-medium">Rent Payment</p>
                        <p className="text-sm text-gray-500">$1,200.00 • Due in 5 days</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CreditCard className="h-5 w-5 text-blue-500 mr-3 mt-1" />
                      <div>
                        <p className="font-medium">Credit Card Bill</p>
                        <p className="text-sm text-gray-500">$450.75 • Due in 8 days</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 mt-1" />
                      <div>
                        <p className="font-medium">Low Balance Alert</p>
                        <p className="text-sm text-gray-500">Checking account below $500</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="investments">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Performance</CardTitle>
                <CardDescription>Your investment returns over time</CardDescription>
              </CardHeader>
              <CardContent>
                <MarketChart
                  data={generateChartData(90, "volatile")}
                  name="Portfolio Value"
                  color="#22c55e"
                  height={300}
                  timeRanges={["1M", "3M", "6M", "1Y", "5Y"]}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
                <CardDescription>Current distribution of your investments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Stocks</span>
                      <span>60%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "60%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Bonds</span>
                      <span>25%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "25%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Real Estate</span>
                      <span>10%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "10%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Cash</span>
                      <span>5%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-gray-500 h-2.5 rounded-full" style={{ width: "5%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="budget">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Budget</CardTitle>
                <CardDescription>Your spending vs. budget by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Housing</span>
                      <span>$1,200 / $1,200</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "100%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Food</span>
                      <span>$450 / $500</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "90%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Transportation</span>
                      <span>$320 / $300</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-red-500 h-2.5 rounded-full" style={{ width: "107%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Entertainment</span>
                      <span>$180 / $200</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "90%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>Where your money went this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      <span>Housing</span>
                    </div>
                    <div>
                      <span className="font-medium">$1,200</span>
                      <span className="text-gray-500 text-sm ml-2">(37%)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span>Food</span>
                    </div>
                    <div>
                      <span className="font-medium">$450</span>
                      <span className="text-gray-500 text-sm ml-2">(14%)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      <span>Transportation</span>
                    </div>
                    <div>
                      <span className="font-medium">$320</span>
                      <span className="text-gray-500 text-sm ml-2">(10%)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                      <span>Entertainment</span>
                    </div>
                    <div>
                      <span className="font-medium">$180</span>
                      <span className="text-gray-500 text-sm ml-2">(6%)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                      <span>Other</span>
                    </div>
                    <div>
                      <span className="font-medium">$1,090</span>
                      <span className="text-gray-500 text-sm ml-2">(33%)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="goals">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Savings Goals</CardTitle>
                <CardDescription>Track your progress towards financial goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <div>
                        <p className="font-medium">Emergency Fund</p>
                        <p className="text-sm text-gray-500">$6,800 of $10,000</p>
                      </div>
                      <Badge variant="success">68%</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "68%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <div>
                        <p className="font-medium">Vacation</p>
                        <p className="text-sm text-gray-500">$1,200 of $3,000</p>
                      </div>
                      <Badge variant="info">40%</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "40%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <div>
                        <p className="font-medium">New Car</p>
                        <p className="text-sm text-gray-500">$5,000 of $25,000</p>
                      </div>
                      <Badge variant="secondary">20%</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "20%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Retirement Projection</CardTitle>
                <CardDescription>Estimated retirement savings over time</CardDescription>
              </CardHeader>
              <CardContent>
                <MarketChart
                  data={generateChartData(240, "up")}
                  name="Retirement Savings"
                  color="#8b5cf6"
                  height={250}
                  timeRanges={["5Y", "10Y", "20Y", "30Y", "40Y"]}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">AI Financial Assistant</h2>
          <AIChatbot />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Financial Insights</h2>
          <Card>
            <CardHeader>
              <CardTitle>Smart Recommendations</CardTitle>
              <CardDescription>AI-powered financial advice based on your activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
                    <p className="font-medium">Investment Opportunity</p>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    Based on your risk profile, consider allocating 5% of your portfolio to emerging market ETFs for
                    better diversification.
                  </p>
                  <Link href="/market-data" className="text-blue-500 hover:underline text-sm flex items-center">
                    View recommendation <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <DollarSign className="h-5 w-5 text-green-500 mr-2" />
                    <p className="font-medium">Savings Opportunity</p>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    You're spending 20% more on dining out compared to last month. Reducing this could help you reach
                    your vacation goal 2 months earlier.
                  </p>
                  <Link href="/budgeting" className="text-blue-500 hover:underline text-sm flex items-center">
                    See budget details <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                    <p className="font-medium">Credit Card Alert</p>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    Your current credit card has a high interest rate of 22%. Switching to these recommended cards could
                    save you approximately $420 annually.
                  </p>
                  <Link href="/recommendations" className="text-blue-500 hover:underline text-sm flex items-center">
                    View alternatives <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

