'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	RootState,
	setPagination,
	useDispatch,
	useSelector,
} from '../../redux';
import Video from '../Video';
import { Skeleton } from '../ui';

const Feed = () => {
	const siteState = useSelector((state: RootState) => state.site);
	const currentPage = siteState.currentPage;
	const perPage = siteState.perPage;

	const calCount = currentPage * perPage;
	const videos = siteState.videos
		? siteState.videos.slice(calCount, calCount + perPage)
		: null;

	const pages = Math.ceil((siteState.videos?.length || 0) / perPage);
	const pagesArray = Array.from({ length: pages }, (_, i) => i);

	const dispatch = useDispatch();
	const onPaginate = (number: number) => {
		dispatch(setPagination({ currentPage: number }));
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	// Show skeleton when loading
	if (siteState.videoLoading) {
		return (
			<div className="py-8">
				<div className="container">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{[...Array(6)].map((_, i) => (
							<div
								key={i}
								className="bg-dark-700 rounded-2xl border border-dark-600 overflow-hidden"
							>
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
	}

	// Show empty state when no videos
	if (!videos || videos.length === 0) {
		return null;
	}

	return (
		<div className="py-8 md:py-12">
			<div className="container">
				{/* Section Header */}
				{siteState.feedTitle && (
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-2xl font-bold">
							{siteState.feedTitle}
							<span className="ml-2 text-sm font-normal text-gray-400">
								({siteState.videos?.length || 0} videos)
							</span>
						</h2>
					</div>
				)}

				{/* Video Grid */}
				<motion.div
					layout
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
				>
					<AnimatePresence mode="popLayout">
						{videos.map((item: any, i: number) => (
							<motion.div
								key={`${item.video_id || i}-${currentPage}`}
								layout
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.9 }}
								transition={{
									duration: 0.3,
									delay: i * 0.05,
								}}
							>
								<Video videoData={item} />
							</motion.div>
						))}
					</AnimatePresence>
				</motion.div>

				{/* Pagination */}
				{pagesArray.length > 1 && (
					<div className="flex items-center justify-center gap-2 mt-12 flex-wrap">
						{/* Previous Button */}
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => currentPage > 0 && onPaginate(currentPage - 1)}
							disabled={currentPage === 0}
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
								onClick={() => onPaginate(page)}
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
							onClick={() =>
								currentPage < pagesArray.length - 1 &&
								onPaginate(currentPage + 1)
							}
							disabled={currentPage === pagesArray.length - 1}
							className="px-4 py-2 rounded-lg bg-dark-800 border border-dark-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:border-orange-500/50 transition-all"
						>
							Next
						</motion.button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Feed;
