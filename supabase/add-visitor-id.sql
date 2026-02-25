-- Migration: Add visitor_id to page_views and amazon_clicks
-- This links page visits with Amazon clicks in the analytics dashboard.
-- Run this in Supabase SQL Editor if your tables already exist.

ALTER TABLE page_views ADD COLUMN IF NOT EXISTS visitor_id TEXT;
ALTER TABLE amazon_clicks ADD COLUMN IF NOT EXISTS visitor_id TEXT;

CREATE INDEX IF NOT EXISTS idx_page_views_visitor_id ON page_views(visitor_id);
CREATE INDEX IF NOT EXISTS idx_amazon_clicks_visitor_id ON amazon_clicks(visitor_id);
