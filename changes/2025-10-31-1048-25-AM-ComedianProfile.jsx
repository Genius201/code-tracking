import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiService } from '../services/api.js';
import './ComedianProfile.css';

function ComedianProfile() {
  const { id } = useParams();
  const [comedian, setComedian] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComedian = async () => {
      try {
        setLoading(true);
        const comedians = await apiService.comedians.getAll();
        const foundComedian = comedians.find(c => 
          c.id.toString() === id || 
          c.name.toLowerCase().replace(/\s+/g, '-') === id
        );
        
        if (foundComedian) {
          setComedian(foundComedian);
        } else {
          setError('Comedian not found');
        }
      } catch (err) {
        setError('Failed to load comedian profile');
        console.error('Error fetching comedian:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchComedian();
  }, [id]);

  if (loading) {
    return (
      <div className="comedian-profile loading">
        <div className="loading-spinner">Loading comedian profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="comedian-profile error">
        <div className="error-message">
          <h2>Profile Not Found</h2>
... (truncated for brevity)