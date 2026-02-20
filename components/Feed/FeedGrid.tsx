/**
 * Feed Grid Component
 * Video grid with animations
 */

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TikTokVideo } from '@/types';
import { VideoCard } from '@/components/Video';
import { FeedGridProps } from '@/types/components';

export const FeedGrid: React.FC<FeedGridProps> = ({ videos, currentPage }) => {
	return (
		<motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			<AnimatePresence mode="popLayout">
				{videos.map((item, i) => (
					<motion.div
						key={`${item.video_id || i}-${currentPage}`}
						layout
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{
							duration: 0.3,
							delay: i * 0.05,
						}}
					>
						<VideoCard videoData={item} />
					</motion.div>
				))}
			</AnimatePresence>
		</motion.div>
	);
};
