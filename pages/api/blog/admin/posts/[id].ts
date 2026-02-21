import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';
import { UpdateBlogPostInput, ApiResponse, BlogPost } from '@/types/blog';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ApiResponse<BlogPost | null>>,
) {
	const { id } = req.query;

	// Check authentication
	const session = await getServerSession(req, res, authOptions);
	if (!session) {
		return res.status(401).json({
			success: false,
			error: 'Unauthorized',
		});
	}

	if (req.method === 'PUT') {
		try {
			const input = req.body as UpdateBlogPostInput;

			// Build update object
			const updateData: any = {};
			if (input.title !== undefined) updateData.title = input.title;
			if (input.excerpt !== undefined) updateData.excerpt = input.excerpt;
			if (input.content !== undefined) updateData.content = input.content;
			if (input.cover_image_url !== undefined)
				updateData.cover_image_url = input.cover_image_url;
			if (input.status !== undefined) {
				updateData.status = input.status;
				// Set published_at if status is being changed to published
				if (input.status === 'published' && !input.published_at) {
					updateData.published_at = new Date().toISOString();
				}
			}
			if (input.published_at !== undefined)
				updateData.published_at = input.published_at;

			// Update post
			const { data, error } = await supabase
				.from('blog_posts')
				.update(updateData)
				.eq('id', id)
				.select()
				.single();

			if (error) {
				return res.status(500).json({
					success: false,
					error: error.message,
				});
			}

			// Handle categories if provided
			if (input.category_ids !== undefined) {
				// Delete existing relations
				await supabase
					.from('blog_post_categories')
					.delete()
					.eq('blog_post_id', id);

				// Add new relations
				if (input.category_ids.length > 0) {
					const categoryRelations = input.category_ids.map(
						(category_id) => ({
							blog_post_id: id,
							category_id,
						}),
					);
					await supabase
						.from('blog_post_categories')
						.insert(categoryRelations);
				}
			}

			// Handle tags if provided
			if (input.tag_ids !== undefined) {
				// Delete existing relations
				await supabase
					.from('blog_post_tags')
					.delete()
					.eq('blog_post_id', id);

				// Add new relations
				if (input.tag_ids.length > 0) {
					const tagRelations = input.tag_ids.map((tag_id) => ({
						blog_post_id: id,
						tag_id,
					}));
					await supabase.from('blog_post_tags').insert(tagRelations);
				}
			}

			return res.status(200).json({
				success: true,
				data: data as BlogPost,
				message: 'Post updated successfully',
			});
		} catch (error: any) {
			return res.status(500).json({
				success: false,
				error: error.message || 'Internal server error',
			});
		}
	}

	if (req.method === 'DELETE') {
		try {
			// Delete category and tag relations first
			await supabase
				.from('blog_post_categories')
				.delete()
				.eq('blog_post_id', id);
			await supabase.from('blog_post_tags').delete().eq('blog_post_id', id);

			// Delete post
			const { error } = await supabase
				.from('blog_posts')
				.delete()
				.eq('id', id);

			if (error) {
				return res.status(500).json({
					success: false,
					error: error.message,
				});
			}

			return res.status(200).json({
				success: true,
				data: null,
				message: 'Post deleted successfully',
			});
		} catch (error: any) {
			return res.status(500).json({
				success: false,
				error: error.message || 'Internal server error',
			});
		}
	}

	res.setHeader('Allow', ['PUT', 'DELETE']);
	return res.status(405).json({
		success: false,
		error: 'Method not allowed',
	});
}
