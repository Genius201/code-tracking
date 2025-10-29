# Netlify Permalink Configuration Guide

## Overview
This guide explains the permalink configuration for Comics United on Netlify, enabling clean, SEO-friendly URLs for your comedy networking platform.

## Configured Permalink Patterns

### 1. Comedian Profiles
- **Pattern:** `/comedian/:id`
- **Example:** `https://your-site.netlify.app/comedian/john-doe`
- **Use case:** Individual comedian profile pages

### 2. Venue Pages  
- **Pattern:** `/venue/:id`
- **Example:** `https://your-site.netlify.app/venue/comedy-cellar`
- **Use case:** Individual venue detail and review pages

### 3. Group/Collaboration Pages
- **Pattern:** `/group/:id` 
- **Example:** `https://your-site.netlify.app/group/nyc-writers`
- **Use case:** Collaboration group pages

### 4. User Profiles
- **Pattern:** `/profile/:username`
- **Example:** `https://your-site.netlify.app/profile/funny_mike`
- **Use case:** Public user profiles

## Implementation in React

To use these permalinks in your React app, you'll need to implement client-side routing. Here's a basic example:

### Install React Router (if not already installed)