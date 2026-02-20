/**
 * Video Card Component
 * Main video card component that composes all video sub-components
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TikTokVideo } from '@/types';
import { VideoPlayer } from './VideoPlayer';
import { AuthorInfo } from './AuthorInfo';
import { VideoActions } from './VideoActions';

interface VideoCardProps {
	videoData: TikTokVideo;
}

export const VideoCard: React.FC<VideoCardProps> = ({ videoData }) => {
	return (
		<motion.div
			className="group bg-dark-700 rounded-2xl border border-dark-600 overflow-hidden hover:border-orange-500/30 transition-all duration-300"
			whileHover={{ y: -4 }}
		>
			<VideoPlayer video={videoData} />

			<AuthorInfo
				author={videoData.author}
				title={videoData.title}
			/>

			<div className="px-4 pb-4">
				<VideoActions videoUrl={videoData.play} />
			</div>
		</motion.div>
	);
};
