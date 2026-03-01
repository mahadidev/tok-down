import { z } from 'zod';

/**
 * TikTok URL Validation
 * Supports all TikTok video URL formats
 */
const tiktokUrlSchema = z
	.string()
	.min(1, 'URL is required')
	.refine(
		(url) => {
			const patterns = [
				/tiktok\.com\/video\//,
				/vm\.tiktok\.com/,
				/vt\.tiktok\.com/,
				/m\.tiktok\.com\/v\//,
				/tiktok\.com\/t\//,
			];
			return patterns.some((pattern) => pattern.test(url));
		},
		{ message: 'Invalid TikTok URL format' }
	);

/**
 * TikTok Username Validation
 * Must start with @ and contain valid username characters
 */
const tiktokUsernameSchema = z
	.string()
	.min(1, 'Username is required')
	.regex(/^@[\w.-]+$/i, 'Username must start with @ and contain only letters, numbers, dots, hyphens, and underscores');

/**
 * Search Request Schema
 */
export const searchRequestSchema = z.object({
	username: tiktokUsernameSchema.optional(),
	url: tiktokUrlSchema.optional(),
});

export type SearchRequest = z.infer<typeof searchRequestSchema>;

/**
 * Blog Post Validation Schemas
 */
export const blogPostSchema = z.object({
	id: z.number().optional(),
	title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
	slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
	excerpt: z.string().max(500, 'Excerpt must be less than 500 characters').optional(),
	content: z.string().min(1, 'Content is required'),
	cover_image: z.string().url('Invalid cover image URL').optional(),
	author_id: z.string().uuid().optional(),
	category_id: z.number().optional(),
	published: z.boolean().default(false),
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;

/**
 * Category Validation Schema
 */
export const categorySchema = z.object({
	id: z.number().optional(),
	name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
	slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
	description: z.string().max(500, 'Description must be less than 500 characters').optional(),
});

export type CategoryInput = z.infer<typeof categorySchema>;

/**
 * Tag Validation Schema
 */
export const tagSchema = z.object({
	id: z.number().optional(),
	name: z.string().min(1, 'Name is required').max(50, 'Name must be less than 50 characters'),
	slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
});

export type TagInput = z.infer<typeof tagSchema>;

/**
 * Admin Authentication Schema
 */
export const adminLoginSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;

/**
 * Analytics Event Schema
 */
export const analyticsEventSchema = z.object({
	event_type: z.enum(['page_view', 'search', 'download', 'error']),
	page_path: z.string().optional(),
	search_term: z.string().optional(),
	search_type: z.enum(['username', 'url']).optional(),
	result_count: z.number().int().min(0).optional(),
	status: z.enum(['success', 'error']).optional(),
	error_message: z.string().optional(),
});

export type AnalyticsEventInput = z.infer<typeof analyticsEventSchema>;

/**
 * Validation Helper Function
 * Validates data against a schema and returns formatted errors
 */
export function validateRequest<T>(schema: z.ZodSchema<T>, data: unknown): {
	success: boolean;
	data?: T;
	errors?: Record<string, string>;
} {
	try {
		const validatedData = schema.parse(data);
		return {
			success: true,
			data: validatedData,
		};
	} catch (error) {
		if (error instanceof z.ZodError) {
			const errors: Record<string, string> = {};
			error.issues.forEach((issue) => {
				const path = issue.path.join('.');
				errors[path] = issue.message;
			});
			return {
				success: false,
				errors,
			};
		}
		return {
			success: false,
			errors: { _form: 'Validation failed' },
		};
	}
}

/**
 * API Error Response Helper
 */
export function validationErrorResponse(errors: Record<string, string>) {
	return {
		error: 'Validation failed',
		details: errors,
	};
}
