// Security utilities for input validation and sanitization

export class SecurityUtils {
  // Enhanced XSS Protection - Comprehensive HTML sanitization
  static sanitizeHTML(str) {
    if (typeof str !== 'string') return str;
    
    const temp = document.createElement('div');
    temp.textContent = str;
    
    // Additional XSS prevention - remove script tags, event handlers, etc.
    let sanitized = temp.innerHTML
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/vbscript:/gi, '')
      .replace(/data:/gi, '');
    
    return sanitized;
  }

  // Enhanced Input Sanitization - Protection against injection attacks
  static sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    
    return input
      .replace(/[<>\"'%;()&+\[\]{}|\\^~`]/g, '') // Remove dangerous characters
      .replace(/\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b/gi, '') // Remove SQL keywords
      .replace(/\b(javascript|vbscript|onload|onerror|onclick)\b/gi, '') // Remove script keywords
      .trim()
      .slice(0, 500); // Stricter length limit
  }

  // CSRF Token Generation and Validation
  static generateCSRFToken() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  // Content Security Policy Nonce Generation
  static generateNonce() {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode(...array));
  }

  // Email validation
  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
... (truncated for brevity)