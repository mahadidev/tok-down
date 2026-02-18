'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

// Counting animation component
const CountUp = ({ end, duration = 2, suffix = '', prefix = '' }: { end: number; duration?: number; suffix?: string; prefix?: string }) => {
	const [count, setCount] = useState(0);
	const ref = useRef<HTMLSpanElement>(null);
	const isInView = useInView(ref, { once: true });

	useEffect(() => {
		if (isInView) {
			let startTime: number;
			let animationFrame: number;

			const animate = (currentTime: number) => {
				if (!startTime) startTime = currentTime;
				const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

				// Easing function for smooth animation
				const easeOutQuart = 1 - Math.pow(1 - progress, 4);
				setCount(Math.floor(easeOutQuart * end));

				if (progress < 1) {
					animationFrame = requestAnimationFrame(animate);
				}
			};

			animationFrame = requestAnimationFrame(animate);

			return () => cancelAnimationFrame(animationFrame);
		}
	}, [isInView, end, duration]);

	return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

const Stats = () => {
	const stats = [
		{ value: 5, suffix: 'M+', label: 'Videos Downloaded' },
		{ value: 250, suffix: 'K+', label: 'Active Users' },
		{ value: 99, suffix: '%', label: 'Success Rate' },
		{ value: 4.8, suffix: '/5', label: 'User Rating' },
	];
	return (
		<section className="py-24 md:py-32 relative overflow-hidden">
			{/* Background Gradient */}
			<div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent" />

			<div className="container relative max-w-6xl">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						Trusted by millions worldwide
					</h2>
					<p className="text-xl text-gray-400">
						Join millions who trust Tok Down for their TikTok downloads
					</p>
				</motion.div>

				{/* Stats Grid */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
					{stats.map((stat, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							whileHover={{ scale: 1.05 }}
							className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-center"
						>
							{/* Glow effect */}
							<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />

							{/* Stat Value */}
							<div className="text-4xl md:text-5xl font-bold text-orange-400 mb-2">
								<CountUp end={stat.value} suffix={stat.suffix} duration={2} />
							</div>

							{/* Stat Label */}
							<p className="text-gray-400 text-sm md:text-base">{stat.label}</p>
						</motion.div>
					))}
				</div>

				{/* Subtle Divider */}
				<div className="mt-20 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
			</div>
		</section>
	);
};

export default Stats;
