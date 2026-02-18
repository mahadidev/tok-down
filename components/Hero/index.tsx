'use client';

import React, { useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiDownload, FiShield, FiZap, FiAlertCircle, FiPlayCircle } from 'react-icons/fi';
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

	// Particle data for floating particle system
	const particles = useMemo(() =>
		Array.from({ length: 20 }, (_, i) => ({
			id: i,
			x: Math.random() * 100,
			delay: Math.random() * 5,
			duration: 10 + Math.random() * 10
		})),
	 []);

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
			className="relative overflow-hidden py-24 md:py-32 min-h-[80vh]"
		>
			{/* ========================================= */}
			{/* MORPHING GRADIENT BLOBS (Background Layer) */}
			{/* ========================================= */}

			{/* Pink morphing blob - top left */}
			<motion.div
				className="absolute top-20 left-10 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl -z-10"
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
				className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl -z-10"
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
				className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl -z-10"
				animate={{
					scale: [1, 1.3, 1],
					rotate: [0, 90, 0],
					borderRadius: ['50% 50% 50% 50%', '40% 60% 50% 50%', '50% 50% 50% 50%']
				}}
				transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
			/>

			{/* Orange accent blob - top right */}
			<motion.div
				className="absolute top-40 right-20 w-64 h-64 bg-orange-500/15 rounded-full blur-3xl -z-10"
				animate={{
					scale: [1, 1.4, 1],
					x: [0, -20, 0],
					y: [0, -40, 0],
				}}
				transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
			/>

			{/* ============================= */}
			{/* PARTICLE SYSTEM (Middle Layer) */}
			{/* ============================= */}
			{particles.map((particle) => (
				<motion.div
					key={particle.id}
					className="absolute w-1 h-1 bg-orange-500/30 rounded-full -z-5"
					initial={{ x: `${particle.x}%`, y: '100%', opacity: 0 }}
					animate={{
						y: '-10%',
						opacity: [0, 1, 0]
					}}
					transition={{
						duration: particle.duration,
						repeat: Infinity,
						delay: particle.delay,
						ease: "linear"
					}}
				/>
			))}

			{/* ========================================== */}
			{/* FLOATING 3D CARDS (Decorative Layer) */}
			{/* ========================================== */}

			{/* Floating Video Card 1 - Top Right */}
			<motion.div
				className="absolute top-32 right-[5%] w-32 h-44 rounded-2xl bg-gradient-to-br from-pink-500/20 to-cyan-500/20 backdrop-blur border border-white/10 -z-5 hidden lg:flex items-center justify-center"
				animate={{
					y: [0, -20, 0],
					rotateZ: [-5, 5, -5],
				}}
				transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
				style={{ transformStyle: 'preserve-3d' }}
			>
				<FiPlayCircle className="w-12 h-12 text-white/50" />
			</motion.div>

			{/* Floating Download Card - Bottom Left */}
			<motion.div
				className="absolute bottom-40 left-[5%] w-28 h-28 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 backdrop-blur border border-white/10 -z-5 hidden lg:flex items-center justify-center"
				animate={{
					y: [0, 15, 0],
					rotate: [5, -5, 5]
				}}
				transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
			>
				<FiDownload className="w-10 h-10 text-orange-400/50" />
			</motion.div>

			{/* Floating Shield Card - Middle Right */}
			<motion.div
				className="absolute top-[60%] right-[15%] w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur border border-white/10 -z-5 hidden lg:flex items-center justify-center"
				animate={{
					y: [0, -12, 0],
					rotateZ: [8, -8, 8],
				}}
				transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
			>
				<FiShield className="w-8 h-8 text-cyan-400/50" />
			</motion.div>

			{/* ========================== */}
			{/* MAIN CONTENT (Foreground) */}
			{/* ========================== */}

			<div className="container relative z-10">
				<div className="max-w-4xl mx-auto text-center">
					{/* Badge - Spring animation */}
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ type: "spring", stiffness: 200, damping: 15 }}
						className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-8"
					>
						<span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
						<span className="text-sm font-medium text-orange-400">
							100% Free
						</span>
					</motion.div>

					{/* Headline - Staggered fade in */}
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
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

					{/* Subheadline with animated gradient */}
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
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
						className="max-w-2xl mx-auto"
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
							className="mt-6 flex flex-wrap items-center justify-center gap-3"
						>
							<span className="text-gray-500 text-sm">Try:</span>
							{['@charlidamelio', '@khaby.lame', '@bellapoarch'].map((example, index) => (
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

					{/* ========================================= */}
					{/* FLOATING FEATURE CARDS */}
					{/* ========================================= */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mt-16">
						{features.map((feature, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.8 + index * 0.1 }}
								whileHover={{ y: -5, scale: 1.02 }}
								className="flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur border border-white/10 hover:border-orange-500/30 transition-all"
							>
								<div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400">
									{feature.icon}
								</div>
								<div className="text-left">
									<h3 className="font-semibold text-sm text-white">
										{feature.title}
									</h3>
									<p className="text-xs text-gray-400">
										{feature.description}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
