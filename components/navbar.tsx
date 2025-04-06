"use client"

import Link from "next/link"
import { BarChart2, Menu, X, User, LogOut, MessageSquare, DollarSign, Calculator } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { user, signOut, isLoading } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <header className="border-b border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold dark:text-white">
          <BarChart2 className="h-6 w-6 text-blue-500" />
          <span>FinAI Advisor</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/features"
            className="text-gray-700 hover:text-blue-500 transition-colors dark:text-gray-300 dark:hover:text-blue-400"
          >
            Features
          </Link>
          <Link
            href="/dashboard"
            className="text-gray-700 hover:text-blue-500 transition-colors dark:text-gray-300 dark:hover:text-blue-400"
          >
            Dashboard
          </Link>
          <Link
            href="/tools"
            className="text-gray-700 hover:text-blue-500 transition-colors dark:text-gray-300 dark:hover:text-blue-400"
          >
            Tools
          </Link>
          <Link
            href="/stock-analysis"
            className="text-gray-700 hover:text-blue-500 transition-colors dark:text-gray-300 dark:hover:text-blue-400"
          >
            Stock Analysis
          </Link>
          <Link
            href="/market-data"
            className="text-gray-700 hover:text-blue-500 transition-colors dark:text-gray-300 dark:hover:text-blue-400"
          >
            Market Data
          </Link>
          <Link
            href="/budget"
            className="text-gray-700 hover:text-blue-500 transition-colors dark:text-gray-300 dark:hover:text-blue-400"
          >
            Budget
          </Link>
          <Link
            href="/ai-assistant"
            className="text-gray-700 hover:text-blue-500 transition-colors dark:text-gray-300 dark:hover:text-blue-400"
          >
            AI Assistant
          </Link>
          <Link
            href="/loan-calculator"
            className="text-gray-700 hover:text-blue-500 transition-colors dark:text-gray-300 dark:hover:text-blue-400"
          >
            Loan Calculator
          </Link>
          <Link
            href="/learning-hub"
            className="text-gray-700 hover:text-blue-500 transition-colors dark:text-gray-300 dark:hover:text-blue-400"
          >
            Learning Hub
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          {isLoading ? (
            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          ) : user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition-colors dark:text-gray-300 dark:hover:text-blue-400"
              >
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-500 dark:text-blue-300">
                  {user.user_metadata?.full_name ? user.user_metadata.full_name.charAt(0) : user.email?.charAt(0)}
                </div>
                <span className="hidden md:inline">{user.user_metadata?.full_name || user.email?.split("@")[0]}</span>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 flex items-center"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                  <Link
                    href="/budget"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 flex items-center"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <DollarSign className="h-4 w-4 mr-2" />
                    Budget
                  </Link>
                  <Link
                    href="/ai-assistant"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 flex items-center"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    AI Assistant
                  </Link>
                  <Link
                    href="/loan-calculator"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 flex items-center"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    Loan Calculator
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut()
                      setUserMenuOpen(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-gray-700 hover:text-blue-500 transition-colors dark:text-gray-300 dark:hover:text-blue-400"
              >
                Log in
              </Link>
              <Link href="/signup" className="btn-primary dark:bg-blue-600 dark:hover:bg-blue-700">
                Get Started
              </Link>
            </>
          )}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6 dark:text-white" /> : <Menu className="h-6 w-6 dark:text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 py-4 px-4 border-t border-gray-200 dark:border-gray-800">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/features"
              className="text-gray-700 hover:text-blue-500 transition-colors dark:text-gray-300 dark:hover:text-blue-400 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-700 hover:text-blue-500 transition-colors dark:text-gray-300 dark:hover:text-blue-400 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/tools"
              className="text-gray-700 hover:text-blue-500 transition-colors dark:text-gray-300 dark:hover:text-blue-400 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tools
            </Link>
            <Link
              href="/stock-analysis"
              className="text-gray-700 hover:text-blue-500 transition-colors dark:text-gray-300 dark:hover:text-blue-400 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Stock Analysis
            </Link>
            <Link
              href="/market-data"
              className="text-gray-700 hover:text-blue-500 transition-colors dark:text-gray-300 dark:hover:text-blue-400 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Market Data
            </Link>
            <Link
              href="/budget"
              className="text-gray-700 hover:text-blue-500 transition-colors dark:text-gray-300 dark:hover:text-blue-400 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Budget
            </Link>
            <Link
              href="/ai-assistant"
              className="text-gray-700 hover:text-blue-500 transition-colors dark:text-gray-300 dark:hover:text-blue-400 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              AI Assistant
            </Link>
            <Link
              href="/loan-calculator"
              className="text-gray-700 hover:text-blue-500 transition-colors dark:text-gray-300 dark:hover:text-blue-400 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Loan Calculator
            </Link>
            <Link
              href="/learning-hub"
              className="text-gray-700 hover:text-blue-500 transition-colors dark:text-gray-300 dark:hover:text-blue-400 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Learning Hub
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-blue-500 transition-colors dark:text-gray-300 dark:hover:text-blue-400 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            {user && (
              <button
                onClick={handleSignOut}
                className="text-left text-gray-700 hover:text-blue-500 transition-colors dark:text-gray-300 dark:hover:text-blue-400 py-2"
              >
                Sign out
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

