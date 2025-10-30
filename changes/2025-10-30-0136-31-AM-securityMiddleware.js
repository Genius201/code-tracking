// Security Middleware - Addresses Meterian Security Issues
// This module provides comprehensive protection against common web vulnerabilities

export class SecurityMiddleware {
  
  // Rate Limiting Protection (Prevents brute force attacks)
  static rateLimiter = {
    attempts: new Map(),
    maxAttempts: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
    
    checkLimit(identifier) {
      const now = Date.now();
      const userAttempts = this.attempts.get(identifier) || { count: 0, resetTime: now + this.windowMs };
      
      if (now > userAttempts.resetTime) {
        userAttempts.count = 0;
        userAttempts.resetTime = now + this.windowMs;
      }
      
      if (userAttempts.count >= this.maxAttempts) {
        return false;
      }
      
      userAttempts.count++;
      this.attempts.set(identifier, userAttempts);
      return true;
    }
  };

  // Input Validation Chain (Comprehensive input sanitization)
  static validateAndSanitizeInput(data, rules = {}) {
    const sanitized = {};
    
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') {
        // XSS Prevention
        let clean = value
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
          .replace(/javascript:/gi, '')
          .replace(/vbscript:/gi, '')
          .replace(/data:text\/html/gi, '');
        
        // SQL Injection Prevention
        clean = clean.replace(/(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/gi, '');
        
        // NoSQL Injection Prevention
        clean = clean.replace(/[\$\{\}]/g, '');
        
... (truncated for brevity)