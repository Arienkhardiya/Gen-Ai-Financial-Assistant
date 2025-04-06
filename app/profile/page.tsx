"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { getUserProfile, updateUserProfile } from "@/lib/db"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Check, X } from "lucide-react"

export default function ProfilePage() {
  const { user, isLoading: authLoading } = useAuth()
  const [profile, setProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    phone: "",
    location: "",
  })
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
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

          // Initialize form data
          setFormData({
            firstName: user.user_metadata?.first_name || "",
            lastName: user.user_metadata?.last_name || "",
            email: user.email || "",
            bio: profileData?.bio || "",
            phone: profileData?.phone || "",
            location: profileData?.location || "",
          })
        } catch (error) {
          console.error("Error fetching profile:", error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchProfile()
    }
  }, [user, authLoading, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSuccessMessage("")
    setErrorMessage("")
    setIsSaving(true)

    try {
      if (!user) return

      // Update user metadata in auth
      const { supabase } = await import("@/lib/supabase")
      await supabase.auth.updateUser({
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          full_name: `${formData.firstName} ${formData.lastName}`,
        },
      })

      // Update profile in database
      await updateUserProfile(user.id, {
        bio: formData.bio,
        phone: formData.phone,
        location: formData.location,
        updated_at: new Date().toISOString(),
      })

      setSuccessMessage("Profile updated successfully")
    } catch (error: any) {
      console.error("Error updating profile:", error)
      setErrorMessage(error.message || "Failed to update profile")
    } finally {
      setIsSaving(false)
    }
  }

  if (authLoading || isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Skeleton className="h-12 w-1/3 mb-6" />
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-1/4 mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/6" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/6" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/6" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/6" />
                <Skeleton className="h-24 w-full" />
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-24 ml-auto" />
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

        <Tabs defaultValue="profile">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profile Information</TabsTrigger>
            <TabsTrigger value="account">Account Settings</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  {successMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-50 text-green-800 p-4 rounded-md flex items-center"
                    >
                      <Check className="h-5 w-5 mr-2" />
                      {successMessage}
                    </motion.div>
                  )}

                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 text-red-800 p-4 rounded-md flex items-center"
                    >
                      <X className="h-5 w-5 mr-2" />
                      {errorMessage}
                    </motion.div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name</Label>
                      <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" value={formData.email} onChange={handleChange} disabled />
                    <p className="text-xs text-gray-500">Email cannot be changed</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(123) 456-7890"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="City, Country"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Tell us about yourself"
                      className="min-h-[100px]"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="ml-auto" disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account settings and security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Account Status</h3>
                  <div className="flex items-center">
                    <Badge variant="success" className="mr-2">
                      Active
                    </Badge>
                    <span className="text-sm text-gray-500">Your account is in good standing</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Email Verification</h3>
                  <div className="flex items-center">
                    {user?.email_confirmed_at ? (
                      <>
                        <Badge variant="success" className="mr-2">
                          Verified
                        </Badge>
                        <span className="text-sm text-gray-500">Your email has been verified</span>
                      </>
                    ) : (
                      <>
                        <Badge variant="warning" className="mr-2">
                          Pending
                        </Badge>
                        <span className="text-sm text-gray-500">Please check your email to verify your account</span>
                        <Button variant="link" className="text-sm ml-2">
                          Resend verification
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Password</h3>
                  <p className="text-sm text-gray-500 mb-2">Change your password to keep your account secure</p>
                  <Button variant="outline">Change Password</Button>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Delete Account</h3>
                  <p className="text-sm text-gray-500 mb-2">Permanently delete your account and all associated data</p>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Customize your experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Notifications</h3>
                  <p className="text-sm text-gray-500 mb-4">Manage how we contact you</p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive updates about your account and investments</p>
                      </div>
                      <div className="flex items-center h-6">
                        <input
                          type="checkbox"
                          id="email-notifications"
                          className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                          defaultChecked
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Market Alerts</p>
                        <p className="text-sm text-gray-500">Get notified about significant market movements</p>
                      </div>
                      <div className="flex items-center h-6">
                        <input
                          type="checkbox"
                          id="market-alerts"
                          className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                          defaultChecked
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Newsletter</p>
                        <p className="text-sm text-gray-500">Weekly digest of financial news and insights</p>
                      </div>
                      <div className="flex items-center h-6">
                        <input
                          type="checkbox"
                          id="newsletter"
                          className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                          defaultChecked
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Display Settings</h3>
                  <p className="text-sm text-gray-500 mb-4">Customize your dashboard appearance</p>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="default-view">Default Dashboard View</Label>
                      <select
                        id="default-view"
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="overview">Overview</option>
                        <option value="portfolio">Portfolio</option>
                        <option value="market">Market Data</option>
                        <option value="watchlist">Watchlist</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="chart-type">Default Chart Type</Label>
                      <select
                        id="chart-type"
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="line">Line Chart</option>
                        <option value="candle">Candlestick</option>
                        <option value="bar">Bar Chart</option>
                        <option value="area">Area Chart</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

