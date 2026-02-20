'use client';

import Image from 'next/image';
import { Navigation, Footer } from '../components';
import { SEO } from '../components/SEO';
import { FounderSchema, OrganizationSchema, BreadcrumbSchema } from '../components/StructuredData';

export default function AboutPage() {
	return (
		<>
			<SEO
				title="About Tok Down"
				description="Learn about Tok Down - a free online tool that allows you to download TikTok videos without watermarks. Fast, easy to use, and completely free."
				url="/about"
			/>
			<BreadcrumbSchema
				items={[
					{ name: 'Home', url: 'https://tokdown.vercel.app/' },
					{ name: 'About', url: 'https://tokdown.vercel.app/about' },
				]}
			/>
			<OrganizationSchema />
			<FounderSchema />
			<div className="min-h-screen flex flex-col bg-[#121314] text-white">
			<Navigation />

			<main className="flex-1">
				<div className="container py-20">
					<div className="max-w-4xl mx-auto">
						<h1 className="text-4xl font-bold mb-8">About Tok Down</h1>

						<div className="prose prose-invert prose-lg max-w-none">
							<section className="mb-12">
								<h2 className="text-2xl font-bold mb-4">
									What is Tok Down?
								</h2>
								<p className="text-gray-300 leading-relaxed mb-4">
									Tok Down is a free online tool that allows you to download TikTok
									videos without watermarks. Our service is designed to be fast,
									easy to use, and completely free for everyone.
								</p>
								<p className="text-gray-300 leading-relaxed">
									We understand the frustration of wanting to save a TikTok video
									for offline viewing or sharing, only to be stuck with an
									unwanted watermark. That&apos;s why we built Tok Down - to give you
									clean, watermark-free TikTok videos in just a few clicks.
								</p>
							</section>

							<section className="mb-12">
								<h2 className="text-2xl font-bold mb-6">Meet Our Founder</h2>
								<div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
									<div className="flex flex-col md:flex-row items-center gap-6">
										{/* Avatar */}
										<Image
											src="/img/Mahadi-Hasan-Founder.png"
											alt="Mahadi - Founder & CEO"
											width={128}
											height={128}
											className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover flex-shrink-0"
										/>

										{/* Info */}
										<div className="text-center md:text-left flex-1">
											<h3 className="text-xl md:text-2xl font-bold text-white mb-2">Mahadi</h3>
											<p className="text-orange-400 font-medium mb-4">Founder & CEO</p>
											<a
												href="https://www.linkedin.com/in/mahadidev/"
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors"
											>
												<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
													<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
												</svg>
												<span className="text-sm">Connect on LinkedIn</span>
											</a>
										</div>
									</div>
								</div>
							</section>

							<section className="mb-12">
								<h2 className="text-2xl font-bold mb-4">Features</h2>
								<ul className="space-y-3 text-gray-300">
									<li className="flex items-start gap-3">
										<span className="text-orange-400">✓</span>
										<span>
											<strong>{'No Watermark:'}</strong> Download clean videos without
											any watermarks
										</span>
									</li>
									<li className="flex items-start gap-3">
										<span className="text-orange-400">✓</span>
										<span>
											<strong>{'Unlimited Downloads:'}</strong> No limits on the number
											of videos you can download
										</span>
									</li>
									<li className="flex items-start gap-3">
										<span className="text-orange-400">✓</span>
										<span>
											<strong>{'Fast & Easy:'}</strong> Download videos in seconds with
											our streamlined interface
										</span>
									</li>
									<li className="flex items-start gap-3">
										<span className="text-orange-400">✓</span>
										<span>
											<strong>{'High Quality:'}</strong> Download videos in their
											original quality
										</span>
									</li>
									<li className="flex items-start gap-3">
										<span className="text-orange-400">✓</span>
										<span>
											<strong>{'User Search:'}</strong> Browse and download all videos
											from any TikTok user
										</span>
									</li>
									<li className="flex items-start gap-3">
										<span className="text-orange-400">✓</span>
										<span>
											<strong>{'100% Free:'}</strong> No hidden fees or subscriptions
										</span>
									</li>
								</ul>
							</section>

							<section className="mb-12">
								<h2 className="text-2xl font-bold mb-4">How It Works</h2>
								<ol className="space-y-3 text-gray-300">
									<li className="flex items-start gap-3">
										<span className="text-orange-400 font-bold">1</span>
										<span>
											Copy the TikTok video URL or enter the username whose videos
											you want to download
										</span>
									</li>
									<li className="flex items-start gap-3">
										<span className="text-orange-400 font-bold">2</span>
										<span>
											Paste the URL or username into our search field and click the
											download button
										</span>
									</li>
									<li className="flex items-start gap-3">
										<span className="text-orange-400 font-bold">3</span>
										<span>
											Wait a moment for our servers to process your request
										</span>
									</li>
									<li className="flex items-start gap-3">
										<span className="text-orange-400 font-bold">4</span>
										<span>
											Click the download button on any video to save it without
											watermark
										</span>
									</li>
								</ol>
							</section>

							<section>
								<h2 className="text-2xl font-bold mb-4">Disclaimer</h2>
								<p className="text-gray-300 leading-relaxed mb-4">
									Tok Down is an independent tool and is not affiliated with,
									endorsed by, or connected to TikTok or ByteDance in any way.
								</p>
								<p className="text-gray-300 leading-relaxed mb-4">
									We respect copyright laws and encourage our users to do the same.
									Please only download videos for personal use and with the
									permission of the content creator.
								</p>
								<p className="text-gray-300 leading-relaxed">
									For any questions, feedback, or suggestions, please feel free to
									contact us through our contact page.
								</p>
							</section>
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</div>
		</>
	);
}
