import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';
import { Tag, CreateTagInput, ApiResponse } from '@/types/blog';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ApiResponse<Tag[] | Tag>>,
) {
	if (req.method === 'GET') {
		try {
			const { data, error } = await supabase
				.from('tags')
				.select('*')
				.order('name');

			if (error) {
				return res.status(500).json({
					success: false,
					error: error.message,
				});
			}

			return res.status(200).json({
				success: true,
				data: data as Tag[],
			});
		} catch (error: any) {
			return res.status(500).json({
				success: false,
				error: error.message || 'Internal server error',
			});
		}
	}

	if (req.method === 'POST') {
		// Check authentication
		const session = await getServerSession(authOptions);
		if (!session) {
			return res.status(401).json({
				success: false,
				error: 'Unauthorized',
			});
		}

		try {
			const input = req.body as CreateTagInput;

			// Validate input
			if (!input.name || !input.slug) {
				return res.status(400).json({
					success: false,
					error: 'Name and slug are required',
				});
			}

			// Check if slug already exists
			const { data: existingTag } = await supabase
				.from('tags')
				.select('id')
				.eq('slug', input.slug)
				.single();

			if (existingTag) {
				return res.status(400).json({
					success: false,
					error: 'A tag with this slug already exists',
				});
			}

			// Create tag
			const { data, error } = await supabase
				.from('tags')
				.insert(input)
				.select()
				.single();

			if (error) {
				return res.status(500).json({
					success: false,
					error: error.message,
				});
			}

			return res.status(201).json({
				success: true,
				data: data as Tag,
				message: 'Tag created successfully',
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
