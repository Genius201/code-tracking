/**
 * Authentication Routes for Comics United
 * Handles all authentication-related endpoints
 */

import { Router } from 'express';
import { body, query } from 'express-validator';
import { validateRequest } from '../middleware/validation';
import { rateLimiter } from '../middleware/rateLimiter';
import { authenticate, optionalAuthenticate } from '../middleware/auth';
import {
  register,
  login,
  refreshToken,
  logout,
  logoutAll,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerification,
  googleAuth
} from '../controllers/authController';

const router = Router();

/**
 * POST /auth/register
 * Register a new user account
 */
router.post('/register',
  rateLimiter.strict, // 5 attempts per 15 minutes
  [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Valid email is required'),
    body('password')
      .isLength({ min: 8, max: 128 })
      .withMessage('Password must be between 8 and 128 characters'),
    body('firstName')
      .trim()
      .isLength({ min: 1, max: 50 })
      .withMessage('First name is required and must be less than 50 characters'),
    body('lastName')
      .trim()
      .isLength({ min: 1, max: 50 })
      .withMessage('Last name is required and must be less than 50 characters'),
    body('userType')
      .isIn(['comedian', 'venue_owner', 'fan', 'industry'])
      .withMessage('Valid user type is required'),
... (truncated for brevity)