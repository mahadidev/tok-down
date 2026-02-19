// Blog Post Types
export interface BlogPost {
	id: string;
	slug: string;
	title: string;
	excerpt: string | null;
	content: string;
	cover_image_url: string | null;
	status: 'draft' | 'published';
	created_at: string;
	updated_at: string;
	published_at: string | null;
	author_id: string;
	categories?: Category[];
	tags?: Tag[];
}

export interface CreateBlogPostInput {
	slug: string;
	title: string;
	excerpt?: string;
	content: string;
	cover_image_url?: string;
	status: 'draft' | 'published';
	published_at?: string;
	category_ids?: string[];
	tag_ids?: string[];
}

export interface UpdateBlogPostInput {
	title?: string;
	excerpt?: string;
	content?: string;
	cover_image_url?: string;
	status?: 'draft' | 'published';
	published_at?: string;
	category_ids?: string[];
	tag_ids?: string[];
}

// Category Types
export interface Category {
	id: string;
	name: string;
	slug: string;
	created_at: string;
}

export interface CreateCategoryInput {
	name: string;
	slug: string;
}

// Tag Types
export interface Tag {
	id: string;
	name: string;
	slug: string;
	created_at: string;
}

export interface CreateTagInput {
	name: string;
	slug: string;
}

// Analytics Types
export interface PageView {
	id: string;
	session_id: string;
	page_path: string;
	referrer: string | null;
	user_agent: string | null;
	viewed_at: string;
}

export interface AnalyticsStats {
	totalViews: number;
	uniqueVisitors: number;
	viewsToday: number;
	viewsThisWeek: number;
	viewsThisMonth: number;
	totalPosts: number;
	topPages: Array<{
		page_path: string;
		views: number;
	}>;
	dailyViews: Array<{
		date: string;
		views: number;
	}>;
	referrers: Array<{
		referrer: string;
		views: number;
	}>;
}

// Admin Types
export interface AdminUser {
	id: string;
	email: string;
	role: 'admin' | 'editor';
	created_at: string;
}

// API Response Types
export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	error?: string;
	message?: string;
}

export interface PaginatedResponse<T> {
	success: boolean;
	data?: T[];
	pagination?: {
		total: number;
		page: number;
		perPage: number;
		totalPages: number;
	};
	error?: string;
}
