import React, { useState } from 'react';
import './InviteModal.css';

const InviteModal = ({ onClose, onSendInvite, userInfo }) => {
  const [inviteData, setInviteData] = useState({
    method: 'email', // 'email' or 'phone'
    contact: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Contact validation
    if (!inviteData.contact.trim()) {
      newErrors.contact = inviteData.method === 'email' 
        ? 'Email address is required' 
        : 'Phone number is required';
    } else if (inviteData.method === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(inviteData.contact)) {
        newErrors.contact = 'Please enter a valid email address';
      }
    } else {
      // Basic phone number validation
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      const cleanPhone = inviteData.contact.replace(/[\s\-\(\)]/g, '');
      if (!phoneRegex.test(cleanPhone) || cleanPhone.length < 10) {
        newErrors.contact = 'Please enter a valid phone number';
      }
    }

    // Message validation
    if (!inviteData.message.trim()) {
      newErrors.message = 'Please include a personal message with your invite';
    } else if (inviteData.message.length < 10) {
      newErrors.message = 'Message should be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInviteData(prev => ({
      ...prev,
      [name]: value
... (truncated for brevity)