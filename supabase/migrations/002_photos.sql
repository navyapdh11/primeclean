-- PrimeClean Photos Table
-- Run in Supabase SQL Editor after 001_initial_schema.sql

CREATE TABLE IF NOT EXISTS photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  staff_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  type VARCHAR(30) NOT NULL DEFAULT 'after' CHECK (type IN ('before', 'after', 'staff_verification', 'quality_report', 'damage_report')),
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'ready', 'failed')),
  url VARCHAR(500) NOT NULL DEFAULT '',
  thumbnail_url VARCHAR(500),
  file_name VARCHAR(255) NOT NULL,
  file_size INTEGER NOT NULL DEFAULT 0,
  width INTEGER,
  height INTEGER,
  mime_type VARCHAR(50) DEFAULT 'image/jpeg',
  edit_config JSONB,
  alt_text TEXT,
  notes TEXT,
  uploaded_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_photos_booking_id ON photos(booking_id);
CREATE INDEX IF NOT EXISTS idx_photos_staff_id ON photos(staff_id);
CREATE INDEX IF NOT EXISTS idx_photos_uploaded_by ON photos(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_photos_type ON photos(type);
CREATE INDEX IF NOT EXISTS idx_photos_status ON photos(status);
CREATE INDEX IF NOT EXISTS idx_photos_created_at ON photos(created_at DESC);

-- Row Level Security
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

-- Users can view their own photos
CREATE POLICY "Users can view own photos"
  ON photos FOR SELECT
  USING (auth.uid() = uploaded_by);

-- Users can upload their own photos
CREATE POLICY "Users can upload photos"
  ON photos FOR INSERT
  WITH CHECK (auth.uid() = uploaded_by);

-- Users can update their own photos
CREATE POLICY "Users can update own photos"
  ON photos FOR UPDATE
  USING (auth.uid() = uploaded_by);

-- Users can delete their own photos
CREATE POLICY "Users can delete own photos"
  ON photos FOR DELETE
  USING (auth.uid() = uploaded_by);

-- Updated at trigger
CREATE TRIGGER update_photos_updated_at
  BEFORE UPDATE ON photos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

COMMENT ON TABLE photos IS 'Cleaning service documentation photos (before/after, quality, damage reports)';
