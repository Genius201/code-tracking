import React, { useState } from 'react';
import { apiService } from './services/hybridApi.js';
import { fcmService } from './services/fcmService.js';
import './FeedbackModal.css';

const FeedbackModal = ({ onClose, userInfo }) => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(5);
  const [category, setCategory] = useState('general');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setIsSubmitting(true);
    try {
      const feedbackData = {
        feedback: feedback.trim(),
        rating,
        category,
        user: userInfo?.fullName || 'Anonymous',
        userId: userInfo?.id || null,
      };

      await apiService.feedback.submit(feedbackData);
      
      // Send push notification for admin/feedback managers
      try {
        await fcmService.notifyNewFeedback(feedbackData);
      } catch (notifError) {
        console.warn('Notification failed:', notifError);
      }
      
      setSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      alert('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="modal-overlay">
... (truncated for brevity)