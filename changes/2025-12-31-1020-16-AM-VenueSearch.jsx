import React, { useState, useMemo } from 'react';
import './VenueSearch.css';
import './VenueSearch.css';

const VenueSearch = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [venueType, setVenueType] = useState('');
  const [openMicOnly, setOpenMicOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Comprehensive venue database organized by state and city
  const venueDatabase = {
    "NY": {
      "New York City": [
        {
          id: 1,
          name: "The Comedy Cellar",
          address: "117 MacDougal St, Greenwich Village",
          type: "Comedy Club",
          rating: 4.9,
          capacity: 146,
          phone: "(212) 254-3480",
          website: "comedycellar.com",
          description: "World-famous underground comedy club in Greenwich Village",
          openMic: {
            available: false,
            reason: "Invitation only - industry professionals"
          }
        },
        {
          id: 2,
          name: "Eastville Comedy Club",
          address: "85-15 Northern Blvd, Jackson Heights",
          type: "Comedy Club",
          rating: 4.6,
          capacity: 200,
          phone: "(718) 565-1415",
          website: "eastvillecomedy.com",
          description: "Queens comedy club with regular open mic nights",
          openMic: {
            available: true,
            nights: ["Tuesday", "Sunday"],
            time: "8:00 PM",
            signup: "7:00 PM same day",
            cost: "$5 drink minimum",
            spots: 15,
            setLength: "5 minutes"
          }
        },
... (truncated for brevity)