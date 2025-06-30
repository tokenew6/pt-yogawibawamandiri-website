# PT. Yoga Wibawa Mandiri - Modern Corporate Website

<div align="center">
  <img src="public/ywm-logo-new.svg" alt="PT. Yoga Wibawa Mandiri Logo" width="200" height="200"/>
  
  [![Netlify Status](https://api.netlify.com/api/v1/badges/your-site-id/deploy-status)](https://app.netlify.com/sites/your-site/deploys)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2018.0.0-brightgreen)](https://nodejs.org/)
  [![React](https://img.shields.io/badge/React-18.3.1-blue)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)](https://www.typescriptlang.org/)
</div>

## 🌟 Overview

Modern responsive website untuk PT. Yoga Wibawa Mandiri - perusahaan pengantongan semen terpercaya di Lhokseumawe, Aceh. Website ini dibangun dengan teknologi React + TypeScript + TailwindCSS + Supabase dengan desain transparan dan modern.

## ✨ Features

### 🌐 Public Website
- **Modern Landing Page** dengan header transparan dan logo berkualitas
- **Company Profile** lengkap dengan informasi PT. Yoga Wibawa Mandiri
- **Services Showcase** layanan pengantongan semen dan distribusi
- **Image Gallery** untuk menampilkan fasilitas dan operasional
- **Location Information** dengan detail lokasi pabrik dan kantor
- **Contact Forms** terintegrasi dengan Supabase database
- **Responsive Design** mobile-first dengan UI/UX modern

### 💾 Database Integration
- **Supabase Backend** - Modern PostgreSQL database
- **Real-time Data** - Live updates untuk konten
- **Contact Management** - Sistem manajemen pesan pelanggan
- **Content Management** - Dynamic content dari database
- **File Storage** - Supabase storage untuk media

### 🎨 Design Features
- **Transparent Header** dengan backdrop blur effect
- **Custom SVG Logos** - Logo transparan PT. YWM dan Semen Padang
- **Enhanced Typography** - Text contrast yang optimal
- **Modern Components** - Shadcn/ui component library
- **Consistent Branding** - Brand colors dan styling terpadu

### 📊 Admin Features
- **Admin Panel** - Dashboard untuk mengelola konten
- **Services Management** - CRUD operasi untuk layanan
- **Gallery Management** - Upload dan kelola gambar
- **Contact Management** - Monitor dan respon pesan pelanggan
- **Real-time Updates** - Live notifications untuk admin

### 🚀 Technical Features
- **TypeScript** - Type safety dan better development experience
- **Vite Build Tool** - Fast development dan optimized production builds
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Query** - Server state management
- **Environment Variables** - Secure configuration management

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
- **PostgreSQL** - Modern relational database
- **Supabase Client** - Real-time database operations
- **Row Level Security** - Data protection policies
- **Database Migrations** - Structured schema management

### External Services
- **EmailJS** - Contact form email delivery
- **Netlify** - Static site hosting dan deployment
- **Git Integration** - Version control dan automated deployments

### Deployment & Infrastructure
- **Netlify** - Static site hosting dengan CDN global
- **Supabase Cloud** - Managed backend infrastructure
- **Environment Variables** - Secure configuration management
- **Automated Deployments** - Git-based deployment pipeline

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
VITE_SUPABASE_URL=https://fpvvpaltozupbynxjnok.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
VITE_APP_NAME=PT Yoga Wibawa Mandiri
VITE_APP_DESCRIPTION=Pengantongan Semen Padang Lhokseumawe
```

### 4. Setup Database
1. Buat project baru di [Supabase](https://supabase.com)
2. Copy database URL dan API keys ke file `.env`
3. Import database schema melalui Supabase Dashboard:
   - Buka SQL Editor di Supabase Dashboard
   - Copy dan jalankan script dari `supabase/migrations/001_initial_schema.sql`
4. Database akan otomatis terisi dengan sample data

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
