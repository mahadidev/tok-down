'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiCpu, FiCloud, FiTrendingUp, FiActivity, FiZap, FiHexagon } from 'react-icons/fi';

const SPONSORS = [
	{ name: 'TechCorp', icon: FiCpu },
	{ name: 'Cloudify', icon: FiCloud },
	{ name: 'DataFlow', icon: FiTrendingUp },
	{ name: 'StreamLine', icon: FiActivity },
	{ name: 'NextGen', icon: FiZap },
	{ name: 'Innovate Labs', icon: FiHexagon },
];

const Sponsors = () => {
	return (
		<section className="py-16 border-b border-white/5">
			<div className="container">
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
					{SPONSORS.map((sponsor, index) => {
						const Icon = sponsor.icon;
						return (
							<motion.div
								key={sponsor.name}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: index * 0.05 }}
								whileHover={{ scale: 1.05, borderColor: 'rgba(251, 146, 60, 0.3)' }}
								className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-orange-500/30 transition-all duration-300 flex flex-col items-center justify-center gap-3"
							>
								<Icon className="w-8 h-8 text-gray-400 group-hover:text-orange-400 transition-colors" />
								<span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">
									{sponsor.name}
								</span>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default Sponsors;
