/**
 * Hero Content Component
 * Main text content for the Hero section
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const HeroContent = () => {
	return (
		<div className="lg:col-span-2 text-center lg:text-left order-2 lg:order-1">
			{/* Headline - Fade in */}
			<motion.h1
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}
				className="hidden lg:block text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
			>
				Download TikTok Videos{' '}
				<motion.span
					className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent"
					animate={{
						backgroundPosition: ['0%', '100%', '0%'],
					}}
					transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
				>
					Without Watermark
				</motion.span>
			</motion.h1>

			{/* Subheadline */}
			<motion.p
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8, delay: 0.4 }}
				className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto lg:mx-0"
			>
				Save your favorite TikTok videos in HD quality. Simply paste a username or video URL
				below.
			</motion.p>
		</div>
	);
};
