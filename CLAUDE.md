# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Tok Down is a TikTok video downloader web application built with Next.js 13 (Pages Router), TypeScript, and Redux Toolkit. Users can search for TikTok videos by username or video URL, view results in a paginated feed, and download videos without watermarks.

## Development Commands

```bash
npm run dev      # Start development server on http://localhost:3000
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

### State Management
The application uses Redux Toolkit with a single slice (`siteSlice.ts`) managing:
- `navHeight` / `footerHeight` - Dynamic layout measurements for responsive feed sizing
- `videos` - Array of video data from API
- `feedTitle` - Title for the current feed
- `videoLoading` - Loading state for API calls
- `currentPage` / `perPage` - Client-side pagination (12 items per page)

### Component Structure
- **SearchInput** (`components/SearchInput/`) - Handles username/URL input and API calls
- **Feed** (`components/Feed/`) - Paginated video grid that reads from Redux
- **Video** (`components/Video/`) - Individual video card with download/copy actions
- **Navigation** (`components/Navigation/`) - Header with logo
- **Footer** (`components/Footer/`) - Footer with social links

### API Integration
Uses RapidAPI's TikTok video service (`tiktok-video-no-watermark2.p.rapidapi.com`):
- Username search: `/user/posts` endpoint
- Direct URL: Video URL endpoint

**Important**: API key is currently hardcoded in SearchInput component and should be moved to environment variables.

### Data Flow
1. User searches via SearchInput → API call → `setVidoes` action updates Redux
2. Feed component reads `videos` from Redux via `useSelector`
3. Client-side pagination handled via `setPagination` action

### Styling
- Tailwind CSS with dark theme (`bg-[#121314]`) and yellow accents
- Custom fonts: Nunito (body), Orbitron (headers)
- Max-width container: 440px
- All elements have 0.5s ease-all transition

### Key Files
- `pages/_app.tsx` - Redux Provider wrapper
- `redux/store.ts` - Store configuration
- `pages/api/hello.ts` - Example API route (unused)

## Git & GitHub Rules

### Commit & Push Policy

- **Never** add Claude as a co-author in commit messages (no `Co-authored-by: Claude` or any similar attribution).
- **Never** include any AI/Claude credit, mention, or attribution in commit messages, PR descriptions, or any Git metadata.
- Commits should only reflect the project's own authorship — keep messages clean and professional.
- **Always** commit and push to GitHub after every change, no matter how small.
