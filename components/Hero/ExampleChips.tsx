/**
 * Example Chips Component
 * Clickable example username chips for quick search
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExampleChipsProps } from '@/types/components';

export const ExampleChips: React.FC<ExampleChipsProps> = ({ examples, onExampleClick }) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.6 }}
			className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3"
		>
			<span className="text-gray-500 text-sm">Try:</span>
			{examples.map((example, index) => (
				<motion.button
					key={example}
					onClick={() => onExampleClick(example)}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.7 + index * 0.1 }}
					whileHover={{ y: -2, scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					className="px-4 py-2 rounded-lg bg-dark-800/50 hover:bg-dark-700 border border-dark-700 text-sm text-gray-300 transition-all"
				>
					{example}
				</motion.button>
			))}
		</motion.div>
	);
};
