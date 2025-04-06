"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Brain, User, Send, Bot, Mic, Clock, RefreshCw, XCircle } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { getUserChatHistory, saveChatMessage } from "@/lib/db"

// Declare SpeechRecognition
declare var SpeechRecognition: any
declare var webkitSpeechRecognition: any

export default function FinancialAIAssistant() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<any[]>([])
  const [chatHistory, setChatHistory] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { user, profile } = useAuth()

  // Speech recognition setup
  const [recognition, setRecognition] = useState<any>(null)

  useEffect(() => {
    // Initialize speech recognition if supported
    if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition
      const recognitionInstance = new SpeechRecognition()

      recognitionInstance.continuous = false
      recognitionInstance.interimResults = false
      recognitionInstance.lang = "en-US"

      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setMessage(transcript)
        setIsRecording(false)
      }

      recognitionInstance.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error)
        setIsRecording(false)
      }

      recognitionInstance.onend = () => {
        setIsRecording(false)
      }

      setRecognition(recognitionInstance)
      setIsVoiceEnabled(true)
    }
  }, [])

  // Fetch chat history
  useEffect(() => {
    const fetchChatHistory = async () => {
      if (!user) return

      try {
        const history = await getUserChatHistory(user.uid)
        setChatHistory(history)
      } catch (error) {
        console.error("Error fetching chat history:", error)
      }
    }

    fetchChatHistory()
  }, [user])

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (!message.trim() || !user) return

    try {
      setIsLoading(true)
      setError(null)

      // Add user message to chat
      const userMessage = {
        id: Date.now().toString(),
        role: "user",
        content: message,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMessage])

      // Get Firebase ID token for authentication
      const idToken = await user.getIdToken()

      // Prepare chat history for context
      const formattedHistory = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }))

      // Send message to API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          message,
          chatHistory: formattedHistory,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to get response")
      }

      const data = await response.json()

      // Add AI response to chat
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])

      // Save chat message to database
      await saveChatMessage({
        userId: user.uid,
        message,
        response: data.response,
        context: {
          hasProfile: !!profile,
        },
      })

      // Clear input
      setMessage("")
    } catch (error: any) {
      setError(error.message || "An error occurred")
      console.error("Error sending message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStartRecording = () => {
    if (recognition && !isRecording) {
      setIsRecording(true)
      recognition.start()
    }
  }

  const handleStopRecording = () => {
    if (recognition && isRecording) {
      recognition.stop()
      setIsRecording(false)
    }
  }

  const handleClearChat = () => {
    setMessages([])
  }

  const loadConversation = (item: any) => {
    setMessages([
      { id: "1", role: "user", content: item.message, timestamp: new Date(item.createdAt.toDate()) },
      { id: "2", role: "assistant", content: item.response, timestamp: new Date(item.createdAt.toDate()) },
    ])
  }

  // Synthetic speech function
  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1.0
      utterance.pitch = 1.0
      utterance.volume = 1.0
      window.speechSynthesis.speak(utterance)
    }
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="border-b">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <Brain className="h-5 w-5 text-blue-500 mr-2" />
            Financial AI Assistant
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={handleClearChat}>
            <XCircle className="h-4 w-4 mr-2" />
            Clear Chat
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-8">
                <Bot className="h-12 w-12 text-blue-100 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">How can I help you today?</h3>
                <p className="text-gray-500 mb-4">Ask me about your finances, investments, or budgeting</p>

                <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto mb-8">
                  {[
                    "What's my current financial status?",
                    "How can I improve my savings?",
                    "Suggest stocks based on my portfolio",
                    "Create a budget plan for me",
                  ].map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="text-left justify-start h-auto py-3 whitespace-normal"
                      onClick={() => {
                        setMessage(suggestion)
                        setTimeout(() => handleSendMessage(), 100)
                      }}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>

                {chatHistory.length > 0 && (
                  <div className="mt-8">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Recent conversations</h4>
                    <div className="space-y-2">
                      {chatHistory.slice(0, 5).map((chat) => (
                        <Button
                          key={chat.id}
                          variant="ghost"
                          className="w-full justify-start text-left p-2 h-auto"
                          onClick={() => loadConversation(chat)}
                        >
                          <div className="flex items-start">
                            <Clock className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-sm truncate">{chat.message}</p>
                              <p className="text-xs text-gray-500">
                                {new Date(chat.createdAt.toDate()).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-bl-none dark:bg-gray-800 dark:text-gray-200"
                    }`}
                  >
                    <div className="flex items-center mb-1">
                      {message.role === "assistant" ? (
                        <Bot className="h-4 w-4 mr-1" />
                      ) : (
                        <User className="h-4 w-4 mr-1" />
                      )}
                      <span className="text-xs font-medium">
                        {message.role === "assistant" ? "AI Assistant" : "You"}
                      </span>
                      {message.role === "assistant" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 ml-1"
                          onClick={() => speakText(message.content)}
                        >
                          <Mic className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-lg rounded-bl-none max-w-[80%] p-3 dark:bg-gray-800 dark:text-gray-200">
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

            {error && (
              <div className="flex justify-center">
                <div className="bg-red-50 text-red-800 rounded-lg p-3 max-w-[80%] dark:bg-red-900/30 dark:text-red-400">
                  <p className="text-sm">Error: {error}</p>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="border-t p-4">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about your finances, investments, or budgeting..."
                className="flex-1"
                disabled={isLoading}
              />
              {isVoiceEnabled && (
                <Button
                  type="button"
                  variant={isRecording ? "destructive" : "outline"}
                  disabled={isLoading}
                  onClick={isRecording ? handleStopRecording : handleStartRecording}
                >
                  <Mic className="h-4 w-4" />
                </Button>
              )}
              <Button type="submit" disabled={isLoading || !message.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </CardContent>
      <div id="recaptcha-container"></div>
    </Card>
  )
}

