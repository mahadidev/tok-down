/**
 * Application Constants
 */

/**
 * Pagination Configuration
 */
export const PAGINATION = {
	DEFAULT_PER_PAGE: 12,
	MAX_PER_PAGE: 50,
	MIN_PER_PAGE: 6,
} as const;

/**
 * Animation Durations (in milliseconds)
 */
export const ANIMATION = {
	FAST: 150,
	NORMAL: 300,
	SLOW: 500,
	BLOB_MORPH: 8000, // 8 seconds for blob morphing
	BLOB_MORPH_VARIATION: 10000, // 10 seconds for variation
	BLOB_ROTATION: 12000, // 12 seconds for rotation
	STAGGER_DELAY: 50, // Delay between staggered animations
	FADE_IN_DELAY: 200, // Initial fade-in delay
	GRADIENT_DURATION: 5000, // Gradient animation duration
} as const;

/**
 * Text Constraints
 */
export const TEXT = {
	MAX_TITLE_LENGTH: 80,
	MAX_DESCRIPTION_LENGTH: 200,
	MAX_USERNAME_LENGTH: 30,
	TRUNCATED_SUFFIX: '...',
} as const;

/**
 * Copy/Clipboard
 */
export const CLIPBOARD = {
	COPY_FEEDBACK_DURATION: 2000, // 2 seconds
	TOOLTIP_DURATION: 2000,
} as const;

/**
 * Example Usernames
 */
export const EXAMPLE_USERNAMES = [
	'@mahadidev',
	'@akujiff',
	'@heycarryme',
] as const;

/**
 * Placeholder Images
 */
export const PLACEHOLDERS = {
	DEFAULT_AVATAR: '/img/default-avatar.png',
	PREVIEW_IMAGE: '/img/mahadi-hasan.jpg',
} as const;

/**
 * Breakpoints (tailwind equivalents)
 */
export const BREAKPOINTS = {
	SM: 640,
	MD: 768,
	LG: 1024,
	XL: 1280,
	'2XL': 1536,
} as const;

/**
 * Layout Constants
 */
export const LAYOUT = {
	MAX_CONTAINER_WIDTH: 440, // pixels
	HERO_MIN_HEIGHT: '70vh',
	DEFAULT_ASPECT_RATIO: '9/16',
	PREVIEW_ASPECT_RATIO_DESKTOP: '9/14',
	PREVIEW_ASPECT_RATIO_MOBILE: '16/9',
} as const;

/**
 * Stats Display Format
 */
export const STATS_FORMAT = {
	THRESHOLDS: [1000000, 1000, 0] as const,
	SUFFIXES: ['M', 'K', ''] as const,
} as const;

/**
 * Color Gradients
 */
export const GRADIENTS = {
	PRIMARY: 'from-orange-500 to-amber-600',
	PRIMARY_HOVER: 'from-orange-600 to-amber-700',
	PINK: 'from-pink-500 to-pink-600',
	CYAN: 'from-cyan-500 to-cyan-600',
	PURPLE: 'from-purple-500 to-purple-600',
} as const;
