-- Row Level Security (RLS) Policies for Supabase
-- Run this in Supabase SQL Editor AFTER creating the schema

-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE creatives ENABLE ROW LEVEL SECURITY;

-- Products: Allow public read access
CREATE POLICY "Public read access" ON products
  FOR SELECT USING (true);

-- Events: Allow public insert (for tracking)
CREATE POLICY "Public insert access" ON events
  FOR INSERT WITH CHECK (true);

-- Events: Allow public read access
CREATE POLICY "Public read access" ON events
  FOR SELECT USING (true);

-- Creatives: Allow public read access
CREATE POLICY "Public read access" ON creatives
  FOR SELECT USING (true);

-- Note: If you need to write products/creatives from the API (for AI pipeline),
-- you'll need to add INSERT/UPDATE policies or use the service_role key.
