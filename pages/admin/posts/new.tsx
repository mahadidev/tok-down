'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/admin/AdminLayout';
import PostEditor from '@/components/admin/PostEditor';
import { FiSave, FiX, FiImage } from 'react-icons/fi';
import { useDispatch } from '@/redux';
import { addPost } from '@/redux/slice/blogSlice';
import { nanoid } from 'nanoid';

export default function NewPostPage() {
	const router = useRouter();
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		title: '',
		slug: '',
		excerpt: '',
		content: '',
		cover_image_url: '',
		status: 'draft' as 'draft' | 'published',
		category_ids: [] as string[],
		tag_ids: [] as string[],
	});
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState<any[]>([]);
	const [tags, setTags] = useState<any[]>([]);

	useEffect(() => {
		fetchCategories();
		fetchTags();
	}, []);

	const fetchCategories = async () => {
		try {
			const response = await fetch('/api/blog/categories');
			const data = await response.json();
			if (data.success) {
				setCategories(data.data);
			}
		} catch (error) {
			console.error('Failed to fetch categories:', error);
		}
	};

	const fetchTags = async () => {
		try {
			const response = await fetch('/api/blog/tags');
			const data = await response.json();
			if (data.success) {
				setTags(data.data);
			}
		} catch (error) {
			console.error('Failed to fetch tags:', error);
		}
	};

	const generateSlug = (title: string) => {
		return title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/(^-|-$)/g, '');
	};

	const handleTitleChange = (value: string) => {
		setFormData({
			...formData,
			title: value,
			slug: formData.slug || generateSlug(value),
		});
	};

	const handleSubmit = async (publish = false) => {
		if (!formData.title || !formData.content) {
			alert('Please fill in the required fields');
			return;
		}

		setLoading(true);

		try {
			const payload = {
				...formData,
				status: publish ? 'published' : 'draft',
				published_at: publish ? new Date().toISOString() : undefined,
			};

			const response = await fetch('/api/blog/admin/posts', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'same-origin',
				body: JSON.stringify(payload),
			});

			const data = await response.json();

			if (data.success) {
				dispatch(addPost(data.data));
				router.push('/admin/posts');
			} else {
				alert(data.error || 'Failed to create post');
			}
		} catch (error) {
			console.error('Failed to create post:', error);
			alert('Failed to create post');
		} finally {
			setLoading(false);
		}
	};

	return (
		<AdminLayout>
			<div className="space-y-6">
				{/* Header */}
				<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
					<div>
						<h1 className="text-2xl font-bold">New Post</h1>
						<p className="text-gray-400 text-sm">
							Create a new blog post
						</p>
					</div>
					<div className="flex items-center gap-3">
						<button
							onClick={() => router.push('/admin/posts')}
							className="px-5 py-2.5 text-gray-400 hover:text-white transition-colors"
						>
							Cancel
						</button>
						<button
							onClick={() => handleSubmit(false)}
							disabled={loading}
							className="px-5 py-2.5 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-all disabled:opacity-50"
						>
							Save Draft
						</button>
						<button
							onClick={() => handleSubmit(true)}
							disabled={loading}
							className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-medium rounded-xl hover:from-orange-600 hover:to-amber-700 transition-all disabled:opacity-50"
						>
							<FiSave className="w-5 h-5" />
							{loading ? 'Publishing...' : 'Publish'}
						</button>
					</div>
				</div>

				{/* Form */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Main Content */}
					<div className="lg:col-span-2 space-y-6">
						<div className="bg-white/5 border border-white/10 rounded-2xl p-6">
							<div className="space-y-6">
								{/* Title */}
								<div>
									<label className="block text-sm font-medium text-gray-400 mb-2">
										Title *
									</label>
									<input
										type="text"
										value={formData.title}
										onChange={(e) => handleTitleChange(e.target.value)}
										placeholder="Enter post title..."
										className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all text-xl font-semibold"
									/>
								</div>

								{/* Slug */}
								<div>
									<label className="block text-sm font-medium text-gray-400 mb-2">
										Slug *
									</label>
									<div className="flex items-center gap-2">
										<span className="text-gray-500">/blog/</span>
										<input
											type="text"
											value={formData.slug}
											onChange={(e) =>
												setFormData({ ...formData, slug: e.target.value })
											}
											placeholder="post-url-slug"
											className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
										/>
									</div>
								</div>

								{/* Excerpt */}
								<div>
									<label className="block text-sm font-medium text-gray-400 mb-2">
										Excerpt
									</label>
									<textarea
										value={formData.excerpt}
										onChange={(e) =>
											setFormData({ ...formData, excerpt: e.target.value })
										}
										placeholder="Brief description of the post..."
										rows={2}
										className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none"
									/>
									<p className="text-xs text-gray-500 mt-1">
										Leave empty to auto-generate from content
									</p>
								</div>

								{/* Content */}
								<div>
									<label className="block text-sm font-medium text-gray-400 mb-2">
										Content *
									</label>
									<PostEditor
										content={formData.content}
										onChange={(content) =>
											setFormData({ ...formData, content })
										}
										placeholder="Start writing your post..."
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Sidebar */}
					<div className="space-y-6">
						{/* Cover Image */}
						<div className="bg-white/5 border border-white/10 rounded-2xl p-6">
							<h3 className="font-semibold mb-4 flex items-center gap-2">
								<FiImage className="w-5 h-5" />
								Cover Image
							</h3>
							<input
								type="url"
								value={formData.cover_image_url}
								onChange={(e) =>
									setFormData({
										...formData,
										cover_image_url: e.target.value,
									})
								}
								placeholder="https://example.com/image.jpg"
								className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all text-sm"
							/>
							{formData.cover_image_url && (
								<div className="mt-4 aspect-video rounded-lg overflow-hidden">
									<img
										src={formData.cover_image_url}
										alt="Cover preview"
										className="w-full h-full object-cover"
									/>
								</div>
							)}
						</div>

						{/* Categories */}
						<div className="bg-white/5 border border-white/10 rounded-2xl p-6">
							<h3 className="font-semibold mb-4">Categories</h3>
							<div className="space-y-2">
								{categories.map((category) => (
									<label
										key={category.id}
										className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer"
									>
										<input
											type="checkbox"
											checked={formData.category_ids.includes(category.id)}
											onChange={(e) => {
												if (e.target.checked) {
													setFormData({
														...formData,
														category_ids: [
															...formData.category_ids,
															category.id,
														],
													});
												} else {
													setFormData({
														...formData,
														category_ids:
															formData.category_ids.filter(
																(id) => id !== category.id,
															),
													});
												}
											}}
											className="w-4 h-4 rounded border-white/20 bg-white/5 text-orange-500 focus:ring-orange-500 focus:ring-offset-0"
										/>
										<span className="text-sm">{category.name}</span>
									</label>
								))}
							</div>
						</div>

						{/* Tags */}
						<div className="bg-white/5 border border-white/10 rounded-2xl p-6">
							<h3 className="font-semibold mb-4">Tags</h3>
							<div className="flex flex-wrap gap-2">
								{tags.map((tag) => (
									<button
										key={tag.id}
										type="button"
										onClick={() => {
											if (formData.tag_ids.includes(tag.id)) {
												setFormData({
													...formData,
													tag_ids: formData.tag_ids.filter(
														(id) => id !== tag.id,
													),
												});
											} else {
												setFormData({
													...formData,
													tag_ids: [...formData.tag_ids, tag.id],
												});
											}
										}}
										className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
											formData.tag_ids.includes(tag.id)
												? 'bg-orange-500 text-white'
												: 'bg-white/10 text-gray-400 hover:bg-white/20'
										}`}
									>
										{tag.name}
									</button>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</AdminLayout>
	);
}
