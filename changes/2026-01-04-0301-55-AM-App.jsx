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
import SetAssistant from './SetAssistant';

function AppContent() {
    // Profile dropdown state
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    // Close profile dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (showProfileDropdown && !event.target.closest('.profile-dropdown-container')) {
          setShowProfileDropdown(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [showProfileDropdown]);
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
... (truncated for brevity)