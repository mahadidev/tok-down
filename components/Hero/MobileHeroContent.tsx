/**
 * Mobile Hero Content Component
 * Mobile headline for the Hero section
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const MobileHeroContent = () => {
	return (
		<motion.h1
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, delay: 0.2 }}
			className="lg:hidden text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8"
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
	);
};
