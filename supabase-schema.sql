-- Supabase SQL Schema for Tok Down Blog + Analytics
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- BLOG POSTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    cover_image_url TEXT,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    author_id TEXT NOT NULL DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    published_at TIMESTAMP WITH TIME ZONE
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);

-- =====================================================
-- CATEGORIES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TAGS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- JUNCTION TABLES (Many-to-Many)
-- =====================================================
CREATE TABLE IF NOT EXISTS blog_post_categories (
    blog_post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (blog_post_id, category_id)
);

CREATE TABLE IF NOT EXISTS blog_post_tags (
    blog_post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
    tag_id UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (blog_post_id, tag_id)
);

-- =====================================================
-- ANALYTICS: PAGE VIEWS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS page_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id TEXT NOT NULL,
    page_path TEXT NOT NULL,
    referrer TEXT,
    user_agent TEXT,
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for analytics queries
CREATE INDEX IF NOT EXISTS idx_page_views_session_id ON page_views(session_id);
CREATE INDEX IF NOT EXISTS idx_page_views_viewed_at ON page_views(viewed_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_page_path ON page_views(page_path);

-- =====================================================
-- ADMIN USERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'editor')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INSERT INITIAL CATEGORIES
-- =====================================================
INSERT INTO categories (name, slug) VALUES
    ('Tutorials', 'tutorials'),
    ('Updates', 'updates'),
    ('Tips & Tricks', 'tips-tricks'),
    ('News', 'news')
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- INSERT INITIAL TAGS
-- =====================================================
INSERT INTO tags (name, slug) VALUES
    ('TikTok', 'tiktok'),
    ('Video Download', 'video-download'),
    ('Tutorial', 'tutorial'),
    ('Feature', 'feature'),
    ('Update', 'update')
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public read access for published blog posts
CREATE POLICY "Public posts are viewable by everyone"
    ON blog_posts FOR SELECT
    USING (status = 'published');

-- Admin access for all blog posts
CREATE POLICY "Admins can view all posts"
    ON blog_posts FOR ALL
    USING (true); -- In production, use auth.uid() checks

-- Public read access for categories and tags
CREATE POLICY "Categories are viewable by everyone"
    ON categories FOR SELECT
    USING (true);

CREATE POLICY "Tags are viewable by everyone"
    ON tags FOR SELECT
    USING (true);

-- Admin access for managing categories and tags
CREATE POLICY "Admins can manage categories"
    ON categories FOR ALL
    USING (true);

CREATE POLICY "Admins can manage tags"
    ON tags FOR ALL
    USING (true);

-- Public access to insert page views (for analytics)
CREATE POLICY "Anyone can track page views"
    ON page_views FOR INSERT
    WITH CHECK (true);

-- Public read access to junction tables (via blog_posts)
CREATE POLICY "Blog post categories are viewable"
    ON blog_post_categories FOR SELECT
    USING (true);

CREATE POLICY "Blog post tags are viewable"
    ON blog_post_tags FOR SELECT
    USING (true);

-- =====================================================
-- FUNCTION TO UPDATE updated_at TIMESTAMP
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at
CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SAMPLE DATA (OPTIONAL - FOR TESTING)
-- =====================================================
-- Uncomment to insert a sample blog post

/*
INSERT INTO blog_posts (slug, title, excerpt, content, status, published_at)
VALUES (
    'welcome-to-tok-down',
    'Welcome to Tok Down',
    'Learn how to download TikTok videos without watermarks.',
    '<h1>Welcome to Tok Down!</h1><p>This is your first blog post. You can edit or delete it, and start creating your own content.</p>',
    'published',
    NOW()
);
*/

-- =====================================================
-- VIEWS FOR COMMON QUERIES
-- =====================================================

-- View for published posts with categories and tags
CREATE OR REPLACE VIEW published_posts_with_relations AS
SELECT
    bp.*,
    COALESCE(
        json_agg(
            json_build_object('id', c.id, 'name', c.name, 'slug', c.slug)
        ) FILTER (WHERE c.id IS NOT NULL),
        '[]'::json
    ) as categories,
    COALESCE(
        json_agg(
            json_build_object('id', t.id, 'name', t.name, 'slug', t.slug)
        ) FILTER (WHERE t.id IS NOT NULL),
        '[]'::json
    ) as tags
FROM blog_posts bp
LEFT JOIN blog_post_categories bpc ON bp.id = bpc.blog_post_id
LEFT JOIN categories c ON bpc.category_id = c.id
LEFT JOIN blog_post_tags bpt ON bp.id = bpt.blog_post_id
LEFT JOIN tags t ON bpt.tag_id = t.id
WHERE bp.status = 'published'
GROUP BY bp.id;
