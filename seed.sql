CREATE TABLE IF NOT EXISTS site_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  active_template TEXT NOT NULL DEFAULT 'warm_earthy',
  locale TEXT NOT NULL DEFAULT 'id',
  content_id JSONB NOT NULL DEFAULT '{}'::jsonb,
  content_en JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

-- Public read access (anyone can read site config)
DROP POLICY IF EXISTS "public_read" ON site_config;
CREATE POLICY "public_read" ON site_config FOR SELECT USING (true);

-- No direct write access via API - writes must go through authenticated server actions
-- The server actions use the service role key which bypasses RLS
DROP POLICY IF EXISTS "admin_all" ON site_config;
-- Note: Write access is controlled at application level via admin_session cookie
-- and server-side authentication in update-site-config.ts

INSERT INTO site_config (active_template, locale, content_id, content_en) 
SELECT 'warm_earthy', 'id', '{}'::jsonb, '{}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM site_config);
