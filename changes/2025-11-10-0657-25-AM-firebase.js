// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQGW6PCh8uk3ZWWkwXke9tc1woYqfcqdU",
  authDomain: "comics-united-app.firebaseapp.com",
  projectId: "comics-united-app",
  storageBucket: "comics-united-app.firebasestorage.app",
  messagingSenderId: "2305382068",
  appId: "1:2305382068:web:8f4481822f9ccdf9fee9e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Firebase Cloud Messaging
let messaging = null;
try {
  // FCM only works in browsers with service worker support
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    messaging = getMessaging(app);
  }
} catch (error) {
  console.warn('FCM initialization failed: - firebase.js:30', error);
}

// Export Firebase services
export { messaging, getToken, onMessage };
export default app;

export default app;