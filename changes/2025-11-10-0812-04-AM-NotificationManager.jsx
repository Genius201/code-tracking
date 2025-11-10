import React, { useState, useEffect } from 'react';
import { fcmService } from '../services/fcmService.js';

const NotificationManager = ({ onNotificationReceived }) => {
  const [fcmStatus, setFcmStatus] = useState({
    initialized: false,
    hasToken: false,
    permission: 'default',
    supported: false
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initializeFCM();
    setupMessageListener();
  }, []);

  const initializeFCM = async () => {
    setLoading(true);
    try {
      const initialized = await fcmService.initialize();
      updateStatus();
      
      if (initialized) {
        console.log('🔔 Push notifications enabled');
      }
    } catch (error) {
      console.error('FCM initialization error:', error);
    } finally {
      setLoading(false);
    }
  };

  const setupMessageListener = () => {
    // Listen for messages from service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data?.type === 'NOTIFICATION_CLICK') {
          handleNotificationNavigation(event.data.data);
        }
      });
    }
  };

  const handleNotificationNavigation = (data) => {
    if (onNotificationReceived) {
      onNotificationReceived(data);
    }
  };

... (truncated for brevity)