import { Response } from 'express';
import { logger } from '../utils/logger';
import { AuthenticatedRequest } from '../middleware/auth';
import { db as knex } from '../config/database';
// Remove unused imports - these controllers implement the functionality directly

/**
 * Get all users (admin only)
 */
export const getAllUsers = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // Check if user is admin
    if (req.user?.role !== 'admin') {
      return res.status(403).json({
        error: 'Access denied',
        message: 'Admin access required'
      });
    }

    const {
      page = '1',
      limit = '10',
      search,
      userType,
      status,
      role
    }: {
      page?: string;
      limit?: string;
      search?: string;
      status?: string;
      role?: string;
      userType?: string;
      sortBy?: string;
      sortOrder?: string;
    } = req.query;

    const pageNum = parseInt(page);
    const limitNum = Math.min(parseInt(limit), 100); // Max 100 per page
    const offset = (pageNum - 1) * limitNum;

    // Build query
    let query = knex('users').select([
      'id',
      'email',
      'first_name',
      'last_name',
      'user_type',
      'role',
      'status',
... (truncated for brevity)