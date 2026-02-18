'use client';

import axios from 'axios';
import Image from 'next/image';
import 'node_modules/video-react/dist/video-react.css';
import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineDownload, AiOutlineLoading3Quarters, AiFillCheckCircle } from 'react-icons/ai';
import { MdOutlineContentCopy } from 'react-icons/md';
import { FiCopy } from 'react-icons/fi';
import { Player } from 'video-react';
import { formatNumber, truncateText } from '../../lib/utils';

const Video = ({
	videoData,
}: {
	videoData: {
		video_id: string | number;
		title: string;
		play: string;
		cover: string;
		wmplay: string;
		origin_cover: string;
		author?: { id: number; unique_id: string; avatar: string; nickname: string };
		stats?: { play_count?: number; digg_count?: number; comment_count?: number; share_count?: number };
	};
}) => {
	const [copied, setCopied] = useState<boolean>(false);
	const [downloaded, setDownloaded] = useState<boolean>(false);
	const [isLoading, setLoading] = useState<boolean>(false);
	const [showCopyTooltip, setShowCopyTooltip] = useState<boolean>(false);
	const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const author = videoData.author || {
		id: 0,
		unique_id: 'unknown',
		avatar: '/img/default-avatar.png',
		nickname: 'Unknown User'
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(videoData.play);
		setCopied(true);
		setShowCopyTooltip(true);

		// Clear existing timeout
		if (copyTimeoutRef.current) {
			clearTimeout(copyTimeoutRef.current);
		}

		// Reset after 2 seconds
		copyTimeoutRef.current = setTimeout(() => {
			setCopied(false);
			setShowCopyTooltip(false);
		}, 2000);
	};

	return (
		<motion.div
			className="group bg-dark-700 rounded-2xl border border-dark-600 overflow-hidden hover:border-orange-500/30 transition-all duration-300"
			whileHover={{ y: -4 }}
		>
			{/* Video Player */}
			<div className="relative aspect-[9/16] bg-black">
				<Player
					playsInline
					poster={videoData.origin_cover || videoData.cover}
					src={videoData.play}
				/>

				{/* Stats Overlay (on hover) */}
				{videoData.stats && (
					<div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
						<div className="flex items-center gap-4 text-white text-xs">
							{videoData.stats.play_count && (
								<span className="flex items-center gap-1">
									<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
										<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
										<path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
									</svg>
									{formatNumber(videoData.stats.play_count)}
								</span>
							)}
							{videoData.stats.digg_count && (
								<span className="flex items-center gap-1">
									<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
										<path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
									</svg>
									{formatNumber(videoData.stats.digg_count)}
								</span>
							)}
						</div>
					</div>
				)}
			</div>

			{/* Author Info */}
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
						<h3 className="font-semibold text-sm truncate">
							@{author.unique_id}
						</h3>
						{author.nickname && author.nickname !== author.unique_id && (
							<p className="text-xs text-gray-400 truncate">
								{author.nickname}
							</p>
						)}
					</div>
				</div>

				{/* Video Title */}
				{videoData.title && (
					<p className="text-sm text-gray-400 line-clamp-2 mb-4">
						{truncateText(videoData.title, 80)}
					</p>
				)}

				{/* Action Buttons */}
				<div className="flex gap-2">
					{/* Download Button */}
					<motion.a
						href={videoData.play}
						target="_blank"
						rel="noopener noreferrer"
						download
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
							downloaded
								? 'bg-emerald-600 text-white'
								: 'bg-gradient-to-r from-orange-500 to-amber-600 text-white hover:from-orange-600 hover:to-amber-700'
						} shadow-lg shadow-orange-500/20`}
						onClick={() => setDownloaded(true)}
					>
						{downloaded ? (
							<>
								<AiFillCheckCircle className="w-4 h-4" />
								<span>Downloaded</span>
							</>
						) : (
							<>
								<AiOutlineDownload className="w-4 h-4" />
								<span>Download</span>
							</>
						)}
					</motion.a>

					{/* Copy URL Button */}
					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						onClick={handleCopy}
						className={`relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all border ${
							copied
								? 'bg-emerald-600/20 border-emerald-500 text-emerald-400'
								: 'bg-dark-800 border-dark-700 text-gray-400 hover:border-orange-500/50 hover:text-white'
						}`}
					>
						{copied ? (
							<AiFillCheckCircle className="w-4 h-4" />
						) : (
							<FiCopy className="w-4 h-4" />
						)}
						<span className="hidden sm:inline">
							{copied ? 'Copied!' : 'Copy'}
						</span>

						{/* Tooltip */}
						<AnimatePresence>
							{showCopyTooltip && (
								<motion.span
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 10 }}
									className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-dark-900 text-xs rounded whitespace-nowrap"
								>
									Copied to clipboard!
								</motion.span>
							)}
						</AnimatePresence>
					</motion.button>
				</div>
			</div>
		</motion.div>
	);
};

export default Video;
