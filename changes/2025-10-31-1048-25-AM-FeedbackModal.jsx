import React, { useState } from 'react';
import { apiService } from './services/api.js';
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
      await apiService.feedback.submit({
        feedback: feedback.trim(),
        rating,
        category,
        user: userInfo?.fullName || 'Anonymous',
        userId: userInfo?.id || null,
      });
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
        <div className="feedback-modal">
          <div className="success-message">
            <h3>✅ Thank You!</h3>
            <p>Your feedback has been submitted successfully.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
... (truncated for brevity)