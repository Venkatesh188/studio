
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const firebaseAuthDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
const firebaseProjectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const firebaseStorageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
const firebaseMessagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
const firebaseAppId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;
const firebaseMeasurementId = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID;


if (!firebaseApiKey) {
  throw new Error(
    "Firebase API Key (NEXT_PUBLIC_FIREBASE_API_KEY) is missing. " +
    "Please set it in your environment variables (e.g., .env.local), ensure it's correctly prefixed with NEXT_PUBLIC_, and restart the Next.js server."
  );
}

if (!firebaseAuthDomain) {
    throw new Error(
        "Firebase Auth Domain (NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN) is missing. " +
        "Please set it in your environment variables (e.g., .env.local), ensure it's correctly prefixed with NEXT_PUBLIC_, and restart the Next.js server."
    );
}

if (!firebaseProjectId) {
  throw new Error(
    "Firebase Project ID (NEXT_PUBLIC_FIREBASE_PROJECT_ID) is missing. " +
    "Please set it in your environment variables (e.g., .env.local), ensure it's correctly prefixed with NEXT_PUBLIC_, and restart the Next.js server."
  );
}


// These are not strictly required for auth to initialize, but good for full Firebase setup
if (!firebaseStorageBucket) {
  console.warn(
    "Firebase Storage Bucket (NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET) is missing. " +
    "Set it in .env.local if you plan to use Firebase Storage."
  );
}

if (!firebaseMessagingSenderId) {
  console.warn(
    "Firebase Messaging Sender ID (NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID) is missing. " +
    "Set it in .env.local if you plan to use Firebase Messaging."
  );
}

if (!firebaseAppId) {
  console.warn(
    "Firebase App ID (NEXT_PUBLIC_FIREBASE_APP_ID) is missing. " +
    "Set it in .env.local for a complete Firebase setup."
  );
}


const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: firebaseAuthDomain,
  projectId: firebaseProjectId,
  storageBucket: firebaseStorageBucket,
  messagingSenderId: firebaseMessagingSenderId,
  appId: firebaseAppId,
  measurementId: firebaseMeasurementId, // Often used with Analytics
};

// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

export { app, auth, db };
