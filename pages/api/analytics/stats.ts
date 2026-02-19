import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';
import { AnalyticsStats, ApiResponse } from '@/types/blog';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ApiResponse<AnalyticsStats>>,
) {
	// Check authentication
	const session = await getServerSession(authOptions);
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
		const monthAgo = subDays(today, 30);

		// Total views all time
		const { count: totalViews } = await supabase
			.from('page_views')
			.select('*', { count: 'exact', head: true });

		// Unique visitors (count distinct session_ids)
		const { data: uniqueVisitorsData } = await supabase
			.from('page_views')
			.select('session_id');

		const uniqueVisitors = new Set(uniqueVisitorsData?.map((v) => v.session_id))
			.size;

		// Views today
		const { count: viewsToday } = await supabase
			.from('page_views')
			.select('*', { count: 'exact', head: true })
			.gte('viewed_at', today.toISOString());

		// Views this week
		const { count: viewsThisWeek } = await supabase
			.from('page_views')
			.select('*', { count: 'exact', head: true })
			.gte('viewed_at', weekAgo.toISOString());

		// Views this month
		const { count: viewsThisMonth } = await supabase
			.from('page_views')
			.select('*', { count: 'exact', head: true })
			.gte('viewed_at', monthAgo.toISOString());

		// Top pages
		const { data: topPagesData } = await supabase
			.from('page_views')
			.select('page_path')
			.order('viewed_at', { ascending: false });

		// Aggregate top pages
		const pageCounts = new Map<string, number>();
		topPagesData?.forEach((view) => {
			const count = pageCounts.get(view.page_path) || 0;
			pageCounts.set(view.page_path, count + 1);
		});

		const topPages = Array.from(pageCounts.entries())
			.map(([page_path, views]) => ({ page_path, views }))
			.sort((a, b) => b.views - a.views)
			.slice(0, 10);

		// Daily views for the last 30 days
		const dailyViews: Array<{ date: string; views: number }> = [];
		for (let i = 29; i >= 0; i--) {
			const date = subDays(today, i);
			const dayStart = startOfDay(date);
			const dayEnd = endOfDay(date);

			const { count } = await supabase
				.from('page_views')
				.select('*', { count: 'exact', head: true })
				.gte('viewed_at', dayStart.toISOString())
				.lte('viewed_at', dayEnd.toISOString());

			dailyViews.push({
				date: format(date, 'MMM dd'),
				views: count || 0,
			});
		}

		// Top referrers
		const { data: referrerData } = await supabase
			.from('page_views')
			.select('referrer')
			.not('referrer', 'is', null);

		const referrerCounts = new Map<string, number>();
		referrerData?.forEach((view) => {
			const referrer = view.referrer || 'Direct';
			const count = referrerCounts.get(referrer) || 0;
			referrerCounts.set(referrer, count + 1);
		});

		const referrers = Array.from(referrerCounts.entries())
			.map(([referrer, views]) => ({
				referrer:
					referrer.length > 50 ? referrer.substring(0, 50) + '...' : referrer,
				views,
			}))
			.sort((a, b) => b.views - a.views)
			.slice(0, 10);

		// Get total blog posts count
		const { count: totalPosts } = await supabase
			.from('blog_posts')
			.select('*', { count: 'exact', head: true })
			.eq('status', 'published');

		const stats: AnalyticsStats = {
			totalViews: totalViews || 0,
			uniqueVisitors,
			viewsToday: viewsToday || 0,
			viewsThisWeek: viewsThisWeek || 0,
			viewsThisMonth: viewsThisMonth || 0,
			totalPosts: totalPosts || 0,
			topPages,
			dailyViews,
			referrers,
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
