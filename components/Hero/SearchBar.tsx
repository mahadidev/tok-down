/**
 * Search Bar Component
 * Search input with error handling for the Hero section
 */

'use client';

import React, { useRef, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiAlertCircle } from 'react-icons/fi';
import { SearchBarProps } from '@/types/components';

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
	(
		{
			value,
			onChange,
			onSearch,
			isLoading,
			error,
			placeholder = '@username or paste video URL...',
			onKeyDown,
		},
		ref
	) => {
		const inputRef = useRef<HTMLInputElement>(null);
		const mergedRef = ref || inputRef;

		const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === 'Enter') {
				onSearch();
			}
			onKeyDown?.(e);
		};

		return (
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ type: 'spring', stiffness: 100, delay: 0.5 }}
				className="max-w-2xl mx-auto lg:mx-0"
			>
				{/* Search container with simple glassmorphism */}
				<div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
					{/* Error Message - appears above search bar */}
					<AnimatePresence>
						{error && (
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ duration: 0.2 }}
								className="mb-3 flex items-center gap-2 text-red-400"
							>
								<FiAlertCircle className="w-4 h-4 flex-shrink-0" />
								<span className="text-sm">{error}</span>
							</motion.div>
						)}
					</AnimatePresence>

					{/* Search input row */}
					<div className="flex gap-3 items-center">
						{/* Input field with search icon */}
						<div className="relative flex-1">
							{/* Search icon */}
							<div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
								<FiSearch className="w-5 h-5" />
							</div>

							{/* Input field */}
							<input
								ref={mergedRef}
								value={value}
								onChange={(e) => onChange(e.target.value)}
								onKeyDown={handleKeyDown}
								className="w-full h-12 pl-12 pr-4 bg-dark-800/50 border border-dark-700 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
								placeholder={placeholder}
							/>
						</div>

						{/* Search button */}
						<button
							onClick={onSearch}
							disabled={isLoading}
							className="px-6 h-12 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-medium rounded-xl shadow-lg shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 whitespace-nowrap"
						>
							{isLoading ? (
								<svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
									<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
								</svg>
							) : (
								<>
									<FiSearch className="w-4 h-4" />
									Search
								</>
							)}
						</button>
					</div>
				</div>
			</motion.div>
		);
	}
);

SearchBar.displayName = 'SearchBar';
