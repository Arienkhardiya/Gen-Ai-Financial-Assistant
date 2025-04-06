"use client"

import { useState, useEffect } from "react"
import { createClientSupabaseClient } from "@/lib/supabase-client"
import { subscribeToAIInsights } from "@/lib/realtime"
import { Bell } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function Notifications({ userId }: { userId: string }) {
  const [notifications, setNotifications] = useState<any[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    const fetchNotifications = async () => {
      const supabase = createClientSupabaseClient()

      const { data, error } = await supabase
        .from("ai_insights")
        .select("*")
        .eq("user_id", userId)
        .eq("read", false)
        .order("created_at", { ascending: false })
        .limit(10)

      if (error) {
        console.error("Error fetching notifications:", error)
        return
      }

      setNotifications(data || [])
      setUnreadCount(data?.length || 0)
    }

    fetchNotifications()

    // Subscribe to real-time notifications
    const subscription = subscribeToAIInsights(userId, (payload) => {
      if (payload.eventType === "INSERT") {
        const newInsight = payload.new

        // Add to notifications
        setNotifications((prev) => [newInsight, ...prev])
        setUnreadCount((prev) => prev + 1)

        // Show browser notification if supported
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("New Financial Insight", {
            body: newInsight.content.substring(0, 100) + "...",
            icon: "/logo.png",
          })
        }
      }
    })

    // Request notification permission
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission()
    }

    return () => {
      subscription.unsubscribe()
    }
  }, [userId])

  const markAsRead = async (id: string) => {
    const supabase = createClientSupabaseClient()

    await supabase.from("ai_insights").update({ read: true }).eq("id", id)

    // Update local state
    setNotifications((prev) => prev.filter((n) => n.id !== id))
    setUnreadCount((prev) => prev - 1)
  }

  const markAllAsRead = async () => {
    const supabase = createClientSupabaseClient()

    await supabase.from("ai_insights").update({ read: true }).eq("user_id", userId).eq("read", false)

    // Update local state
    setNotifications([])
    setUnreadCount(0)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative">
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </Badge>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <button onClick={markAllAsRead} className="text-xs text-blue-500 hover:underline">
              Mark all as read
            </button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="py-4 text-center text-gray-500">
            <p>No new notifications</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3 cursor-default">
              <div className="flex items-center w-full">
                <Badge
                  variant={
                    notification.priority === "high"
                      ? "destructive"
                      : notification.priority === "medium"
                        ? "warning"
                        : "secondary"
                  }
                  className="mr-2"
                >
                  {notification.priority}
                </Badge>
                <span className="font-medium">{notification.insight_type}</span>
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="ml-auto text-xs text-blue-500 hover:underline"
                >
                  Mark as read
                </button>
              </div>
              <p className="text-sm mt-1">{notification.content}</p>
              <p className="text-xs text-gray-500 mt-1">{new Date(notification.created_at).toLocaleString()}</p>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

