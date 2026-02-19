'use client';

import { Navigation, Footer } from '../components';

export default function AboutPage() {
	return (
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
									unwanted watermark. That's why we built Tok Down - to give you
									clean, watermark-free TikTok videos in just a few clicks.
								</p>
							</section>

							<section className="mb-12">
								<h2 className="text-2xl font-bold mb-4">Features</h2>
								<ul className="space-y-3 text-gray-300">
									<li className="flex items-start gap-3">
										<span className="text-orange-400">✓</span>
										<span>
											<strong>No Watermark:</strong> Download clean videos without
											any watermarks
										</span>
									</li>
									<li className="flex items-start gap-3">
										<span className="text-orange-400">✓</span>
										<span>
											<strong>Unlimited Downloads:</strong> No limits on the number
											of videos you can download
										</span>
									</li>
									<li className="flex items-start gap-3">
										<span className="text-orange-400">✓</span>
										<span>
											<strong>Fast & Easy:</strong> Download videos in seconds with
											our streamlined interface
										</span>
									</li>
									<li className="flex items-start gap-3">
										<span className="text-orange-400">✓</span>
										<span>
											<strong>High Quality:</strong> Download videos in their
											original quality
										</span>
									</li>
									<li className="flex items-start gap-3">
										<span className="text-orange-400">✓</span>
										<span>
											<strong>User Search:</strong> Browse and download all videos
											from any TikTok user
										</span>
									</li>
									<li className="flex items-start gap-3">
										<span className="text-orange-400">✓</span>
										<span>
											<strong>100% Free:</strong> No hidden fees or subscriptions
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
	);
}
