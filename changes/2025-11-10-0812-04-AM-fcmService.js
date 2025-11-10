import { messaging, getToken, onMessage } from '../config/firebase.js';

class FCMService {
  constructor() {
    this.vapidKey = 'BK8rO_fYVHWZvzFj7zX9rQvQ4zGJ7zX9rQvQ4zGJ7zX9rQvQ4zGJ7zX9rQvQ4zGJ'; // You'll need to generate this
    this.currentToken = null;
    this.initialized = false;
  }

  // Initialize FCM
  async initialize() {
    if (!messaging || this.initialized) {
      return false;
    }

    try {
      // Register service worker
      await this.registerServiceWorker();
      
      // Request permission for notifications
      const permission = await this.requestPermission();
      
      if (permission === 'granted') {
        // Get FCM token
        await this.getFCMToken();
        
        // Setup message listener
        this.setupMessageListener();
        
        this.initialized = true;
        console.log('✅ FCM initialized successfully');
        return true;
      } else {
        console.warn('⚠️ Notification permission not granted');
        return false;
      }
    } catch (error) {
      console.error('❌ FCM initialization failed:', error);
      return false;
    }
  }

  // Register service worker for FCM
  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        console.log('Service Worker registered:', registration);
        return registration;
      } catch (error) {
... (truncated for brevity)