/**
 * Morphing Blobs Component
 * Animated gradient background blobs for the Hero section
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MorphingBlobsProps } from '@/types/components';

export const MorphingBlobs: React.FC<MorphingBlobsProps> = ({ className = '' }) => {
	return (
		<>
			{/* Pink morphing blob - top left */}
			<motion.div
				className={`absolute top-20 left-10 w-96 h-96 bg-pink-500/40 rounded-full blur-3xl -z-10 ${className}`}
				animate={{
					scale: [1, 1.2, 1],
					x: [0, 50, 0],
					y: [0, -30, 0],
					borderRadius: ['42% 58% 70% 30%', '60% 40% 30% 70%', '42% 58% 70% 30%'],
				}}
				transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
			/>

			{/* Cyan morphing blob - bottom right */}
			<motion.div
				className={`absolute bottom-20 right-10 w-80 h-80 bg-cyan-500/30 rounded-full blur-3xl -z-10 ${className}`}
				animate={{
					scale: [1.2, 1, 1.2],
					x: [0, -40, 0],
					y: [0, 40, 0],
					borderRadius: ['30% 70% 70% 30%', '50% 50% 30% 70%', '30% 70% 70% 30%'],
				}}
				transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
			/>

			{/* Purple morphing blob - center */}
			<motion.div
				className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/25 rounded-full blur-3xl -z-10 ${className}`}
				animate={{
					scale: [1, 1.3, 1],
					rotate: [0, 90, 0],
					borderRadius: ['50% 50% 50% 50%', '40% 60% 50% 50%', '50% 50% 50% 50%'],
				}}
				transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
			/>

			{/* Orange accent blob - top right */}
			<motion.div
				className={`absolute top-40 right-20 w-64 h-64 bg-orange-500/25 rounded-full blur-3xl -z-10 ${className}`}
				animate={{
					scale: [1, 1.4, 1],
					x: [0, -20, 0],
					y: [0, -40, 0],
				}}
				transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
			/>

			{/* Grid pattern overlay */}
			<div className="absolute inset-0 grid-pattern opacity-50 -z-10" />
		</>
	);
};
