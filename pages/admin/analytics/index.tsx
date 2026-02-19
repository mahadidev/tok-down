'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import {
	FiEye,
	FiUsers,
	FiTrendingUp,
	FiCalendar,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Cell,
} from '@/components/admin/Charts';
import { useDispatch, useSelector } from '@/redux';
import { setAnalyticsStats, setAnalyticsLoading } from '@/redux/slice/analyticsSlice';
import { RootState } from '@/redux/store';

// Simplified chart components for now
const SimpleBarChart = ({ data }: { data: Array<{ date: string; views: number }> }) => {
	const maxViews = Math.max(...data.map((d) => d.views), 1);

	return (
		<div className="flex items-end gap-1 h-48">
			{data.map((item, index) => (
				<div
					key={index}
					className="flex-1 flex flex-col items-center group"
				>
					<div className="relative w-full flex items-end justify-center h-full">
						<div
							className="w-full max-w-[30px] bg-gradient-to-t from-orange-500 to-amber-500 rounded-t-sm transition-all group-hover:from-orange-400 group-hover:to-amber-400"
							style={{ height: `${(item.views / maxViews) * 100}%` }}
						/>
					</div>
					<span className="text-xs text-gray-500 mt-2 rotate-0 md:rotate-0 truncate w-full text-center">
						{item.date}
					</span>
				</div>
			))}
		</div>
	);
};

export default function AdminAnalyticsPage() {
	const dispatch = useDispatch();
	const { stats, loading } = useSelector((state: RootState) => state.analytics);

	useEffect(() => {
		fetchStats();
	}, []);

	const fetchStats = async () => {
		dispatch(setAnalyticsLoading(true));
		try {
			const response = await fetch('/api/analytics/stats', {
				credentials: 'same-origin',
			});
			const data = await response.json();
			if (data.success) {
				dispatch(setAnalyticsStats(data.data));
			}
		} catch (error) {
			console.error('Failed to fetch analytics:', error);
		} finally {
			dispatch(setAnalyticsLoading(false));
		}
	};

	return (
		<AdminLayout>
			<div className="space-y-8">
				{/* Header */}
				<div>
					<h1 className="text-2xl font-bold">Analytics</h1>
					<p className="text-gray-400 mt-1">
						Track your site's performance and visitor engagement
					</p>
				</div>

				{loading ? (
					<div className="flex justify-center items-center py-20">
						<div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
					</div>
				) : stats ? (
					<>
						{/* Stats Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							{/* Total Views */}
							<div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-2xl p-6">
								<div className="flex items-start justify-between">
									<div>
										<p className="text-gray-400 text-sm font-medium mb-1">
											Total Views
										</p>
										<p className="text-3xl font-bold">
											{stats.totalViews.toLocaleString()}
										</p>
									</div>
									<div className="text-blue-400">
										<FiEye className="w-6 h-6" />
									</div>
								</div>
							</div>

							{/* Unique Visitors */}
							<div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-6">
								<div className="flex items-start justify-between">
									<div>
										<p className="text-gray-400 text-sm font-medium mb-1">
											Unique Visitors
										</p>
										<p className="text-3xl font-bold">
											{stats.uniqueVisitors.toLocaleString()}
										</p>
									</div>
									<div className="text-purple-400">
										<FiUsers className="w-6 h-6" />
									</div>
								</div>
							</div>

							{/* Views Today */}
							<div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-6">
								<div className="flex items-start justify-between">
									<div>
										<p className="text-gray-400 text-sm font-medium mb-1">
											Views Today
										</p>
										<p className="text-3xl font-bold">
											{stats.viewsToday.toLocaleString()}
										</p>
									</div>
									<div className="text-green-400">
										<FiCalendar className="w-6 h-6" />
									</div>
								</div>
							</div>

							{/* Views This Month */}
							<div className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/30 rounded-2xl p-6">
								<div className="flex items-start justify-between">
									<div>
										<p className="text-gray-400 text-sm font-medium mb-1">
											Views This Month
										</p>
										<p className="text-3xl font-bold">
											{stats.viewsThisMonth.toLocaleString()}
										</p>
									</div>
									<div className="text-orange-400">
										<FiTrendingUp className="w-6 h-6" />
									</div>
								</div>
							</div>
						</div>

						{/* Daily Views Chart */}
						<div className="bg-white/5 border border-white/10 rounded-2xl p-6">
							<h2 className="text-lg font-semibold mb-6">Daily Views (Last 30 Days)</h2>
							<SimpleBarChart data={stats.dailyViews} />
						</div>

						{/* Top Pages & Referrers */}
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							{/* Top Pages */}
							<div className="bg-white/5 border border-white/10 rounded-2xl p-6">
								<h2 className="text-lg font-semibold mb-4">Top Pages</h2>
								<div className="space-y-3">
									{stats.topPages.slice(0, 8).map((page, index) => (
										<div
											key={index}
											className="flex items-center justify-between p-3 rounded-lg bg-white/5"
										>
											<div className="flex items-center gap-3 min-w-0">
												<span className="text-gray-500 text-sm w-6">
													#{index + 1}
												</span>
												<p className="text-sm font-medium truncate">
													{page.page_path}
												</p>
											</div>
											<span className="text-gray-400 text-sm whitespace-nowrap ml-2">
												{page.views.toLocaleString()}
											</span>
										</div>
									))}
								</div>
							</div>

							{/* Top Referrers */}
							<div className="bg-white/5 border border-white/10 rounded-2xl p-6">
								<h2 className="text-lg font-semibold mb-4">Top Referrers</h2>
								<div className="space-y-3">
									{stats.referrers.length > 0 ? (
										stats.referrers.slice(0, 8).map((ref, index) => (
											<div
												key={index}
												className="flex items-center justify-between p-3 rounded-lg bg-white/5"
											>
												<div className="flex items-center gap-3 min-w-0">
													<span className="text-gray-500 text-sm w-6">
														#{index + 1}
													</span>
													<p className="text-sm font-medium truncate">
														{ref.referrer === 'Direct'
															? 'Direct Traffic'
															: ref.referrer}
													</p>
												</div>
												<span className="text-gray-400 text-sm whitespace-nowrap ml-2">
													{ref.views.toLocaleString()}
												</span>
											</div>
										))
									) : (
										<p className="text-gray-500 text-sm text-center py-8">
											No referrer data yet
										</p>
									)}
								</div>
							</div>
						</div>
					</>
				) : (
					<div className="text-center py-20 bg-white/5 border border-white/10 rounded-2xl">
						<FiTrendingUp className="w-16 h-16 text-gray-600 mx-auto mb-4" />
						<h3 className="text-xl font-semibold mb-2">No Analytics Data</h3>
						<p className="text-gray-400">
							Analytics will start showing once visitors access your site
						</p>
					</div>
				)}
			</div>
		</AdminLayout>
	);
}
