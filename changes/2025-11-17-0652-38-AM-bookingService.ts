import { db as knex } from '../config/database';
import { logger } from '../utils/logger';
import { v4 as uuidv4 } from 'uuid';
import type { 
  Booking, 
  BookingProfile, 
  BookingListItem, 
  BookingDbRow,
  CreateBookingRequest, 
  UpdateBookingRequest,
  BookingSearchFilters,
  BookingStats,
  BookingMessage,
  BookingHistoryEntry,
  AvailabilityCheck,
  AvailabilitySlot,
  BookingApprovalRequest,
  BookingPricing,
  CancellationTerms,
  BookingRequirements
} from '../types/booking';

// Database row mapping utilities
const mapDbRowToBooking = (row: BookingDbRow): Booking => {
  return {
    id: row.id || '',
    bookingType: row.booking_type as any,
    clientId: row.client_id || '',
    providerId: row.provider_id || '',
    eventId: row.event_id || '',
    venueId: row.venue_id,
    title: row.title,
    description: row.description,
    startDatetime: row.start_datetime,
    endDatetime: row.end_datetime,
    durationMinutes: row.duration_minutes,
    status: row.status as any,
    pricing: JSON.parse(row.pricing),
    paymentStatus: row.payment_status as any,
    paymentDetails: row.payment_details ? JSON.parse(row.payment_details) : undefined,
    cancellationTerms: JSON.parse(row.cancellation_terms),
    requirements: JSON.parse(row.requirements),
    specialRequests: row.special_requests,
    internalNotes: row.internal_notes,
    confirmedAt: row.confirmed_at,
    cancelledAt: row.cancelled_at,
    cancellationReason: row.cancellation_reason,
    completedAt: row.completed_at,
    noShowReported: row.no_show_reported,
    createdAt: row.created_at,
... (truncated for brevity)