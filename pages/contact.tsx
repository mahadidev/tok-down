'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Navigation, Footer } from '../components';
import { FiMail, FiSend } from 'react-icons/fi';
import { AiFillCheckCircle } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';
import { BreadcrumbSchema } from '../components/StructuredData';

export default function ContactPage() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	});
	const [loading, setLoading] = useState(false);

	// Check for success query param on mount
	useEffect(() => {
		if (router.query.success === 'true') {
			setLoading(false);
			setFormData({ name: '', email: '', subject: '', message: '' });
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
				title="Contact Us"
				description="Have a question, feedback, or suggestion? We'd love to hear from you. Contact the Tok Down team at mahadi.dev.pm@gmail.com"
				url="/contact"
			/>
			<BreadcrumbSchema
				items={[
					{ name: 'Home', url: 'https://tokdown.vercel.app/' },
					{ name: 'Contact', url: 'https://tokdown.vercel.app/contact' },
				]}
			/>
			<div className="min-h-screen flex flex-col bg-[#121314] text-white">
			<Navigation />

			<main className="flex-1">
				<div className="container py-20">
					<div className="max-w-2xl mx-auto">
						<h1 className="text-4xl font-bold mb-4">Contact Us</h1>
						<p className="text-gray-400 text-lg mb-12">
							Have a question, feedback, or suggestion? We&apos;d love to hear from you.
						</p>

						{isSuccess ? (
						<motion.div
							initial={{ opacity: 0, scale: 0.95, y: 20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							transition={{ duration: 0.4, ease: "easeOut" }}
							className="bg-dark-700 border-2 border-orange-500/30 rounded-2xl p-10 text-center relative overflow-hidden"
						>
							{/* Animated background glow effect */}
							<div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent" />

							<div className="relative">
								{/* Icon with glow */}
								<div className="inline-flex items-center justify-center w-20 h-20 bg-orange-500/20 rounded-full mb-6 ring-2 ring-orange-500/30">
									<AiFillCheckCircle className="w-10 h-10 text-orange-400" />
								</div>

								<h2 className="text-3xl font-bold text-white mb-3">Message Sent!</h2>
								<p className="text-gray-400 mb-8">
									Thank you for reaching out. We&apos;ll get back to you soon.
								</p>

								<button
									onClick={() => router.push('/contact')}
									className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-xl font-medium hover:from-orange-600 hover:to-amber-700 transition-all"
								>
									Send Another Message
								</button>
							</div>
						</motion.div>
					) : (
							<form
								action="https://formsubmit.co/mahadi.dev.pm@gmail.com"
								method="POST"
								onSubmit={handleSubmit}
								className="space-y-6"
							>
								{/* FormSubmit configuration */}
								<input type="hidden" name="_subject" value="New contact from Tok Down" />
								<input type="hidden" name="_captcha" value="false" />
								<input type="hidden" name="_template" value="table" />
								<input type="hidden" name="_next" value="https://tokdown.vercel.app/contact?success=true" />

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label
											htmlFor="name"
											className="block text-sm font-medium text-gray-400 mb-2"
										>
											Name
										</label>
										<input
											type="text"
											id="name"
											name="name"
											value={formData.name}
											onChange={handleChange}
											required
											className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
											placeholder="Your name"
										/>
									</div>
									<div>
										<label
											htmlFor="email"
											className="block text-sm font-medium text-gray-400 mb-2"
										>
											Email
										</label>
										<input
											type="email"
											id="email"
											name="email"
											value={formData.email}
											onChange={handleChange}
											required
											className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
											placeholder="your@email.com"
										/>
									</div>
								</div>

								<div>
									<label
										htmlFor="subject"
										className="block text-sm font-medium text-gray-400 mb-2"
									>
										Subject
									</label>
									<input
										type="text"
										id="subject"
										name="subject"
										value={formData.subject}
										onChange={handleChange}
										required
										className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
										placeholder="What's this about?"
									/>
								</div>

								<div>
									<label
										htmlFor="message"
										className="block text-sm font-medium text-gray-400 mb-2"
									>
										Message
									</label>
									<textarea
										id="message"
										name="message"
										value={formData.message}
										onChange={handleChange}
										required
										rows={6}
										className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none"
										placeholder="Tell us more..."
									/>
								</div>

								<button
									type="submit"
									disabled={loading}
									className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-medium rounded-xl hover:from-orange-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
								>
									{loading ? (
										<>Sending...</>
									) : (
										<>
											<FiSend className="w-5 h-5" />
											Send Message
										</>
									)}
								</button>
							</form>
						)}

						{/* Alternative Contact */}
						<div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-2xl">
							<h3 className="font-semibold mb-4">Prefer email?</h3>
							<a
								href="mailto:mahadi.dev.pm@gmail.com"
								className="flex items-center gap-3 text-gray-400 hover:text-orange-400 transition-colors"
							>
								<FiMail className="w-5 h-5" />
								<span>mahadi.dev.pm@gmail.com</span>
							</a>
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</div>
		</>
	);
}
