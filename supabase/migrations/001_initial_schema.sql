-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create companies table
CREATE TABLE companies (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR NOT NULL,
    description TEXT,
    address TEXT,
    phone VARCHAR,
    email VARCHAR,
    website VARCHAR,
    logo_url VARCHAR,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create services table
CREATE TABLE services (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR,
    features TEXT[] DEFAULT '{}',
    price DECIMAL(15,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create gallery table
CREATE TABLE gallery (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR NOT NULL,
    description TEXT,
    image_url VARCHAR NOT NULL,
    category VARCHAR,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contacts table
CREATE TABLE contacts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    phone VARCHAR NOT NULL,
    subject VARCHAR NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR CHECK (status IN ('new', 'read', 'replied')) DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample company data
INSERT INTO companies (name, description, address, phone, email, website) VALUES (
    'PT. Yoga Wibawa Mandiri',
    'Perusahaan pengantongan semen terpercaya di Lhokseumawe, Aceh. Mitra resmi Semen Padang dengan pengalaman lebih dari 10 tahun.',
    'Pelabuhan Krueng Geukueh, Lhokseumawe, Aceh 24352',
    '+62 651 123456',
    'info@ywm.co.id',
    'https://ywm.co.id'
);

-- Insert sample services
INSERT INTO services (title, description, icon, features, price) VALUES 
(
    'Pengantongan Semen Curah',
    'Layanan pengantongan semen curah dari kapal ke kantong dengan kapasitas besar dan kualitas terjamin.',
    'package',
    ARRAY['Kapasitas 10,000 ton/hari', 'Quality Control Ketat', 'Kemasan Berkualitas', 'Pengiriman Tepat Waktu'],
    150000
),
(
    'Pergudangan & Storage',
    'Fasilitas penyimpanan semen dengan sistem manajemen stok modern dan kondisi optimal.',
    'warehouse',
    ARRAY['Gudang Modern', 'Sistem Inventory Digital', 'Kontrol Suhu & Kelembaban', 'Keamanan 24 Jam'],
    80000
),
(
    'Distribusi & Logistik',
    'Jaringan distribusi ke seluruh Aceh dan Sumatera Utara dengan armada truk yang handal.',
    'truck',
    ARRAY['Armada Truk Lengkap', 'Tracking Real-time', 'Asuransi Barang', 'Delivery On-time'],
    200000
),
(
    'Konsultasi Teknis',
    'Layanan konsultasi teknis untuk proyek konstruksi dan penggunaan semen yang optimal.',
    'users',
    ARRAY['Tim Ahli Berpengalaman', 'Analisis Kebutuhan', 'Rekomendasi Produk', 'Support 24/7'],
    500000
);

-- Insert sample gallery items
INSERT INTO gallery (title, description, image_url, category) VALUES 
(
    'Fasilitas Pengantongan Modern',
    'Mesin pengantongan otomatis dengan kapasitas tinggi dan presisi akurat.',
    '/images/gallery/pengantongan-1.jpg',
    'Fasilitas'
),
(
    'Gudang Penyimpanan',
    'Gudang semen dengan sistem ventilasi dan kontrol kelembaban yang optimal.',
    '/images/gallery/gudang-1.jpg',
    'Fasilitas'
),
(
    'Pelabuhan Krueng Geukueh',
    'Lokasi strategis di pelabuhan untuk bongkar muat semen curah dari kapal.',
    '/images/gallery/pelabuhan-1.jpg',
    'Lokasi'
),
(
    'Armada Distribusi',
    'Truk-truk distribusi semen ke berbagai daerah di Aceh dan Sumut.',
    '/images/gallery/distribusi-1.jpg',
    'Operasional'
),
(
    'Quality Control Lab',
    'Laboratorium quality control untuk memastikan kualitas semen sesuai standar.',
    '/images/gallery/lab-1.jpg',
    'Quality'
),
(
    'Tim Profesional',
    'Tim yang berpengalaman dan profesional dalam industri semen.',
    '/images/gallery/team-1.jpg',
    'Tim'
);

-- Enable Row Level Security (RLS)
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access for companies" ON companies FOR SELECT USING (true);
CREATE POLICY "Public read access for services" ON services FOR SELECT USING (true);
CREATE POLICY "Public read access for gallery" ON gallery FOR SELECT USING (true);

-- Create policy for public contact insertion
CREATE POLICY "Public insert access for contacts" ON contacts FOR INSERT WITH CHECK (true);

-- Create policies for authenticated admin access
CREATE POLICY "Admin full access for companies" ON companies FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access for services" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access for gallery" ON gallery FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access for contacts" ON contacts FOR ALL USING (auth.role() = 'authenticated');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
