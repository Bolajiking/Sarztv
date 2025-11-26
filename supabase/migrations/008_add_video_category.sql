-- Add category column to videos table
ALTER TABLE videos ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'other';

-- Create index for category filtering
CREATE INDEX IF NOT EXISTS idx_videos_category ON videos(category);

