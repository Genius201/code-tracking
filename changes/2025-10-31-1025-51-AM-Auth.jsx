import React, { useState } from 'react';
import './Auth.css';

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    stage_name: '',
    comedy_specialty: '',
    experience_level: '',
    location: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const comedySpecialties = [
    'Stand-up Comedy',
    'Improv',
    'Sketch Comedy',
    'Musical Comedy',
    'Comedy Writing',
    'Storytelling',
    'Character Comedy',
    'Roast Comedy',
    'Clean Comedy',
    'Alternative Comedy'
  ];

  const experienceLevels = [
    'Beginner (0-1 years)',
    'Intermediate (2-4 years)',
    'Advanced (5-9 years)',
    'Professional (10+ years)',
    'Industry Veteran (15+ years)'
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return false;
... (truncated for brevity)