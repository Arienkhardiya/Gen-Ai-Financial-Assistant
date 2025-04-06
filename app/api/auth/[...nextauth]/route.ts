import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth, firestore } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"
import type { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null

        try {
          // Sign in with Firebase
          const { user } = await signInWithEmailAndPassword(auth, credentials.email, credentials.password)

          // Get user profile from Firestore
          const profileRef = doc(firestore, "userProfiles", user.uid)
          const profileSnap = await getDoc(profileRef)

          if (!profileSnap.exists()) {
            return null
          }

          const profile = profileSnap.data()

          // Return user object
          return {
            id: user.uid,
            email: user.email,
            name: profile.displayName || user.displayName,
            image: profile.photoURL || user.photoURL,
            role: profile.role || "user",
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        token.accessToken = account.access_token
        token.id = user.id
        token.role = (user as any).role || "user"
      }
      return token
    },
    async session({ session, token }) {
      // Send properties to the client
      session.user.id = token.id as string
      session.user.role = token.role as string
      return session
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

