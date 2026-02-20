/**
 * Feed Content Component
 * Main feed component that composes all feed sub-components
 */

'use client';

import React from 'react';
import { FeedProps } from '@/types/components';
import { FeedHeader } from './FeedHeader';
import { FeedGrid } from './FeedGrid';
import { Pagination } from './Pagination';

export const FeedContent: React.FC<FeedProps> = ({
	videos,
	title,
	isLoading,
	currentPage,
	perPage,
	onPaginate,
}) => {
	// Calculate paginated videos
	const paginatedVideos = videos
		? videos.slice(currentPage * perPage, currentPage * perPage + perPage)
		: null;

	// Calculate total pages
	const totalPages = videos ? Math.ceil(videos.length / perPage) : 0;

	// Show empty state when no videos
	if (!paginatedVideos || paginatedVideos.length === 0) {
		return null;
	}

	return (
		<div className="py-8 md:py-12">
			<div className="container">
				<FeedHeader title={title} videoCount={videos?.length || 0} />
				<FeedGrid videos={paginatedVideos} currentPage={currentPage} />
				<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPaginate} />
			</div>
		</div>
	);
};
