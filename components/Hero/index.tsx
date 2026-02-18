'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiDownload, FiShield, FiZap } from 'react-icons/fi';
import { setNavHeight, useDispatch } from '../../redux';
import { RootState, useSelector } from '../../redux';

const Hero = () => {
	const dispatch = useDispatch();
	const siteState = useSelector((state: RootState) => state.site);
	const heroRef = useRef<HTMLDivElement>(null);

	// Adjust main content height for dynamic hero
	React.useEffect(() => {
		if (heroRef.current && siteState.navHeight) {
			// Optional: Can adjust content based on hero height
		}
	}, [siteState.navHeight, dispatch]);

	const features = [
		{
			icon: <FiDownload className="w-5 h-5" />,
			title: 'No Watermark',
			description: 'Download videos without the TikTok watermark',
		},
		{
			icon: <FiShield className="w-5 h-5" />,
			title: 'HD Quality',
			description: 'Get videos in the highest quality available',
		},
		{
			icon: <FiZap className="w-5 h-5" />,
			title: 'Fast & Free',
			description: 'Download videos quickly at no cost',
		},
	];

	return (
		<section
			ref={heroRef}
			className="relative overflow-hidden py-24 md:py-32"
		>
			{/* Gradient Background */}
			<div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-transparent" />
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-violet-500/20 rounded-full blur-3xl -translate-y-1/2" />

			<div className="container relative">
				<div className="max-w-4xl mx-auto text-center">
					{/* Badge */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-8"
					>
						<span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
						<span className="text-sm font-medium text-violet-400">
							100% Free TikTok Video Downloader
						</span>
					</motion.div>

					{/* Headline */}
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
					>
						Download TikTok Videos{' '}
						<span className="bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
							Without Watermark
						</span>
					</motion.h1>

					{/* Subheadline */}
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
					>
						Save your favorite TikTok videos in HD quality. Simply paste a
						username or video URL and download instantly.
					</motion.p>

					{/* Feature Cards */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
					>
						{features.map((feature, index) => (
							<div
								key={index}
								className="flex items-center gap-3 p-4 rounded-xl bg-dark-800/50 border border-dark-700 hover:border-violet-500/50 transition-all"
							>
								<div className="flex-shrink-0 w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400">
									{feature.icon}
								</div>
								<div className="text-left">
									<h3 className="font-semibold text-sm">
										{feature.title}
									</h3>
									<p className="text-xs text-gray-400">
										{feature.description}
									</p>
								</div>
							</div>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
