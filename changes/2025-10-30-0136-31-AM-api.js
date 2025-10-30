import axios from 'axios';
import SecurityUtils from '../utils/security.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

// Create axios instance with maximum security configurations
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000, // Reduced timeout for better security
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
  },
  // Additional security options
  withCredentials: false, // Prevent credential leakage
  maxRedirects: 0, // Prevent redirect attacks
  validateStatus: (status) => status >= 200 && status < 300 // Strict status validation
});

// Request interceptor for security
apiClient.interceptors.request.use(
  (config) => {
    // Add CSRF token if available
    const csrfToken = SecurityUtils.secureStorage.get('csrf_token');
    if (csrfToken) {
      config.headers['X-CSRF-Token'] = csrfToken;
    }
    
    // Sanitize request data
    if (config.data && typeof config.data === 'object') {
      config.data = sanitizeRequestData(config.data);
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 429) {
      console.warn('Rate limit exceeded. Please try again later.');
    }
    return Promise.reject(error);
  }
... (truncated for brevity)