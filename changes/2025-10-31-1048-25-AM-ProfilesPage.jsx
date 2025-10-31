import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from './services/api.js';
import UserProfile from './UserProfile';
import ComedianSearch from './ComedianSearch';
import ProfileView from './ProfileView';
import ConnectionRequests from './ConnectionRequests';
import SavedProfiles from './SavedProfiles';
import './ProfilesPage.css';

const ProfilesPage = ({ user, comedians = [], onUserUpdate }) => {
  const [activeTab, setActiveTab] = useState('my-profile');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [connectionRequests, setConnectionRequests] = useState([]);
  const [savedProfiles, setSavedProfiles] = useState([]);
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    loadUserData();
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;
    
    try {
      // Load user's connection requests
      const requests = JSON.parse(localStorage.getItem(`connectionRequests_${user.id}`) || '[]');
      setConnectionRequests(requests);
      
      // Load user's saved profiles
      const saved = JSON.parse(localStorage.getItem(`savedProfiles_${user.id}`) || '[]');
      setSavedProfiles(saved);
      
      // Load user's approved connections
      const userConnections = JSON.parse(localStorage.getItem(`connections_${user.id}`) || '[]');
      setConnections(userConnections);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleProfileView = (comedian) => {
    setSelectedProfile(comedian);
    setActiveTab('profile-view');
  };

  const handleConnectionRequest = async (targetUser, message) => {
    const request = {
      id: Date.now(),
      fromUser: user,
... (truncated for brevity)