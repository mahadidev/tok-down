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
import { RootState, useSelector } from '../redux';

const HomePage = () => {
	const siteState = useSelector((state: RootState) => state.site);

	return (
		<div className="min-h-screen flex flex-col bg-black text-white">
			<Navigation />
			<main className="flex-1">
				{/* Hero Section */}
				<Hero />

				{/* Search Section - includes Feed */}
				<SearchInput />

				{/* Features Section */}
				<Features />

				{/* Stats Section */}
				<Stats />

				{/* How It Works Section */}
				<HowItWorks />
			</main>
			<Footer />
		</div>
	);
};

export default HomePage;
