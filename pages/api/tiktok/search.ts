import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = 'tiktok-video-no-watermark2.p.rapidapi.com';

if (!RAPIDAPI_KEY) {
	console.error('RAPIDAPI_KEY is not set in environment variables');
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// Only allow POST requests
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	const { username } = req.body;

	if (!username) {
		return res.status(400).json({ error: 'Username is required' });
	}

	try {
		const options = {
			method: 'GET',
			url: `https://${RAPIDAPI_HOST}/user/posts`,
			params: {
				unique_id: username,
				count: '1000',
			},
			headers: {
				'X-RapidAPI-Key': RAPIDAPI_KEY || '',
				'X-RapidAPI-Host': RAPIDAPI_HOST,
			},
		};

		const response = await axios.request(options);
		return res.status(200).json(response.data);
	} catch (error: any) {
		console.error('[ERROR] TikTok Search API Failed:', {
			message: error.message,
			status: error.response?.status,
			statusText: error.response?.statusText,
			data: error.response?.data,
		});

		return res.status(error.response?.status || 500).json({
			error: error.response?.data?.message || 'Failed to fetch videos',
		});
	}
}
