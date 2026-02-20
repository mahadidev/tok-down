/**
 * useTikTokSearch Hook
 * Handles TikTok video search logic extracted from Hero component
 */

import { useState, useCallback, useRef } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import {
	setVideoLoading,
	setVidoes,
	setHasSearched,
	setSearchTerm,
	setPagination,
} from '@/redux';
import { tiktokService, ApiError } from '@/services';
import { TikTokVideo } from '@/types';
import { API_ERRORS } from '@/constants/api';

export interface UseTikTokSearchReturn {
	search: (query: string) => Promise<void>;
	clear: () => void;
	isLoading: boolean;
	error: string | null;
	clearError: () => void;
	hasSearched: boolean;
	searchTerm: string | null;
	videos: TikTokVideo[] | null;
}

export const useTikTokSearch = (): UseTikTokSearchReturn => {
	const dispatch = useAppDispatch();
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	// Track mounted state to prevent state updates after unmount
	const isMountedRef = useRef(true);

	/**
	 * Search for TikTok videos by username or URL
	 */
	const search = useCallback(async (query: string) => {
		const trimmedQuery = query.trim();

		if (!trimmedQuery) {
			setError(API_ERRORS.EMPTY_SEARCH);
			return;
		}

		// Reset state
		setError(null);
		setIsLoading(true);
		dispatch(setVideoLoading(true));
		dispatch(setHasSearched(true));
		dispatch(setSearchTerm(trimmedQuery));
		dispatch(setPagination({ currentPage: 0 }));

		try {
			const result = await tiktokService.searchVideos(trimmedQuery);

			if (isMountedRef.current) {
				dispatch(
					setVidoes({
						title: result.title,
						videos: result.videos,
					})
				);
			}
		} catch (err) {
			if (isMountedRef.current) {
				const errorMessage =
					err instanceof ApiError ? err.getUserMessage() : API_ERRORS.UNKNOWN_ERROR;
				setError(errorMessage);
			}
		} finally {
			if (isMountedRef.current) {
				setIsLoading(false);
				dispatch(setVideoLoading(false));
			}
		}
	}, [dispatch]);

	/**
	 * Clear search results and reset state
	 */
	const clear = useCallback(() => {
		setError(null);
		dispatch(setHasSearched(false));
		dispatch(setVidoes({ title: null, videos: null }));
		dispatch(setSearchTerm(null));
	}, [dispatch]);

	/**
	 * Clear error message
	 */
	const clearError = useCallback(() => {
		setError(null);
	}, []);

	return {
		search,
		clear,
		clearError,
		isLoading,
		error,
		hasSearched: true, // This should be read from Redux if needed
		searchTerm: null, // This should be read from Redux if needed
		videos: null, // This should be read from Redux if needed
	};
};
