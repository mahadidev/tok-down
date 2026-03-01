# Tok Down Blog + Admin Panel + Analytics - Setup Guide

This guide will help you complete the setup after the code implementation.

## 🎯 Implementation Summary

The following has been added to Tok Down:
- ✅ Blog CMS with Supabase integration
- ✅ Admin panel with authentication
- ✅ Rich text editor (Tiptap) for blog posts
- ✅ Analytics tracking and dashboard
- ✅ Public blog pages
- ✅ Legal pages (About, Contact, Privacy, Terms)
- ✅ Updated navigation and footer

---

## 📋 Setup Steps

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click "New Project" and fill in:
   - Name: `tok-down`
   - Database Password: (save this securely)
   - Region: Choose closest to your users
3. Wait for the project to be provisioned (~2 minutes)

### Step 2: Run Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the contents of `supabase-schema.sql` from your project
4. Paste and click **Run** to create all tables

### Step 3: Get API Credentials

1. In Supabase, go to **Settings** → **API**
2. Copy:
   - Project URL
   - `anon` public key

### Step 4: Configure Environment Variables

1. Open `.env.local` in your project
2. Update with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-actual-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key
   NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
   NEXTAUTH_URL=http://localhost:3000
   ADMIN_EMAIL=your-email@example.com
   ```

3. Generate a NEXTAUTH_SECRET:
   ```bash
   openssl rand -base64 32
   ```

### Step 5: Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## 🔐 Admin Access

### Login
- URL: `http://localhost:3000/admin/login`
- Email: The value from `ADMIN_EMAIL` in `.env.local`
- Password: `admin123` (default - **CHANGE IN PRODUCTION!**)

### First Time Setup
1. Go to `/admin/login` and log in
2. Navigate to Categories and Tags to create your blog taxonomy
3. Create your first blog post

### ⚠️ PRODUCTION SECURITY WARNING
Before deploying to production:
1. Change `ADMIN_PASSWORD` to a strong password (min 16 chars)
2. Consider implementing bcrypt hashing for credentials
3. Set up proper authentication with Supabase Auth
4. Enable HTTPS only for admin routes
5. Implement account lockout after failed login attempts

---

## 📝 Using the Blog System

### Creating Posts
1. Go to `/admin/posts` and click "New Post"
2. Fill in:
   - Title (required)
   - Slug (auto-generated from title)
   - Excerpt (optional, auto-generated if empty)
   - Content (use the rich text editor)
   - Cover image URL (optional)
   - Categories and tags
3. Save as draft or publish

### Managing Content
- **Posts**: `/admin/posts` - List, edit, delete posts
- **Analytics**: `/admin/analytics` - View site statistics
- **Dashboard**: `/admin` - Overview with quick actions

### Public Pages
- **Blog**: `/blog` - Public blog listing
- **Single Post**: `/blog/[slug]` - Individual post page
- **About**: `/about`
- **Contact**: `/contact`
- **Privacy**: `/privacy`
- **Terms**: `/terms`

---

## 📊 Analytics

Analytics are tracked automatically using:
- Session-based tracking (30-day cookies)
- No personal data collected
- GDPR compliant

View statistics in `/admin/analytics`

---

## 🚀 Deployment

### Deploy to Vercel
1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Required Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
ADMIN_EMAIL=
```

---

## 🛡️ Security Notes

### For Production
1. **CRITICAL: Change admin password** - Update `ADMIN_PASSWORD` in `.env.local` with a strong password:
   - Generate with: `openssl rand -base64 24`
   - Minimum 16 characters with mixed case, numbers, and symbols
   - Never commit production credentials to git
2. **Enable proper auth** - Implement Supabase Auth for admin users
3. **Set up RLS policies** - Review Row Level Security in Supabase
4. **Use service role key** - For server-side operations
5. **Environment variables** - Ensure `RAPIDAPI_KEY` is NOT prefixed with `NEXT_PUBLIC_`

### Row Level Security (RLS)
The schema includes basic RLS policies. For production:
- Replace `USING (true)` with proper `auth.uid()` checks
- Create authenticated admin users in Supabase Auth
- Update the NextAuth credentials provider

---

## 📁 File Structure

```
├── components/
│   ├── admin/
│   │   ├── AdminLayout.tsx      # Admin panel layout
│   │   ├── PostEditor.tsx       # Tiptap rich text editor
│   │   └── Charts.tsx           # Chart re-exports
│   └── blog/
│       ├── BlogCard.tsx         # Blog post card
│       └── BlogContent.tsx      # Single post content
├── lib/
│   ├── hooks/
│   │   └── usePageTracking.ts   # Analytics tracking hook
│   └── supabase/
│       ├── client.ts            # Browser Supabase client
│       └── server.ts            # Server Supabase client
├── pages/
│   ├── admin/
│   │   ├── index.tsx            # Dashboard
│   │   ├── login.tsx            # Admin login
│   │   ├── posts/               # Post management
│   │   └── analytics/           # Analytics dashboard
│   ├── api/
│   │   ├── auth/[...nextauth].ts # NextAuth config
│   │   ├── blog/                # Blog API routes
│   │   └── analytics/           # Analytics API
│   ├── blog/
│   │   ├── index.tsx            # Public blog listing
│   │   └── [slug].tsx           # Single blog post
│   ├── about.tsx
│   ├── contact.tsx
│   ├── privacy.tsx
│   └── terms.tsx
├── redux/slice/
│   ├── blogSlice.ts             # Blog state management
│   └── analyticsSlice.ts        # Analytics state
├── types/blog.ts                # TypeScript types
├── middleware.ts                # Route protection
└── supabase-schema.sql         # Database schema
```

---

## 🐛 Troubleshooting

### "Missing environment variables"
- Ensure `.env.local` is configured correctly
- Restart the dev server after adding env vars

### "Supabase connection error"
- Verify your Supabase URL and keys
- Check Supabase dashboard that your project is active

### Admin login not working
- Default credentials: email from `.env.local`, password `admin123`
- Check that NextAuth is configured correctly

### Analytics not showing data
- Analytics starts collecting once you visit pages (excluding `/admin`)
- Check browser console for tracking errors

---

## 📚 Resources

- [Supabase Docs](https://supabase.com/docs)
- [NextAuth.js](https://next-auth.js.org)
- [Tiptap Editor](https://tiptap.dev)
- [Recharts](https://recharts.org)

---

## ✅ Verification Checklist

After setup, verify:
- [ ] Admin can login at `/admin/login`
- [ ] Admin can create/edit/delete blog posts
- [ ] Public users can view blog at `/blog`
- [ ] Individual posts load at `/blog/[slug]`
- [ ] Analytics track page views
- [ ] Admin dashboard shows analytics
- [ ] All legal pages exist (Privacy, Terms, About, Contact)
- [ ] Navigation includes blog link
- [ ] Footer includes legal links
