import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://bbgggdxypkbejneeswmh.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJiZ2dnZHh5cGtiZWpuZWVzd21oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NTMxMTksImV4cCI6MjA1ODIyOTExOX0.7n0GTiRtT-ACULszNGyz08YO092HTc81MXgPKWEF_-k"

// Create a single instance of the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})

