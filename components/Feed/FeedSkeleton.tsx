/**
 * Feed Skeleton Component
 * Loading skeleton for the feed
 */

'use client';

import React from 'react';
import { Skeleton } from '@/components/ui';

export const FeedSkeleton: React.FC = () => {
	return (
		<div className="py-8">
			<div className="container">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{[...Array(6)].map((_, i) => (
						<div key={i} className="bg-dark-700 rounded-2xl border border-dark-600 overflow-hidden">
							<Skeleton className="w-full aspect-[9/16]" />
							<div className="p-4 space-y-3">
								<div className="flex items-center gap-3">
									<Skeleton className="w-10 h-10 rounded-full" />
									<div className="flex-1 space-y-2">
										<Skeleton className="h-4 w-24" />
										<Skeleton className="h-3 w-16" />
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
