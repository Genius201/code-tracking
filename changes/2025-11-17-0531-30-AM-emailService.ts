/**
 * Email Service for Comics United
 * Handles authentication emails, notifications, and communications
 */

import nodemailer from 'nodemailer';
import { config } from '../config/environment';
import { logger } from '../utils/logger';

export interface EmailOptions {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}

export interface PasswordResetEmailData {
  firstName: string;
  resetLink: string;
  expiresIn: string;
}

export interface EmailVerificationData {
  firstName: string;
  verificationLink: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;
  
  constructor() {
    this.initializeTransporter();
  }
  
  private initializeTransporter() {
    if (config.email.provider === 'sendgrid') {
      this.transporter = nodemailer.createTransporter({
        service: 'SendGrid',
        auth: {
          user: 'apikey',
          pass: config.email.apiKey
        }
      });
    } else if (config.email.provider === 'smtp') {
      this.transporter = nodemailer.createTransporter({
        host: config.email.smtpHost,
        port: config.email.smtpPort,
        secure: config.email.smtpSecure,
        auth: {
          user: config.email.smtpUser,
... (truncated for brevity)