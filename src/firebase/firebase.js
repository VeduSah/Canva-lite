import { initializeApp } from "firebase/app";
import { getFirestore, enableNetwork, disableNetwork } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyB85SIDa-3rLwFgNTRh_UvbebIerskGKck",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "canvas-2-73359.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "canvas-2-73359",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "canvas-2-73359.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1091975207309",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1091975207309:web:b20f6582dfbb1de7acc5c4",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-7NZVMB50RC"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Handle network state changes
window.addEventListener('online', () => {
  enableNetwork(db).catch(console.warn);
});

window.addEventListener('offline', () => {
  disableNetwork(db).catch(console.warn);
});

export default app;
