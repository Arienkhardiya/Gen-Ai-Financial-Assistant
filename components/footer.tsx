import Link from "next/link"
import { BarChart2, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 text-xl font-bold mb-4">
              <BarChart2 className="h-6 w-6 text-blue-500" />
              <span>FinAI Advisor</span>
            </Link>
            <p className="text-gray-600 mb-4">
              Get personalized financial advice, real-time stock market analysis, and expert insights—all powered by
              advanced AI technology.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/features" className="text-gray-600 hover:text-blue-500 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/stock-analysis" className="text-gray-600 hover:text-blue-500 transition-colors">
                  Stock Analysis
                </Link>
              </li>
              <li>
                <Link href="/market-data" className="text-gray-600 hover:text-blue-500 transition-colors">
                  Market Data
                </Link>
              </li>
              <li>
                <Link href="/budgeting" className="text-gray-600 hover:text-blue-500 transition-colors">
                  Budgeting
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/learning-hub" className="text-gray-600 hover:text-blue-500 transition-colors">
                  Learning Hub
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-blue-500 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-blue-500 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-600 hover:text-blue-500 transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-500" />
                <span className="text-gray-600">arienkhardiya@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-blue-500" />
                <span className="text-gray-600">91+ 9079783243</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-500" />
                <span className="text-gray-600"> Jaipur,Rajasthan,India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
          <p>© {new Date().getFullYear()} FinAI Advisor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

