'use client';

import { useEffect, useState } from 'react';
import { Navigation, Footer } from '../../components';
import BlogContent from '../../components/blog/BlogContent';
import { BlogPost } from '@/types/blog';
import { FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';
import { SEO } from '../../components/SEO';
import { ArticleSchema, BreadcrumbSchema } from '../../components/StructuredData';

export default function BlogPostPage({ slug }: { slug: string }) {
	const [post, setPost] = useState<BlogPost | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPost = async () => {
			setLoading(true);
			try {
				const response = await fetch(`/api/blog/posts?slug=${slug}`);
				const data = await response.json();
				if (data.success) {
					setPost(data.data);
				}
			} catch (error) {
				console.error('Failed to fetch post:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchPost();
	}, [slug]);

	if (loading) {
		return (
			<>
				<SEO
					title="Loading..."
					description="Loading blog post..."
					noindex={true}
				/>
				<div className="min-h-screen flex flex-col bg-[#121314] text-white">
					<Navigation />
					<main className="flex-1 flex items-center justify-center">
						<div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
					</main>
					<Footer />
				</div>
			</>
		);
	}

	if (!post) {
		return (
			<>
				<SEO
					title="Post Not Found"
					description="The blog post you're looking for doesn't exist."
					noindex={true}
				/>
				<div className="min-h-screen flex flex-col bg-[#121314] text-white">
					<Navigation />
					<main className="flex-1 flex items-center justify-center">
						<div className="text-center">
							<h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
							<p className="text-gray-400 mb-8">
								The post you're looking for doesn't exist.
							</p>
							<Link
								href="/blog"
								className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-medium rounded-xl hover:from-orange-600 hover:to-amber-700 transition-all"
							>
								<FiArrowLeft className="w-5 h-5" />
								Back to Blog
							</Link>
						</div>
					</main>
					<Footer />
				</div>
			</>
		);
	}

	return (
		<>
			{post && (
				<>
					<SEO
						title={post.title}
						description={post.excerpt || post.title}
						image={post.coverImage}
						url={`/blog/${post.slug}`}
						type="article"
					/>
					<ArticleSchema
						headline={post.title}
						image={post.coverImage}
						datePublished={post.createdAt || new Date().toISOString()}
						dateModified={post.updatedAt || post.createdAt || new Date().toISOString()}
						authorName={post.author?.name || 'Mahadi'}
						description={post.excerpt || post.title}
						url={`https://tokdown.vercel.app/blog/${post.slug}`}
					/>
					<BreadcrumbSchema
						items={[
							{ name: 'Home', url: 'https://tokdown.vercel.app/' },
							{ name: 'Blog', url: 'https://tokdown.vercel.app/blog' },
							{ name: post.title, url: `https://tokdown.vercel.app/blog/${post.slug}` },
						]}
					/>
				</>
			)}
			<div className="min-h-screen flex flex-col bg-[#121314] text-white">
			<Navigation />

			<main className="flex-1 py-12">
				{/* Back Button */}
				<div className="container mb-8">
					<Link
						href="/blog"
						className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
					>
						<FiArrowLeft className="w-5 h-5" />
						Back to Blog
					</Link>
				</div>

				{/* Post Content */}
				<div className="container">
					<BlogContent post={post} />
				</div>
			</main>

			<Footer />
		</div>
		</>
	);
}

// This function gets called at build time for static generation
// or at request time for server-side rendering
export async function getServerSideProps(context: any) {
	return {
		props: {
			slug: context.query.slug || '',
		},
	};
}
