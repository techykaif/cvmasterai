// firebaseConfig.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { Auth, getAuth, GoogleAuthProvider } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase only on the client side
export const app = typeof window !== "undefined" && getApps().length === 0 && firebaseConfig.apiKey
  ? initializeApp(firebaseConfig)
  : typeof window !== "undefined" && getApps().length > 0
    ? getApp()
    : undefined as any;

export const auth = (typeof window !== "undefined" && app ? getAuth(app) : undefined) as unknown as Auth;
export const db = (typeof window !== "undefined" && app ? getFirestore(app) : undefined) as unknown as Firestore;
export const googleProvider = (typeof window !== "undefined" && app ? new GoogleAuthProvider() : undefined) as unknown as GoogleAuthProvider;
