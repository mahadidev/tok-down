import React from 'react';
import {
	Footer,
	Navigation,
	SearchInput,
	Hero,
	Sponsors,
	Features,
	Stats,
	HowItWorks,
} from '../components';
import { useSelector, RootState } from '../redux';
import { SEO } from '../components/SEO';
import { FounderSchema, OrganizationSchema, WebsiteSchema } from '../components/StructuredData';

const HomePage = () => {
	const hasSearched = useSelector((state: RootState) => state.site.hasSearched);

	return (
		<>
			<SEO
				title="Download TikTok Videos Without Watermark"
				description="Download TikTok videos without watermarks. Fast, free, and easy to use. Save your favorite TikTok videos in original quality with just one click."
				image="/opengraph-image.jpg"
				url="/"
				type="website"
			/>
			<OrganizationSchema />
			<WebsiteSchema />
			<FounderSchema />
			<div className="min-h-screen flex flex-col bg-black text-white">
			<Navigation />
			<main className="flex-1">
				{/* Hero Section - now includes integrated search functionality */}
				<Hero />

				{/* Hide marketing sections when user has searched */}
				{!hasSearched && (
					<>
						{/* Sponsors Section */}
						<Sponsors />

						{/* Features Section */}
						<Features />

						{/* Stats Section */}
						<Stats />

						{/* How It Works Section */}
						<HowItWorks />
					</>
				)}

				{/* Search Results (Feed) - only shows when videos exist */}
				<SearchInput />
			</main>
			<Footer />
		</div>
		</>
	);
};

export default HomePage;
