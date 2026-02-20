/**
 * Author Info Component
 * Author avatar and information display
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { TikTokAuthor } from '@/types';
import { truncateText } from '@/lib/utils';
import { PLACEHOLDERS } from '@/constants';

interface AuthorInfoProps {
	author?: TikTokAuthor;
	title?: string;
}

const DEFAULT_AUTHOR: TikTokAuthor = {
	id: 0,
	unique_id: 'unknown',
	avatar: PLACEHOLDERS.DEFAULT_AVATAR,
	nickname: 'Unknown User',
};

export const AuthorInfo: React.FC<AuthorInfoProps> = ({
	author: authorProp,
	title,
}) => {
	const author = authorProp || DEFAULT_AUTHOR;

	return (
		<div className="p-4 border-t border-dark-600">
			<div className="flex items-center gap-3 mb-3">
				<div className="relative">
					<Image
						width={40}
						height={40}
						src={author.avatar}
						alt={author.unique_id}
						className="rounded-full object-cover"
					/>
				</div>
				<div className="flex-1 min-w-0">
					<h3 className="font-semibold text-sm truncate">@{author.unique_id}</h3>
					{author.nickname && author.nickname !== author.unique_id && (
						<p className="text-xs text-gray-400 truncate">{author.nickname}</p>
					)}
				</div>
			</div>

			{/* Video Title */}
			{title && (
				<p className="text-sm text-gray-400 line-clamp-2 mb-4">{truncateText(title, 80)}</p>
			)}
		</div>
	);
};
