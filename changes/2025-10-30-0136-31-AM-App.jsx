import React, { useState, useEffect } from 'react';
import { apiService } from './services/api.js';
import SecurityMiddleware from './utils/securityMiddleware.js';
import { SecurityUtils } from './utils/security.js';
import './App.css';
import LandingPage from './LandingPage';
import Auth from './Auth';
import VenueSearch from './VenueSearch';
import FeedbackModal from './FeedbackModal';
import ProfilesPage from './ProfilesPage';

function App() {
  const [user, setUser] = useState(null);
  const [selectedTab, setSelectedTab] = useState('profiles');
  const [showModal, setShowModal] = useState(false);
  const [selectedComedian, setSelectedComedian] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [betaUser, setBetaUser] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  
  // State for data from API
  const [comedians, setComedians] = useState([]);
  const [venues, setVenues] = useState([]);
  const [groups, setGroups] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    // Check for existing user session
    const savedUser = localStorage.getItem('comicsUnited_user');
    const savedBetaStatus = localStorage.getItem('betaUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setBetaUser(savedBetaStatus === 'true');
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [comediansRes, venuesRes, groupsRes] = await Promise.all([
        apiService.comedians.getAll(),
        apiService.venues.getAll(),
        apiService.groups.getAll()
      ]);
      
... (truncated for brevity)