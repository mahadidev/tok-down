'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiTrendingUp, FiUsers, FiDownload, FiStar } from 'react-icons/fi';

interface StatItem {
	icon: React.ReactNode;
	value: number;
	suffix: string;
	label: string;
	gradient: string;
}

const StatCard = ({ item }: { item: StatItem }) => {
	const [count, setCount] = useState(0);
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, margin: '-10%' });

	useEffect(() => {
		if (isInView) {
			const duration = 2000; // 2 seconds
			const steps = 60;
			const increment = item.value / steps;
			const stepDuration = duration / steps;

			let current = 0;
			const timer = setInterval(() => {
				current += increment;
				if (current >= item.value) {
					setCount(item.value);
					clearInterval(timer);
				} else {
					setCount(Math.floor(current));
				}
			}, stepDuration);

			return () => clearInterval(timer);
		}
	}, [isInView, item.value]);

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, scale: 0.9 }}
			whileInView={{ opacity: 1, scale: 1 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5 }}
			className="relative p-8 rounded-2xl bg-dark-800 border border-dark-700 overflow-hidden"
		>
			{/* Background Gradient */}
			<div
				className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-10`}
			/>

			{/* Content */}
			<div className="relative">
				<div
					className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white mb-4`}
				>
					{item.icon}
				</div>
				<div className="flex items-baseline gap-1 mb-2">
					<span className="text-3xl md:text-4xl font-bold">
						{count.toLocaleString()}
					</span>
					<span className="text-xl text-gray-400">{item.suffix}</span>
				</div>
				<p className="text-gray-400">{item.label}</p>
			</div>
		</motion.div>
	);
};

const Stats = () => {
	const stats: StatItem[] = [
		{
			icon: <FiDownload className="w-6 h-6" />,
			value: 5000000,
			suffix: '+',
			label: 'Videos Downloaded',
			gradient: 'from-orange-500 to-amber-600',
		},
		{
			icon: <FiUsers className="w-6 h-6" />,
			value: 250000,
			suffix: '+',
			label: 'Active Users',
			gradient: 'from-blue-500 to-cyan-500',
		},
		{
			icon: <FiStar className="w-6 h-6" />,
			value: 4.8,
			suffix: '/5',
			label: 'User Rating',
			gradient: 'from-amber-500 to-orange-500',
		},
		{
			icon: <FiTrendingUp className="w-6 h-6" />,
			value: 99,
			suffix: '%',
			label: 'Success Rate',
			gradient: 'from-emerald-500 to-teal-500',
		},
	];

	return (
		<section className="py-24 relative overflow-hidden">
			{/* Background Gradient */}
			<div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent" />

			<div className="container relative">
				{/* Section Header */}
				<div className="text-center max-w-2xl mx-auto mb-16">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
					>
						<span className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-sm font-medium mb-4">
							Stats
						</span>
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
							Trusted by Millions
						</h2>
						<p className="text-gray-400 text-lg">
							Join thousands of users who rely on Tok Down for their
							TikTok video downloads
						</p>
					</motion.div>
				</div>

				{/* Stats Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{stats.map((stat, index) => (
						<StatCard key={index} item={stat} />
					))}
				</div>
			</div>
		</section>
	);
};

export default Stats;
