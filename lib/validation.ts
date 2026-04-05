// NOTE: This module requires the "zod" package.
// Install with: npm install zod
import { z } from 'zod';

// ---------------------------------------------------------------------------
// Booking validation
// ---------------------------------------------------------------------------

export const bookingSchema = z.object({
  serviceId: z.string().min(1, 'Please select a service'),
  date: z
    .string()
    .min(1, 'Please select a date')
    .refine(
      (val) => {
        const selected = new Date(val);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selected >= today;
      },
      { message: 'Date must be today or in the future' }
    ),
  time: z.string().min(1, 'Please select a time slot'),
  address: z
    .string()
    .min(5, 'Address must be at least 5 characters')
    .max(500, 'Address must be less than 500 characters'),
  notes: z.string().max(1000, 'Notes must be less than 1000 characters').optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;

// ---------------------------------------------------------------------------
// Checkout validation (extends booking with contact details)
// ---------------------------------------------------------------------------

export const checkoutSchema = bookingSchema.extend({
  email: z.string().email('Please enter a valid email address'),
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be less than 100 characters')
    .regex(/^[a-zA-Z\s\-'.]+$/, 'Full name contains invalid characters'),
  phone: z
    .string()
    .min(7, 'Please enter a valid phone number')
    .max(20)
    .optional()
    .or(z.literal('')),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

// ---------------------------------------------------------------------------
// Login validation
// ---------------------------------------------------------------------------

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(128, 'Password must be less than 128 characters'),
});

export type LoginInput = z.infer<typeof loginSchema>;

// ---------------------------------------------------------------------------
// Registration validation
// ---------------------------------------------------------------------------

export const registerSchema = loginSchema.extend({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be less than 100 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export type RegisterInput = z.infer<typeof registerSchema>;
