'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiDownload, FiShield, FiZap, FiAlertCircle } from 'react-icons/fi';
import { setNavHeight, useDispatch, setPagination, setVideoLoading, setVidoes } from '../../redux';
import { RootState, useSelector } from '../../redux';
import axios from 'axios';

const Hero = () => {
	const dispatch = useDispatch();
	const siteState = useSelector((state: RootState) => state.site);
	const heroRef = useRef<HTMLDivElement>(null);

	// Search state (moved from SearchInput)
	const [error, setError] = useState<string | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	// Adjust main content height for dynamic hero
	React.useEffect(() => {
		if (heroRef.current && siteState.navHeight) {
			// Optional: Can adjust content based on hero height
		}
	}, [siteState.navHeight, dispatch]);

	// Search functions (moved from SearchInput)
	const getUserPost = (value: string) => {
		let options = null;

		if (value.includes('tiktok.com') && value.includes('/video/')) {
			// get video by url
			options = {
				method: 'GET',
				url: 'https://tiktok-video-no-watermark2.p.rapidapi.com/',
				params: { url: value, hd: '0', count: '1000' },
				headers: {
					'X-RapidAPI-Key':
						'40144bbb81msh2a9340dd989447ap168327jsn5650256e8df2',
					'X-RapidAPI-Host': 'tiktok-video-no-watermark2.p.rapidapi.com',
				},
			};
		} else if (!value.includes('tiktok.com') && !value.includes('@')) {
			setError('Please enter a correct username with @');
			dispatch(setVideoLoading(false));
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
					'X-RapidAPI-Key':
						'40144bbb81msh2a9340dd989447ap168327jsn5650256e8df2',
					'X-RapidAPI-Host': 'tiktok-video-no-watermark2.p.rapidapi.com',
				},
			};
		}

		if (options) {
			axios
				.request(options)
				.then(function (response) {
					if (response.data.msg === 'success') {
						let videoArray = null;
						let feedTitle = null;
						if (response.data.data.videos) {
							videoArray = response.data.data.videos;
							feedTitle = 'User Videos';
						} else {
							videoArray = [response.data.data];
							feedTitle = 'Video';
						}

						if (videoArray) {
							dispatch(
								setVidoes({
									title: feedTitle,
									videos: videoArray,
								})
							);
							dispatch(setVideoLoading(false));
						}
					} else {
						setError('Username or video URL is incorrect');
						dispatch(setVideoLoading(false));
					}
				})
				.catch(function (err) {
					console.error(err);
					setError('Something went wrong. Please try again.');
					dispatch(setVideoLoading(false));
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
			dispatch(setVideoLoading(true));
			const searchValue = inputRef.current.value.trim();
			getUserPost(searchValue);
		} else {
			setError('Please enter a username or video URL');
		}
	};

	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			onSearch();
		}
	};

	const onExampleClick = (username: string) => {
		if (inputRef.current) {
			inputRef.current.value = username;
			onClickInput();
			onSearch();
		}
	};

	const features = [
		{
			icon: <FiDownload className="w-5 h-5" />,
			title: 'No Watermark',
			description: 'Download videos without the TikTok watermark',
		},
		{
			icon: <FiShield className="w-5 h-5" />,
			title: 'HD Quality',
			description: 'Get videos in the highest quality available',
		},
		{
			icon: <FiZap className="w-5 h-5" />,
			title: 'Fast & Free',
			description: 'Download videos quickly at no cost',
		},
	];

	return (
		<section
			ref={heroRef}
			className="relative overflow-hidden py-24 md:py-32"
		>
			{/* Gradient Background */}
			<div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent" />
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-orange-500/20 rounded-full blur-3xl -translate-y-1/2" />

			<div className="container relative">
				<div className="max-w-4xl mx-auto text-center">
					{/* Badge */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-8"
					>
						<span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
						<span className="text-sm font-medium text-orange-400">
							100% Free TikTok Video Downloader
						</span>
					</motion.div>

					{/* Headline */}
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
					>
						Download TikTok Videos{' '}
						<span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
							Without Watermark
						</span>
					</motion.h1>

					{/* Subheadline */}
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
					>
						Save your favorite TikTok videos in HD quality. Simply paste a
						username or video URL below.
					</motion.p>

					{/* Search Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className="max-w-2xl mx-auto"
					>
						{/* Glass morphism container with animated gradient border */}
						<div className="relative group">
							{/* Animated gradient glow */}
							<div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl opacity-30 group-hover:opacity-50 blur transition-all duration-500 animate-pulse" />

							{/* Glass morphism card */}
							<div className="relative bg-dark-800/80 backdrop-blur-xl border border-dark-700 rounded-2xl p-2">
								<div className="flex gap-2">
									{/* Search icon */}
									<div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500">
										<FiSearch className="w-5 h-5" />
									</div>

									{/* Input field */}
									<input
										ref={inputRef}
										onClick={onClickInput}
										onKeyDown={onKeyDown}
										className="flex-1 h-14 pl-14 pr-6 bg-dark-900/50 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
										placeholder="@username or paste TikTok video URL..."
									/>

									{/* Search button */}
									<button
										onClick={onSearch}
										disabled={siteState.videoLoading}
										className="px-8 h-14 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed transition-all whitespace-nowrap"
									>
										{siteState.videoLoading ? (
											<span className="flex items-center gap-2">
												<svg
													className="animate-spin h-4 w-4"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
												>
													<circle
														className="opacity-25"
														cx="12"
														cy="12"
														r="10"
														stroke="currentColor"
														strokeWidth="4"
													/>
													<path
														className="opacity-75"
														fill="currentColor"
														d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
													/>
												</svg>
												Loading
											</span>
										) : (
											'Search'
										)}
									</button>
								</div>

								{/* Error Message */}
								<AnimatePresence>
									{error && (
										<motion.div
											initial={{ opacity: 0, y: -10 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -10 }}
											transition={{ duration: 0.2 }}
											className="mt-3 flex items-center justify-center gap-2 text-red-400"
										>
											<FiAlertCircle className="w-4 h-4 flex-shrink-0" />
											<span className="text-sm">{error}</span>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						</div>

						{/* Example chips */}
						<div className="mt-6 flex flex-wrap items-center justify-center gap-3">
							<span className="text-gray-500 text-sm">Try:</span>
							{['@charlidamelio', '@khaby.lame', '@bellapoarch'].map((example) => (
								<button
									key={example}
									onClick={() => onExampleClick(example)}
									className="px-4 py-2 rounded-lg bg-dark-800 hover:bg-dark-700 hover:border-orange-500/30 border border-transparent text-sm text-gray-300 transition-all"
								>
									{example}
								</button>
							))}
						</div>
					</motion.div>

					{/* Feature Cards */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.4 }}
						className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mt-16"
					>
						{features.map((feature, index) => (
							<div
								key={index}
								className="flex items-center gap-3 p-4 rounded-xl bg-dark-800/50 border border-dark-700 hover:border-orange-500/50 transition-all"
							>
								<div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400">
									{feature.icon}
								</div>
								<div className="text-left">
									<h3 className="font-semibold text-sm">
										{feature.title}
									</h3>
									<p className="text-xs text-gray-400">
										{feature.description}
									</p>
								</div>
							</div>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
