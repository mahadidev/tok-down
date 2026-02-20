/**
 * Video Player Component
 * Video player with stats overlay
 */

'use client';

import React from 'react';
import { TikTokVideo } from '@/types';
import { formatNumber } from '@/lib/utils';

interface VideoPlayerProps {
	video: TikTokVideo;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
	return (
		<div className="relative aspect-[9/16] bg-black">
			<video
				playsInline
				poster={video.origin_cover || video.cover}
				className="w-full h-full object-cover"
				controls
				preload="metadata"
			>
				<source src={video.play} type="video/mp4" />
			</video>

			{/* Stats Overlay (on hover) */}
			{video.stats && (
				<div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
					<div className="flex items-center gap-4 text-white text-xs">
						{video.stats.play_count && (
							<span className="flex items-center gap-1">
								<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
									<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
									<path
										fillRule="evenodd"
										d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
										clipRule="evenodd"
									/>
								</svg>
								{formatNumber(video.stats.play_count)}
							</span>
						)}
						{video.stats.digg_count && (
							<span className="flex items-center gap-1">
								<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
									<path
										fillRule="evenodd"
										d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
										clipRule="evenodd"
									/>
								</svg>
								{formatNumber(video.stats.digg_count)}
							</span>
						)}
					</div>
				</div>
			)}
		</div>
	);
};
