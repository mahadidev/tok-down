import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { apiRateLimiter, authRateLimiter, tiktokRateLimiter } from '@/lib/middleware/rateLimit';

// Rate limiting function for API routes
async function applyRateLimit(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	// Choose appropriate rate limiter based on route
	let limiter = apiRateLimiter;
	if (pathname.startsWith('/api/auth')) {
		limiter = authRateLimiter;
	} else if (pathname.startsWith('/api/tiktok')) {
		limiter = tiktokRateLimiter;
	}

	// Check rate limit
	return limiter(request);
}

// Middleware function
export async function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	// Apply rate limiting to all API routes
	if (pathname.startsWith('/api/')) {
		const rateLimitResult = await applyRateLimit(request);

		// If rate limit exceeded, return the error response
		if (rateLimitResult) {
			return rateLimitResult;
		}
	}

	// Handle /admin routes - redirect to login if not authenticated
	if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
		const sessionToken = request.cookies.get('next-auth.session-token') || request.cookies.get('__Secure-next-auth.session-token');

		if (!sessionToken) {
			const url = request.nextUrl.clone();
			url.pathname = '/admin/login';
			return NextResponse.redirect(url);
		}
	}

	return NextResponse.next();
}

export const config = {
	// Apply to all API routes and /admin routes
	matcher: ['/api/:path*', '/admin/:path*'],
};
