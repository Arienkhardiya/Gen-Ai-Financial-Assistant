import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoanCalculator } from "@/components/loan-calculator"
import { Calculator, PiggyBank, TrendingUp, DollarSign } from "lucide-react"
import Link from "next/link"

export default function ToolsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Financial Tools</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-3xl">
        Use our collection of financial calculators and tools to help you make better financial decisions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <LoanCalculator />

        <Card>
          <CardHeader>
            <CardTitle>Savings Calculator</CardTitle>
            <CardDescription>Plan your savings and see how your money can grow over time</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-[400px]">
            <PiggyBank className="h-16 w-16 text-blue-500 mb-4" />
            <p className="text-center text-gray-500 mb-4">
              Calculate how your savings will grow with regular deposits and compound interest.
            </p>
            <Link
              href="/tools/savings-calculator"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Open Savings Calculator
            </Link>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-6">More Financial Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="bg-blue-100 p-3 rounded-full w-fit mb-2">
              <Calculator className="h-6 w-6 text-blue-500" />
            </div>
            <CardTitle>Retirement Calculator</CardTitle>
            <CardDescription>Plan for your retirement and estimate your future needs</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/tools/retirement-calculator" className="text-blue-500 hover:underline">
              Open calculator
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="bg-blue-100 p-3 rounded-full w-fit mb-2">
              <TrendingUp className="h-6 w-6 text-blue-500" />
            </div>
            <CardTitle>Investment Returns</CardTitle>
            <CardDescription>Calculate potential returns on your investments</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/tools/investment-calculator" className="text-blue-500 hover:underline">
              Open calculator
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="bg-blue-100 p-3 rounded-full w-fit mb-2">
              <DollarSign className="h-6 w-6 text-blue-500" />
            </div>
            <CardTitle>Tax Calculator</CardTitle>
            <CardDescription>Estimate your tax liability and plan accordingly</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/tools/tax-calculator" className="text-blue-500 hover:underline">
              Open calculator
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

