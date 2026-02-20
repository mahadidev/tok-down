/**
 * API Constants
 */

/**
 * API Configuration
 */
export const API_CONFIG = {
	BASE_URL: 'https://tiktok-video-no-watermark2.p.rapidapi.com',
	HOST: 'tiktok-video-no-watermark2.p.rapidapi.com',
	KEY: process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '',
	TIMEOUT: 30000, // 30 seconds
} as const;

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
	USER_POSTS: '/user/posts',
	// Endpoint for getting video by URL (root endpoint per API docs)
	VIDEO_BY_URL: '/',
} as const;

/**
 * Request Parameters
 */
export const API_PARAMS = {
	COUNT: '1000',
	HD: '0',
} as const;

/**
 * Error Messages
 */
export const API_ERRORS = {
	INVALID_USERNAME: 'Please enter a correct username with @',
	NO_VIDEOS_FOUND: 'No videos found. The user may only have photo posts.',
	INVALID_URL: 'Username or video URL is incorrect',
	NETWORK_ERROR: 'Something went wrong. Please try again.',
	EMPTY_SEARCH: 'Please enter a username or video URL',
	API_KEY_MISSING: 'API key is missing. Please check your environment variables.',
	REQUEST_TIMEOUT: 'Request timeout. Please try again.',
	UNKNOWN_ERROR: 'An unknown error occurred.',
} as const;

/**
 * Validation Patterns
 */
export const VALIDATION_PATTERNS = {
	TIKTOK_URL: /tiktok\.com\/video\//,
	USERNAME: /^@[\w.-]+$/i,
} as const;

/**
 * API Response Messages
 */
export const API_RESPONSES = {
	SUCCESS: 'success',
	ERROR: 'error',
} as const;

/**
 * Default Headers
 */
export const DEFAULT_HEADERS = {
	'Content-Type': 'application/json',
} as const;
