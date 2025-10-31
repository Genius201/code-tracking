import axios from 'axios';
import SecurityUtils from '../utils/security.js';

// Helper to get Vite env base URL (only in browser/Vite)
let viteApiBaseUrl;
function getViteApiBaseUrl() {
  // Only in browser/Vite: dynamically import viteApiBaseUrl.js
  if (typeof window === 'undefined') {
    // Node/Jest: never reference import.meta
    return undefined;
  }
  if (viteApiBaseUrl !== undefined) {
    return viteApiBaseUrl;
  }
  try {
    // Dynamically require viteApiBaseUrl.js (only in browser)
    // eslint-disable-next-line global-require
    viteApiBaseUrl = require('./viteApiBaseUrl.js').default;
    return viteApiBaseUrl;
  } catch (e) {
    return undefined;
  }
}

// Main API client factory
export function createApiClient(baseURL) {
  let resolvedBaseURL = baseURL;
  if (!resolvedBaseURL) {
    // Try Vite env (browser only)
    resolvedBaseURL = getViteApiBaseUrl();
  }
  if (!resolvedBaseURL) {
    resolvedBaseURL = 'http://localhost:3001';
  }
  return axios.create({
    baseURL: resolvedBaseURL,
    timeout: 8000,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
    },
    withCredentials: false,
    maxRedirects: 0,
    validateStatus: (status) => status >= 200 && status < 300
  });
}
... (truncated for brevity)