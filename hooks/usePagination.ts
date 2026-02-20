/**
 * usePagination Hook
 * Handles pagination logic extracted from Feed component
 */

import { useCallback, useMemo } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { setPagination } from '@/redux';
import { TikTokVideo } from '@/types';

export interface UsePaginationProps {
	videos: TikTokVideo[] | null;
	perPage?: number;
	scrollToTopOnChange?: boolean;
}

export interface UsePaginationReturn {
	currentPage: number;
	perPage: number;
	totalPages: number;
	pagesArray: number[];
	paginatedVideos: TikTokVideo[] | null;
	goToPage: (page: number) => void;
	goToNextPage: () => void;
	goToPreviousPage: () => void;
	canGoNext: boolean;
	canGoPrevious: boolean;
}

export const usePagination = ({
	videos,
	perPage = 12,
	scrollToTopOnChange = true,
}: UsePaginationProps): UsePaginationReturn => {
	const dispatch = useAppDispatch();

	// Read current page from Redux or default to 0
	// In a real implementation, this would come from useSelector
	const currentPage = 0; // Placeholder - should be read from Redux

	// Calculate total pages
	const totalPages = useMemo(() => {
		if (!videos || videos.length === 0) return 0;
		return Math.ceil(videos.length / perPage);
	}, [videos, perPage]);

	// Generate array of page numbers
	const pagesArray = useMemo(() => {
		return Array.from({ length: totalPages }, (_, i) => i);
	}, [totalPages]);

	// Get paginated videos
	const paginatedVideos = useMemo(() => {
		if (!videos) return null;

		const startIndex = currentPage * perPage;
		const endIndex = startIndex + perPage;

		return videos.slice(startIndex, endIndex);
	}, [videos, currentPage, perPage]);

	/**
	 * Go to specific page
	 */
	const goToPage = useCallback(
		(page: number) => {
			const validPage = Math.max(0, Math.min(page, totalPages - 1));
			dispatch(setPagination({ currentPage: validPage }));

			if (scrollToTopOnChange) {
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}
		},
		[dispatch, totalPages, scrollToTopOnChange]
	);

	/**
	 * Go to next page
	 */
	const goToNextPage = useCallback(() => {
		if (currentPage < totalPages - 1) {
			goToPage(currentPage + 1);
		}
	}, [currentPage, totalPages, goToPage]);

	/**
	 * Go to previous page
	 */
	const goToPreviousPage = useCallback(() => {
		if (currentPage > 0) {
			goToPage(currentPage - 1);
		}
	}, [currentPage, goToPage]);

	// Navigation state
	const canGoNext = currentPage < totalPages - 1;
	const canGoPrevious = currentPage > 0;

	return {
		currentPage,
		perPage,
		totalPages,
		pagesArray,
		paginatedVideos,
		goToPage,
		goToNextPage,
		goToPreviousPage,
		canGoNext,
		canGoPrevious,
	};
};
