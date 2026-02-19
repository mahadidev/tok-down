'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/admin/AdminLayout';
import { FiEdit, FiTrash2, FiPlus, FiEye, FiEyeOff } from 'react-icons/fi';
import { useDispatch, useSelector } from '@/redux';
import { setPosts, setBlogLoading, deletePost } from '@/redux/slice/blogSlice';
import { RootState } from '@/redux/store';
import { BlogPost } from '@/types/blog';

export default function AdminPostsPage() {
	const router = useRouter();
	const dispatch = useDispatch();
	const { posts, loading } = useSelector((state: RootState) => state.blog);
	const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

	useEffect(() => {
		fetchPosts();
	}, [filter]);

	const fetchPosts = async () => {
		dispatch(setBlogLoading(true));
		try {
			const status = filter === 'all' ? undefined : filter;
			const url = `/api/blog/admin/posts${status ? `?status=${status}` : ''}`;
			const response = await fetch(url, {
				credentials: 'same-origin',
			});
			const data = await response.json();
			if (data.success) {
				dispatch(setPosts(data.data));
			}
		} catch (error) {
			console.error('Failed to fetch posts:', error);
		} finally {
			dispatch(setBlogLoading(false));
		}
	};

	const handleDelete = async (id: string, title: string) => {
		if (!confirm(`Are you sure you want to delete "${title}"?`)) {
			return;
		}

		try {
			const response = await fetch(`/api/blog/admin/posts/${id}`, {
				method: 'DELETE',
				credentials: 'same-origin',
			});
			const data = await response.json();
			if (data.success) {
				dispatch(deletePost(id));
			}
		} catch (error) {
			console.error('Failed to delete post:', error);
		}
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		});
	};

	const filteredPosts = posts;

	return (
		<AdminLayout>
			<div className="space-y-6">
				{/* Header */}
				<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
					<div>
						<h1 className="text-2xl font-bold">Posts</h1>
						<p className="text-gray-400 text-sm">
							Manage your blog posts
						</p>
					</div>
					<button
						onClick={() => router.push('/admin/posts/new')}
						className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-medium rounded-xl hover:from-orange-600 hover:to-amber-700 transition-all"
					>
						<FiPlus className="w-5 h-5" />
						New Post
					</button>
				</div>

				{/* Filter Tabs */}
				<div className="flex gap-2 border-b border-white/10 pb-1">
					<button
						onClick={() => setFilter('all')}
						className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
							filter === 'all'
								? 'border-orange-500 text-orange-400'
								: 'border-transparent text-gray-400 hover:text-white'
						}`}
					>
						All ({posts.length})
					</button>
					<button
						onClick={() => setFilter('published')}
						className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
							filter === 'published'
								? 'border-orange-500 text-orange-400'
								: 'border-transparent text-gray-400 hover:text-white'
						}`}
					>
						Published ({posts.filter((p) => p.status === 'published').length})
					</button>
					<button
						onClick={() => setFilter('draft')}
						className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
							filter === 'draft'
								? 'border-orange-500 text-orange-400'
								: 'border-transparent text-gray-400 hover:text-white'
						}`}
					>
						Drafts ({posts.filter((p) => p.status === 'draft').length})
					</button>
				</div>

				{/* Posts Table */}
				{loading ? (
					<div className="flex justify-center items-center py-20">
						<div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
					</div>
				) : filteredPosts.length > 0 ? (
					<div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead>
									<tr className="border-b border-white/10">
										<th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
											Title
										</th>
										<th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
											Status
										</th>
										<th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
											Created
										</th>
										<th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
											Published
										</th>
										<th className="px-6 py-4 text-right text-sm font-medium text-gray-400">
											Actions
										</th>
									</tr>
								</thead>
								<tbody>
									{filteredPosts.map((post) => (
										<tr
											key={post.id}
											className="border-b border-white/10 hover:bg-white/5 transition-colors"
										>
											<td className="px-6 py-4">
												<div className="font-medium">{post.title}</div>
												<div className="text-sm text-gray-500">
													/{post.slug}
												</div>
											</td>
											<td className="px-6 py-4">
												<span
													className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full ${
														post.status === 'published'
															? 'bg-green-500/20 text-green-400'
															: 'bg-gray-500/20 text-gray-400'
													}`}
												>
													{post.status === 'published' ? (
														<FiEye className="w-3.5 h-3.5" />
													) : (
														<FiEyeOff className="w-3.5 h-3.5" />
													)}
													{post.status}
												</span>
											</td>
											<td className="px-6 py-4 text-sm text-gray-400">
												{formatDate(post.created_at)}
											</td>
											<td className="px-6 py-4 text-sm text-gray-400">
												{post.published_at
													? formatDate(post.published_at)
													: '-'}
											</td>
											<td className="px-6 py-4">
												<div className="flex items-center justify-end gap-2">
													<button
														onClick={() =>
															router.push(`/admin/posts/${post.id}`)
														}
														className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
														title="Edit"
													>
														<FiEdit className="w-5 h-5" />
													</button>
													<button
														onClick={() =>
															handleDelete(post.id, post.title)
														}
														className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
														title="Delete"
													>
														<FiTrash2 className="w-5 h-5" />
													</button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				) : (
					<div className="text-center py-20 bg-white/5 border border-white/10 rounded-2xl">
						<FiFileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
						<h3 className="text-xl font-semibold mb-2">No posts yet</h3>
						<p className="text-gray-400 mb-6">
							Get started by creating your first blog post
						</p>
						<button
							onClick={() => router.push('/admin/posts/new')}
							className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-medium rounded-xl hover:from-orange-600 hover:to-amber-700 transition-all"
						>
							<FiPlus className="w-5 h-5" />
							Create Post
						</button>
					</div>
				)}
			</div>
		</AdminLayout>
	);
}

// Import icon for empty state
import { FiFileText } from 'react-icons/fi';
