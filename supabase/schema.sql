-- Supabase Database Schema for Amazon MVP
-- Run this in Supabase SQL Editor after creating your project

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  vertical TEXT NOT NULL,
  name TEXT NOT NULL,
  angle TEXT,
  short_description TEXT NOT NULL,
  hero_image TEXT,
  price_note TEXT,
  amazon_url TEXT NOT NULL,
  amazon_tracking_id TEXT NOT NULL,
  headline TEXT NOT NULL,
  subheadline TEXT NOT NULL,
  pain_bullets JSONB NOT NULL DEFAULT '[]'::jsonb,
  how_it_works JSONB NOT NULL DEFAULT '[]'::jsonb,
  who_its_for JSONB NOT NULL DEFAULT '[]'::jsonb,
  who_its_not_for JSONB NOT NULL DEFAULT '[]'::jsonb,
  cta_text TEXT NOT NULL,
  faq JSONB NOT NULL DEFAULT '[]'::jsonb,
  affiliate_disclosure TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'testing' CHECK (status IN ('testing', 'winner', 'killed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  type TEXT NOT NULL CHECK (type IN ('view', 'click', 'conversion')),
  product_id TEXT REFERENCES products(id) ON DELETE SET NULL,
  slug TEXT,
  offer_id TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  user_agent TEXT,
  ip TEXT,
  referer TEXT
);

-- Creatives table
CREATE TABLE IF NOT EXISTS creatives (
  id SERIAL PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  angles JSONB NOT NULL DEFAULT '[]'::jsonb,
  generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(product_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_events_product_id ON events(product_id);
CREATE INDEX IF NOT EXISTS idx_events_type ON events(type);
CREATE INDEX IF NOT EXISTS idx_events_timestamp ON events(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_creatives_product_id ON creatives(product_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
