import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';
import { BlogPost, ApiResponse } from '@/types/blog';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ApiResponse<BlogPost[] | BlogPost>>,
) {
	if (req.method === 'GET') {
		try {
			const { slug, category, tag, limit = 12, page = 1 } = req.query;

			let query = supabase
				.from('blog_posts')
				.select(
					`
					*,
					categories (id, name, slug),
					tags (id, name, slug)
				`,
				)
				.eq('status', 'published')
				.order('published_at', { ascending: false });

			// Filter by slug if getting single post
			if (slug) {
				const { data, error } = await query.eq('slug', slug as string).single();

				if (error) {
					return res.status(404).json({
						success: false,
						error: 'Post not found',
					});
				}

				return res.status(200).json({
					success: true,
					data: data as BlogPost,
				});
			}

			// Filter by category
			if (category) {
				query = query.contains('categories', [{ slug: category }]);
			}

			// Filter by tag
			if (tag) {
				query = query.contains('tags', [{ slug: tag }]);
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

	res.setHeader('Allow', ['GET']);
	return res.status(405).json({
		success: false,
		error: 'Method not allowed',
	});
}
