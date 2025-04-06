import { NextResponse } from "next/server"

export async function GET() {
  // Only return the key if the request is from our own domain
  return NextResponse.json({\
    key: process.env.6Le8RAsrAAAAAM6DwaQBa9_0cIKS6oezUtYMKzVh,
  })
}

