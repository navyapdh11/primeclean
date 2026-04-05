-- PrimeClean Database Schema
-- Run this in your Supabase SQL Editor

-- ============================================================
-- SERVICES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  price_cents INTEGER NOT NULL CHECK (price_cents > 0),
  duration VARCHAR(50) NOT NULL,
  image TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE services IS 'Available cleaning services with pricing';

-- ============================================================
-- CUSTOMERS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id VARCHAR(255) UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE customers IS 'Maps Supabase users to Stripe customers';

-- ============================================================
-- BOOKINGS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  service_id VARCHAR(50) NOT NULL,
  date DATE NOT NULL,
  time VARCHAR(10) NOT NULL,
  address TEXT NOT NULL DEFAULT '',
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (
    status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'payment_failed', 'refunded')
  ),
  stripe_session_id VARCHAR(255),
  amount_paid INTEGER,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE bookings IS 'Customer cleaning service bookings';

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_service_id ON bookings(service_id);
CREATE INDEX IF NOT EXISTS idx_customers_user_id ON customers(user_id);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(active);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Services: publicly readable (needed for catalog display)
CREATE POLICY "Services are publicly readable"
  ON services FOR SELECT
  USING (true);

-- Customers: users can only see their own record
CREATE POLICY "Users can view own customer record"
  ON customers FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own customer record"
  ON customers FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own customer record"
  ON customers FOR UPDATE
  USING (auth.uid() = user_id);

-- Bookings: users can only see and manage their own bookings
CREATE POLICY "Users can view own bookings"
  ON bookings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings"
  ON bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings"
  ON bookings FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================================
-- SEED DATA — Default Services
-- ============================================================
INSERT INTO services (id, name, description, price_cents, duration, active)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'Standard Clean', 'Regular maintenance cleaning for your home. Includes dusting, vacuuming, mopping, and bathroom sanitization.', 9900, '2-3 hours', true),
  ('00000000-0000-0000-0000-000000000002', 'Deep Clean', 'Thorough top-to-bottom cleaning. Perfect for seasonal cleans or homes that need extra attention.', 19900, '4-6 hours', true),
  ('00000000-0000-0000-0000-000000000003', 'Move In/Out Clean', 'Complete cleaning for property transitions. Get your deposit back or welcome new tenants.', 24900, '5-8 hours', true),
  ('00000000-0000-0000-0000-000000000004', 'Office Clean', 'Professional workspace cleaning. Keep your office pristine and productive.', 14900, '3-4 hours', true),
  ('00000000-0000-0000-0000-000000000005', 'Carpet Clean', 'Deep carpet cleaning with professional equipment. Removes stains, allergens, and odors.', 12900, '2-4 hours', true),
  ('00000000-0000-0000-0000-000000000006', 'Window Clean', 'Interior and exterior window cleaning. Crystal clear views guaranteed.', 7900, '1-2 hours', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at
  BEFORE UPDATE ON customers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
