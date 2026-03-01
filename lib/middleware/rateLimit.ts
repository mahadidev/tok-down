import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// In-memory store for rate limiting (consider using Redis for production)
const rateLimit = new Map<string, { count: number; resetTime: number }>();

interface RateLimitConfig {
	windowMs: number; // Time window in milliseconds
	maxRequests: number; // Max requests per window
}

// Get client identifier from request
function getClientId(request: NextRequest): string {
	// Try to get real IP from various headers
	const forwardedFor = request.headers.get('x-forwarded-for');
	const realIp = request.headers.get('x-real-ip');
	const cfConnectingIp = request.headers.get('cf-connecting-ip');

	const ip = forwardedFor?.split(',')[0] || realIp || cfConnectingIp || 'unknown';
	return ip;
}

// Check rate limit
export function checkRateLimit(
	clientId: string,
	config: RateLimitConfig
): { allowed: boolean; remaining: number; resetTime: number } {
	const now = Date.now();
	const windowStart = now - config.windowMs;

	// Clean up old entries
	rateLimit.forEach((value, key) => {
		if (value.resetTime < now) {
			rateLimit.delete(key);
		}
	});

	// Get or create client record
	let client = rateLimit.get(clientId);

	// Reset if window has passed
	if (!client || client.resetTime < now) {
		client = { count: 0, resetTime: now + config.windowMs };
		rateLimit.set(clientId, client);
	}

	// Increment counter
	client.count++;

	const remaining = Math.max(0, config.maxRequests - client.count);
	const allowed = client.count <= config.maxRequests;

	return { allowed, remaining, resetTime: client.resetTime };
}

// Rate limit middleware for API routes
export function createRateLimiter(config: RateLimitConfig) {
	return async (request: NextRequest): Promise<NextResponse | null> => {
		// Skip rate limiting in development
		if (process.env.NODE_ENV === 'development') {
			return null;
		}

		const clientId = getClientId(request);
		const result = checkRateLimit(clientId, config);

		// Add rate limit headers
		const headers = new Headers();
		headers.set('X-RateLimit-Limit', config.maxRequests.toString());
		headers.set('X-RateLimit-Remaining', result.remaining.toString());
		headers.set('X-RateLimit-Reset', new Date(result.resetTime).toISOString());

		if (!result.allowed) {
			return new NextResponse(
				JSON.stringify({
					error: 'Too many requests',
					message: `Rate limit exceeded. Try again in ${Math.ceil((result.resetTime - Date.now()) / 1000)} seconds.`,
				}),
				{
					status: 429,
					headers: {
						...Object.fromEntries(headers),
						'Content-Type': 'application/json',
						'Retry-After': Math.ceil((result.resetTime - Date.now()) / 1000).toString(),
					},
				}
			);
		}

		// Return null to allow request to proceed
		return null;
	};
}

// Predefined rate limiters
export const apiRateLimiter = createRateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
	maxRequests: 100, // 100 requests per 15 minutes
});

export const authRateLimiter = createRateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
	maxRequests: 10, // 10 requests per 15 minutes (stricter for auth)
});

export const tiktokRateLimiter = createRateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
	maxRequests: 50, // 50 requests per 15 minutes for TikTok API
});
