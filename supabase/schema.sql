-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role TEXT CHECK (role IN ('admin', 'editor', 'viewer', 'client')) DEFAULT 'viewer',
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create articles table
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    thumbnail TEXT,
    slug TEXT UNIQUE NOT NULL,
    author TEXT NOT NULL,
    published BOOLEAN DEFAULT false,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    images TEXT[] DEFAULT '{}',
    date DATE NOT NULL,
    category TEXT NOT NULL,
    location TEXT,
    status TEXT CHECK (status IN ('completed', 'ongoing', 'planned')) DEFAULT 'completed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create services table
CREATE TABLE IF NOT EXISTS public.services (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    features TEXT[] DEFAULT '{}',
    active BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create files table
CREATE TABLE IF NOT EXISTS public.files (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    url TEXT NOT NULL,
    size BIGINT NOT NULL,
    uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create site_settings table
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL,
    type TEXT CHECK (type IN ('text', 'json', 'image', 'boolean')) DEFAULT 'text',
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_articles_published ON public.articles(published);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON public.articles(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);
CREATE INDEX IF NOT EXISTS idx_projects_date ON public.projects(date DESC);
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category);
CREATE INDEX IF NOT EXISTS idx_services_active ON public.services(active);
CREATE INDEX IF NOT EXISTS idx_services_order ON public.services(order_index);

-- Create function to handle updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER handle_updated_at_profiles
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_articles
    BEFORE UPDATE ON public.articles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_projects
    BEFORE UPDATE ON public.projects
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_services
    BEFORE UPDATE ON public.services
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_site_settings
    BEFORE UPDATE ON public.site_settings
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can manage all profiles." ON public.profiles
    FOR ALL USING (
        auth.uid() IN (
            SELECT id FROM public.profiles WHERE role = 'admin'
        )
    );

-- Articles policies
CREATE POLICY "Published articles are publicly readable." ON public.articles
    FOR SELECT USING (published = true);

CREATE POLICY "Editors can read all articles." ON public.articles
    FOR SELECT USING (
        auth.uid() IN (
            SELECT id FROM public.profiles WHERE role IN ('admin', 'editor')
        )
    );

CREATE POLICY "Editors can create articles." ON public.articles
    FOR INSERT WITH CHECK (
        auth.uid() IN (
            SELECT id FROM public.profiles WHERE role IN ('admin', 'editor')
        )
    );

CREATE POLICY "Editors can update articles." ON public.articles
    FOR UPDATE USING (
        auth.uid() IN (
            SELECT id FROM public.profiles WHERE role IN ('admin', 'editor')
        )
    );

CREATE POLICY "Admins can delete articles." ON public.articles
    FOR DELETE USING (
        auth.uid() IN (
            SELECT id FROM public.profiles WHERE role = 'admin'
        )
    );

-- Projects policies
CREATE POLICY "Projects are publicly readable." ON public.projects
    FOR SELECT USING (true);

CREATE POLICY "Editors can manage projects." ON public.projects
    FOR ALL USING (
        auth.uid() IN (
            SELECT id FROM public.profiles WHERE role IN ('admin', 'editor')
        )
    );

-- Services policies
CREATE POLICY "Active services are publicly readable." ON public.services
    FOR SELECT USING (active = true);

CREATE POLICY "Editors can read all services." ON public.services
    FOR SELECT USING (
        auth.uid() IN (
            SELECT id FROM public.profiles WHERE role IN ('admin', 'editor')
        )
    );

CREATE POLICY "Editors can manage services." ON public.services
    FOR ALL USING (
        auth.uid() IN (
            SELECT id FROM public.profiles WHERE role IN ('admin', 'editor')
        )
    );

-- Files policies
CREATE POLICY "Files are publicly readable." ON public.files
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can upload files." ON public.files
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can delete their own files." ON public.files
    FOR DELETE USING (auth.uid() = uploaded_by);

CREATE POLICY "Admins can manage all files." ON public.files
    FOR ALL USING (
        auth.uid() IN (
            SELECT id FROM public.profiles WHERE role = 'admin'
        )
    );

-- Site settings policies
CREATE POLICY "Site settings are publicly readable." ON public.site_settings
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage site settings." ON public.site_settings
    FOR ALL USING (
        auth.uid() IN (
            SELECT id FROM public.profiles WHERE role = 'admin'
        )
    );

-- Function to automatically create profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert default site settings
INSERT INTO public.site_settings (key, value, type, description) VALUES
    ('site_title', 'PT. Yoga Wibawa Mandiri', 'text', 'Website title'),
    ('site_description', 'Pengantongan Semen Padang Terpercaya di Lhokseumawe', 'text', 'Website description'),
    ('company_phone', '+62-xxx-xxxx-xxxx', 'text', 'Company phone number'),
    ('company_email', 'info@yogawibawamandiri.com', 'text', 'Company email'),
    ('company_address', 'Pelabuhan Krueng Geukueh, Lhokseumawe, Aceh', 'text', 'Company address'),
    ('hero_title', 'PT. Yoga Wibawa Mandiri', 'text', 'Hero section title'),
    ('hero_subtitle', 'Pengantongan Semen Padang Terpercaya di Lhokseumawe', 'text', 'Hero section subtitle')
ON CONFLICT (key) DO NOTHING;

-- Insert default services
INSERT INTO public.services (name, description, icon, features, order_index) VALUES
    (
        'Pengantongan Semen',
        'Proses pengantongan otomatis dengan kapasitas besar dan kontrol kualitas ketat untuk memastikan produk berkualitas tinggi.',
        'Factory',
        ARRAY['Proses otomatis', 'Kontrol kualitas ketat', 'Kapasitas besar', 'Standar SNI'],
        1
    ),
    (
        'Distribusi Luas',
        'Jaringan distribusi yang mencakup seluruh Aceh dan Sumatera Utara dengan armada transport yang handal dan tepat waktu.',
        'Truck',
        ARRAY['Jaringan luas', 'Armada handal', 'Tepat waktu', 'Coverage Aceh & Sumut'],
        2
    ),
    (
        'AI Customer Service',
        'Layanan pelanggan 24/7 dengan teknologi AI lokal yang memberikan respons cepat dan akurat untuk semua pertanyaan Anda.',
        'Bot',
        ARRAY['24/7 available', 'AI-powered', 'Respons cepat', 'Multilingual support'],
        3
    )
ON CONFLICT DO NOTHING;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
