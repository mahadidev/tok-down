'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FiFileText, FiEye, FiUsers, FiTrendingUp } from 'react-icons/fi';
import AdminLayout from '@/components/admin/AdminLayout';
import { useDispatch, useSelector } from '@/redux';
import {
	setAnalyticsStats,
	setAnalyticsLoading,
} from '@/redux/slice/analyticsSlice';
import { RootState } from '@/redux/store';

export default function AdminDashboardPage() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const dispatch = useDispatch();
	const { stats } = useSelector((state: RootState) => state.analytics);

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/admin/login');
		}
	}, [status, router]);

	useEffect(() => {
		// Fetch analytics stats
		const fetchStats = async () => {
			dispatch(setAnalyticsLoading(true));
			try {
				const response = await fetch('/api/analytics/stats');
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

		fetchStats();
	}, [dispatch]);

	const statCards = [
		{
			label: 'Total Views',
			value: stats?.totalViews?.toLocaleString() || '0',
			icon: <FiEye className="w-6 h-6" />,
			color: 'from-blue-500/20 to-cyan-500/20',
			borderColor: 'border-blue-500/30',
			iconColor: 'text-blue-400',
		},
		{
			label: 'Unique Visitors',
			value: stats?.uniqueVisitors?.toLocaleString() || '0',
			icon: <FiUsers className="w-6 h-6" />,
			color: 'from-purple-500/20 to-pink-500/20',
			borderColor: 'border-purple-500/30',
			iconColor: 'text-purple-400',
		},
		{
			label: 'Views Today',
			value: stats?.viewsToday?.toLocaleString() || '0',
			icon: <FiTrendingUp className="w-6 h-6" />,
			color: 'from-green-500/20 to-emerald-500/20',
			borderColor: 'border-green-500/30',
			iconColor: 'text-green-400',
		},
		{
			label: 'Blog Posts',
			value: stats?.totalPosts?.toLocaleString() || '0',
			icon: <FiFileText className="w-6 h-6" />,
			color: 'from-orange-500/20 to-amber-500/20',
			borderColor: 'border-orange-500/30',
			iconColor: 'text-orange-400',
		},
	];

	if (status === 'loading') {
		return (
			<div className="min-h-screen bg-[#121314] text-white flex items-center justify-center">
				<div className="text-center">
					<div className="inline-block w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
					<p className="mt-4 text-gray-400">Loading...</p>
				</div>
			</div>
		);
	}

	return (
		<AdminLayout>
			<div className="space-y-8">
				{/* Header */}
				<div>
					<h1 className="text-2xl font-bold">Dashboard</h1>
					<p className="text-gray-400 mt-1">
						Welcome back, {session?.user?.name || 'Admin'}!
					</p>
				</div>

				{/* Stats Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{statCards.map((card) => (
						<div
							key={card.label}
							className={`bg-gradient-to-br ${card.color} border ${card.borderColor} rounded-2xl p-6 transition-all hover:scale-105`}
						>
							<div className="flex items-start justify-between">
								<div>
									<p className="text-gray-400 text-sm font-medium mb-1">
										{card.label}
									</p>
									<p className="text-3xl font-bold">{card.value}</p>
								</div>
								<div className={card.iconColor}>{card.icon}</div>
							</div>
						</div>
					))}
				</div>

				{/* Quick Links */}
				<div className="bg-white/5 border border-white/10 rounded-2xl p-6">
					<h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<a
							href="/admin/posts/new"
							className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-orange-500/20 to-amber-600/20 border border-orange-500/30 hover:from-orange-500/30 hover:to-amber-600/30 transition-all"
						>
							<FiFileText className="w-6 h-6 text-orange-400" />
							<div>
								<p className="font-medium">Create New Post</p>
								<p className="text-sm text-gray-400">
									Write and publish a blog post
								</p>
							</div>
						</a>
						<a
							href="/admin/analytics"
							className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-600/20 border border-blue-500/30 hover:from-blue-500/30 hover:to-cyan-600/30 transition-all"
						>
							<FiTrendingUp className="w-6 h-6 text-blue-400" />
							<div>
								<p className="font-medium">View Analytics</p>
								<p className="text-sm text-gray-400">
									See detailed site statistics
								</p>
							</div>
						</a>
					</div>
				</div>

				{/* Top Pages */}
				{stats?.topPages && stats.topPages.length > 0 && (
					<div className="bg-white/5 border border-white/10 rounded-2xl p-6">
						<h2 className="text-lg font-semibold mb-4">Top Pages</h2>
						<div className="space-y-3">
							{stats.topPages.slice(0, 5).map((page, index) => (
								<div
									key={index}
									className="flex items-center justify-between p-3 rounded-lg bg-white/5"
								>
									<div className="flex items-center gap-3">
										<span className="text-gray-500 text-sm w-6">
											#{index + 1}
										</span>
										<p className="text-sm font-medium truncate max-w-md">
											{page.page_path}
										</p>
									</div>
									<span className="text-gray-400 text-sm">
										{page.views.toLocaleString()} views
									</span>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</AdminLayout>
	);
}
