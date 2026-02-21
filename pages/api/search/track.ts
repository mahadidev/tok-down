import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';

interface TrackRequest {
	search_term: string;
	search_type: 'username' | 'url';
	result_count: number;
	status: 'success' | 'error';
}

interface TrackResponse {
	success: boolean;
	message?: string;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<TrackResponse>,
) {
	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST']);
		return res.status(405).json({
			success: false,
			message: 'Method not allowed',
		});
	}

	try {
		const { search_term, search_type, result_count, status } = req.body as TrackRequest;

		// Validate required fields
		if (!search_term || !search_type || typeof result_count !== 'number' || !status) {
			return res.status(400).json({
				success: false,
				message: 'Missing required fields',
			});
		}

		// Validate search_type
		if (!['username', 'url'].includes(search_type)) {
			return res.status(400).json({
				success: false,
				message: 'Invalid search_type. Must be "username" or "url"',
			});
		}

		// Validate status
		if (!['success', 'error'].includes(status)) {
			return res.status(400).json({
				success: false,
				message: 'Invalid status. Must be "success" or "error"',
			});
		}

		// Record search
		const { error } = await supabase.from('searches').insert({
			search_term,
			search_type,
			result_count,
			status,
		});

		if (error) {
			console.error('Search tracking error:', error);
			// Don't fail the request if tracking fails
			return res.status(200).json({
				success: true,
				message: 'Search recorded (with warnings)',
			});
		}

		return res.status(200).json({
			success: true,
			message: 'Search recorded successfully',
		});
	} catch (error: any) {
		console.error('Search tracking error:', error);
		// Don't expose internal errors to client
		return res.status(200).json({
			success: true,
			message: 'Request processed',
		});
	}
}
