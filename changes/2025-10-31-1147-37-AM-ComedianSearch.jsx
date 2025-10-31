import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import VenueSearch from './VenueSearch';

const ComedianSearch = ({ 
  comedians, 
  currentUser, 
  onProfileView, 
  onConnectionRequest, 
  onSaveProfile,
  isConnected,
  hasPendingRequest 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    specialty: '',
    experience: '',
    venue: '',
    availability: ''
  });
  const [showVenueSearch, setShowVenueSearch] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [filteredComedians, setFilteredComedians] = useState(comedians);

  useEffect(() => {
    filterComedians();
  }, [searchQuery, filters, comedians, selectedVenue]);

  const filterComedians = () => {
    let filtered = [...comedians];

    // Filter out current user
    if (currentUser) {
      filtered = filtered.filter(comedian => comedian.id !== currentUser.id);
    }

    // Text search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(comedian => {
        // Handle specialty search for both array and string formats
        const specialtyMatch = Array.isArray(comedian.comedy_specialty) 
          ? comedian.comedy_specialty.some(spec => spec.toLowerCase().includes(query))
          : (comedian.comedy_specialty && comedian.comedy_specialty.toLowerCase().includes(query)) ||
            (comedian.specialty && comedian.specialty.toLowerCase().includes(query));
            
        return (comedian.stage_name && comedian.stage_name.toLowerCase().includes(query)) ||
               (comedian.fullName && comedian.fullName.toLowerCase().includes(query)) ||
               (comedian.name && comedian.name.toLowerCase().includes(query)) ||
... (truncated for brevity)