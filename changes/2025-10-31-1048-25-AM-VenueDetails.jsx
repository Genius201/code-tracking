import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiService } from '../services/api.js';
import './VenueDetails.css';

function VenueDetails() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        setLoading(true);
        const venues = await apiService.venues.getAll();
        const foundVenue = venues.find(v => 
          v.id.toString() === id || 
          v.name.toLowerCase().replace(/\s+/g, '-') === id
        );
        
        if (foundVenue) {
          setVenue(foundVenue);
        } else {
          setError('Venue not found');
        }
      } catch (err) {
        setError('Failed to load venue details');
        console.error('Error fetching venue:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  if (loading) {
    return (
      <div className="venue-details loading">
        <div className="loading-spinner">Loading venue details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="venue-details error">
        <div className="error-message">
          <h2>Venue Not Found</h2>
... (truncated for brevity)