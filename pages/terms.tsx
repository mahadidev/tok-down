'use client';

import { Navigation, Footer } from '../components';
import { SEO } from '../components/SEO';
import { BreadcrumbSchema } from '../components/StructuredData';

export default function TermsOfServicePage() {
	return (
		<>
			<SEO
				title="Terms of Service"
				description="Read the Terms of Service for Tok Down. Learn about your rights and responsibilities when using our TikTok video downloader service."
				url="/terms"
			/>
			<BreadcrumbSchema
				items={[
					{ name: 'Home', url: 'https://tokdown.vercel.app/' },
					{ name: 'Terms', url: 'https://tokdown.vercel.app/terms' },
				]}
			/>
			<div className="min-h-screen flex flex-col bg-[#121314] text-white">
			<Navigation />

			<main className="flex-1">
				<div className="container py-20">
					<div className="max-w-4xl mx-auto">
						<h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
						<p className="text-gray-400 mb-12">
							Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
						</p>

						<div className="prose prose-invert prose-lg max-w-none space-y-8">
							<section>
								<h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
								<p className="text-gray-300 leading-relaxed">
									{`By accessing or using Tok Down ("Service"), you agree to be bound by
									these Terms of Service ("Terms"). If you disagree with any part of these
									terms, you may not access the Service.`}
								</p>
							</section>

							<section>
								<h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
								<p className="text-gray-300 leading-relaxed">
									{`Tok Down is a free online tool that allows users to download TikTok videos
									without watermarks. Our service is provided "as is" without any warranties,
									expressed or implied.`}
								</p>
							</section>

							<section>
								<h2 className="text-2xl font-bold mb-4">3. User Responsibilities</h2>
								<p className="text-gray-300 leading-relaxed mb-3">By using Tok Down, you agree to:</p>
								<ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
									<li>Use the service only for lawful purposes</li>
									<li>Respect the intellectual property rights of content creators</li>
									<li>Not download videos for commercial purposes without permission</li>
									<li>Not attempt to circumvent any technical measures we have in place</li>
									<li>Not use automated scripts to abuse the service</li>
								</ul>
							</section>

							<section>
								<h2 className="text-2xl font-bold mb-4">4. Intellectual Property Rights</h2>
								<h3 className="text-xl font-semibold mb-3 mt-6">4.1 TikTok Content</h3>
								<p className="text-gray-300 leading-relaxed mb-3">
									All videos downloaded through Tok Down remain the property of their
									respective creators and TikTok. We do not claim ownership of any content.
								</p>
								<h3 className="text-xl font-semibold mb-3 mt-6">4.2 Downloaded Videos</h3>
								<p className="text-gray-300 leading-relaxed">
									You are responsible for ensuring that your use of downloaded videos complies
									with applicable copyright laws and TikTok&apos;s terms of service. We recommend:
								</p>
								<ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
									<li>Using downloaded videos only for personal, non-commercial purposes</li>
									<li>Attributing the original creator when sharing</li>
									<li>Not re-uploading content without the creator&apos;s permission</li>
								</ul>
								<h3 className="text-xl font-semibold mb-3 mt-6">4.3 Our Content</h3>
								<p className="text-gray-300 leading-relaxed">
									The design, layout, and code of Tok Down are our intellectual property and
									are protected by copyright laws.
								</p>
							</section>

							<section>
								<h2 className="text-2xl font-bold mb-4">5. Limitation of Liability</h2>
								<p className="text-gray-300 leading-relaxed">
									Tok Down shall not be liable for any indirect, incidental, special,
									consequential, or punitive damages resulting from your use of the service.
									This includes but is not limited to:
								</p>
								<ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mt-3">
									<li>Copyright infringement claims from third parties</li>
									<li>Device or software damage from downloaded content</li>
									<li>Service interruptions or unavailability</li>
									<li>Loss of data or information</li>
								</ul>
							</section>

							<section>
								<h2 className="text-2xl font-bold mb-4">6. Disclaimer of Warranties</h2>
								<p className="text-gray-300 leading-relaxed">
									{`Tok Down is provided "as is" and "as available" without any warranties
									of any kind, either express or implied. We do not guarantee that the service
									will be uninterrupted, secure, or error-free.`}
								</p>
							</section>

							<section>
								<h2 className="text-2xl font-bold mb-4">7. Service Availability</h2>
								<p className="text-gray-300 leading-relaxed">
									We reserve the right to modify, suspend, or discontinue the service at any
									time without prior notice. We are not liable to you or any third party for
									any modification, suspension, or discontinuation of the service.
								</p>
							</section>

							<section>
								<h2 className="text-2xl font-bold mb-4">8. User Content</h2>
								<p className="text-gray-300 leading-relaxed">
									You retain ownership of any information you submit to us (such as contact
									form messages). By submitting content, you grant us a non-exclusive,
									royalty-free license to use, reproduce, and display such content for the
									purpose of providing our service.
								</p>
							</section>

							<section>
								<h2 className="text-2xl font-bold mb-4">9. Privacy</h2>
								<p className="text-gray-300 leading-relaxed">
									Your use of Tok Down is also governed by our Privacy Policy, which explains
									how we collect, use, and protect your information. Please review our
									Privacy Policy for more details.
								</p>
							</section>

							<section>
								<h2 className="text-2xl font-bold mb-4">10. Third-Party Links</h2>
								<p className="text-gray-300 leading-relaxed">
									Our service may contain links to third-party websites. We are not responsible
									for the content, privacy policies, or practices of any third-party websites.
									We encourage you to review the terms and policies of any third-party sites
									you visit.
								</p>
							</section>

							<section>
								<h2 className="text-2xl font-bold mb-4">11. Indemnification</h2>
								<p className="text-gray-300 leading-relaxed">
									You agree to indemnify and hold harmless Tok Down and its affiliates from
									any claims, damages, losses, liabilities, and expenses arising from your
									use of the service or violation of these Terms.
								</p>
							</section>

							<section>
								<h2 className="text-2xl font-bold mb-4">12. Termination</h2>
								<p className="text-gray-300 leading-relaxed">
									We may terminate or suspend your access to the service immediately, without
									prior notice, for any breach of these Terms.
								</p>
							</section>

							<section>
								<h2 className="text-2xl font-bold mb-4">13. Governing Law</h2>
								<p className="text-gray-300 leading-relaxed">
									These Terms shall be governed by and construed in accordance with the laws
									of the jurisdiction in which Tok Down is established, without regard to its
									conflict of law provisions.
								</p>
							</section>

							<section>
								<h2 className="text-2xl font-bold mb-4">14. Changes to Terms</h2>
								<p className="text-gray-300 leading-relaxed">
									We reserve the right to modify these Terms at any time. Changes will be
									effective immediately upon posting. Your continued use of the service after
									changes constitutes acceptance of the new Terms.
								</p>
							</section>

							<section>
								<h2 className="text-2xl font-bold mb-4">15. Contact Information</h2>
								<p className="text-gray-300 leading-relaxed">
									If you have questions about these Terms, please contact us at:
								</p>
								<p className="text-gray-300 leading-relaxed mt-3">
									<strong>Email:</strong> mahadi.dev.pm@gmail.com
								</p>
							</section>

							<section className="mt-12 p-6 bg-orange-500/10 border border-orange-500/30 rounded-xl">
								<p className="text-gray-300 leading-relaxed">
									<strong>Important:</strong> Tok Down is not affiliated with, endorsed by,
									or connected to TikTok or ByteDance. TikTok is a registered trademark of
									ByteDance Ltd.
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
