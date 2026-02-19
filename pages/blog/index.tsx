'use client';

import { useEffect, useState } from 'react';
import { Navigation, Footer } from '../../components';
import BlogCard from '../../components/blog/BlogCard';
import { BlogPost } from '@/types/blog';
import { FiSearch } from 'react-icons/fi';
import { SEO } from '../../components/SEO';
import { BreadcrumbSchema } from '../../components/StructuredData';

export default function BlogPage() {
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState('');

	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true);
			try {
				const response = await fetch('/api/blog/posts');
				const data = await response.json();
				if (data.success) {
					setPosts(data.data);
				}
			} catch (error) {
				console.error('Failed to fetch posts:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();
	}, []);

	const filteredPosts = posts.filter((post) =>
		post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
		post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<>
			<SEO
				title="Blog"
				description="Tips, tutorials, and insights about TikTok video downloading and more. Stay updated with the latest features and best practices."
				url="/blog"
			/>
			<BreadcrumbSchema
				items={[
					{ name: 'Home', url: 'https://tokdown.vercel.app/' },
					{ name: 'Blog', url: 'https://tokdown.vercel.app/blog' },
				]}
			/>
			<div className="min-h-screen flex flex-col bg-[#121314] text-white">
			<Navigation />

			<main className="flex-1">
				{/* Header */}
				<div className="bg-gradient-to-b from-orange-500/10 to-transparent py-20">
					<div className="container">
						<h1 className="text-4xl font-bold mb-4">Blog</h1>
						<p className="text-gray-400 text-lg max-w-2xl">
							Tips, tutorials, and insights about TikTok video downloading and more.
						</p>

						{/* Search */}
						<div className="mt-8 max-w-md">
							<div className="relative">
								<FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
								<input
									type="text"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									placeholder="Search posts..."
									className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Posts Grid */}
				<div className="container py-12">
					{loading ? (
						<div className="flex justify-center items-center py-20">
							<div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
						</div>
					) : filteredPosts.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{filteredPosts.map((post) => (
								<BlogCard key={post.id} post={post} />
							))}
						</div>
					) : (
						<div className="text-center py-20">
							<p className="text-gray-400 text-lg">
								{searchQuery
									? 'No posts found matching your search.'
									: 'No posts published yet.'}
							</p>
						</div>
					)}
				</div>
			</main>

			<Footer />
		</div>
		</>
	);
}
