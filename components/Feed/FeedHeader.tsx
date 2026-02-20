/**
 * Feed Header Component
 * Section header with title and count
 */

'use client';

import React from 'react';
import { FeedHeaderProps } from '@/types/components';

export const FeedHeader: React.FC<FeedHeaderProps> = ({ title, videoCount }) => {
	if (!title) return null;

	return (
		<div className="flex items-center justify-between mb-6">
			<h2 className="text-2xl font-bold">
				{title}
				<span className="ml-2 text-sm font-normal text-gray-400">({videoCount} videos)</span>
			</h2>
		</div>
	);
};
