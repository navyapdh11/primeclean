import type { Service, BookingStatus } from './types';

export const DEFAULT_SERVICES: Service[] = [
  {
    id: 'svc_standard_clean',
    name: 'Standard Clean',
    description:
      'A thorough whole-home clean covering all rooms, dusting, vacuuming, mopping, and bathroom/kitchen sanitization.',
    price_cents: 12900,
    duration: '2 hours',
    active: true,
  },
  {
    id: 'svc_deep_clean',
    name: 'Deep Clean',
    description:
      'An intensive top-to-bottom clean including inside appliances, baseboards, window sills, and hard-to-reach areas.',
    price_cents: 24900,
    duration: '4 hours',
    active: true,
  },
  {
    id: 'svc_move_clean',
    name: 'Move In / Move Out',
    description:
      'A comprehensive clean for vacant properties, ideal for tenants moving out or new homeowners preparing to move in.',
    price_cents: 29900,
    duration: '5 hours',
    active: true,
  },
  {
    id: 'svc_office_clean',
    name: 'Office Clean',
    description:
      'Professional office cleaning including desks, common areas, restrooms, and break rooms. Customizable for any workspace.',
    price_cents: 19900,
    duration: '3 hours',
    active: true,
  },
  {
    id: 'svc_window_clean',
    name: 'Window Clean',
    description:
      'Interior and exterior window cleaning for a streak-free shine. Includes screens and tracks.',
    price_cents: 9900,
    duration: '1.5 hours',
    active: true,
  },
  {
    id: 'svc_carpet_clean',
    name: 'Carpet & Upholstery',
    description:
      'Deep steam cleaning for carpets and fabric upholstery to remove stains, allergens, and odors.',
    price_cents: 17900,
    duration: '2.5 hours',
    active: true,
  },
];

export const TIME_SLOTS: string[] = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00',
];

export const CANCELLATION_WINDOWS = {
  FULL_REFUND_HOURS: 24,
  PARTIAL_REFUND_HOURS: 12,
  PARTIAL_REFUND_PERCENT: 50,
} as const;

export const STRIPE_CURRENCY = 'usd' as const;

export const MAX_BOOKING_DAYS_AHEAD = 60;

export const SUPPORT_EMAIL = 'support@primeclean.com';
export const SUPPORT_PHONE = '+1 (555) 123-4567';
