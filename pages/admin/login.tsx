'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';

export default function AdminLoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		try {
			const result = await signIn('credentials', {
				email,
				password,
				redirect: false,
			});

			if (result?.error) {
				setError('Invalid email or password');
			} else {
				router.push('/admin');
				router.refresh();
			}
		} catch (err) {
			setError('An error occurred. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-[#121314] text-white flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				{/* Logo */}
				<div className="text-center mb-8">
					<div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 mb-4">
						<span className="text-white font-bold text-2xl">TD</span>
					</div>
					<h1 className="text-2xl font-bold">Admin Login</h1>
					<p className="text-gray-400 mt-2">
						Sign in to access the admin panel
					</p>
				</div>

				{/* Login Form */}
				<div className="bg-white/5 border border-white/10 rounded-2xl p-8">
					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Error Message */}
						{error && (
							<div className="flex items-center gap-3 p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400">
								<FiAlertCircle className="w-5 h-5 flex-shrink-0" />
								<p className="text-sm">{error}</p>
							</div>
						)}

						{/* Email Field */}
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-400 mb-2"
							>
								Email
							</label>
							<div className="relative">
								<FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
								<input
									id="email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
									placeholder="admin@tokdown.com"
								/>
							</div>
						</div>

						{/* Password Field */}
						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-400 mb-2"
							>
								Password
							</label>
							<div className="relative">
								<FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
								<input
									id="password"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
									placeholder="••••••••"
								/>
							</div>
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							disabled={loading}
							className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-medium rounded-xl hover:from-orange-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
						>
							{loading ? 'Signing in...' : 'Sign In'}
						</button>
					</form>
				</div>

				{/* Back to Home */}
				<div className="text-center mt-8">
					<a
						href="/"
						className="text-sm text-gray-400 hover:text-white transition-colors"
					>
						← Back to home
					</a>
				</div>
			</div>
		</div>
	);
}
