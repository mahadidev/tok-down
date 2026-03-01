import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';

/**
 * Health Check Endpoint
 * Used for deployment monitoring and uptime checks
 */
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// Only allow GET requests
	if (req.method !== 'GET') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	const healthcheck = {
		uptime: process.uptime(),
		timestamp: Date.now(),
		environment: process.env.NODE_ENV || 'development',
		status: 'healthy',
	};

	try {
		// Check Supabase connection
		const { error: supabaseError } = await supabase
			.from('blog_posts')
			.select('id')
			.limit(1);

		if (supabaseError) {
			throw new Error('Supabase connection failed');
		}

		// All checks passed
		return res.status(200).json({
			...healthcheck,
			services: {
				database: 'connected',
			},
		});
	} catch (error: any) {
		// Health check failed
		return res.status(503).json({
			...healthcheck,
			status: 'unhealthy',
			error: error.message,
			services: {
				database: 'disconnected',
			},
		});
	}
}
