'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FiCalendar, FiUser, FiArrowRight } from 'react-icons/fi';
import { BlogPost } from '@/types/blog';

interface BlogCardProps {
	post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	return (
		<article className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all group">
			{/* Cover Image */}
			{post.cover_image_url && (
				<div className="aspect-video overflow-hidden relative">
					<Image
						src={post.cover_image_url}
						alt={post.title}
						fill
						className="object-cover group-hover:scale-105 transition-transform duration-500"
						unoptimized
					/>
				</div>
			)}

			{/* Content */}
			<div className="p-6">
				{/* Categories */}
				{post.categories && post.categories.length > 0 && (
					<div className="flex flex-wrap gap-2 mb-3">
						{post.categories.map((category) => (
							<span
								key={category.id}
								className="px-3 py-1 text-xs font-medium bg-orange-500/20 text-orange-400 rounded-full"
							>
								{category.name}
							</span>
						))}
					</div>
				)}

				{/* Title */}
				<h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-orange-400 transition-colors">
					<Link href={`/blog/${post.slug}`}>{post.title}</Link>
				</h3>

				{/* Excerpt */}
				{post.excerpt && (
					<p className="text-gray-400 text-sm mb-4 line-clamp-3">
						{post.excerpt}
					</p>
				)}

				{/* Meta */}
				<div className="flex items-center justify-between text-sm text-gray-500">
					<div className="flex items-center gap-4">
						<span className="flex items-center gap-1">
							<FiCalendar className="w-4 h-4" />
							{formatDate(post.published_at || post.created_at)}
						</span>
					</div>
					<Link
						href={`/blog/${post.slug}`}
						className="flex items-center gap-1 text-orange-400 hover:text-orange-300 transition-colors"
					>
						Read More
						<FiArrowRight className="w-4 h-4" />
					</Link>
				</div>

				{/* Tags */}
				{post.tags && post.tags.length > 0 && (
					<div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10">
						{post.tags.slice(0, 3).map((tag) => (
							<span
								key={tag.id}
								className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
							>
								#{tag.name}
							</span>
						))}
					</div>
				)}
			</div>
		</article>
	);
};

export default BlogCard;
