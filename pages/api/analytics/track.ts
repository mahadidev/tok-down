import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';
import { ApiResponse } from '@/types/blog';
import { nanoid } from 'nanoid';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ApiResponse<null>>,
) {
	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST']);
		return res.status(405).json({
			success: false,
			error: 'Method not allowed',
		});
	}

	try {
		const { page_path, referrer, user_agent } = req.body;

		// Validate required fields
		if (!page_path) {
			return res.status(400).json({
				success: false,
				error: 'page_path is required',
			});
		}

		// Get or create session ID from cookie
		let sessionId = req.cookies.session_id;
		if (!sessionId) {
			sessionId = nanoid();
			// Set cookie for session tracking (30 days)
			res.setHeader(
				'Set-Cookie',
				`session_id=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${
					30 * 24 * 60 * 60
				}`,
			);
		}

		// Record page view
		const { error } = await supabase.from('page_views').insert({
			session_id: sessionId,
			page_path,
			referrer: referrer || null,
			user_agent: user_agent || req.headers['user-agent'] || null,
			viewed_at: new Date().toISOString(),
		});

		if (error) {
			console.error('Analytics tracking error:', error);
			// Don't fail the request if analytics fails
			return res.status(200).json({
				success: true,
				message: 'Page view recorded (with warnings)',
			});
		}

		return res.status(200).json({
			success: true,
			message: 'Page view recorded successfully',
		});
	} catch (error: any) {
		console.error('Analytics tracking error:', error);
		// Don't expose internal errors to client
		return res.status(200).json({
			success: true,
			message: 'Request processed',
		});
	}
}
