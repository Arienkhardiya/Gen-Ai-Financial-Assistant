import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getDatabase } from "firebase/database"
import { getFunctions } from "firebase/functions"
import { getStorage } from "firebase/storage"

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
}

// Initialize Firebase only on client side and only once
let app
let auth
let firestore
let realtime
let functions
let storage
let analytics = null

if (typeof window !== "undefined") {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig)
  } else {
    app = getApp()
  }

  auth = getAuth(app)
  firestore = getFirestore(app)
  realtime = getDatabase(app)
  functions = getFunctions(app)
  storage = getStorage(app)

  // Initialize Analytics only on client side
  if (typeof window.navigator !== "undefined") {
    import("firebase/analytics")
      .then(({ getAnalytics }) => {
        analytics = getAnalytics(app)
      })
      .catch((err) => {
        console.error("Analytics failed to load:", err)
      })
  }
}

export { app, auth, firestore, realtime, functions, storage, analytics }

