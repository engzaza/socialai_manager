-- Location: supabase/migrations/20250106100313_socialai_manager_schema.sql
-- Schema Analysis: No existing schema found
-- Integration Type: Complete new schema creation
-- Dependencies: None - creating from scratch

-- 1. Create custom types
CREATE TYPE public.user_role AS ENUM ('admin', 'manager', 'member');
CREATE TYPE public.account_status AS ENUM ('active', 'inactive', 'suspended');
CREATE TYPE public.social_platform AS ENUM ('facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'tiktok');
CREATE TYPE public.post_status AS ENUM ('draft', 'scheduled', 'published', 'failed');
CREATE TYPE public.content_type AS ENUM ('text', 'image', 'video', 'carousel', 'story');
CREATE TYPE public.campaign_status AS ENUM ('active', 'paused', 'completed', 'draft');
CREATE TYPE public.lead_status AS ENUM ('new', 'contacted', 'qualified', 'converted');

-- 2. Core user profiles table (intermediary for auth relationships)
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    company TEXT,
    role public.user_role DEFAULT 'member'::public.user_role,
    status public.account_status DEFAULT 'active'::public.account_status,
    avatar_url TEXT,
    timezone TEXT DEFAULT 'UTC',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Social media accounts
CREATE TABLE public.social_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
    platform public.social_platform NOT NULL,
    account_name TEXT NOT NULL,
    account_id TEXT NOT NULL,
    access_token TEXT,
    refresh_token TEXT,
    token_expires_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT true,
    profile_picture_url TEXT,
    follower_count INTEGER DEFAULT 0,
    following_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, platform, account_id)
);

-- 4. Content templates
CREATE TABLE public.content_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    content_type public.content_type DEFAULT 'text'::public.content_type,
    category TEXT,
    tags TEXT[],
    is_favorite BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 5. Social media posts
CREATE TABLE public.social_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
    account_id UUID REFERENCES public.social_accounts(id) ON DELETE CASCADE,
    title TEXT,
    content TEXT NOT NULL,
    content_type public.content_type DEFAULT 'text'::public.content_type,
    media_urls TEXT[],
    status public.post_status DEFAULT 'draft'::public.post_status,
    scheduled_at TIMESTAMPTZ,
    published_at TIMESTAMPTZ,
    external_post_id TEXT,
    hashtags TEXT[],
    mentions TEXT[],
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 6. Post analytics
CREATE TABLE public.post_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
    post_id UUID REFERENCES public.social_posts(id) ON DELETE CASCADE NOT NULL,
    platform public.social_platform NOT NULL,
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    shares_count INTEGER DEFAULT 0,
    reach_count INTEGER DEFAULT 0,
    impressions_count INTEGER DEFAULT 0,
    engagement_rate DECIMAL(5,2) DEFAULT 0.00,
    click_through_rate DECIMAL(5,2) DEFAULT 0.00,
    recorded_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(post_id, recorded_at)
);

-- 7. Marketing campaigns
CREATE TABLE public.marketing_campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    status public.campaign_status DEFAULT 'draft'::public.campaign_status,
    start_date DATE,
    end_date DATE,
    budget DECIMAL(10,2),
    target_audience JSONB,
    platforms public.social_platform[],
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 8. Leads
CREATE TABLE public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
    campaign_id UUID REFERENCES public.marketing_campaigns(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    company TEXT,
    source TEXT,
    status public.lead_status DEFAULT 'new'::public.lead_status,
    score INTEGER CHECK (score >= 0 AND score <= 100),
    notes TEXT,
    last_contacted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 9. AI chatbots
CREATE TABLE public.ai_chatbots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    personality TEXT,
    training_data JSONB,
    is_active BOOLEAN DEFAULT false,
    platforms public.social_platform[],
    response_templates JSONB,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 10. Create essential indexes
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_user_profiles_status ON public.user_profiles(status);
CREATE INDEX idx_social_accounts_user_id ON public.social_accounts(user_id);
CREATE INDEX idx_social_accounts_platform ON public.social_accounts(platform);
CREATE INDEX idx_social_accounts_active ON public.social_accounts(is_active);
CREATE INDEX idx_content_templates_user_id ON public.content_templates(user_id);
CREATE INDEX idx_content_templates_category ON public.content_templates(category);
CREATE INDEX idx_social_posts_user_id ON public.social_posts(user_id);
CREATE INDEX idx_social_posts_account_id ON public.social_posts(account_id);
CREATE INDEX idx_social_posts_status ON public.social_posts(status);
CREATE INDEX idx_social_posts_scheduled_at ON public.social_posts(scheduled_at);
CREATE INDEX idx_post_analytics_post_id ON public.post_analytics(post_id);
CREATE INDEX idx_post_analytics_platform ON public.post_analytics(platform);
CREATE INDEX idx_marketing_campaigns_user_id ON public.marketing_campaigns(user_id);
CREATE INDEX idx_marketing_campaigns_status ON public.marketing_campaigns(status);
CREATE INDEX idx_leads_user_id ON public.leads(user_id);
CREATE INDEX idx_leads_campaign_id ON public.leads(campaign_id);
CREATE INDEX idx_leads_status ON public.leads(status);
CREATE INDEX idx_ai_chatbots_user_id ON public.ai_chatbots(user_id);
CREATE INDEX idx_ai_chatbots_active ON public.ai_chatbots(is_active);

-- 11. Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
    ('user-avatars', 'user-avatars', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg']),
    ('social-media-content', 'social-media-content', true, 52428800, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'video/mp4', 'video/mov', 'video/avi']),
    ('campaign-assets', 'campaign-assets', false, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'application/pdf']);

-- 12. Functions for automatic user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, company, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'company', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'member')::public.user_role
  );
  RETURN NEW;
END;
$$;

-- 13. Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 14. Enable RLS on all tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketing_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_chatbots ENABLE ROW LEVEL SECURITY;

-- 15. Create RLS policies following the approved patterns

-- Pattern 1: Core user table (user_profiles) - Simple only, no functions
CREATE POLICY "users_manage_own_user_profiles"
ON public.user_profiles
FOR ALL
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- Pattern 2: Simple user ownership for other tables
CREATE POLICY "users_manage_own_social_accounts"
ON public.social_accounts
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_content_templates"
ON public.content_templates
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_social_posts"
ON public.social_posts
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_post_analytics"
ON public.post_analytics
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_marketing_campaigns"
ON public.marketing_campaigns
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_leads"
ON public.leads
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_ai_chatbots"
ON public.ai_chatbots
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- 16. Storage RLS policies

-- User avatars - public read, owner write
CREATE POLICY "public_can_view_user_avatars"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'user-avatars');

CREATE POLICY "users_manage_own_avatars"
ON storage.objects
FOR ALL
TO authenticated
USING (bucket_id = 'user-avatars' AND owner = auth.uid())
WITH CHECK (bucket_id = 'user-avatars' AND owner = auth.uid());

-- Social media content - public read, owner write
CREATE POLICY "public_can_view_social_content"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'social-media-content');

CREATE POLICY "users_manage_own_social_content"
ON storage.objects
FOR ALL
TO authenticated
USING (bucket_id = 'social-media-content' AND owner = auth.uid())
WITH CHECK (bucket_id = 'social-media-content' AND owner = auth.uid());

-- Campaign assets - private to owner only
CREATE POLICY "users_manage_own_campaign_assets"
ON storage.objects
FOR ALL
TO authenticated
USING (bucket_id = 'campaign-assets' AND owner = auth.uid())
WITH CHECK (bucket_id = 'campaign-assets' AND owner = auth.uid());

-- 17. Mock data for testing
DO $$
DECLARE
    admin_uuid UUID := gen_random_uuid();
    user_uuid UUID := gen_random_uuid();
    social_account1_uuid UUID := gen_random_uuid();
    social_account2_uuid UUID := gen_random_uuid();
    template1_uuid UUID := gen_random_uuid();
    post1_uuid UUID := gen_random_uuid();
    campaign1_uuid UUID := gen_random_uuid();
BEGIN
    -- Create auth users with required fields
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (admin_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@socialai.com', crypt('admin123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Admin User", "company": "SocialAI", "role": "admin"}'::jsonb, 
         '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (user_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'user@example.com', crypt('user123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Demo User", "company": "Demo Company", "role": "member"}'::jsonb,
         '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Create social accounts
    INSERT INTO public.social_accounts (id, user_id, platform, account_name, account_id, is_active, follower_count, following_count)
    VALUES
        (social_account1_uuid, user_uuid, 'instagram'::public.social_platform, 'demo_company', 'ig_demo_123', true, 1250, 890),
        (social_account2_uuid, user_uuid, 'twitter'::public.social_platform, 'democompany', 'tw_demo_456', true, 2340, 567);

    -- Create content templates
    INSERT INTO public.content_templates (id, user_id, title, content, content_type, category, tags, is_favorite)
    VALUES
        (template1_uuid, user_uuid, 'Product Launch Post', 
         'Exciting news! We are thrilled to announce the launch of our latest product. Get ready to experience innovation like never before! #ProductLaunch #Innovation', 
         'text'::public.content_type, 'Marketing', ARRAY['product', 'launch', 'marketing'], true),
        (gen_random_uuid(), user_uuid, 'Behind the Scenes', 
         'Take a peek behind the scenes at our creative process. Our team works tirelessly to bring you the best! #BehindTheScenes #Team',
         'image'::public.content_type, 'Engagement', ARRAY['team', 'process', 'engagement'], false);

    -- Create social posts
    INSERT INTO public.social_posts (id, user_id, account_id, title, content, content_type, status, hashtags)
    VALUES
        (post1_uuid, user_uuid, social_account1_uuid, 'Monday Motivation',
         'Start your week strong! Every small step counts towards achieving your goals. What are you working on this week? #MondayMotivation #Goals',
         'text'::public.content_type, 'published'::public.post_status, 
         ARRAY['MondayMotivation', 'Goals', 'Productivity']),
        (gen_random_uuid(), user_uuid, social_account2_uuid, 'New Blog Post',
         'Just published our latest blog post about social media trends in 2024. Check it out! Link in bio. #Blog #SocialMedia #Trends2024',
         'text'::public.content_type, 'scheduled'::public.post_status,
         ARRAY['Blog', 'SocialMedia', 'Trends2024']);

    -- Create post analytics
    INSERT INTO public.post_analytics (user_id, post_id, platform, likes_count, comments_count, shares_count, reach_count, impressions_count, engagement_rate)
    VALUES
        (user_uuid, post1_uuid, 'instagram'::public.social_platform, 89, 12, 7, 1456, 2890, 7.45);

    -- Create marketing campaign
    INSERT INTO public.marketing_campaigns (id, user_id, name, description, status, start_date, end_date, budget, platforms)
    VALUES
        (campaign1_uuid, user_uuid, 'Q1 Brand Awareness', 
         'Increase brand awareness and engagement across social platforms',
         'active'::public.campaign_status, '2024-01-01', '2024-03-31', 5000.00,
         ARRAY['instagram', 'twitter', 'facebook']::public.social_platform[]);

    -- Create leads
    INSERT INTO public.leads (user_id, campaign_id, name, email, company, source, status, score)
    VALUES
        (user_uuid, campaign1_uuid, 'John Smith', 'john@techcorp.com', 'TechCorp Inc.', 'Instagram Ad', 'qualified'::public.lead_status, 85),
        (user_uuid, campaign1_uuid, 'Sarah Johnson', 'sarah@startup.com', 'Startup Co.', 'Twitter', 'new'::public.lead_status, 65);

    -- Create AI chatbot
    INSERT INTO public.ai_chatbots (user_id, name, description, personality, is_active, platforms)
    VALUES
        (user_uuid, 'Customer Support Bot', 
         'Friendly AI assistant for customer inquiries',
         'Helpful, professional, and empathetic',
         true,
         ARRAY['instagram', 'twitter']::public.social_platform[]);

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key error: %', SQLERRM;
    WHEN unique_violation THEN
        RAISE NOTICE 'Unique constraint error: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Unexpected error: %', SQLERRM;
END $$;

-- 18. Create cleanup function for testing
CREATE OR REPLACE FUNCTION public.cleanup_demo_data()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    demo_user_ids UUID[];
BEGIN
    -- Get demo user IDs
    SELECT ARRAY_AGG(id) INTO demo_user_ids
    FROM auth.users
    WHERE email IN ('admin@socialai.com', 'user@example.com');

    -- Delete in dependency order
    DELETE FROM public.leads WHERE user_id = ANY(demo_user_ids);
    DELETE FROM public.ai_chatbots WHERE user_id = ANY(demo_user_ids);
    DELETE FROM public.marketing_campaigns WHERE user_id = ANY(demo_user_ids);
    DELETE FROM public.post_analytics WHERE user_id = ANY(demo_user_ids);
    DELETE FROM public.social_posts WHERE user_id = ANY(demo_user_ids);
    DELETE FROM public.content_templates WHERE user_id = ANY(demo_user_ids);
    DELETE FROM public.social_accounts WHERE user_id = ANY(demo_user_ids);
    DELETE FROM public.user_profiles WHERE id = ANY(demo_user_ids);
    DELETE FROM auth.users WHERE id = ANY(demo_user_ids);

    RAISE NOTICE 'Demo data cleanup completed successfully';
EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key constraint prevents deletion: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Cleanup failed: %', SQLERRM;
END;
$$;