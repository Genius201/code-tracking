import React, { useState } from 'react';
import InviteModal from '../InviteModal';
import './InvitesAndTesting.css';
import './InvitesAndTesting.css';

const InvitesAndTesting = ({ user }) => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [testingFeatures] = useState([
    {
      id: 1,
      name: "Beta Feedback System",
      description: "Test our new feedback collection system for beta users",
      status: "active",
      link: "#feedback"
    },
    {
      id: 2,
      name: "Venue Search Enhancement",
      description: "Try our improved venue search with 50-state coverage",
      status: "active",
      link: "/venues"
    },
    {
      id: 3,
      name: "Comedian Profile Updates",
      description: "Test the new comedian profile features and verification system",
      status: "active",
      link: "/"
    },
    {
      id: 4,
      name: "Group Chat Integration",
      description: "Preview upcoming group messaging features",
      status: "coming-soon",
      link: "#groups"
    },
    {
      id: 5,
      name: "Mobile App Preview",
      description: "Get early access to our mobile app beta",
      status: "coming-soon",
      link: "#mobile"
    }
  ]);

  const handleSendInvite = (inviteData) => {
    // Here you would typically send the invite via API
    console.log('Sending invite:', inviteData);
    
    // For demo purposes, we'll show a success message
... (truncated for brevity)