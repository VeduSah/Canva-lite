import { initializeApp } from "firebase/app";
import { getFirestore, enableNetwork, disableNetwork } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB85SIDa-3rLwFgNTRh_UvbebIerskGKck",
  authDomain: "canvas-2-73359.firebaseapp.com",
  projectId: "canvas-2-73359",
  storageBucket: "canvas-2-73359.firebasestorage.app",
  messagingSenderId: "1091975207309",
  appId: "1:1091975207309:web:b20f6582dfbb1de7acc5c4",
  measurementId: "G-7NZVMB50RC"
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
