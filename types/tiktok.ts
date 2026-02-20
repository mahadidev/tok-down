/**
 * TikTok API Response Types
 */

export interface TikTokAuthor {
	id: string | number;
	unique_id: string;
	avatar: string;
	nickname: string;
}

export interface TikTokStats {
	play_count: number;
	digg_count: number;
	comment_count: number;
	share_count: number;
}

export interface TikTokVideo {
	video_id: string | number;
	title: string;
	play: string;
	wmplay?: string;
	cover: string;
	origin_cover: string;
	duration?: number;
	images?: string[];
	author?: TikTokAuthor;
	stats?: TikTokStats;
}

export interface TikTokApiResponse {
	msg: 'success' | 'error';
	data: TikTokVideoData;
}

export type TikTokVideoData = TikTokVideo | TikTokVideosData;

export interface TikTokVideosData {
	videos: TikTokVideo[];
}

export interface TikTokApiError {
	msg: string;
	code?: number;
}

/**
 * Type guards
 */
export function isVideoPost(video: TikTokVideo): boolean {
	return !video.images && (video.duration ?? 0) > 0;
}

export function isVideosData(
	data: TikTokVideoData
): data is TikTokVideosData {
	return 'videos' in data;
}
