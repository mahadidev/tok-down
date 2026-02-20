/**
 * Preview Card Component
 * Floating video preview card for the Hero section
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiHeart, FiMessageCircle, FiShare2 } from 'react-icons/fi';
import Image from 'next/image';
import { PreviewCardProps } from '@/types/components';
import { PLACEHOLDERS } from '@/constants';

export const PreviewCard: React.FC<PreviewCardProps> = ({
	authorUsername = '@mahadidev',
	authorAvatar,
	authorNickname,
	stats = { likes: '842K', comments: '12.4K' },
}) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 30, x: 0 }}
			animate={{ opacity: 1, y: 0, x: 0 }}
			transition={{ duration: 0.8, delay: 0.6 }}
			className="float"
		>
			{/* Mock Video Card */}
			<div className="relative aspect-[16/9] lg:aspect-[9/14] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
				{/* Background Image - Covers entire card */}
				<div className="absolute inset-0">
					<Image
						src={authorAvatar || PLACEHOLDERS.PREVIEW_IMAGE}
						alt={authorUsername}
						fill
						className="object-cover"
						sizes="(max-width: 1023px) 100vw, 400px"
					/>
					{/* Gradient overlay - stronger at bottom for text readability */}
					<div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />
				</div>

				{/* All content overlayed on the image */}
				<div className="relative h-full flex flex-col">
					{/* Top section with play button and stats */}
					<div className="flex-1 flex items-center justify-center">
						{/* Mock Play Button */}
						<div className="relative z-10 w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
							<FiDownload className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
						</div>
						{/* TikTok-style UI overlay */}
						<div className="absolute right-3 lg:right-4 bottom-16 lg:bottom-20 flex flex-col gap-4 lg:gap-6 z-10">
							<div className="flex flex-col items-center gap-1">
								<div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
									<FiHeart className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
								</div>
								<span className="text-[10px] lg:text-xs text-white/80">{stats.likes}</span>
							</div>
							<div className="flex flex-col items-center gap-1">
								<div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
									<FiMessageCircle className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
								</div>
								<span className="text-[10px] lg:text-xs text-white/80">{stats.comments}</span>
							</div>
							<div className="flex flex-col items-center gap-1">
								<div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
									<FiShare2 className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
								</div>
								<span className="text-[10px] lg:text-xs text-white/80">Share</span>
							</div>
						</div>
					</div>

					{/* Video Info overlay at bottom */}
					<div className="p-3 lg:p-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2 lg:gap-3">
								<div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-orange-500 to-pink-500" />
								<div>
									<p className="text-xs lg:text-sm font-semibold text-white">{authorUsername}</p>
									<p className="text-[10px] lg:text-xs text-gray-300">{authorNickname || 'Original Sound'}</p>
								</div>
							</div>
							{/* Download Badge */}
							<div className="flex items-center gap-1.5 lg:gap-2 px-2 lg:px-3 py-1 lg:py-1.5 rounded-full bg-green-500/20 border border-green-500/30">
								<FiDownload className="w-3 h-3 lg:w-4 lg:h-4 text-green-400" />
								<span className="text-xs lg:text-sm font-medium text-green-400">Ready</span>
							</div>
						</div>
					</div>
				</div>

				{/* Glow effect */}
				<div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-purple-500/20 blur-2xl -z-10 rounded-3xl" />
			</div>
		</motion.div>
	);
};
