# Tok Down

![Next.js](https://img.shields.io/badge/Next.js-13-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

> Download TikTok videos without watermark. Fast, free, unlimited.

## Overview

Tok Down is a TikTok video downloader that fetches HD videos without watermarks. Search by username or direct URL, browse paginated results, and download instantly.

## Features

- Search by username or video URL
- Watermark-free HD downloads
- Built-in blog with TipTap editor
- Admin dashboard with analytics
- Responsive dark theme
- Rate limiting and security headers
- Error boundaries for graceful error handling

## Tech Stack

Next.js 13, TypeScript, Redux Toolkit, Supabase, Tailwind CSS, NextAuth.js, Zod

## Quick Start

```bash
git clone https://github.com/mahadidev/tok-down.git
cd tok-down
npm install
npm run dev
```

## Environment Setup

Create a `.env.local` file with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# RapidAPI (Server-side only - never use NEXT_PUBLIC_ prefix!)
RAPIDAPI_KEY=your_rapidapi_key

# NextAuth Configuration
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Admin Credentials
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```

Generate a secure `NEXTAUTH_SECRET` with:
```bash
openssl rand -base64 32
```

## Production Deployment Checklist

### Before deploying to production, ensure you have:

- [ ] **Security**
  - [ ] Changed default admin password to a strong password
  - [ ] Verified `RAPIDAPI_KEY` is NOT prefixed with `NEXT_PUBLIC_`
  - [ ] Set strong `NEXTAUTH_SECRET`
  - [ ] Configured proper `NEXTAUTH_URL` for production domain
  - [ ] Enabled HTTPS for all routes

- [ ] **Dependencies**
  - [ ] Run `npm audit` and fixed all vulnerabilities
  - [ ] All dependencies are up to date

- [ ] **Environment Variables**
  - [ ] All production env vars set in hosting platform
  - [ ] No development credentials in production

- [ ] **Monitoring**
  - [ ] Health check endpoint configured: `/api/health`
  - [ ] Error tracking service connected (Sentry, LogRocket, etc.)
  - [ ] Analytics tracking enabled

- [ ] **Performance**
  - [ ] Production build tested: `npm run build`
  - [ ] Bundle size analyzed
  - [ ] Lighthouse scores satisfactory

## Available Scripts

```bash
npm run dev      # Start development server on http://localhost:3000
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## API Endpoints

### TikTok Endpoints
- `POST /api/tiktok/search` - Search videos by username
- `POST /api/tiktok/video` - Get video by URL

### Admin Endpoints
- `POST /api/auth/[...nextauth]` - Authentication
- `GET /api/admin/*` - Protected admin routes

### Analytics
- `POST /api/analytics/track` - Track analytics events
- `GET /api/analytics/stats` - Get statistics

### Health Check
- `GET /api/health` - Health check for monitoring

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
RAPIDAPI_KEY=
NEXTAUTH_SECRET=
NEXTAUTH_URL=https://yourdomain.com
ADMIN_EMAIL=
ADMIN_PASSWORD=
```

## Project Structure

```
├── components/       # React components
├── lib/             # Utility functions and configurations
│   ├── validations/ # Zod validation schemas
│   └── supabase/    # Supabase client configuration
├── pages/           # Next.js pages and API routes
├── redux/           # Redux store and slices
├── styles/          # Global styles
└── types/           # TypeScript type definitions
```

## About the Developer

**Mahadi Hasan** — Full Stack Developer | AI Specialist

Started coding at 13. Top 1% Freelancer who's driven $100K+ growth through tech solutions.

**Tech:** React, Next.js, TypeScript, Node.js, Supabase, PostgreSQL, AI/LLMs

**Seeking:** IT Specialist, Technical Manager, Lead Developer roles (open to KSA/Europe relocation)

[Portfolio](https://mahadidev.vercel.app) | [GitHub](https://github.com/mahadidev) | [Email](mailto:mahadi.dev.pm@gmail.com)

## License

MIT
