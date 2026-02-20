/**
 * Component Prop Types
 */

import { TikTokVideo } from './tiktok';
import { Dispatch, SetStateAction } from 'react';

/**
 * Video Component Props
 */
export interface VideoCardProps {
	videoData: TikTokVideo;
}

/**
 * Search Bar Props
 */
export interface SearchBarProps {
	value: string;
	onChange: (value: string) => void;
	onSearch: () => void;
	onClear: () => void;
	isLoading: boolean;
	error: string | null;
	placeholder?: string;
	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	inputRef?: React.RefObject<HTMLInputElement>;
}

/**
 * Compact Search Bar Props (for when hasSearched is true)
 */
export interface CompactSearchBarProps extends SearchBarProps {
	onClear: () => void;
}

/**
 * Example Chips Props
 */
export interface ExampleChipsProps {
	examples: string[];
	onExampleClick: (username: string) => void;
}

/**
 * Preview Card Props
 */
export interface PreviewCardProps {
	authorUsername?: string;
	authorAvatar?: string;
	authorNickname?: string;
	stats?: {
		likes: string;
		comments: string;
	};
}

/**
 * Feed Props
 */
export interface FeedProps {
	videos: TikTokVideo[] | null;
	title: string | null;
	isLoading: boolean;
	currentPage: number;
	perPage: number;
	onPaginate: (page: number) => void;
}

/**
 * Feed Grid Props
 */
export interface FeedGridProps {
	videos: TikTokVideo[];
	currentPage: number;
}

/**
 * Feed Header Props
 */
export interface FeedHeaderProps {
	title: string | null;
	videoCount: number;
}

/**
 * Pagination Props
 */
export interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

/**
 * Error Message Props
 */
export interface ErrorMessageProps {
	message: string;
	onDismiss?: () => void;
	variant?: 'inline' | 'banner';
}

/**
 * Morphing Blobs Props
 */
export interface MorphingBlobsProps {
	className?: string;
}
