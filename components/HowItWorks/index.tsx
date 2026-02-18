'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiCopy, FiSearch, FiDownload } from 'react-icons/fi';
import StaggerChildren from '../animations/StaggerChildren';

const HowItWorks = () => {
	const steps = [
		{
			number: '01',
			icon: <FiCopy className="w-6 h-6" />,
			title: 'Copy Video URL',
			description:
				'Open TikTok and copy the link to the video you want to download, or find the username',
			color: 'violet',
		},
		{
			number: '02',
			icon: <FiSearch className="w-6 h-6" />,
			title: 'Paste & Search',
			description:
				'Paste the URL or enter the username in the search box above and click Search',
			color: 'purple',
		},
		{
			number: '03',
			icon: <FiDownload className="w-6 h-6" />,
			title: 'Download Video',
			description:
				'Click the download button on any video to save it without watermark',
			color: 'indigo',
		},
	];

	return (
		<section id="how-it-works" className="py-24 relative">
			<div className="container">
				{/* Section Header */}
				<div className="text-center max-w-2xl mx-auto mb-16">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
					>
						<span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 text-violet-400 text-sm font-medium mb-4">
							How It Works
						</span>
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
							3 Simple Steps
						</h2>
						<p className="text-gray-400 text-lg">
							Download your favorite TikTok videos in seconds
						</p>
					</motion.div>
				</div>

				{/* Steps */}
				<StaggerChildren
					className="grid grid-cols-1 md:grid-cols-3 gap-8"
					staggerDelay={0.15}
					childDelay={0.2}
				>
					{steps.map((step, index) => (
						<motion.div
							key={index}
							className="relative"
							whileHover={{ y: -8 }}
							transition={{ duration: 0.3 }}
						>
							{/* Connector Line (Desktop) */}
							{index < steps.length - 1 && (
								<div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-violet-500 to-transparent opacity-30" />
							)}

							{/* Step Card */}
							<div className="relative p-8 rounded-2xl bg-dark-800 border border-dark-700 hover:border-violet-500/30 transition-all duration-300 h-full">
								{/* Step Number */}
								<div className="absolute -top-4 -left-4 w-12 h-12 rounded-xl bg-dark-900 border-2 border-violet-500 flex items-center justify-center text-violet-400 font-bold">
									{step.number}
								</div>

								{/* Icon */}
								<div
									className={`w-14 h-14 rounded-xl bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 flex items-center justify-center text-white mb-6`}
								>
									{step.icon}
								</div>

								{/* Content */}
								<h3 className="text-xl font-semibold mb-3">
									{step.title}
								</h3>
								<p className="text-gray-400 leading-relaxed">
									{step.description}
								</p>
							</div>
						</motion.div>
					))}
				</StaggerChildren>

				{/* CTA */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.5 }}
					className="text-center mt-16"
				>
					<a
						href="#search"
						className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold rounded-xl hover:from-violet-600 hover:to-purple-700 transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
					>
						Try It Now
						<FiDownload className="w-5 h-5" />
					</a>
				</motion.div>
			</div>
		</section>
	);
};

export default HowItWorks;
