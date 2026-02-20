/**
 * Video Actions Component
 * Download and copy buttons
 */

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineDownload, AiFillCheckCircle } from 'react-icons/ai';
import { FiCopy } from 'react-icons/fi';
import { useClipboardWithTooltip } from '@/hooks';

interface VideoActionsProps {
	videoUrl: string;
	onDownload?: () => void;
}

export const VideoActions: React.FC<VideoActionsProps> = ({ videoUrl, onDownload }) => {
	const [downloaded, setDownloaded] = useState(false);
	const { copied, copy, showTooltip } = useClipboardWithTooltip();

	const handleDownload = () => {
		setDownloaded(true);
		onDownload?.();
	};

	return (
		<div className="flex gap-2">
			{/* Download Button */}
			<motion.a
				href={videoUrl}
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
				onClick={handleDownload}
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
				onClick={() => copy(videoUrl)}
				className={`relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all border ${
					copied
						? 'bg-emerald-600/20 border-emerald-500 text-emerald-400'
						: 'bg-dark-800 border-dark-700 text-gray-400 hover:border-orange-500/50 hover:text-white'
				}`}
			>
				{copied ? <AiFillCheckCircle className="w-4 h-4" /> : <FiCopy className="w-4 h-4" />}
				<span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>

				{/* Tooltip */}
				<AnimatePresence>
					{showTooltip && (
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
	);
};
