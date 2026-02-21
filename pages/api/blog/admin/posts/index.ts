import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';
import { CreateBlogPostInput, ApiResponse, BlogPost } from '@/types/blog';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ApiResponse<BlogPost[] | BlogPost>>,
) {
	// Check authentication
	const session = await getServerSession(req, res, authOptions);
	if (!session) {
		return res.status(401).json({
			success: false,
			error: 'Unauthorized',
		});
	}

	if (req.method === 'GET') {
		try {
			const { status, limit = 50, page = 1 } = req.query;

			let query = supabase
				.from('blog_posts')
				.select('*', { count: 'exact' })
				.order('created_at', { ascending: false });

			// Filter by status if provided
			if (status && typeof status === 'string') {
				query = query.eq('status', status);
			}

			// Pagination
			const from = ((Number(page) - 1) * Number(limit));
			const to = from + Number(limit) - 1;
			query = query.range(from, to);

			const { data, error, count } = await query;

			if (error) {
				return res.status(500).json({
					success: false,
					error: error.message,
				});
			}

			return res.status(200).json({
				success: true,
				data: data as BlogPost[],
			});
		} catch (error: any) {
			return res.status(500).json({
				success: false,
				error: error.message || 'Internal server error',
			});
		}
	}

	if (req.method === 'POST') {
		try {
			const input = req.body as CreateBlogPostInput;

			// Validate input
			if (!input.title || !input.content || !input.slug) {
				return res.status(400).json({
					success: false,
					error: 'Title, content, and slug are required',
				});
			}

			// Check if slug already exists
			const { data: existingPost } = await supabase
				.from('blog_posts')
				.select('id')
				.eq('slug', input.slug)
				.single();

			if (existingPost) {
				return res.status(400).json({
					success: false,
					error: 'A post with this slug already exists',
				});
			}

			// Create post
			const { data, error } = await supabase
				.from('blog_posts')
				.insert({
					title: input.title,
					slug: input.slug,
					excerpt: input.excerpt || null,
					content: input.content,
					cover_image_url: input.cover_image_url || null,
					status: input.status || 'draft',
					published_at:
						input.status === 'published'
							? input.published_at || new Date().toISOString()
							: null,
					author_id: session.user.id,
				})
				.select()
				.single();

			if (error) {
				return res.status(500).json({
					success: false,
					error: error.message,
				});
			}

			// Handle categories if provided
			if (input.category_ids && input.category_ids.length > 0) {
				const categoryRelations = input.category_ids.map((category_id) => ({
					blog_post_id: data.id,
					category_id,
				}));
				await supabase
					.from('blog_post_categories')
					.insert(categoryRelations);
			}

			// Handle tags if provided
			if (input.tag_ids && input.tag_ids.length > 0) {
				const tagRelations = input.tag_ids.map((tag_id) => ({
					blog_post_id: data.id,
					tag_id,
				}));
				await supabase.from('blog_post_tags').insert(tagRelations);
			}

			return res.status(201).json({
				success: true,
				data: data as BlogPost,
				message: 'Post created successfully',
			});
		} catch (error: any) {
			return res.status(500).json({
				success: false,
				error: error.message || 'Internal server error',
			});
		}
	}

	res.setHeader('Allow', ['GET', 'POST']);
	return res.status(405).json({
		success: false,
		error: 'Method not allowed',
	});
}
