# PT. Yoga Wibawa Mandiri - AI-Powered Website & CMS

![PT. YWM Logo](public/lovable-uploads/5f8e0e82-2031-4a9f-b848-f05d23c37cf2.png)

## 🌟 Overview

Modern fullstack website dan content management system untuk PT. Yoga Wibawa Mandiri - perusahaan pengantongan semen terkemuka di Lhokseumawe, Aceh. Website ini dibangun dengan teknologi React + TailwindCSS + Supabase dan dilengkapi dengan AI Assistant menggunakan JS Puter.

## ✨ Features

### 🌐 Public Website
- **Modern Landing Page** dengan hero section yang menarik
- **Company Profile** lengkap dengan visi, misi, dan sejarah
- **Services Showcase** dengan detail layanan pengantongan semen
- **Project Gallery** dengan filter dan kategorisasi
- **Blog/Article System** dengan SEO-friendly URLs
- **Contact Forms** terintegrasi dengan Google Maps
- **Responsive Design** mobile-first approach

### 🤖 AI-Powered Features  
- **JS Puter AI Assistant** - Customer service 24/7
- **AI Content Generator** - Otomatis generate artikel
- **Smart FAQ** - Jawaban otomatis untuk pertanyaan umum
- **AI-Enhanced Search** - Pencarian konten yang cerdas

### 🔐 Authentication & Authorization
- **Role-based Access Control** (Admin, Editor, Viewer, Client)
- **Supabase Auth** dengan email/password
- **Protected Routes** untuk area admin
- **User Profile Management**

### 📊 Admin Dashboard
- **Content Management** - CRUD artikel, proyek, layanan
- **File Manager** - Upload dan kelola media
- **User Management** - Kelola pengguna dan role
- **Analytics Dashboard** - Statistik website
- **AI Tools Integration** - Generate konten dengan AI

### 🚀 Technical Features
- **PWA Support** - Install ke mobile device
- **SEO Optimized** - Meta tags, sitemap, structured data
- **Dark Mode** - Theme switching
- **Performance Optimized** - Lazy loading, code splitting
- **Real-time Updates** - Supabase real-time subscriptions

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI Library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **TailwindCSS** - Styling framework
- **Shadcn/ui** - Component library
- **React Router** - Client-side routing
- **TanStack Query** - Server state management

### Backend & Database
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Database
- **Supabase Auth** - Authentication
- **Supabase Storage** - File storage
- **Row Level Security** - Data protection

### AI & External Services
- **JS Puter** - AI Assistant platform
- **EmailJS** - Contact form emails
- **Google Maps** - Location embedding

### Deployment
- **Netlify** - Static site hosting
- **Supabase Cloud** - Backend hosting
- **Custom Domain** - Professional URL

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm atau yarn
- Akun Supabase
- Akun Netlify (untuk deployment)

### 1. Clone Repository
```bash
git clone https://github.com/jakForever/pt-yogawibawamandiri-website.git
cd pt-yogawibawamandiri-website
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
```bash
cp .env.example .env
```

Edit `.env` file dengan konfigurasi Anda:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_JSPUTER_API_KEY=your-jsputer-api-key
```

### 4. Setup Database
Jalankan SQL scripts di Supabase:
```bash
# Import database schema
psql -h your-db-host -U postgres -d postgres -f supabase/schema.sql
```

### 5. Start Development Server
```bash
npm run dev
```

Website akan berjalan di `http://localhost:5173`

## 📊 Database Schema

### Tables
- **profiles** - User profiles dan roles
- **articles** - Blog articles dan content
- **projects** - Company projects portfolio  
- **services** - Services offered
- **files** - File storage metadata
- **site_settings** - Website configuration

### Row Level Security (RLS)
- Users hanya bisa akses data sesuai role
- Public data tersedia tanpa auth
- Admin memiliki akses penuh

## 🔑 User Roles

| Role | Permissions |
|------|-------------|
| **Admin** | Full access - kelola semua content dan users |
| **Editor** | Create/edit articles, projects, services |
| **Viewer** | Read-only access ke dashboard |
| **Client** | Limited access untuk klien perusahaan |

## 🤖 AI Assistant Integration

### JS Puter Setup
```javascript
// Automatic initialization
const aiAssistant = new JSPuterBot({
  apiKey: "your-api-key",
  theme: "auto",
  greeting: "Halo! Saya Asisten AI PT. YWM",
  position: "bottom-right",
  context: "PT. Yoga Wibawa Mandiri company info..."
});
```

### AI Features
- **Customer Support** - 24/7 automated responses
- **Content Generation** - AI-powered article creation
- **Smart Search** - Intelligent content discovery
- **FAQ Automation** - Instant answers to common questions

## 📱 PWA Features

### Installation
Website dapat di-install sebagai aplikasi mobile:
- **Android** - "Add to Home Screen"
- **iOS** - "Add to Home Screen" 
- **Desktop** - Install prompt otomatis

### Offline Support
- **Service Worker** - Cache static assets
- **Offline Pages** - Basic functionality tanpa internet
- **Background Sync** - Sync data saat online kembali

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/ui components
│   ├── Header.tsx      # Site header
│   ├── Footer.tsx      # Site footer
│   └── JSPuterAI.tsx   # AI assistant
├── pages/              # Page components
│   ├── dashboard/      # Admin dashboard pages
│   ├── Index.tsx       # Homepage
│   └── ...
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state
├── lib/                # Utilities
│   ├── supabase.ts     # Supabase client
│   └── utils.ts        # Helper functions
└── hooks/              # Custom React hooks
```

## 🚀 Deployment

### Netlify Deployment

1. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Environment Variables**:
   Set di Netlify dashboard:
   ```
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

3. **Redirects**:
   File `_redirects` sudah dikonfigurasi untuk SPA routing

### Domain Setup
- **Custom Domain**: `yogawibawamandiri.com`
- **SSL Certificate**: Auto-provisioned oleh Netlify
- **CDN**: Global distribution untuk performa optimal

## 📈 Performance

### Optimizations
- **Code Splitting** - Lazy load pages
- **Image Optimization** - WebP format, lazy loading
- **Bundle Analysis** - Minimal dependency size
- **Caching Strategy** - Browser dan CDN caching

### Metrics Target
- **Lighthouse Score**: 90+ semua kategori
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🔒 Security

### Best Practices
- **Environment Variables** - Sensitive data protection
- **Row Level Security** - Database access control
- **HTTPS Everywhere** - Encrypted connections
- **CORS Configuration** - Secure API access
- **Input Validation** - XSS dan injection protection

## 📝 Content Management

### Article Creation
1. **Manual Writing** - Rich text editor
2. **AI Generation** - Automated content creation
3. **SEO Optimization** - Meta tags, structured data
4. **Media Management** - Image upload dan optimization

### Project Portfolio
- **Image Galleries** - Multiple image support
- **Categorization** - Filter by project type
- **Status Tracking** - Completed/Ongoing/Planned
- **Client Information** - Project details

## 📞 Support & Contact

### Developer
- **Name**: Mulky Malikul Dhaher
- **Role**: Technical Engineer
- **Company**: PT. Yoga Wibawa Mandiri
- **Email**: mulky@yogawibawamandiri.com

### Company Information
- **Website**: https://yogawibawamandiri.com
- **Email**: info@yogawibawamandiri.com
- **Address**: Pelabuhan Krueng Geukueh, Lhokseumawe, Aceh
- **Phone**: +62-xxx-xxxx-xxxx

## 📄 License

Copyright © 2024 PT. Yoga Wibawa Mandiri. All rights reserved.

This project is proprietary software developed for PT. Yoga Wibawa Mandiri.

---

## 🔄 Changelog

### v1.0.0 (2024-06-30)
- ✅ Initial release
- ✅ Full-stack CMS implementation
- ✅ JS Puter AI integration
- ✅ Supabase backend setup
- ✅ Admin dashboard
- ✅ PWA support
- ✅ Netlify deployment ready

---

**Built with ❤️ for PT. Yoga Wibawa Mandiri**
