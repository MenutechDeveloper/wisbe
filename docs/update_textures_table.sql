-- SQL script to update the wisbe_render_textures table to support portfolio website designs

-- 1. Add column 'website_url' to the 'wisbe_render_textures' table if it does not already exist
ALTER TABLE public.wisbe_render_textures
ADD COLUMN IF NOT EXISTS website_url TEXT;

-- 2. Notify PostgREST to reload the schema cache immediately so the new column is visible to the API
NOTIFY pgrst, 'reload schema';
