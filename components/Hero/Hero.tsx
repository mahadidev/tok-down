'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiAlertCircle, FiDownload, FiHeart, FiMessageCircle, FiShare2, FiX } from 'react-icons/fi';
import { useDispatch, setPagination, setVideoLoading, setVidoes, setHasSearched, setSearchTerm } from '../../redux';
import { RootState, useSelector } from '../../redux';
import axios from 'axios';
import Image from 'next/image';

// Helper function to determine search type
const getSearchType = (value: string): 'username' | 'url' => {
	if (
		(value.includes('tiktok.com') && value.includes('/video/')) ||
		value.includes('vm.tiktok.com') ||
		value.includes('vt.tiktok.com') ||
		(value.includes('m.tiktok.com') && value.includes('/v/')) ||
		value.includes('tiktok.com/t/')
	) {
		return 'url';
	}
	return 'username';
};

// Helper function to track searches asynchronously
const trackSearch = async (
	searchTerm: string,
	searchType: 'username' | 'url',
	resultCount: number,
	status: 'success' | 'error',
) => {
	try {
		await fetch('/api/search/track', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				search_term: searchTerm,
				search_type: searchType,
				result_count: resultCount,
				status,
			}),
		});
	} catch (err) {
		// Silently fail - don't disrupt user experience
		console.error('Search tracking failed:', err);
	}
};

const Hero = () => {
	const dispatch = useDispatch();
	const siteState = useSelector((state: RootState) => state.site);
	const heroRef = useRef<HTMLDivElement>(null);

	// Search state
	const [error, setError] = useState<string | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const searchTerm = siteState.searchTerm || '';

	// Search functions
	const getUserPost = (value: string) => {
		let options = null;

		if (
			// Standard video URL: www.tiktok.com/@user/video/ID
			(value.includes('tiktok.com') && value.includes('/video/')) ||
			// Shortened URLs: vm.tiktok.com or vt.tiktok.com
			value.includes('vm.tiktok.com') ||
			value.includes('vt.tiktok.com') ||
			// Mobile URLs: m.tiktok.com/v/
			(value.includes('m.tiktok.com') && value.includes('/v/')) ||
			// New short format: www.tiktok.com/t/
			value.includes('tiktok.com/t/')
		) {
			// get video by url - use root endpoint
			options = {
				method: 'GET',
				url: 'https://tiktok-video-no-watermark2.p.rapidapi.com/',
				params: { url: value, hd: '0' },
				headers: {
					'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '',
					'X-RapidAPI-Host': 'tiktok-video-no-watermark2.p.rapidapi.com',
				},
			};
		} else if (!value.includes('tiktok.com') && !value.includes('@')) {
			setError('Please enter a correct username with @');
			dispatch(setVideoLoading(false));
			// Track validation error
			trackSearch(value, getSearchType(value), 0, 'error');
			return;
		} else {
			// get user videos by username
			options = {
				method: 'GET',
				url: 'https://tiktok-video-no-watermark2.p.rapidapi.com/user/posts',
				params: {
					unique_id: value,
					count: '1000',
				},
				headers: {
					'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '',
					'X-RapidAPI-Host': 'tiktok-video-no-watermark2.p.rapidapi.com',
				},
			};
		}

		if (options) {
			axios
				.request(options)
				.then(function (response) {
					if (response.data.msg === 'success') {
						// Transform video data to match frontend expectations
						const transformVideoData = (video: any) => ({
							...video,
							author: video.author ? {
								...video.author,
								id: Number(video.author.id) // Convert string to number
							} : undefined,
							stats: {
								play_count: video.play_count,
								digg_count: video.digg_count,
								comment_count: video.comment_count,
								share_count: video.share_count
							}
						});

						// Filter out photo mode posts (images instead of video)
						const isVideoPost = (video: any) =>
							!video.images && video.duration > 0;

						let videoArray = null;
						let feedTitle = null;
						if (response.data.data.videos) {
							videoArray = response.data.data.videos
								.filter(isVideoPost)
								.map(transformVideoData);
							feedTitle = 'User Videos';
						} else {
							const singleVideo = transformVideoData(response.data.data);
							if (isVideoPost(response.data.data)) {
								videoArray = [singleVideo];
							}
							feedTitle = 'Video';
						}

						if (videoArray && videoArray.length > 0) {
							dispatch(
								setVidoes({
									title: feedTitle,
									videos: videoArray,
								})
							);
							dispatch(setVideoLoading(false));
							// Track successful search
							trackSearch(value, getSearchType(value), videoArray.length, 'success');
						} else {
							setError('No videos found. The user may only have photo posts.');
							dispatch(setVideoLoading(false));
							// Track search with no results
							trackSearch(value, getSearchType(value), 0, 'success');
						}
					} else {
						setError('Username or video URL is incorrect');
						dispatch(setVideoLoading(false));
						// Track failed search
						trackSearch(value, getSearchType(value), 0, 'error');
					}
				})
				.catch(function (err) {
					console.error('[ERROR] API Request Failed:', {
						message: err.message,
						status: err.response?.status,
						statusText: err.response?.statusText,
						data: err.response?.data,
					});

					// Show detailed error for API key issues
					if (err.response?.status === 401) {
						setError('Invalid API key. Please check your configuration.');
					} else if (err.response?.data?.message) {
						setError(err.response.data.message);
					} else {
						setError('Something went wrong. Please try again.');
					}
					dispatch(setVideoLoading(false));
					// Track failed search (network/API error)
					trackSearch(value, getSearchType(value), 0, 'error');
				});
		}
	};

	const onClickInput = () => {
		setError(null);
		dispatch(setPagination({ currentPage: 0 }));
	};

	const onSearch = () => {
		setError(null);
		if (inputRef.current?.value) {
			const searchValue = inputRef.current.value.trim();
			dispatch(setVideoLoading(true));
			dispatch(setHasSearched(true));
			dispatch(setSearchTerm(searchValue));
			getUserPost(searchValue);
		} else {
			setError('Please enter a username or video URL');
		}
	};

	const handleClearSearch = () => {
		dispatch(setHasSearched(false));
		dispatch(setVidoes({ title: null, videos: null }));
		dispatch(setSearchTerm(null));
		setError(null);
		if (inputRef.current) {
			inputRef.current.value = '';
		}
	};

	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			onSearch();
		}
	};

	const onExampleClick = (username: string) => {
		dispatch(setSearchTerm(username));
		if (inputRef.current) {
			inputRef.current.value = username;
			onClickInput();
			onSearch();
		}
	};

	return (
		<>
			{/* Compact Search Bar - shown when hasSearched is true */}
			{siteState.hasSearched ? (
				<section className="py-6 border-b border-dark-700">
					<div className="container">
						<div className="flex items-center gap-4 max-w-3xl mx-auto">
							<div className="relative flex-1">
								<div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
									<FiSearch className="w-5 h-5" />
								</div>
								<input
									ref={inputRef}
									value={searchTerm}
									onChange={(e) => dispatch(setSearchTerm(e.target.value))}
									onClick={onClickInput}
									onKeyDown={onKeyDown}
									className="w-full h-12 pl-12 pr-4 bg-dark-800/50 border border-dark-700 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
									placeholder="@username or paste video URL..."
								/>
							</div>
							<button
								onClick={onSearch}
								disabled={siteState.videoLoading}
								className="px-6 h-12 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-medium rounded-xl shadow-lg shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 whitespace-nowrap"
							>
								{siteState.videoLoading ? (
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
							<button
								onClick={handleClearSearch}
								className="px-4 h-12 bg-dark-800 hover:bg-dark-700 border border-dark-700 text-gray-300 hover:text-white rounded-xl transition-all flex items-center gap-2 whitespace-nowrap"
							>
								<FiX className="w-4 h-4" />
								<span className="hidden sm:inline">Clear</span>
							</button>
						</div>
						{/* Error message in compact mode */}
						<AnimatePresence>
							{error && (
								<motion.div
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									transition={{ duration: 0.2 }}
									className="mt-3 flex items-center gap-2 text-red-400 max-w-3xl mx-auto"
								>
									<FiAlertCircle className="w-4 h-4 flex-shrink-0" />
									<span className="text-sm">{error}</span>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</section>
			) : (
				<section
					ref={heroRef}
					className="relative overflow-hidden pb-10 sm:pb-20 md:py-20 min-h-[70vh]"
				>
			{/* ========================================= */}
			{/* MORPHING GRADIENT BLOBS (Background Layer) */}
			{/* ========================================= */}

			{/* Pink morphing blob - top left */}
			<motion.div
				className="absolute top-20 left-10 w-96 h-96 bg-pink-500/40 rounded-full blur-3xl -z-10"
				animate={{
					scale: [1, 1.2, 1],
					x: [0, 50, 0],
					y: [0, -30, 0],
					borderRadius: ['42% 58% 70% 30%', '60% 40% 30% 70%', '42% 58% 70% 30%']
				}}
				transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
			/>

			{/* Cyan morphing blob - bottom right */}
			<motion.div
				className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500/30 rounded-full blur-3xl -z-10"
				animate={{
					scale: [1.2, 1, 1.2],
					x: [0, -40, 0],
					y: [0, 40, 0],
					borderRadius: ['30% 70% 70% 30%', '50% 50% 30% 70%', '30% 70% 70% 30%']
				}}
				transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
			/>

			{/* Purple morphing blob - center */}
			<motion.div
				className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/25 rounded-full blur-3xl -z-10"
				animate={{
					scale: [1, 1.3, 1],
					rotate: [0, 90, 0],
					borderRadius: ['50% 50% 50% 50%', '40% 60% 50% 50%', '50% 50% 50% 50%']
				}}
				transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
			/>

			{/* Orange accent blob - top right */}
			<motion.div
				className="absolute top-40 right-20 w-64 h-64 bg-orange-500/25 rounded-full blur-3xl -z-10"
				animate={{
					scale: [1, 1.4, 1],
					x: [0, -20, 0],
					y: [0, -40, 0],
				}}
				transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
			/>

			{/* Grid pattern overlay */}
			<div className="absolute inset-0 grid-pattern opacity-50 -z-10" />

			{/* ========================== */}
			{/* MAIN CONTENT (Foreground) */}
			{/* ========================== */}

			<div className="container relative z-10">
				<div className="max-w-6xl xl:max-w-7xl mx-auto">
					{/* 2-Column Grid Layout */}
					<div className="grid lg:grid-cols-3 lg:gap-12 items-center">
						{/* Left: Hero Content */}
						<div className="lg:col-span-2 text-center lg:text-left order-2 lg:order-1">
							{/* Headline - Fade in */}
							<motion.h1
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
								className="hidden lg:block text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
							>
								Download TikTok Videos{' '}
								<motion.span
									className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent"
									animate={{
										backgroundPosition: ['0%', '100%', '0%']
									}}
									transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
								>
									Without Watermark
								</motion.span>
							</motion.h1>

							{/* Subheadline */}
							<motion.p
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.8, delay: 0.4 }}
								className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto lg:mx-0"
							>
								Save your favorite TikTok videos in HD quality. Simply paste a
								username or video URL below.
							</motion.p>

							{/* ========================================= */}
							{/* MINIMAL SEARCH CONTAINER */}
							{/* ========================================= */}
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
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
												ref={inputRef}
												value={searchTerm}
												onChange={(e) => dispatch(setSearchTerm(e.target.value))}
												onClick={onClickInput}
												onKeyDown={onKeyDown}
												className="w-full h-12 pl-12 pr-4 bg-dark-800/50 border border-dark-700 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
												placeholder="@username or paste video URL..."
											/>
										</div>

										{/* Search button */}
										<button
											onClick={onSearch}
											disabled={siteState.videoLoading}
											className="px-6 h-12 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-medium rounded-xl shadow-lg shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 whitespace-nowrap"
										>
											{siteState.videoLoading ? (
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

								{/* Example chips */}
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.6 }}
									className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3"
								>
									<span className="text-gray-500 text-sm">Try:</span>
									{['@mahadidev', '@akujiff', '@heycarryme'].map((example, index) => (
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
							</motion.div>
						</div>

						{/* Right: Floating Preview Card */}
						<div className="lg:col-span-1 mt-8 lg:mt-0 relative mx-auto lg:max-w-none w-full order-1 lg:order-2 mb-8 lg:mb-0">
							{/* Headline - Fade in */}
							<motion.h1
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
								className="lg:hidden text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8"
							>
								Download TikTok Videos{' '}
								<motion.span
									className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent"
									animate={{
										backgroundPosition: ['0%', '100%', '0%']
									}}
									transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
								>
									Without Watermark
								</motion.span>
							</motion.h1>
							<motion.div
								initial={{ opacity: 0, y: 30, x: 0 }}
								animate={{ opacity: 1, y: 0, x: 0 }}
								transition={{ duration: 0.8, delay: 0.6 }}
								className="float"
							>
								{/* Mock Video Card */}
								<div className="relative aspect-[16/9] lg:aspect-[9/14] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
									{/* Background Image - Covers entire card */}
									<div className="absolute inset-0">
										<Image
											src="/img/mahadi-hasan.jpg"
											alt="Mahadi Hasan"
											fill
											className="object-cover"
											sizes="(max-width: 1023px) 100vw, 400px"
										/>
										{/* Gradient overlay - stronger at bottom for text readability */}
										<div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />
									</div>

									{/* All content overlayed on the image */}
									<div className="relative h-full flex flex-col">
										{/* Top section with play button and stats */}
										<div className="flex-1 flex items-center justify-center">
											{/* Mock Play Button */}
											<div className="relative z-10 w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
												<FiDownload className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
											</div>
											{/* TikTok-style UI overlay */}
											<div className="absolute right-3 lg:right-4 bottom-16 lg:bottom-20 flex flex-col gap-4 lg:gap-6 z-10">
												<div className="flex flex-col items-center gap-1">
													<div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
														<FiHeart className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
													</div>
													<span className="text-[10px] lg:text-xs text-white/80">842K</span>
												</div>
												<div className="flex flex-col items-center gap-1">
													<div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
														<FiMessageCircle className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
													</div>
													<span className="text-[10px] lg:text-xs text-white/80">12.4K</span>
												</div>
												<div className="flex flex-col items-center gap-1">
													<div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
														<FiShare2 className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
													</div>
													<span className="text-[10px] lg:text-xs text-white/80">Share</span>
												</div>
											</div>
										</div>

										{/* Video Info overlay at bottom */}
										<div className="p-3 lg:p-4">
											<div className="flex items-center justify-between">
												<div className="flex items-center gap-2 lg:gap-3">
													<div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-orange-500 to-pink-500" />
													<div>
														<p className="text-xs lg:text-sm font-semibold text-white">@mahadidev</p>
														<p className="text-[10px] lg:text-xs text-gray-300">Original Sound</p>
													</div>
												</div>
												{/* Download Badge */}
												<div className="flex items-center gap-1.5 lg:gap-2 px-2 lg:px-3 py-1 lg:py-1.5 rounded-full bg-green-500/20 border border-green-500/30">
													<FiDownload className="w-3 h-3 lg:w-4 lg:h-4 text-green-400" />
													<span className="text-xs lg:text-sm font-medium text-green-400">Ready</span>
												</div>
											</div>
										</div>
									</div>

									{/* Glow effect */}
									<div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-purple-500/20 blur-2xl -z-10 rounded-3xl" />
								</div>
							</motion.div>
						</div>
					</div>
				</div>
			</div>

				</section>
			)}
		</>
	);
};

export default Hero;
