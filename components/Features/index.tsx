'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiVideo, FiMonitor, FiZap, FiRefreshCw, FiShield, FiCheckCircle } from 'react-icons/fi';

const Features = () => {
	const features = [
		{
			title: 'No Watermark',
			description: 'Download videos exactly as original creators intended',
			icon: FiVideo,
		},
		{
			title: 'HD Quality',
			description: 'Maximum resolution available for crystal clear viewing',
			icon: FiMonitor,
		},
		{
			title: 'Lightning Fast',
			description: 'Download in seconds, not minutes',
			icon: FiZap,
		},
		{
			title: 'Unlimited',
			description: 'No download limits, ever. Download as much as you want',
			icon: FiRefreshCw,
		},
		{
			title: 'Secure & Private',
			description: "We don't store your data or track your downloads",
			icon: FiShield,
		},
		{
			title: 'Virus Free',
			description: 'All downloads are verified safe and secure',
			icon: FiCheckCircle,
		},
	];

	return (
		<section id="features" className="py-24 md:py-32 relative">
			<div className="container max-w-6xl xl:max-w-7xl">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						Why Tok Down?
					</h2>
					<p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
						Crystal clear downloads. No watermarks.
						No hidden fees. Just your videos.
					</p>
				</motion.div>

				{/* Features Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{features.map((feature, index) => {
						const Icon = feature.icon;
						return (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								whileHover={{ y: -8 }}
								className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-orange-500/30 transition-all duration-300"
							>
								{/* Icon with glow */}
								<div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
									<Icon className="w-7 h-7 text-orange-400" />
								</div>

								<h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
								<p className="text-gray-400 leading-relaxed">{feature.description}</p>

								{/* Hover gradient overlay */}
								<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
							</motion.div>
						);
					})}
				</div>

				{/* Subtle Divider */}
				<div className="mt-20 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
			</div>
		</section>
	);
};

export default Features;
