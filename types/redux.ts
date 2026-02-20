/**
 * Redux State and Action Types
 */

import { TikTokVideo } from './tiktok';

/**
 * Site State Interface
 */
export interface SiteState {
	// Layout measurements
	navHeight?: number;
	footerHeight?: number;

	// Video data
	feedTitle: string | null;
	videos: TikTokVideo[] | null;
	videoLoading: boolean;

	// Search state
	hasSearched: boolean;
	searchTerm: string | null;

	// Pagination
	currentPage: number;
	perPage: number;
}

/**
 * Blog State Interface (if used)
 */
export interface BlogState {
	// Add blog-related state if needed
	[key: string]: unknown;
}

/**
 * Analytics State Interface (if used)
 */
export interface AnalyticsState {
	// Add analytics-related state if needed
	[key: string]: unknown;
}

/**
 * Redux Root State
 */
export interface RootState {
	site: SiteState;
	blog: BlogState;
	analytics: AnalyticsState;
}

/**
 * Action Payload Types
 */
export interface SetVideosPayload {
	title: string | null;
	videos: TikTokVideo[] | null;
}

export interface SetPaginationPayload {
	currentPage?: number;
	perPage?: number;
}

/**
 * Store Type Exports
 */
export type AppDispatch = typeof import('../redux/store').store.dispatch;
