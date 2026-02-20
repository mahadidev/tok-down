/**
 * Error Message Component
 * Reusable error message display
 */

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertCircle, FiX } from 'react-icons/fi';
import { ErrorMessageProps } from '@/types/components';

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
	message,
	onDismiss,
	variant = 'inline',
}) => {
	if (variant === 'banner') {
		return (
			<AnimatePresence>
				{message && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.2 }}
						className="fixed top-0 left-0 right-0 z-50 bg-red-500/90 backdrop-blur-sm text-white"
					>
						<div className="container py-3">
							<div className="flex items-center justify-between max-w-3xl mx-auto">
								<div className="flex items-center gap-2">
									<FiAlertCircle className="w-5 h-5 flex-shrink-0" />
									<span className="font-medium">{message}</span>
								</div>
								{onDismiss && (
									<button
										onClick={onDismiss}
										className="p-1 hover:bg-red-600 rounded transition-colors"
									>
										<FiX className="w-5 h-5" />
									</button>
								)}
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		);
	}

	// Default inline variant
	return (
		<AnimatePresence>
			{message && (
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.2 }}
					className="flex items-center gap-2 text-red-400"
				>
					<FiAlertCircle className="w-4 h-4 flex-shrink-0" />
					<span className="text-sm">{message}</span>
					{onDismiss && (
						<button
							onClick={onDismiss}
							className="ml-auto p-0.5 hover:bg-red-500/20 rounded transition-colors"
						>
							<FiX className="w-3.5 h-3.5" />
						</button>
					)}
				</motion.div>
			)}
		</AnimatePresence>
	);
};
