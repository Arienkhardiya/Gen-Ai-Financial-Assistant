import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check"
import { app } from "./firebase"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import crypto from "crypto"

// Initialize App Check for frontend security
export function initAppCheck() {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
    // We'll get the reCAPTCHA site key from the server
    fetch("/api/recaptcha-key")
      .then((response) => response.json())
      .then((data) => {
        if (data.key) {
          initializeAppCheck(app, {
            provider: new ReCaptchaV3Provider(data.key),
            isTokenAutoRefreshEnabled: true,
          })
        }
      })
      .catch((error) => {
        console.error("Failed to initialize App Check:", error)
      })
  }
}

// Generate a JWT token
export function generateToken(payload: any, expiresIn = "1d") {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn })
}

// Verify a JWT token
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!)
  } catch (error) {
    return null
  }
}

// Hash a password
export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10)
}

// Compare a password with a hash
export async function comparePassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash)
}

// Generate a secure random token
export function generateSecureToken(length = 32) {
  return crypto.randomBytes(length).toString("hex")
}

// Encrypt sensitive data
export function encryptData(data: string, key = process.env.ENCRYPTION_KEY!) {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv("aes-256-gcm", Buffer.from(key, "hex"), iv)

  let encrypted = cipher.update(data, "utf8", "hex")
  encrypted += cipher.final("hex")

  const authTag = cipher.getAuthTag()

  return {
    iv: iv.toString("hex"),
    encrypted,
    authTag: authTag.toString("hex"),
  }
}

// Decrypt sensitive data
export function decryptData(
  encryptedData: { iv: string; encrypted: string; authTag: string },
  key = process.env.ENCRYPTION_KEY!,
) {
  const decipher = crypto.createDecipheriv("aes-256-gcm", Buffer.from(key, "hex"), Buffer.from(encryptedData.iv, "hex"))

  decipher.setAuthTag(Buffer.from(encryptedData.authTag, "hex"))

  let decrypted = decipher.update(encryptedData.encrypted, "hex", "utf8")
  decrypted += decipher.final("utf8")

  return decrypted
}

// Sanitize user input
export function sanitizeInput(input: string) {
  return input.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
}

// Content Security Policy
export const CSP = {
  "default-src": ["'self'"],
  "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://www.gstatic.com", "https://www.google.com"],
  "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
  "font-src": ["'self'", "https://fonts.gstatic.com"],
  "img-src": [
    "'self'",
    "data:",
    "https://www.gstatic.com",
    "https://lh3.googleusercontent.com",
    "https://avatars.githubusercontent.com",
  ],
  "connect-src": [
    "'self'",
    "https://identitytoolkit.googleapis.com",
    "https://securetoken.googleapis.com",
    "https://www.googleapis.com",
    "https://firestore.googleapis.com",
    "https://www.alphavantage.co",
  ],
  "frame-src": ["'self'", "https://www.google.com"],
  "worker-src": ["'self'", "blob:"],
}

// Convert CSP object to string
export function generateCSPString(csp = CSP) {
  return Object.entries(csp)
    .map(([key, values]) => `${key} ${values.join(" ")}`)
    .join("; ")
}

