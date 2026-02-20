/**
 * TikTok API Service
 * Handles all TikTok-related API calls
 */

import { TikTokVideo, TikTokApiResponse, TikTokVideosData, isVideoPost, isVideosData } from '@/types';
import { apiClient, ApiError } from '../api/client';
import { API_ENDPOINTS, API_PARAMS, API_ERRORS, VALIDATION_PATTERNS } from '@/constants/api';

/**
 * Search result type
 */
export interface TikTokSearchResult {
	videos: TikTokVideo[];
	title: string;
}

/**
 * TikTok Service Class
 */
export class TikTokService {
	/**
	 * Get user videos by username
	 */
	async getUserVideos(username: string): Promise<TikTokSearchResult> {
		// Validate username format
		if (!VALIDATION_PATTERNS.USERNAME.test(username)) {
			throw new ApiError(API_ERRORS.INVALID_USERNAME);
		}

		try {
			const response = await apiClient.request<TikTokApiResponse>({
				method: 'GET',
				url: API_ENDPOINTS.USER_POSTS,
				params: {
					unique_id: username,
					count: API_PARAMS.COUNT,
				},
			});

			if (response.data.msg === 'success') {
				const data = response.data.data;

				// Check if it's a videos array response
				if (isVideosData(data)) {
					const videoArray = data.videos
						.filter(isVideoPost)
						.map(this.transformVideoData);

					if (videoArray.length === 0) {
						throw new ApiError(API_ERRORS.NO_VIDEOS_FOUND);
					}

					return {
						videos: videoArray,
						title: 'User Videos',
					};
				}
			}

			throw new ApiError(API_ERRORS.INVALID_URL);
		} catch (error) {
			if (error instanceof ApiError) {
				throw error;
			}
			throw new ApiError(API_ERRORS.NETWORK_ERROR);
		}
	}

	/**
	 * Get video by URL
	 */
	async getVideoByUrl(url: string): Promise<TikTokSearchResult> {
		// Validate URL format
		if (!VALIDATION_PATTERNS.TIKTOK_URL.test(url)) {
			throw new ApiError(API_ERRORS.INVALID_URL);
		}

		try {
			const response = await apiClient.request<TikTokApiResponse>({
				method: 'GET',
				url: API_ENDPOINTS.VIDEO_BY_URL,
				params: {
					url: url,
					hd: API_PARAMS.HD,
					count: API_PARAMS.COUNT,
				},
			});

			if (response.data.msg === 'success') {
				const data = response.data.data;

				// Check if it's a single video (not videos array)
				if (!isVideosData(data)) {
					const video = this.transformVideoData(data);

					if (!isVideoPost(video)) {
						throw new ApiError(API_ERRORS.NO_VIDEOS_FOUND);
					}

					return {
						videos: [video],
						title: 'Video',
					};
				}
			}

			throw new ApiError(API_ERRORS.INVALID_URL);
		} catch (error) {
			if (error instanceof ApiError) {
				throw error;
			}
			throw new ApiError(API_ERRORS.NETWORK_ERROR);
		}
	}

	/**
	 * Search videos by username or URL
	 * Auto-detects the type of query
	 */
	async searchVideos(query: string): Promise<TikTokSearchResult> {
		const trimmedQuery = query.trim();

		if (!trimmedQuery) {
			throw new ApiError(API_ERRORS.EMPTY_SEARCH);
		}

		// Check if it's a TikTok video URL
		if (VALIDATION_PATTERNS.TIKTOK_URL.test(trimmedQuery)) {
			return this.getVideoByUrl(trimmedQuery);
		}

		// Check if it's a username
		if (VALIDATION_PATTERNS.USERNAME.test(trimmedQuery)) {
			return this.getUserVideos(trimmedQuery);
		}

		// If it doesn't have @, try adding it
		if (!trimmedQuery.includes('@') && !trimmedQuery.includes('tiktok.com')) {
			throw new ApiError(API_ERRORS.INVALID_USERNAME);
		}

		// Last resort - try as username
		return this.getUserVideos(trimmedQuery);
	}

	/**
	 * Transform video data to match frontend expectations
	 * @private
	 */
	private transformVideoData(video: TikTokVideo): TikTokVideo {
		return {
			...video,
			author: video.author
				? {
						...video.author,
						id: typeof video.author.id === 'string' ? Number(video.author.id) : video.author.id,
					}
				: undefined,
			stats: video.stats || {
				play_count: 0,
				digg_count: 0,
				comment_count: 0,
				share_count: 0,
			},
		};
	}
}

/**
 * Export singleton instance
 */
export const tiktokService = new TikTokService();
