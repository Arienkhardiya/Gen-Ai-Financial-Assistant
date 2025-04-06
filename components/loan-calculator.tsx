"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(100000)
  const [interestRate, setInterestRate] = useState(5)
  const [loanTerm, setLoanTerm] = useState(15)
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [totalPayment, setTotalPayment] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)

  useEffect(() => {
    calculateLoan()
  }, [loanAmount, interestRate, loanTerm])

  const calculateLoan = () => {
    // Convert interest rate from annual to monthly percentage
    const monthlyInterestRate = interestRate / 100 / 12

    // Convert loan term from years to months
    const termInMonths = loanTerm * 12

    // Calculate monthly payment using the formula: P = L[i(1+i)^n]/[(1+i)^n-1]
    // Where P = monthly payment, L = loan amount, i = monthly interest rate, n = number of months
    if (monthlyInterestRate === 0) {
      // If interest rate is 0, simply divide loan amount by term
      const payment = loanAmount / termInMonths
      setMonthlyPayment(payment)
      setTotalPayment(payment * termInMonths)
      setTotalInterest(0)
    } else {
      const x = Math.pow(1 + monthlyInterestRate, termInMonths)
      const monthly = (loanAmount * x * monthlyInterestRate) / (x - 1)

      setMonthlyPayment(monthly)
      setTotalPayment(monthly * termInMonths)
      setTotalInterest(monthly * termInMonths - loanAmount)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Loan Calculator</CardTitle>
        <CardDescription>Calculate your monthly payments and total interest</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="loan-amount">Loan Amount</Label>
              <span className="text-sm font-medium">{formatCurrency(loanAmount)}</span>
            </div>
            <div className="flex items-center space-x-4">
              <Input
                id="loan-amount"
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                min={1000}
                max={1000000}
                step={1000}
                className="w-24"
              />
              <Slider
                value={[loanAmount]}
                min={1000}
                max={1000000}
                step={1000}
                onValueChange={(value) => setLoanAmount(value[0])}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="interest-rate">Interest Rate (%)</Label>
              <span className="text-sm font-medium">{interestRate}%</span>
            </div>
            <div className="flex items-center space-x-4">
              <Input
                id="interest-rate"
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                min={0}
                max={20}
                step={0.1}
                className="w-24"
              />
              <Slider
                value={[interestRate]}
                min={0}
                max={20}
                step={0.1}
                onValueChange={(value) => setInterestRate(value[0])}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="loan-term">Loan Term (years)</Label>
              <span className="text-sm font-medium">{loanTerm} years</span>
            </div>
            <div className="flex items-center space-x-4">
              <Input
                id="loan-term"
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                min={1}
                max={30}
                step={1}
                className="w-24"
              />
              <Slider
                value={[loanTerm]}
                min={1}
                max={30}
                step={1}
                onValueChange={(value) => setLoanTerm(value[0])}
                className="flex-1"
              />
            </div>
          </div>

          <div className="pt-6 border-t">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-500">Monthly Payment</p>
                <p className="text-xl font-bold">{formatCurrency(monthlyPayment)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Payment</p>
                <p className="text-xl font-bold">{formatCurrency(totalPayment)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Interest</p>
                <p className="text-xl font-bold">{formatCurrency(totalInterest)}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

