import { Mail, Phone, MapPin, MessageSquare } from "lucide-react"

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Have questions or need assistance? Our team is here to help you with any inquiries about our financial
          services.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <form>
              <div className="grid gap-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="last-name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="(123) 456-7890"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled selected>
                      Select a subject
                    </option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button type="submit" className="btn-primary">
                  Send Message
                </button>
              </div>
            </form>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <MessageSquare className="h-5 w-5 text-blue-500 mr-2" />
              <h3 className="text-lg font-bold">Live Chat Support</h3>
            </div>
            <p className="text-gray-600 mb-4">Need immediate assistance? Chat with our support team in real-time.</p>
            <button className="bg-white text-blue-500 border border-blue-500 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors">
              Start Live Chat
            </button>
          </div>
        </div>

        <div>
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-blue-500 mr-3 mt-1" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-600">support@finaiadvisor.com</p>
                  <p className="text-gray-600">info@finaiadvisor.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-blue-500 mr-3 mt-1" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-gray-600">+1 (555) 987-6543</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-500 mr-3 mt-1" />
                <div>
                  <h3 className="font-medium">Office</h3>
                  <p className="text-gray-600">123 Finance Street</p>
                  <p className="text-gray-600">New York, NY 10001</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Business Hours</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Monday - Friday</span>
                <span className="text-gray-600">9:00 AM - 6:00 PM EST</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Saturday</span>
                <span className="text-gray-600">10:00 AM - 2:00 PM EST</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Sunday</span>
                <span className="text-gray-600">Closed</span>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t">
              <h3 className="font-medium mb-2">Holiday Schedule</h3>
              <p className="text-gray-600">
                Our office is closed on all major U.S. holidays. Support services remain available via email.
              </p>
            </div>
          </div>

          <div className="mt-8 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">FAQ</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">How quickly can I expect a response?</h3>
                <p className="text-gray-600">We typically respond to all inquiries within 24 business hours.</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Do you offer phone consultations?</h3>
                <p className="text-gray-600">
                  Yes, you can schedule a phone consultation with one of our financial advisors through our booking
                  system.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">How can I report a technical issue?</h3>
                <p className="text-gray-600">
                  Please use the contact form and select "Technical Support" as the subject, or email
                  support@finaiadvisor.com directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

