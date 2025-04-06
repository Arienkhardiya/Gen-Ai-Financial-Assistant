"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { formatCurrency } from "@/lib/utils"

interface Transaction {
  id: string
  date: Date
  description: string
  amount: number
  category: string
  type: "income" | "expense"
}

interface RecentTransactionsProps {
  userId: string
}

export default function RecentTransactions({ userId }: RecentTransactionsProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true)

      // In a real app, you would fetch from your database
      // For now, we'll use mock data
      const mockTransactions: Transaction[] = [
        {
          id: "1",
          date: new Date(2023, 4, 15),
          description: "Salary Deposit",
          amount: 4250.0,
          category: "Income",
          type: "income",
        },
        {
          id: "2",
          date: new Date(2023, 4, 14),
          description: "Grocery Shopping",
          amount: 125.47,
          category: "Food",
          type: "expense",
        },
        {
          id: "3",
          date: new Date(2023, 4, 13),
          description: "Electric Bill",
          amount: 95.2,
          category: "Utilities",
          type: "expense",
        },
        {
          id: "4",
          date: new Date(2023, 4, 10),
          description: "Freelance Payment",
          amount: 850.0,
          category: "Income",
          type: "income",
        },
        {
          id: "5",
          date: new Date(2023, 4, 8),
          description: "Restaurant Dinner",
          amount: 78.5,
          category: "Dining",
          type: "expense",
        },
      ]

      setTransactions(mockTransactions)
      setIsLoading(false)
    }

    fetchTransactions()
  }, [userId])

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Transactions</CardTitle>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search transactions..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {searchTerm ? "No transactions match your search" : "No recent transactions"}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Description</th>
                  <th className="text-left py-3 px-4">Category</th>
                  <th className="text-right py-3 px-4">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-3 px-4">{transaction.date.toLocaleDateString()}</td>
                    <td className="py-3 px-4 font-medium">{transaction.description}</td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary">{transaction.category}</Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end">
                        {transaction.type === "income" ? (
                          <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        <span className={transaction.type === "income" ? "text-green-500" : "text-red-500"}>
                          {transaction.type === "income" ? "+" : "-"}
                          {formatCurrency(transaction.amount)}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

