'use client';

import { Navigation, Footer } from '../components';
import { FiHeart } from 'react-icons/fi';

export default function SponsorsPage() {
	return (
		<div className="min-h-screen flex flex-col bg-[#121314] text-white">
			<Navigation />

			<main className="flex-1">
				<div className="container py-20">
					<div className="max-w-6xl mx-auto">
						{/* Header */}
						<div className="text-center mb-16">
							<div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full text-orange-400 text-sm font-medium mb-6">
								<FiHeart className="w-4 h-4" />
								Support Our Work
							</div>
							<h1 className="text-4xl md:text-5xl font-bold mb-4">Sponsor Tok Down</h1>
							<p className="text-gray-400 text-lg max-w-2xl mx-auto">
								Help us keep Tok Down free and accessible to everyone. Your support
								enables us to maintain servers, improve features, and provide the best
								service possible.
							</p>
						</div>

						{/* Sponsorship Form */}
						<div className="max-w-xl mx-auto">
							<form className="space-y-6">
								<div>
									<label className="block text-sm font-medium mb-2">Name</label>
									<input type="text" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500/50 transition-all" />
								</div>
								<div>
									<label className="block text-sm font-medium mb-2">Email</label>
									<input type="email" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500/50 transition-all" />
								</div>
								<div>
									<label className="block text-sm font-medium mb-2">Company (Optional)</label>
									<input type="text" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500/50 transition-all" />
								</div>
								<div>
									<label className="block text-sm font-medium mb-2">Tell us about your interest</label>
									<textarea rows={4} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500/50 transition-all resize-none"></textarea>
								</div>
								<button type="submit" className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl font-medium hover:from-orange-600 hover:to-amber-700 transition-all">
									Submit Inquiry
								</button>
							</form>
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}
