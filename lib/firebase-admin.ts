import * as admin from "firebase-admin"

// Check if Firebase Admin is already initialized
let firebaseAdmin: admin.app.App

if (!admin.apps.length) {
  // Initialize Firebase Admin with credentials
  firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // Replace newlines in the private key
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  })
} else {
  firebaseAdmin = admin.app()
}

// Export the admin services
const adminAuth = firebaseAdmin.auth()
const adminFirestore = firebaseAdmin.firestore()
const adminDatabase = firebaseAdmin.database()
const adminStorage = firebaseAdmin.storage()

// Export both the admin services and the auth as a named export
export { firebaseAdmin, adminAuth, adminFirestore, adminDatabase, adminStorage, adminAuth as auth }

