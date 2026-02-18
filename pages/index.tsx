import React from 'react';
import {
	Footer,
	Navigation,
	SearchInput,
	Hero,
	Features,
	Stats,
	HowItWorks,
} from '../components';

const HomePage = () => {

	return (
		<div className="min-h-screen flex flex-col bg-black text-white">
			<Navigation />
			<main className="flex-1">
				{/* Hero Section - now includes integrated search functionality */}
				<Hero />

				{/* Features Section */}
				<Features />

				{/* Stats Section */}
				<Stats />

				{/* How It Works Section */}
				<HowItWorks />

				{/* Search Results (Feed) - only shows when videos exist */}
				<SearchInput />
			</main>
			<Footer />
		</div>
	);
};

export default HomePage;
