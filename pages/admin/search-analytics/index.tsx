'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import {
	FiSearch,
	FiCheckCircle,
	FiUser,
	FiLink,
	FiTrendingUp,
} from 'react-icons/fi';
import { format } from 'date-fns';

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

export default function SearchAnalyticsPage() {
	const [stats, setStats] = useState<SearchStats | null>(null);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	useEffect(() => {
		fetchStats();
	}, [page]);

	const fetchStats = async () => {
		setLoading(true);
		try {
			const response = await fetch(`/api/admin/search-stats?page=${page}`, {
				credentials: 'same-origin',
			});
			const data: ApiResponse<SearchStats> = await response.json();
			if (data.success && data.data) {
				setStats(data.data);
				// Calculate total pages (assuming 20 per page)
				setTotalPages(Math.ceil(data.data.totalSearches / 20));
			}
		} catch (error) {
			console.error('Failed to fetch search stats:', error);
		} finally {
			setLoading(false);
		}
	};

	const formatDate = (dateString: string) => {
		try {
			return format(new Date(dateString), 'MMM dd, yyyy • h:mm a');
		} catch {
			return dateString;
		}
	};

	const truncateTerm = (term: string, maxLength = 40) => {
		if (term.length <= maxLength) return term;
		return term.substring(0, maxLength) + '...';
	};

	const getTypeBadge = (type: string) => {
		if (type === 'username') {
			return (
				<span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30">
					Username
				</span>
			);
		}
		return (
			<span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
				URL
			</span>
		);
	};

	const getStatusBadge = (status: string) => {
		if (status === 'success') {
			return (
				<span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
					Success
				</span>
			);
		}
		return (
			<span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30">
				Error
			</span>
		);
	};

	return (
		<AdminLayout>
			<div className="space-y-8">
				{/* Header */}
				<div>
					<h1 className="text-2xl font-bold">Search Analytics</h1>
					<p className="text-gray-400 mt-1">
						Track user search behavior and trends
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
							{/* Total Searches */}
							<div className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/30 rounded-2xl p-6">
								<div className="flex items-start justify-between">
									<div>
										<p className="text-gray-400 text-sm font-medium mb-1">
											Total Searches
										</p>
										<p className="text-3xl font-bold">
											{stats.totalSearches.toLocaleString()}
										</p>
									</div>
									<div className="text-orange-400">
										<FiSearch className="w-6 h-6" />
									</div>
								</div>
							</div>

							{/* Success Rate */}
							<div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-6">
								<div className="flex items-start justify-between">
									<div>
										<p className="text-gray-400 text-sm font-medium mb-1">
											Success Rate
										</p>
										<p className="text-3xl font-bold">{stats.successRate}%</p>
									</div>
									<div className="text-green-400">
										<FiCheckCircle className="w-6 h-6" />
									</div>
								</div>
							</div>

							{/* Username Searches */}
							<div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-6">
								<div className="flex items-start justify-between">
									<div>
										<p className="text-gray-400 text-sm font-medium mb-1">
											Username Searches
										</p>
										<p className="text-3xl font-bold">
											{stats.usernameSearches.toLocaleString()}
										</p>
									</div>
									<div className="text-purple-400">
										<FiUser className="w-6 h-6" />
									</div>
								</div>
							</div>

							{/* URL Searches */}
							<div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-2xl p-6">
								<div className="flex items-start justify-between">
									<div>
										<p className="text-gray-400 text-sm font-medium mb-1">
											URL Searches
										</p>
										<p className="text-3xl font-bold">
											{stats.urlSearches.toLocaleString()}
										</p>
									</div>
									<div className="text-blue-400">
										<FiLink className="w-6 h-6" />
									</div>
								</div>
							</div>
						</div>

						{/* Quick Stats */}
						<div className="flex items-center gap-6 text-sm">
							<div className="flex items-center gap-2">
								<span className="text-gray-400">Today:</span>
								<span className="font-semibold text-orange-400">
									{stats.searchesToday.toLocaleString()}
								</span>
							</div>
							<div className="flex items-center gap-2">
								<span className="text-gray-400">This Week:</span>
								<span className="font-semibold text-amber-400">
									{stats.searchesThisWeek.toLocaleString()}
								</span>
							</div>
						</div>

						{/* Top Search Terms & Recent Searches */}
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
							{/* Top Search Terms */}
							<div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-2xl p-6">
								<h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
									<FiTrendingUp className="text-orange-400" />
									Top Search Terms
								</h2>
								<div className="space-y-3">
									{stats.topSearchTerms.length > 0 ? (
										stats.topSearchTerms.map((item, index) => (
											<div
												key={index}
												className="flex items-center justify-between p-3 rounded-lg bg-white/5"
											>
												<div className="flex items-center gap-3 min-w-0">
													<span className="text-gray-500 text-sm w-6">
														#{index + 1}
													</span>
													<p className="text-sm font-medium truncate">
														{truncateTerm(item.term, 25)}
													</p>
												</div>
												<span className="text-orange-400 text-sm font-semibold whitespace-nowrap ml-2">
													{item.count}
												</span>
											</div>
										))
									) : (
										<p className="text-gray-500 text-sm text-center py-8">
											No search data yet
										</p>
									)}
								</div>
							</div>

							{/* Recent Searches Table */}
							<div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6">
								<h2 className="text-lg font-semibold mb-4">Recent Searches</h2>
								<div className="overflow-x-auto">
									<table className="w-full">
										<thead>
											<tr className="border-b border-white/10">
												<th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
													Date
												</th>
												<th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
													Search Term
												</th>
												<th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
													Type
												</th>
												<th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
													Status
												</th>
												<th className="text-right py-3 px-4 text-sm font-medium text-gray-400">
													Results
												</th>
											</tr>
										</thead>
										<tbody>
											{stats.recentSearches.length > 0 ? (
												stats.recentSearches.map((search) => (
													<tr
														key={search.id}
														className="border-b border-white/5 hover:bg-white/5"
													>
														<td className="py-3 px-4 text-sm text-gray-400">
															{formatDate(search.created_at)}
														</td>
														<td className="py-3 px-4 text-sm font-medium">
															{truncateTerm(search.search_term)}
														</td>
														<td className="py-3 px-4">
															{getTypeBadge(search.search_type)}
														</td>
														<td className="py-3 px-4">
															{getStatusBadge(search.status)}
														</td>
														<td className="py-3 px-4 text-sm text-gray-400 text-right">
															{search.result_count}
														</td>
													</tr>
												))
											) : (
												<tr>
													<td
														colSpan={5}
														className="py-8 text-center text-gray-500 text-sm"
													>
														No searches recorded yet
													</td>
												</tr>
											)}
										</tbody>
									</table>
								</div>

								{/* Pagination */}
								{totalPages > 1 && (
									<div className="flex items-center justify-center gap-2 mt-6">
										<button
											onClick={() => setPage((p) => Math.max(1, p - 1))}
											disabled={page === 1}
											className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
										>
											Previous
										</button>
										<span className="text-sm text-gray-400">
											Page {page} of {totalPages}
										</span>
										<button
											onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
											disabled={page === totalPages}
											className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
										>
											Next
										</button>
									</div>
								)}
							</div>
						</div>
					</>
				) : (
					<div className="text-center py-20 bg-white/5 border border-white/10 rounded-2xl">
						<FiSearch className="w-16 h-16 text-gray-600 mx-auto mb-4" />
						<h3 className="text-xl font-semibold mb-2">No Search Data</h3>
						<p className="text-gray-400">
							Search analytics will appear once users start searching
						</p>
					</div>
				)}
			</div>
		</AdminLayout>
	);
}
