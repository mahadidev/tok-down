'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { BlogPost } from '@/types/blog';

interface BlogContentProps {
	post: BlogPost;
}

const BlogContent: React.FC<BlogContentProps> = ({ post }) => {
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	return (
		<article className="max-w-4xl mx-auto">
			{/* Cover Image */}
			{post.cover_image_url && (
				<div className="aspect-[21/9] rounded-2xl overflow-hidden mb-8">
					<img
						src={post.cover_image_url}
						alt={post.title}
						className="w-full h-full object-cover"
					/>
				</div>
			)}

			{/* Categories */}
			{post.categories && post.categories.length > 0 && (
				<div className="flex flex-wrap gap-2 mb-4">
					{post.categories.map((category) => (
						<span
							key={category.id}
							className="px-3 py-1 text-sm font-medium bg-orange-500/20 text-orange-400 rounded-full"
						>
							{category.name}
						</span>
					))}
				</div>
			)}

			{/* Title */}
			<h1 className="text-4xl font-bold mb-4">{post.title}</h1>

			{/* Meta */}
			<div className="flex items-center gap-6 text-gray-400 mb-8 pb-8 border-b border-white/10">
				<span className="flex items-center gap-2">
					<FiCalendar className="w-5 h-5" />
					{formatDate(post.published_at || post.created_at)}
				</span>
			</div>

			{/* Content - Render HTML from Tiptap */}
			<div
				className="prose prose-invert prose-lg max-w-none"
				dangerouslySetInnerHTML={{ __html: post.content }}
			/>

			{/* Tags */}
			{post.tags && post.tags.length > 0 && (
				<div className="mt-12 pt-8 border-t border-white/10">
					<h3 className="text-sm font-medium text-gray-400 mb-4">Tags</h3>
					<div className="flex flex-wrap gap-2">
						{post.tags.map((tag) => (
							<span
								key={tag.id}
								className="px-4 py-2 text-sm bg-white/5 text-gray-300 rounded-lg hover:bg-white/10 transition-colors"
							>
								#{tag.name}
							</span>
						))}
					</div>
				</div>
			)}
		</article>
	);
};

export default BlogContent;
