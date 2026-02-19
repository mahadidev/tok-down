'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiCpu, FiCloud, FiTrendingUp, FiActivity, FiZap, FiHexagon } from 'react-icons/fi';

const SPONSORS = [
	{ name: 'Cholo Gori', icon: FiCpu },
	{ name: 'Carry Me', icon: FiCloud },
	{ name: 'Banzo Chandpur', icon: FiTrendingUp },
	{ name: 'KB VPN', icon: FiActivity },
	{ name: 'Mahadi Dev', icon: FiActivity },
];

const Sponsors = () => {
	return (
		<section className="border-y border-white/5">
			<div className="container">
				<div className="flex flex-row gap-4 overflow-x-auto overflow-y-hidden scrollbar-hide">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.4, delay: 0.05 }}
						className="whitespace-nowrap relative p-6 pl-0 rounded-2xl backdrop-blur-xl transition-all duration-300 flex flex-col items-center justify-center gap-3"
					>
						<span className="text-lg font-semibold text-gray-300  transition-colors">
							Sponsored by:
						</span>
					</motion.div>

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
								className="whitespace-nowrap group relative py-6 px-12 rounded-2xl backdrop-blur-xl transition-all duration-300 flex flex-col items-center justify-center gap-3"
							>
								<span className="text-xl font-semibold text-gray-300 group-hover:text-white transition-colors">
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
