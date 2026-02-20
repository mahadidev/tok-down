/**
 * TikTok API - RTK Query
 * Optional: RTK Query-based API service
 *
 * This is an alternative to the services/tiktok/tiktok.service.ts
 * It can be used when migrating to RTK Query for data fetching
 */

import { createApi } from '@reduxjs/toolkit/query/react';

/**
 * TikTok API base query configuration
 */
export const tiktokBaseQueryConfig = {
	baseUrl: 'https://tiktok-video-no-watermark2.p.rapidapi.com',
	prepareHeaders: (headers: Headers) => {
		headers.set('X-RapidAPI-Key', process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '');
		headers.set('X-RapidAPI-Host', 'tiktok-video-no-watermark2.p.rapidapi.com');
		return headers;
	},
};

/**
 * TikTok API types
 */
export interface UserPostsQuery {
	unique_id: string;
	count?: number;
}

export interface VideoByUrlQuery {
	url: string;
	hd?: string;
	count?: number;
}

/**
 * TikTok API using RTK Query
 * Uncomment and use when ready to migrate from services layer
 */
/*
export const tiktokApi = createApi({
	reducerPath: 'tiktokApi',
	baseQuery: fetchBaseQuery(tiktokBaseQueryConfig),
	endpoints: (builder) => ({
		getUserPosts: builder.query<TikTokApiResponse, UserPostsQuery>({
			query: ({ unique_id, count = 1000 }) => ({
				url: '/user/posts',
				params: { unique_id, count },
			}),
		}),
		getVideoByUrl: builder.query<TikTokApiResponse, VideoByUrlQuery>({
			query: ({ url, hd = '0', count = 1000 }) => ({
				url: '/',
				params: { url, hd, count },
			}),
		}),
	}),
});

export const { useGetUserPostsQuery, useGetVideoByUrlQuery } = tiktokApi;
*/
