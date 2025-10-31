import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { apiService } from './services/api.js';
import SecurityMiddleware from './utils/securityMiddleware.js';
import { SecurityUtils } from './utils/security.js';
import './App.css';
import LandingPage from './LandingPage';
import Auth from './Auth';
import VenueSearch from './VenueSearch';
import FeedbackModal from './FeedbackModal';
import InviteModal from './InviteModal';
import ProfilesPage from './ProfilesPage';
import ComedianProfile from './pages/ComedianProfile';
import VenueDetails from './pages/VenueDetails';
import InvitesAndTesting from './pages/InvitesAndTesting';
import NotFound from './pages/NotFound';

function AppContent() {
  console.log('AppContent component rendering...');
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [selectedTab, setSelectedTab] = useState('profiles');
  const [showModal, setShowModal] = useState(false);
  const [selectedComedian, setSelectedComedian] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [betaUser, setBetaUser] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  
  // Dropdown states
  const [showVenuesDropdown, setShowVenuesDropdown] = useState(false);
  const [showGroupsDropdown, setShowGroupsDropdown] = useState(false);
  const [showMessagesDropdown, setShowMessagesDropdown] = useState(false);
  
  // Invite modal state
  const [showInviteModal, setShowInviteModal] = useState(false);
  
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
... (truncated for brevity)