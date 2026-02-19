'use client';

import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import React, { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import {
	FiHome,
	FiFileText,
	FiBarChart2,
	FiLogOut,
	FiMenu,
	FiX,
	FiPlus,
} from 'react-icons/fi';

interface AdminLayoutProps {
	children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
	const router = useRouter();
	const { data: session } = useSession();
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const navItems = [
		{
			name: 'Dashboard',
			href: '/admin',
			icon: <FiHome className="w-5 h-5" />,
		},
		{
			name: 'Posts',
			href: '/admin/posts',
			icon: <FiFileText className="w-5 h-5" />,
		},
		{
			name: 'Analytics',
			href: '/admin/analytics',
			icon: <FiBarChart2 className="w-5 h-5" />,
		},
	];

	const handleLogout = async () => {
		await signOut({ redirect: false });
		router.push('/admin/login');
	};

	return (
		<>
			<Head>
				<meta name="robots" content="noindex, nofollow" />
			</Head>
			<div className="min-h-screen bg-[#121314] text-white flex flex-col lg:flex-row">
			{/* Mobile Header */}
			<div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-black/90 border-b border-white/10">
				<div className="flex items-center justify-between px-4 py-3">
					<Link href="/admin" className="flex items-center gap-2">
						<div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
							<span className="text-white font-bold text-sm">TD</span>
						</div>
						<span className="font-semibold">Tok Down Admin</span>
					</Link>
					<button
						onClick={() => setSidebarOpen(!sidebarOpen)}
						className="p-2 text-gray-400 hover:text-white"
						aria-label="Toggle menu"
					>
						{sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
					</button>
				</div>
			</div>

			{/* Sidebar Overlay */}
			{sidebarOpen && (
				<div
					className="lg:hidden fixed inset-0 z-40 bg-black/50"
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			{/* Sidebar */}
			<aside
				className={`fixed top-0 left-0 z-50 h-screen w-64 bg-black border-r border-white/10 transform transition-transform duration-300 lg:relative lg:z-0 lg:transform-none lg:h-auto lg:self-stretch ${
					sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
				}`}
			>
				<div className="flex flex-col h-full">
					{/* Logo */}
					<div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
						<div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
							<span className="text-white font-bold text-lg">TD</span>
						</div>
						<div>
							<h1 className="font-semibold">Tok Down</h1>
							<p className="text-xs text-gray-500">Admin Panel</p>
						</div>
					</div>

					{/* Navigation */}
					<nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
						{navItems.map((item) => {
							const isActive = router.pathname === item.href;
							return (
								<Link
									key={item.name}
									href={item.href}
									onClick={() => setSidebarOpen(false)}
									className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
										isActive
											? 'bg-gradient-to-r from-orange-500/20 to-amber-600/20 text-orange-400 border border-orange-500/30'
											: 'text-gray-400 hover:text-white hover:bg-white/5'
									}`}
								>
									{item.icon}
									<span className="font-medium">{item.name}</span>
								</Link>
							);
						})}

						{/* New Post Button */}
						<Link
							href="/admin/posts/new"
							onClick={() => setSidebarOpen(false)}
							className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-amber-600 text-white hover:from-orange-600 hover:to-amber-700 transition-all mt-4"
						>
							<FiPlus className="w-5 h-5" />
							<span className="font-medium">New Post</span>
						</Link>
					</nav>

					{/* User Info & Logout */}
					<div className="px-4 py-4 border-t border-white/10">
						<div className="px-4 py-3 mb-3 rounded-lg bg-white/5">
							<p className="text-sm font-medium">{session?.user?.name}</p>
							<p className="text-xs text-gray-500">{session?.user?.email}</p>
						</div>
						<button
							onClick={handleLogout}
							className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
						>
							<FiLogOut className="w-5 h-5" />
							<span className="font-medium">Logout</span>
						</button>
					</div>
				</div>
			</aside>

			{/* Main Content */}
			<div className="flex-1 min-h-screen">
				{/* Spacer for mobile header */}
				<div className="h-16 lg:hidden" />
				<main className="p-4 lg:p-8">{children}</main>
			</div>
		</div>
		</>
	);
};

export default AdminLayout;
