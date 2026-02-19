'use client';

import { useState } from 'react';
import { Navigation, Footer } from '../components';
import { FiMail, FiSend } from 'react-icons/fi';
import { SEO } from '../components/SEO';
import { BreadcrumbSchema } from '../components/StructuredData';

export default function ContactPage() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	});
	const [loading, setLoading] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		// For now, just simulate sending
		// In production, you'd integrate with a form service or email API
		setTimeout(() => {
			setLoading(false);
			setSubmitted(true);
			setFormData({ name: '', email: '', subject: '', message: '' });
		}, 1000);
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

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
							Have a question, feedback, or suggestion? We'd love to hear from you.
						</p>

						{submitted ? (
							<div className="bg-green-500/20 border border-green-500/30 rounded-2xl p-8 text-center">
								<div className="text-6xl mb-4">✓</div>
								<h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
								<p className="text-gray-400">
									Thank you for reaching out. We'll get back to you soon.
								</p>
								<button
									onClick={() => setSubmitted(false)}
									className="mt-6 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl font-medium hover:from-orange-600 hover:to-amber-700 transition-all"
								>
									Send Another Message
								</button>
							</div>
						) : (
							<form onSubmit={handleSubmit} className="space-y-6">
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
