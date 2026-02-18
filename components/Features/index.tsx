'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
	FiDownload,
	FiShield,
	FiZap,
	FiHardDrive,
	FiRepeat,
	FiLock,
} from 'react-icons/fi';
import StaggerChildren from '../animations/StaggerChildren';

const Features = () => {
	const features = [
		{
			icon: <FiDownload className="w-6 h-6" />,
			title: 'No Watermark',
			description:
				'Download TikTok videos without the annoying watermark overlay',
		 gradient: 'from-orange-500 to-amber-600',
		},
		{
			icon: <FiHardDrive className="w-6 h-6" />,
			title: 'HD Quality',
			description:
				'Get videos in the highest available quality up to 1080p',
			gradient: 'from-blue-500 to-cyan-500',
		},
		{
			icon: <FiZap className="w-6 h-6" />,
			title: 'Lightning Fast',
			description: 'Download videos in seconds with our optimized servers',
			gradient: 'from-amber-500 to-orange-500',
		},
		{
			icon: <FiRepeat className="w-6 h-6" />,
			title: 'Unlimited Downloads',
			description: 'No limits on the number of videos you can download',
			gradient: 'from-emerald-500 to-teal-500',
		},
		{
			icon: <FiLock className="w-6 h-6" />,
			title: 'Secure & Private',
			description:
				'Your data is safe with us. We don\'t store any personal information',
			gradient: 'from-rose-500 to-pink-500',
		},
		{
			icon: <FiShield className="w-6 h-6" />,
			title: 'Virus Free',
			description:
				'All downloads are scanned and verified to be safe',
			gradient: 'from-yellow-500 to-orange-500',
		},
	];

	return (
		<section id="features" className="py-24 relative">
			<div className="container">
				{/* Section Header */}
				<div className="text-center max-w-2xl mx-auto mb-16">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
					>
						<span className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-sm font-medium mb-4">
							Features
						</span>
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
							Why Choose Tok Down?
						</h2>
						<p className="text-gray-400 text-lg">
							The most reliable TikTok video downloader with
							powerful features
						</p>
					</motion.div>
				</div>

				{/* Features Grid */}
				<StaggerChildren
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
					staggerDelay={0.1}
					childDelay={0.2}
				>
					{features.map((feature, index) => (
						<motion.div
							key={index}
							className="group relative p-6 rounded-2xl bg-dark-800 border border-dark-700 hover:border-orange-500/30 transition-all duration-300"
							whileHover={{ y: -4 }}
						>
							{/* Icon */}
							<div
								className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
							>
								{feature.icon}
							</div>

							{/* Content */}
							<h3 className="text-xl font-semibold mb-2 group-hover:text-orange-400 transition-colors">
								{feature.title}
							</h3>
							<p className="text-gray-400 text-sm leading-relaxed">
								{feature.description}
							</p>

							{/* Glow Effect */}
							<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 group-hover:to-orange-500/0 transition-all duration-300 -z-10" />
						</motion.div>
					))}
				</StaggerChildren>
			</div>
		</section>
	);
};

export default Features;
