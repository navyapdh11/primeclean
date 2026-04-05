// ---------------------------------------------------------------------------
// PrimeClean - Shared TypeScript types
// ---------------------------------------------------------------------------

// Enums

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show',
}

export enum UserRole {
  CUSTOMER = 'customer',
  CLEANER = 'cleaner',
  ADMIN = 'admin',
}

// Core entities

export interface Service {
  id: string;
  name: string;
  description: string;
  price_cents: number;
  duration: string;
  active: boolean;
  image?: string;
}

export interface Customer {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  created_at: string;
}

export interface Booking {
  id: string;
  user_id: string;
  service_id: string;
  date: string;
  time: string;
  address: string;
  status: BookingStatus;
  stripe_session_id: string | null;
  stripe_payment_intent_id: string | null;
  total_cents: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
  service?: Service;
}

export interface BookingWithService extends Booking {
  service: Service;
}

// API response types

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T = unknown> extends ApiResponse<T[]> {
  page: number;
  per_page: number;
  total: number;
  has_more: boolean;
}

export interface StripeCheckoutResponse {
  session_id: string;
  url: string;
}

// Form input types

export interface BookingFormInput {
  serviceId: string;
  date: string;
  time: string;
  address: string;
  notes?: string;
}

export interface CheckoutFormInput extends BookingFormInput {
  email: string;
  fullName: string;
  phone?: string;
}

export interface LoginFormInput {
  email: string;
  password: string;
}

export interface RegisterFormInput extends LoginFormInput {
  fullName: string;
}

export interface AddressInput {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  unit?: string;
}

// Time slot type

export interface TimeSlot {
  id: string;
  label: string;
  start: string;
}
