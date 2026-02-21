import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';

interface SearchStats {
	totalSearches: number;
	searchesToday: number;
	searchesThisWeek: number;
	successRate: number;
	usernameSearches: number;
	urlSearches: number;
	topSearchTerms: Array<{ term: string; count: number }>;
	recentSearches: Array<{
		id: string;
		search_term: string;
		search_type: string;
		result_count: number;
		status: string;
		created_at: string;
	}>;
}

interface ApiResponse<T> {
	success: boolean;
	data?: T;
	error?: string;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ApiResponse<SearchStats>>,
) {
	// Check authentication
	const session = await getServerSession(req, res, authOptions);
	if (!session) {
		return res.status(401).json({
			success: false,
			error: 'Unauthorized',
		});
	}

	if (req.method !== 'GET') {
		res.setHeader('Allow', ['GET']);
		return res.status(405).json({
			success: false,
			error: 'Method not allowed',
		});
	}

	try {
		const now = new Date();
		const today = startOfDay(now);
		const weekAgo = subDays(today, 7);

		// Total searches
		const { count: totalSearches } = await supabase
			.from('searches')
			.select('*', { count: 'exact', head: true });

		// Searches today
		const { count: searchesToday } = await supabase
			.from('searches')
			.select('*', { count: 'exact', head: true })
			.gte('created_at', today.toISOString());

		// Searches this week
		const { count: searchesThisWeek } = await supabase
			.from('searches')
			.select('*', { count: 'exact', head: true })
			.gte('created_at', weekAgo.toISOString());

		// Success rate
		const { count: successCount } = await supabase
			.from('searches')
			.select('*', { count: 'exact', head: true })
			.eq('status', 'success');

		const successRate = totalSearches && successCount
			? Math.round((successCount / totalSearches) * 100)
			: 0;

		// Username searches
		const { count: usernameSearches } = await supabase
			.from('searches')
			.select('*', { count: 'exact', head: true })
			.eq('search_type', 'username');

		// URL searches
		const { count: urlSearches } = await supabase
			.from('searches')
			.select('*', { count: 'exact', head: true })
			.eq('search_type', 'url');

		// Top search terms
		const { data: allSearches } = await supabase
			.from('searches')
			.select('search_term');

		const termCounts = new Map<string, number>();
		allSearches?.forEach((search) => {
			const term = search.search_term;
			const count = termCounts.get(term) || 0;
			termCounts.set(term, count + 1);
		});

		const topSearchTerms = Array.from(termCounts.entries())
			.map(([term, count]) => ({ term, count }))
			.sort((a, b) => b.count - a.count)
			.slice(0, 10);

		// Recent searches with pagination
		const page = parseInt(req.query.page as string) || 1;
		const perPage = 20;
		const start = (page - 1) * perPage;
		const end = start + perPage - 1;

		const { data: recentSearches } = await supabase
			.from('searches')
			.select('*')
			.order('created_at', { ascending: false })
			.range(start, end);

		const formattedRecentSearches = recentSearches?.map((search) => ({
			id: search.id,
			search_term: search.search_term,
			search_type: search.search_type,
			result_count: search.result_count || 0,
			status: search.status,
			created_at: search.created_at,
		})) || [];

		const stats: SearchStats = {
			totalSearches: totalSearches || 0,
			searchesToday: searchesToday || 0,
			searchesThisWeek: searchesThisWeek || 0,
			successRate,
			usernameSearches: usernameSearches || 0,
			urlSearches: urlSearches || 0,
			topSearchTerms,
			recentSearches: formattedRecentSearches,
		};

		return res.status(200).json({
			success: true,
			data: stats,
		});
	} catch (error: any) {
		return res.status(500).json({
			success: false,
			error: error.message || 'Internal server error',
		});
	}
}
