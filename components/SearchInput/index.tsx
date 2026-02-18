'use client';

import axios from 'axios';
import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiAlertCircle } from 'react-icons/fi';
import {
	RootState,
	setPagination,
	setVideoLoading,
	setVidoes,
	useDispatch,
	useSelector,
} from '../../redux';
import Feed from '../Feed';

const SearchInput = () => {
	const [error, setError] = useState<string | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const siteState = useSelector((state: RootState) => state.site);
	const dispatch = useDispatch();

	// get user post
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

	// clear error
	const onClickInput = () => {
		setError(null);
		dispatch(setPagination({ currentPage: 0 }));
	};

	// onclick search button
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

	// handle enter key
	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			onSearch();
		}
	};

	return (
		<>
			<div className="py-12 md:py-16">
				<div className="container">
					<div className="max-w-2xl mx-auto">
						{/* Title */}
						<div className="text-center mb-8">
							<h2 className="text-2xl md:text-3xl font-bold mb-3">
								Find TikTok Videos
							</h2>
							<p className="text-gray-400">
								Enter a username (with @) or paste a video URL
							</p>
						</div>

						{/* Search Input */}
						<div className="relative">
							<FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
							<input
								ref={inputRef}
								onClick={onClickInput}
								onKeyDown={onKeyDown}
								className="w-full h-14 pl-12 pr-32 bg-dark-800/50 border border-dark-700 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
								placeholder="@username or tiktok.com/video/..."
							/>
							<button
								onClick={onSearch}
								disabled={siteState.videoLoading}
								className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-medium rounded-lg hover:from-violet-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
									className="mt-4 flex items-center gap-2 text-red-400"
								>
									<FiAlertCircle className="w-4 h-4 flex-shrink-0" />
									<span className="text-sm">{error}</span>
								</motion.div>
							)}
						</AnimatePresence>

						{/* Helper Text */}
						<div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
							<span>Try:</span>
							<button
								onClick={() => {
									if (inputRef.current) {
										inputRef.current.value = '@charlidamelio';
										onClickInput();
									}
								}}
								className="px-3 py-1.5 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors"
							>
								@charlidamelio
							</button>
							<button
								onClick={() => {
									if (inputRef.current) {
										inputRef.current.value = '@khaby.lame';
										onClickInput();
									}
								}}
								className="px-3 py-1.5 rounded-lg bg-dark-800 hover:bg-dark-700 transition-colors"
							>
								@khaby.lame
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Feed Component */}
			<Feed />
		</>
	);
};

export default SearchInput;
