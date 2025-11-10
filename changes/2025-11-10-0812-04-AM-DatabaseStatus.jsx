import React, { useState, useEffect } from 'react';
import { apiService } from './services/hybridApi.js';
import { fcmService } from './services/fcmService.js';
import './FeedbackModal.css';

const DatabaseStatus = () => {
  const [status, setStatus] = useState(null);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [fcmStatus, setFcmStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkDatabaseStatus();
  }, []);

  const checkDatabaseStatus = async () => {
    try {
      setLoading(true);
      
      // Check connection status
      const connectionStatus = await apiService.getConnectionStatus();
      setStatus(connectionStatus);
      
      // Get feedback count
      const feedback = await apiService.feedback.getAll();
      setFeedbackCount(feedback.length);
      
      // Check FCM status
      const fcmStat = fcmService.getStatus();
      setFcmStatus(fcmStat);
      
    } catch (error) {
      console.error('Error checking database status:', error);
      setStatus({ mode: 'error', message: 'Connection failed' });
    } finally {
      setLoading(false);
    }
  };

  const testFeedbackSubmission = async () => {
    try {
      const testFeedback = {
        feedback: 'Firebase feedback test - ' + new Date().toISOString(),
        rating: 5,
        category: 'feature',
        user: 'System Test',
        userId: 'test-' + Date.now()
      };

      await apiService.feedback.submit(testFeedback);
... (truncated for brevity)