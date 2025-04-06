"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, RefreshCw } from "lucide-react"

type Message = {
  role: "user" | "assistant"
  content: string
}

export function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I'm your AI financial assistant. How can I help you today?" },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Financial advice responses based on keywords
  const getFinancialResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes("invest") || lowerQuery.includes("stock")) {
      return "Based on current market trends, diversifying your portfolio across different sectors is recommended. Consider a mix of ETFs, blue-chip stocks, and some growth stocks based on your risk tolerance."
    } else if (lowerQuery.includes("budget") || lowerQuery.includes("save")) {
      return "To improve your budget, try the 50/30/20 rule: 50% for necessities, 30% for wants, and 20% for savings and debt repayment. Track your expenses for a month to identify areas where you can cut back."
    } else if (lowerQuery.includes("debt") || lowerQuery.includes("loan")) {
      return "When managing debt, focus on high-interest debt first while making minimum payments on others. Consider debt consolidation if you have multiple high-interest loans."
    } else if (lowerQuery.includes("retire") || lowerQuery.includes("retirement")) {
      return "For retirement planning, aim to save at least 15% of your income. Maximize contributions to tax-advantaged accounts like 401(k)s and IRAs, and adjust your investment strategy to become more conservative as you approach retirement age."
    } else if (lowerQuery.includes("tax") || lowerQuery.includes("taxes")) {
      return "To optimize your tax situation, consider maximizing contributions to tax-advantaged accounts, harvesting tax losses, and keeping track of deductible expenses throughout the year."
    } else {
      return "I'm not sure I understand your question. Could you provide more details about your financial query? I can help with investments, budgeting, debt management, retirement planning, and tax optimization."
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response with a delay
    setTimeout(() => {
      const aiResponse = { role: "assistant" as const, content: getFinancialResponse(input) }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="border rounded-lg shadow-sm overflow-hidden bg-white">
      <div className="p-4 border-b bg-blue-50">
        <h3 className="font-bold flex items-center">
          <Bot className="h-5 w-5 mr-2 text-blue-500" />
          Financial AI Assistant
        </h3>
      </div>

      <div className="h-[400px] overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-100 text-gray-800 rounded-bl-none"
              }`}
            >
              <div className="flex items-center mb-1">
                {message.role === "assistant" ? <Bot className="h-4 w-4 mr-1" /> : <User className="h-4 w-4 mr-1" />}
                <span className="text-xs font-medium">{message.role === "assistant" ? "AI Assistant" : "You"}</span>
              </div>
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 rounded-lg rounded-bl-none max-w-[80%] p-3">
              <div className="flex items-center">
                <Bot className="h-4 w-4 mr-1" />
                <span className="text-xs font-medium">AI Assistant</span>
              </div>
              <div className="flex items-center mt-2">
                <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />
                <span className="ml-2 text-sm">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t p-4 flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about investments, budgeting, debt..."
          className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  )
}

