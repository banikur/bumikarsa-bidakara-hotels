CREATE TABLE IF NOT EXISTS site_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  active_template TEXT NOT NULL DEFAULT 'warm_earthy',
  locale TEXT NOT NULL DEFAULT 'id',
  content_id JSONB NOT NULL DEFAULT '{}'::jsonb,
  content_en JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read" ON site_config;
CREATE POLICY "public_read" ON site_config FOR SELECT USING (true);

DROP POLICY IF EXISTS "admin_all" ON site_config;
CREATE POLICY "admin_all" ON site_config FOR ALL USING (true); -- simplified for now since only admin updates are via API

INSERT INTO site_config (active_template, locale, content_id, content_en) 
SELECT 'warm_earthy', 'id', '{}'::jsonb, '{}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM site_config);
