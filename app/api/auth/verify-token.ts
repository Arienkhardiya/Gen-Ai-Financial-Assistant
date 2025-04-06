import { adminAuth } from "@/lib/firebase-admin"

export async function verifyAuthToken(token: string | undefined) {
  if (!token) {
    throw new Error("No authentication token provided")
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(token)
    return decodedToken
  } catch (error) {
    console.error("Error verifying auth token:", error)
    throw new Error("Invalid authentication token")
  }
}

