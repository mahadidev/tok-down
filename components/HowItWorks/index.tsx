'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiDownload, FiCopy, FiSearch, FiArrowRight, FiMail } from 'react-icons/fi';

const HowItWorks = () => {
	const steps = [
		{
			title: 'Copy Video URL',
			description: 'Copy the video URL from TikTok app or website',
			icon: FiCopy,
		},
		{
			title: 'Paste & Search',
			description: 'Paste the URL above and hit Search button',
			icon: FiSearch,
		},
		{
			title: 'Download Video',
			description: 'Click download to save your video without watermark',
			icon: FiDownload,
		},
	];

	return (
		<section id="how-it-works" className="py-24 md:py-32 relative">
			<div className="container max-w-6xl">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						How it works
					</h2>
					<p className="text-xl text-gray-400">
						Download your favorite TikTok videos in 3 simple steps
					</p>
				</motion.div>

				{/* Steps Grid with Connector */}
				<div className="relative mb-16">
					{/* Connector Line (desktop) */}
					<div className="hidden md:block absolute top-12 left-16 right-16 h-0.5 bg-gradient-to-r from-orange-500/50 via-orange-500 to-orange-500/50 z-0" />

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
						{steps.map((step, index) => {
							const Icon = step.icon;
							return (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: index * 0.15 }}
									whileHover={{ y: -4 }}
									className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-orange-500/30 transition-all"
								>
									{/* Number Badge */}
									<div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-orange-500/30">
										{index + 1}
									</div>

									{/* Icon */}
									<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center mb-4 mt-2">
										<Icon className="w-6 h-6 text-orange-400" />
									</div>

									<h3 className="text-lg font-semibold mb-2 text-white">{step.title}</h3>
									<p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>

									{/* Hover gradient overlay */}
									<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />

									{/* Arrow connector (mobile only) */}
									{index < steps.length - 1 && (
										<div className="md:hidden absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
											<FiArrowRight className="w-4 h-4 text-orange-400" />
										</div>
									)}
								</motion.div>
							);
						})}
					</div>
				</div>

				{/* CTA */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.5 }}
					className="text-center"
				>
					<Link
						href="/contact"
						className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-amber-700 transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40"
					>
						Contact Us
						<FiMail className="w-5 h-5" />
					</Link>
				</motion.div>

				{/* Subtle Divider */}
				<div className="mt-20 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
			</div>
		</section>
	);
};

export default HowItWorks;
