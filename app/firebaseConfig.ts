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

// Initialize Firebase only if the config has an apiKey (i.e. env vars are present).
// This prevents Next.js static prerendering from crashing when secrets are unavailable.
export const app = getApps().length === 0 && firebaseConfig.apiKey
  ? initializeApp(firebaseConfig)
  : getApps().length > 0
    ? getApp()
    : undefined as any;

export const auth = (app ? getAuth(app) : undefined) as unknown as Auth;
export const db = (app ? getFirestore(app) : undefined) as unknown as Firestore;
export const googleProvider = (app ? new GoogleAuthProvider() : undefined) as unknown as GoogleAuthProvider;
