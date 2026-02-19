# Tok Down

![Next.js](https://img.shields.io/badge/Next.js-13-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Redux](https://img.shields.io/badge/Redux_Toolkit-1.9-purple?style=flat-square&logo=redux)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

> Download TikTok videos without watermark. Fast, free, unlimited.

---

## About

**Tok Down** is a full-stack web application that enables users to download TikTok videos without watermarks. Built as a portfolio project demonstrating modern web development practices, it showcases my ability to integrate third-party APIs, manage complex state, and deliver polished user experiences.

### What It Does
- Search for TikTok videos by username or direct video URL
- Download videos in HD quality without watermarks
- Browse through paginated video feeds
- Access a built-in blog with rich text editing
- Manage content via an admin dashboard with analytics

### Technical Highlights
- Client-side pagination for handling large datasets efficiently
- Real-time state management with Redux Toolkit
- Type-safe development with TypeScript throughout
- Responsive design with mobile-first approach
- Custom CMS with TipTap rich text editor
- Authentication system using NextAuth.js

---

## Features

| Feature | Description |
|---------|-------------|
| **Dual Search Modes** | Search by TikTok username or paste direct video URL |
| **Watermark-Free Downloads** | Download videos in original HD quality |
| **Smart Pagination** | Client-side pagination (12 items/page) for smooth browsing |
| **Blog CMS** | Full content management with TipTap rich text editor |
| **Admin Dashboard** | Analytics, content management, and user insights |
| **Responsive Design** | Dark theme optimized for desktop and mobile |
| **Real-time Updates** | Redux-powered state management for instant UI updates |

---

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | Next.js 13, React 18, TypeScript, Tailwind CSS, Framer Motion |
| **State Management** | Redux Toolkit |
| **Backend** | Next.js API Routes, Supabase |
| **Authentication** | NextAuth.js |
| **External APIs** | RapidAPI (TikTok Video No Watermark) |
| **Database** | PostgreSQL (via Supabase) |
| **Deployment** | Vercel |

---

## Screenshots

### Hero Section
![Hero Section](https://img.shields.io/badge/Screenshot-Coming_Soon-gray?style=for-the-badge)

The landing page features a search interface with a mock video preview.

### Video Feed
![Video Feed](https://img.shields.io/badge/Screenshot-Coming_Soon-gray?style=for-the-badge)

Paginated grid displaying TikTok videos with download options.

### Admin Dashboard
![Admin Dashboard](https://img.shields.io/badge/Screenshot-Coming_Soon-gray?style=for-the-badge)

Analytics dashboard showing site metrics and content management.

### Mobile View
![Mobile View](https://img.shields.io/badge/Screenshot-Coming_Soon-gray?style=for-the-badge)

Responsive design optimized for mobile devices.

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- RapidAPI account

### Installation

```bash
# Clone the repository
git clone https://github.com/mahadidev/tok-down.git
cd tok-down

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## Environment Variables

Create a `.env.local` file in the root directory:

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `RAPIDAPI_KEY` | RapidAPI key for TikTok API | Yes |
| `NEXTAUTH_SECRET` | JWT secret for NextAuth | Yes |
| `ADMIN_EMAIL` | Admin email for dashboard access | Yes |
| `ADMIN_PASSWORD` | Admin password for dashboard access | Yes |

### Getting API Keys

**RapidAPI:**
1. Sign up at [rapidapi.com](https://rapidapi.com)
2. Subscribe to [TikTok Video No Watermark API](https://rapidapi.com/yi005/api/tiktok-video-no-watermark2)
3. Copy your API key

**Supabase:**
1. Create a project at [supabase.com](https://supabase.com)
2. Navigate to Project Settings > API
3. Copy your project URL and anon key

---

## Database Setup

### Supabase Tables

Run the following SQL in your Supabase SQL Editor:

```sql
-- Posts table for blog functionality
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content JSONB NOT NULL,
  excerpt TEXT,
  cover_image TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Analytics table for dashboard
CREATE TABLE analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_published ON posts(published);
CREATE INDEX idx_analytics_event ON analytics(event_type);
```

---

## Project Structure

```
tok-down/
├── components/          # React components
│   ├── admin/          # Admin dashboard components
│   ├── blog/           # Blog related components
│   ├── ui/             # Reusable UI primitives
│   ├── Feed/           # Video feed component
│   ├── Footer/         # Footer component
│   ├── Navigation/     # Header navigation
│   ├── SearchInput/    # Search functionality
│   └── Video/          # Individual video card
├── pages/              # Next.js pages (Pages Router)
│   ├── api/            # API routes
│   │   ├── auth/       # NextAuth endpoints
│   │   └── [...nextauth].ts
│   ├── admin/          # Admin dashboard pages
│   ├── blog/           # Blog pages
│   ├── _app.tsx        # App wrapper with Redux
│   └── index.tsx       # Homepage
├── redux/              # Redux store configuration
│   ├── store.ts        # Store setup
│   └── slice/          # State slices
│       ├── siteSlice.ts
│       ├── blogSlice.ts
│       └── analyticsSlice.ts
├── lib/                # Utility functions
├── styles/             # Global styles
├── types/              # TypeScript definitions
└── public/             # Static assets
```

---

## Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Key Implementation Details

**State Management:**
- Single Redux store with multiple slices for modularity
- `siteSlice` manages UI state (videos, pagination, loading states)
- `blogSlice` handles blog posts and editor state
- `analyticsSlice` tracks dashboard metrics

**Pagination:**
- Client-side pagination with configurable items per page
- Efficient handling of large video datasets
- Smooth transitions between pages

**Rich Text Editing:**
- TipTap integration for blog content creation
- Custom toolbar with formatting options
- JSON storage of content for flexibility

---

## Challenges & Learning

### Problem: Large Dataset Performance
**Challenge:** Handling thousands of TikTok videos without server-side pagination.

**Solution:** Implemented client-side pagination with Redux state management. Only the current page of videos is rendered, reducing DOM nodes and improving performance.

### Problem: Rich Text Content Storage
**Challenge:** Storing and displaying blog content with rich formatting.

**Solution:** Used TipTap editor which stores content as JSON. This allows flexible rendering and easy content manipulation while maintaining formatting integrity.

### Problem: Analytics Without Third-Party Services
**Challenge:** Tracking site usage without external analytics platforms.

**Solution:** Built custom analytics using Supabase. Every user action is logged as an event, and the admin dashboard aggregates this data for insights.

---

## Roadmap

- [ ] User authentication for favoriting videos
- [ ] Batch download functionality
- [ ] Video quality selector (1080p, 720p, 480p)
- [ ] Mobile app (React Native)
- [ ] Dark/light theme toggle
- [ ] Multi-language support
- [ ] Download history with cloud sync

---

## About the Developer

**Mahadi Hasan** — Young Tech Founder | IT Specialist | Full Stack Developer | AI Specialist

I started coding at 13 and have been building ever since. As a Top 1% Freelancer, I've driven $100K+ growth through technology solutions and bring a "Founder's Mindset" to every project—prioritizing ownership, scalability, and ROI.

### Expertise
- **Frontend:** React, Next.js, TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express, Next.js API Routes, Supabase
- **State Management:** Redux Toolkit, Zustand
- **Databases:** PostgreSQL, MongoDB
- **Authentication:** NextAuth.js, JWT
- **APIs:** REST, GraphQL, RapidAPI integration
- **AI Integration:** OpenAI APIs, LangChain

### Career Goals
Actively seeking:
- IT Specialist roles
- Technical Manager positions
- Lead Developer opportunities

Open to relocation in KSA and Europe.

### Connect With Me
- [Portfolio](https://mahadidev.vercel.app)
- [GitHub](https://github.com/mahadidev)
- [Email](mailto:mahadi.dev.pm@gmail.com)

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [TikTok Video No Watermark API](https://rapidapi.com/yi005/api/tiktok-video-no-watermark2) by RapidAPI
- [Next.js](https://nextjs.org/) for the amazing framework
- [Supabase](https://supabase.com/) for the backend infrastructure
- [Vercel](https://vercel.com/) for hosting

---

**Built with passion by Mahadi Hasan**

![Tok Down](https://img.shields.io/badge/Made_with-<3-red?style=flat-square)
