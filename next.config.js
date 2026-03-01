/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**.tiktokcdn.com',
			},
			{
				protocol: 'https',
				hostname: '**.tiktok.com',
			},
		],
	},
	async headers() {
		return [
			{
				source: '/:path*',
				headers: [
					// Content Security Policy
					{
						key: 'Content-Security-Policy',
						value: [
							"default-src 'self'",
							"script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net",
							"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
							"font-src 'self' https://fonts.gstatic.com",
							"img-src 'self' data: https: blob:",
							"connect-src 'self' https:",
							"frame-src 'self' https://www.tiktok.com https://tiktok.com",
							"media-src 'self' https: blob:",
						].join('; '),
					},
					// Prevent clickjacking
					{
						key: 'X-Frame-Options',
						value: 'DENY',
					},
					// Prevent MIME type sniffing
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					// Enable XSS protection
					{
						key: 'X-XSS-Protection',
						value: '1; mode=block',
					},
					// Referrer Policy
					{
						key: 'Referrer-Policy',
						value: 'strict-origin-when-cross-origin',
					},
					// HSTS (only in production)
					process.env.NODE_ENV === 'production'
						? {
								key: 'Strict-Transport-Security',
								value: 'max-age=31536000; includeSubDomains; preload',
							}
						: null,
				].filter(Boolean),
			},
		];
	},
};

module.exports = nextConfig;
