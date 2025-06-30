-- Extended schema for comprehensive website features

-- Create users profiles table
CREATE TABLE profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    full_name VARCHAR,
    email VARCHAR UNIQUE,
    role VARCHAR CHECK (role IN ('admin', 'editor', 'viewer', 'client')) DEFAULT 'client',
    phone VARCHAR,
    company VARCHAR,
    avatar_url VARCHAR,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create articles table for blog/content management
CREATE TABLE articles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR NOT NULL,
    slug VARCHAR UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image VARCHAR,
    category VARCHAR,
    tags TEXT[] DEFAULT '{}',
    status VARCHAR CHECK (status IN ('draft', 'published', 'archived')) DEFAULT 'draft',
    views INTEGER DEFAULT 0,
    featured BOOLEAN DEFAULT false,
    author_id UUID REFERENCES profiles(id),
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table for portfolio
CREATE TABLE projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR NOT NULL,
    description TEXT NOT NULL,
    client VARCHAR,
    location VARCHAR,
    project_type VARCHAR,
    start_date DATE,
    end_date DATE,
    status VARCHAR CHECK (status IN ('planning', 'ongoing', 'completed', 'cancelled')) DEFAULT 'ongoing',
    budget DECIMAL(15,2),
    images TEXT[] DEFAULT '{}',
    featured_image VARCHAR,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table for order management
CREATE TABLE orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_number VARCHAR UNIQUE NOT NULL,
    company_name VARCHAR NOT NULL,
    contact_person VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    phone VARCHAR NOT NULL,
    service_type VARCHAR NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    unit VARCHAR DEFAULT 'ton',
    delivery_date DATE,
    delivery_address TEXT NOT NULL,
    notes TEXT,
    total_amount DECIMAL(15,2) NOT NULL,
    status VARCHAR CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')) DEFAULT 'pending',
    payment_status VARCHAR CHECK (payment_status IN ('pending', 'partial', 'paid', 'refunded')) DEFAULT 'pending',
    payment_method VARCHAR,
    documents TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payments table
CREATE TABLE payments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    amount DECIMAL(15,2) NOT NULL,
    payment_method VARCHAR NOT NULL,
    payment_reference VARCHAR,
    proof_image VARCHAR,
    status VARCHAR CHECK (status IN ('pending', 'verified', 'failed', 'refunded')) DEFAULT 'pending',
    notes TEXT,
    verified_by UUID REFERENCES profiles(id),
    verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create files table for file management
CREATE TABLE files (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    filename VARCHAR NOT NULL,
    original_name VARCHAR NOT NULL,
    file_path VARCHAR NOT NULL,
    file_size INTEGER,
    file_type VARCHAR,
    uploaded_by UUID REFERENCES profiles(id),
    category VARCHAR,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ai_conversations table for chat history
CREATE TABLE ai_conversations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    session_id VARCHAR NOT NULL,
    user_message TEXT NOT NULL,
    ai_response TEXT NOT NULL,
    language VARCHAR DEFAULT 'id',
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create site_settings table for dynamic configuration
CREATE TABLE site_settings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    key VARCHAR UNIQUE NOT NULL,
    value TEXT,
    type VARCHAR CHECK (type IN ('text', 'number', 'boolean', 'json')) DEFAULT 'text',
    description TEXT,
    category VARCHAR,
    updated_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default site settings
INSERT INTO site_settings (key, value, type, description, category) VALUES 
('site_name', 'PT. Yoga Wibawa Mandiri', 'text', 'Company name', 'general'),
('site_description', 'Pengantongan Semen Padang Terpercaya di Lhokseumawe', 'text', 'Site description for SEO', 'general'),
('contact_email', 'info@ywm.co.id', 'text', 'Main contact email', 'contact'),
('contact_phone', '+62 651 123456', 'text', 'Main contact phone', 'contact'),
('contact_whatsapp', '+62 812 3456 7890', 'text', 'WhatsApp contact', 'contact'),
('factory_address', 'Pelabuhan Krueng Geukueh, Lhokseumawe, Aceh 24352', 'text', 'Factory address', 'contact'),
('factory_coordinates', '5°14\'36.4"N 97°02\'27.0"E', 'text', 'GPS coordinates', 'contact'),
('google_maps_url', 'https://maps.app.goo.gl/LBuE5Yvb17q2sPak7', 'text', 'Google Maps URL', 'contact'),
('working_hours', 'Senin-Jumat: 08:00-17:00 WIB, Sabtu: 08:00-12:00 WIB', 'text', 'Working hours', 'contact'),
('base_cement_price', '85000', 'number', 'Base price per ton (IDR)', 'pricing'),
('warehouse_capacity', '10000', 'number', 'Warehouse capacity in tons', 'operational'),
('daily_production_capacity', '500', 'number', 'Daily production capacity in tons', 'operational'),
('ai_assistant_enabled', 'true', 'boolean', 'Enable AI assistant', 'features'),
('online_ordering_enabled', 'true', 'boolean', 'Enable online ordering', 'features');

-- Enable RLS for new tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public policies for read access
CREATE POLICY "Public read access for published articles" ON articles FOR SELECT USING (status = 'published');
CREATE POLICY "Public read access for featured projects" ON projects FOR SELECT USING (featured = true OR status = 'completed');
CREATE POLICY "Public read access for site settings" ON site_settings FOR SELECT USING (category IN ('general', 'contact', 'features'));

-- Public policies for AI conversations (anonymous users can insert)
CREATE POLICY "Public insert access for ai_conversations" ON ai_conversations FOR INSERT WITH CHECK (true);

-- Authenticated user policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Admin policies (users with admin role)
CREATE POLICY "Admin full access for profiles" ON profiles FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admin full access for articles" ON articles FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);

CREATE POLICY "Admin full access for projects" ON projects FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);

CREATE POLICY "Admin full access for orders" ON orders FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admin full access for payments" ON payments FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admin full access for files" ON files FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);

CREATE POLICY "Admin read access for ai_conversations" ON ai_conversations FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admin full access for site_settings" ON site_settings FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Client policies (users can manage their own orders)
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND email = orders.email)
);

CREATE POLICY "Public can create orders" ON orders FOR INSERT WITH CHECK (true);

-- Add updated_at triggers for new tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to generate order numbers
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
    new_number TEXT;
    current_date TEXT;
BEGIN
    current_date := TO_CHAR(NOW(), 'YYYYMMDD');
    
    WITH daily_count AS (
        SELECT COUNT(*) + 1 as next_number
        FROM orders 
        WHERE order_number LIKE 'ORD-' || current_date || '-%'
    )
    SELECT 'ORD-' || current_date || '-' || LPAD(next_number::TEXT, 3, '0')
    INTO new_number
    FROM daily_count;
    
    RETURN new_number;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate order numbers
CREATE OR REPLACE FUNCTION set_order_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
        NEW.order_number := generate_order_number();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_order_number_trigger
    BEFORE INSERT ON orders
    FOR EACH ROW
    EXECUTE FUNCTION set_order_number();

-- Create indexes for better performance
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_published_at ON articles(published_at);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_payments_order_id ON payments(order_id);
CREATE INDEX idx_ai_conversations_session_id ON ai_conversations(session_id);
CREATE INDEX idx_ai_conversations_created_at ON ai_conversations(created_at);

-- Insert sample data

-- Sample articles
INSERT INTO articles (title, slug, content, excerpt, category, status, featured, published_at) VALUES 
(
    'Teknologi Modern dalam Pengantongan Semen',
    'teknologi-modern-pengantongan-semen',
    'PT. Yoga Wibawa Mandiri menggunakan teknologi terdepan dalam proses pengantongan semen...',
    'Inovasi teknologi dalam industri pengantongan semen untuk meningkatkan efisiensi dan kualitas.',
    'teknologi',
    'published',
    true,
    NOW() - INTERVAL '2 days'
),
(
    'Standar Kualitas ISO dalam Industri Semen',
    'standar-kualitas-iso-industri-semen',
    'Pentingnya sertifikasi ISO dalam menjamin kualitas produk semen dan kepercayaan pelanggan...',
    'Memahami standar kualitas ISO dan implementasinya dalam industri semen.',
    'kualitas',
    'published',
    false,
    NOW() - INTERVAL '1 day'
);

-- Sample projects
INSERT INTO projects (title, description, client, location, project_type, status, featured) VALUES 
(
    'Proyek Infrastruktur Jalan Tol Aceh',
    'Penyediaan semen untuk pembangunan jalan tol sepanjang 50 km di provinsi Aceh.',
    'PT. Jasa Marga',
    'Banda Aceh - Lhokseumawe',
    'Infrastruktur',
    'completed',
    true
),
(
    'Pembangunan Perumahan Griya Sejahtera',
    'Pasokan semen untuk pembangunan 500 unit rumah di kawasan Medan.',
    'PT. Griya Sejahtera',
    'Medan, Sumatera Utara',
    'Perumahan',
    'ongoing',
    true
);

-- Sample profile (admin user would be created through Supabase auth)
-- This is just for reference, actual profiles are created when users sign up
INSERT INTO profiles (id, full_name, email, role) VALUES 
('00000000-0000-0000-0000-000000000000', 'Admin System', 'admin@ywm.co.id', 'admin');
