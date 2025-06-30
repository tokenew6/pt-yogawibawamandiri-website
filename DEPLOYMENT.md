# 🚀 Deployment Guide - PT. Yoga Wibawa Mandiri

## 📋 Quick Setup Checklist

### ✅ **Step 1: Supabase Database Setup**

1. **Copy SQL Schema**:
   - Open Supabase Dashboard → SQL Editor
   - Copy contents from `supabase/schema.sql`
   - Execute to create all tables and policies

2. **Get Anon Key**:
   - Supabase Dashboard → Settings → API
   - Copy the `anon` `public` key
   - Update `.env` file with the anon key

### ✅ **Step 2: Environment Configuration**

Update `.env` file:
```env
VITE_SUPABASE_URL=https://fpvvpaltozupbynxjnok.supabase.co
VITE_SUPABASE_ANON_KEY=[paste-your-anon-key-here]
```

### ✅ **Step 3: Build & Deploy**

**Local Testing:**
```bash
npm install
npm run dev
```

**Production Build:**
```bash
npm run build
```

**Deploy to Netlify:**
1. Upload `dist/` folder OR
2. Connect GitHub repository
3. Set environment variables in Netlify dashboard

### ✅ **Step 4: First Admin Setup**

After deployment:
1. Visit `/register` and create account
2. In Supabase Dashboard → Table Editor → profiles
3. Change your role from 'viewer' to 'admin'
4. Login at `/dashboard` with admin access

---

## 🔧 **Netlify Configuration**

**Build Settings:**
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 18

**Environment Variables:**
```
VITE_SUPABASE_URL=https://fpvvpaltozupbynxjnok.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**Redirect Rules:** (Already configured in `netlify.toml`)

---

## 🎯 **Features Ready to Use**

### **🌐 Public Website**
- Modern homepage with company profile
- Blog system with SEO-friendly URLs
- AI assistant chat in bottom-right
- Contact forms and Google Maps

### **📊 Admin Dashboard**
- Article management with AI generation
- Project portfolio management
- Service configuration
- File and media upload
- User role management

### **🤖 AI Features**
- JS Puter AI assistant
- Automated content generation
- Smart FAQ responses
- 24/7 customer support

---

## 🔐 **User Roles & Permissions**

| Role | Dashboard Access | Create/Edit | Delete | Users |
|------|-----------------|-------------|--------|-------|
| **Admin** | ✅ Full | ✅ All | ✅ All | ✅ Manage |
| **Editor** | ✅ Limited | ✅ Content | ❌ No | ❌ No |
| **Viewer** | ✅ Read-only | ❌ No | ❌ No | ❌ No |
| **Client** | ✅ Basic | ❌ No | ❌ No | ❌ No |

---

## 🌐 **URL Structure**

**Public Pages:**
- `/` - Homepage
- `/tentang` - About Us
- `/layanan` - Services
- `/galeri` - Gallery
- `/blog` - Blog listing
- `/artikel/{slug}` - Article detail
- `/lokasi` - Location
- `/kontak` - Contact

**Admin Pages:**
- `/login` - Authentication
- `/register` - User registration
- `/dashboard` - Admin dashboard
- `/dashboard/articles` - Article management
- `/dashboard/articles/new` - Create article
- `/dashboard/articles/{id}` - Edit article

---

## ⚡ **Performance Optimization**

- **Code Splitting**: Automatic with Vite
- **Image Optimization**: WebP format recommended
- **Caching**: Browser + CDN caching configured
- **Bundle Size**: Optimized with tree-shaking
- **SEO**: Meta tags and structured data ready

---

## 🔒 **Security Features**

- **Row Level Security**: Database access controlled
- **Environment Variables**: Sensitive data protected
- **HTTPS**: SSL certificate auto-provisioned
- **CORS**: Properly configured
- **Input Validation**: XSS protection

---

## 📞 **Support**

For technical issues:
- Check browser console for errors
- Verify environment variables
- Ensure Supabase schema is executed
- Test database connection

**Ready to launch! 🚀**
