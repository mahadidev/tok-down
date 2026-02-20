'use client';

import { Navigation, Footer } from '../components';
import { SEO } from '../components/SEO';
import { BreadcrumbSchema } from '../components/StructuredData';

export default function PrivacyPolicyPage() {
	return (
		<>
			<SEO
				title="Privacy Policy"
				description="Read the Privacy Policy for Tok Down. Learn how we collect, use, and protect your personal information when using our TikTok video downloader service."
				url="/privacy"
			/>
			<BreadcrumbSchema
				items={[
					{ name: 'Home', url: 'https://tokdown.vercel.app/' },
					{ name: 'Privacy', url: 'https://tokdown.vercel.app/privacy' },
				]}
			/>
			<div className="min-h-screen flex flex-col bg-[#121314] text-white">
			<Navigation />

			<main className="flex-1">
				<div className="container py-20">
					<div className="max-w-4xl mx-auto">
						<h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
						<p className="text-gray-400 mb-12">
							Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
						</p>

						<div className="prose prose-invert prose-lg max-w-none space-y-8">
							<section>
								<h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
								<p className="text-gray-300 leading-relaxed">
									{`Welcome to Tok Down ("we," "our," or "us"). We are committed to
									protecting your personal information and your right to privacy.
									This Privacy Policy explains how we collect, use, disclose, and
									safeguard your information when you use our service.`}
								</p>
							</section>

							<section>
								<h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>

								<h3 className="text-xl font-semibold mb-3 mt-6">2.1 Information You Provide</h3>
								<p className="text-gray-300 leading-relaxed mb-3">
									Tok Down does not require you to create an account or provide
									personal information to use our service. However, if you choose to
									contact us, we may collect:
								</p>
								<ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
									<li>Name and email address</li>
									<li>Any information you provide in your message</li>
								</ul>

								<h3 className="text-xl font-semibold mb-3 mt-6">2.2 Automatically Collected Information</h3>
								<p className="text-gray-300 leading-relaxed mb-3">
									We automatically collect certain information when you use our service:
								</p>
								<ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
									<li>Browser type and version</li>
									<li>Operating system</li>
									<li>Referring website</li>
									<li>Pages visited and time spent on pages</li>
									<li>IP address (anonymized)</li>
								</ul>

								<h3 className="text-xl font-semibold mb-3 mt-6">2.3 TikTok URLs</h3>
								<p className="text-gray-300 leading-relaxed">
									When you use our service, you provide TikTok video URLs or usernames.
									We only use this information to fetch the requested videos. We do not
									store or share your TikTok credentials or personal TikTok data.
								</p>
							</section>

							<section>
								<h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
								<p className="text-gray-300 leading-relaxed mb-3">We use the collected information to:</p>
								<ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
									<li>Provide, maintain, and improve our service</li>
									<li>Process your requests for video downloads</li>
									<li>Analyze usage patterns to enhance user experience</li>
									<li>Respond to your inquiries and support requests</li>
									<li>Detect, prevent, and address technical issues</li>
								</ul>
							</section>

							<section>
								<h2 className="text-2xl font-bold mb-4">4. Cookies and Tracking</h2>
								<p className="text-gray-300 leading-relaxed mb-3">
									We use essential cookies for:
								</p>
								<ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
									<li>Session management (to track your visit as a unique session)</li>
									<li>Analytics (to understand how our service is used)</li>
								</ul>
								<p className="text-gray-300 leading-relaxed mt-3">
									We do not use advertising or tracking cookies. Our analytics are
									performed anonymously and do not collect personally identifiable information.
								</p>
							</section>

							<section>
								<h2 className="text-2xl font-bold mb-4">5. Data Storage and Retention</h2>
								<p className="text-gray-300 leading-relaxed">
									We do not store downloaded videos on our servers. Videos are temporarily
									processed and served directly to you. User sessions and analytics data
									are retained for statistical purposes only and are anonymized.
								</p>
							</section>

							<section>
								<h2 className="text-2xl font-bold mb-4">6. Third-Party Services</h2>
								<p className="text-gray-300 leading-relaxed">
									We use third-party services to help operate our service, including:
								</p>
								<ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mt-3">
									<li><strong>Supabase:</strong> Database hosting</li>
									<li><strong>Vercel:</strong> Website hosting</li>
								</ul>
								<p className="text-gray-300 leading-relaxed mt-3">
									These third-party service providers have access to your personal
									information only to perform specific tasks on our behalf and are
									obligated not to disclose or use it for any other purpose.
								</p>
							</section>

							<section>
								<h2 className="text-2xl font-bold mb-4">7. Data Security</h2>
								<p className="text-gray-300 leading-relaxed">
									We implement appropriate technical and organizational measures to protect
									your information against unauthorized or unlawful processing, accidental
									loss, destruction, or damage. However, no method of transmission over the
									internet is 100% secure.
								</p>
							</section>

							<section>
								<h2 className="text-2xl font-bold mb-4">8. Children&apos;s Privacy</h2>
								<p className="text-gray-300 leading-relaxed">
									Our service is not intended for children under the age of 13. We do not
									consciously collect personal information from children under 13. If you
									are a parent or guardian and believe your child has provided us with personal
									information, please contact us.
								</p>
							</section>

							<section>
								<h2 className="text-2xl font-bold mb-4">9. Your Rights</h2>
								<p className="text-gray-300 leading-relaxed mb-3">
									Depending on your location, you may have the following rights:
								</p>
								<ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
									<li>Access to your personal information</li>
									<li>Correction of inaccurate information</li>
									<li>Deletion of your personal information</li>
									<li>Objection to processing of your personal information</li>
									<li>Data portability</li>
								</ul>
							</section>

							<section>
								<h2 className="text-2xl font-bold mb-4">10. Changes to This Policy</h2>
								<p className="text-gray-300 leading-relaxed">
									We may update this Privacy Policy from time to time. We will notify you
									of any changes by posting the new Privacy Policy on this page and updating
									the &quot;Last updated&quot; date.
								</p>
							</section>

							<section>
								<h2 className="text-2xl font-bold mb-4">11. Contact Us</h2>
								<p className="text-gray-300 leading-relaxed">
									If you have any questions, concerns, or requests regarding this Privacy
									Policy or our data practices, please contact us at:
								</p>
								<p className="text-gray-300 leading-relaxed mt-3">
									<strong>Email:</strong> mahadi.dev.pm@gmail.com
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
