// Firebase messaging service worker
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

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
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Background message received:', payload);

  const notificationTitle = payload.notification?.title || 'Comics United';
  const notificationOptions = {
    body: payload.notification?.body || 'You have a new update',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    tag: payload.data?.type || 'general',
    data: payload.data,
    actions: [
      {
        action: 'view',
        title: 'View'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ]
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Notification click received:', event);

... (truncated for brevity)