'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Navigation, Footer } from '../components';
import { FiHeart } from 'react-icons/fi';
import { AiFillCheckCircle } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';
import { BreadcrumbSchema } from '../components/StructuredData';

export default function SponsorsPage() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		company: '',
		message: '',
	});
	const [loading, setLoading] = useState(false);

	// Check for success query param on mount
	useEffect(() => {
		if (router.query.success === 'true') {
			setLoading(false);
			setFormData({ name: '', email: '', company: '', message: '' });
		}
	}, [router.query]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		setLoading(true);
		// FormSubmit handles the actual submission via native form action
	};

	const isSuccess = router.query.success === 'true';

	return (
		<>
			<SEO
				title="Sponsor Tok Down"
				description="Help us keep Tok Down free and accessible to everyone. Your support enables us to maintain servers, improve features, and provide the best service possible."
				url="/sponsors"
			/>
			<BreadcrumbSchema
				items={[
					{ name: 'Home', url: 'https://tokdown.vercel.app/' },
					{ name: 'Sponsors', url: 'https://tokdown.vercel.app/sponsors' },
				]}
			/>
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

						{/* Success Message */}
						{isSuccess && (
							<motion.div
								initial={{ opacity: 0, scale: 0.95, y: 20 }}
								animate={{ opacity: 1, scale: 1, y: 0 }}
								transition={{ duration: 0.4, ease: "easeOut" }}
								className="max-w-xl mx-auto mb-8 bg-dark-700 border-2 border-orange-500/30 rounded-2xl p-10 text-center relative overflow-hidden"
							>
								{/* Animated background glow effect */}
								<div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent" />

								<div className="relative">
									{/* Icon with glow */}
									<div className="inline-flex items-center justify-center w-20 h-20 bg-orange-500/20 rounded-full mb-6 ring-2 ring-orange-500/30">
										<AiFillCheckCircle className="w-10 h-10 text-orange-400" />
									</div>

									<h2 className="text-3xl font-bold text-white mb-3">Inquiry Sent!</h2>
									<p className="text-gray-400 mb-8">
										Thank you for your interest in sponsoring Tok Down. We&apos;ll get back to you soon.
									</p>

									<button
										onClick={() => router.push('/sponsors')}
										className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-xl font-medium hover:from-orange-600 hover:to-amber-700 transition-all"
									>
										Send Another Inquiry
									</button>
								</div>
							</motion.div>
						)}

						{/* Sponsorship Form */}
						{!isSuccess && (
							<div className="max-w-xl mx-auto">
								<form
									action="https://formsubmit.co/mahadi.dev.pm@gmail.com"
									method="POST"
									onSubmit={handleSubmit}
									className="space-y-6"
								>
									{/* FormSubmit configuration */}
									<input type="hidden" name="_subject" value="New sponsor inquiry from Tok Down" />
									<input type="hidden" name="_captcha" value="false" />
									<input type="hidden" name="_template" value="table" />
									<input type="hidden" name="_next" value="https://tokdown.vercel.app/sponsors?success=true" />

									<div>
										<label className="block text-sm font-medium mb-2">Name</label>
										<input
											type="text"
											name="name"
											value={formData.name}
											onChange={handleChange}
											required
											className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500/50 transition-all"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium mb-2">Email</label>
										<input
											type="email"
											name="email"
											value={formData.email}
											onChange={handleChange}
											required
											className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500/50 transition-all"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium mb-2">Company (Optional)</label>
										<input
											type="text"
											name="company"
											value={formData.company}
											onChange={handleChange}
											className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500/50 transition-all"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium mb-2">Tell us about your interest</label>
										<textarea
											name="message"
											value={formData.message}
											onChange={handleChange}
											required
											rows={4}
											className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-orange-500/50 transition-all resize-none"
										/>
									</div>
									<button
										type="submit"
										disabled={loading}
										className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl font-medium hover:from-orange-600 hover:to-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
									>
										{loading ? 'Sending...' : 'Submit Inquiry'}
									</button>
								</form>
							</div>
						)}
					</div>
				</div>
			</main>

			<Footer />
		</div>
		</>
	);
}
