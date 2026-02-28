// ============================================
// Hospital-related type definitions
// ============================================

import type { MultilingualText } from './user';

/** Status of a hospital booking */
export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

/** Opening hours structure stored as JSON */
export interface OpeningHours {
  [day: string]: {
    open: string;
    close: string;
    isClosed?: boolean;
  };
}

/** A hospital or medical facility */
export interface Hospital {
  id: string;
  name: MultilingualText;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  website: string | null;
  specialties: string[];
  languages: string[];
  acceptsNhi: boolean;
  hasInterpreter: boolean;
  openingHours: OpeningHours;
  rating: number | null;
  reviewCount: number;
  imageUrl: string | null;
  prefecture: string;
  city: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/** Hospital with nested bookings */
export interface HospitalWithBookings extends Hospital {
  bookings: HospitalBooking[];
}

/** A booking / appointment at a hospital */
export interface HospitalBooking {
  id: string;
  userId: string;
  hospitalId: string;
  dateTime: Date;
  specialty: string;
  symptoms: MultilingualText | null;
  status: BookingStatus;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

/** Hospital booking with the related hospital data */
export interface HospitalBookingWithHospital extends HospitalBooking {
  hospital: Hospital;
}
