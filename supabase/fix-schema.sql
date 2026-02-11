-- Fix Supabase Schema - Safe to run multiple times
-- This script handles existing triggers and tables gracefully

-- Drop trigger if exists (to avoid error)
DROP TRIGGER IF EXISTS update_products_updated_at ON products;

-- Recreate trigger
CREATE TRIGGER update_products_updated_at 
  BEFORE UPDATE ON products
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Verify RLS is enabled
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE creatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE amazon_clicks ENABLE ROW LEVEL SECURITY;

-- Ensure indexes exist
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_events_product_id ON events(product_id);
CREATE INDEX IF NOT EXISTS idx_events_type ON events(type);
CREATE INDEX IF NOT EXISTS idx_events_timestamp ON events(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_creatives_product_id ON creatives(product_id);
CREATE INDEX IF NOT EXISTS idx_page_views_page ON page_views(page);
CREATE INDEX IF NOT EXISTS idx_page_views_timestamp ON page_views(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_amazon_clicks_page ON amazon_clicks(page);
CREATE INDEX IF NOT EXISTS idx_amazon_clicks_timestamp ON amazon_clicks(timestamp DESC);
