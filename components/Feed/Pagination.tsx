/**
 * Pagination Component
 * Pagination controls for the feed
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PaginationProps } from '@/types/components';

export const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	if (totalPages <= 1) return null;

	const pagesArray = Array.from({ length: totalPages }, (_, i) => i);

	const canGoPrevious = currentPage > 0;
	const canGoNext = currentPage < totalPages - 1;

	return (
		<div className="flex items-center justify-center gap-2 mt-12 flex-wrap">
			{/* Previous Button */}
			<motion.button
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				onClick={() => canGoPrevious && onPageChange(currentPage - 1)}
				disabled={!canGoPrevious}
				className="px-4 py-2 rounded-lg bg-dark-800 border border-dark-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:border-orange-500/50 transition-all"
			>
				Previous
			</motion.button>

			{/* Page Numbers */}
			{pagesArray.map((page) => (
				<motion.button
					key={page}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={() => onPageChange(page)}
					className={`w-10 h-10 rounded-lg font-medium transition-all ${
						currentPage === page
							? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white'
							: 'bg-dark-800 border border-dark-700 text-white hover:border-orange-500/50'
					}`}
				>
					{page + 1}
				</motion.button>
			))}

			{/* Next Button */}
			<motion.button
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				onClick={() => canGoNext && onPageChange(currentPage + 1)}
				disabled={!canGoNext}
				className="px-4 py-2 rounded-lg bg-dark-800 border border-dark-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:border-orange-500/50 transition-all"
			>
				Next
			</motion.button>
		</div>
	);
};
