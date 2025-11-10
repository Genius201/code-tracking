import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { apiService } from './services/hybridApi.js';
import SecurityMiddleware from './utils/securityMiddleware.js';
import { SecurityUtils } from './utils/security.js';
import './App.css';
import Auth from './Auth';
import FeedbackModal from './FeedbackModal';
import InviteModal from './InviteModal';
import ErrorBoundary from './components/ErrorBoundary';
import Navigation from './components/Navigation';
import AppRoutes from './routes/AppRoutes';
import ProtectedRoute from './components/ProtectedRoute';
import VerificationBadge from './components/VerificationBadge';
import DatabaseStatus from './DatabaseStatus';

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
    
    // Listen for auth events from welcome section
    const handleShowAuth = (event) => {
      setShowAuth(event.detail);
... (truncated for brevity)