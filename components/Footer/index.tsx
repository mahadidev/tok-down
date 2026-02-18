'use client';

import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import { setFooterHeight, useDispatch } from '../../redux';
import {
	FiTwitter,
	FiInstagram,
	FiGithub,
	FiMail,
	FiHeart,
} from 'react-icons/fi';

const Footer = () => {
	const dispatch = useDispatch();
	const footerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (footerRef.current) {
			dispatch(setFooterHeight(footerRef.current?.clientHeight));
		}
	}, [dispatch]);

	const productLinks = [
		{ name: 'Features', href: '#features' },
		{ name: 'How It Works', href: '#how-it-works' },
		{ name: 'Pricing', href: '#' },
	];

	const companyLinks = [
		{ name: 'About', href: '#' },
		{ name: 'Blog', href: '#' },
		{ name: 'Contact', href: '#' },
	];

	const legalLinks = [
		{ name: 'Privacy Policy', href: '#' },
		{ name: 'Terms of Service', href: '#' },
		{ name: 'Disclaimer', href: '#' },
	];

	const socialLinks = [
		{ name: 'Twitter', icon: <FiTwitter className="w-5 h-5" />, href: '#' },
		{ name: 'Instagram', icon: <FiInstagram className="w-5 h-5" />, href: '#' },
		{ name: 'GitHub', icon: <FiGithub className="w-5 h-5" />, href: '#' },
		{ name: 'Email', icon: <FiMail className="w-5 h-5" />, href: 'mailto:hello@tokdown.com' },
	];

	return (
		<footer ref={footerRef} className="border-t border-white/10 mt-auto">
			<div className="container py-16">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
					{/* Brand Column */}
					<div className="lg:col-span-2">
						<Link
							href="/"
							className="flex items-center gap-2 mb-4"
						>
							<div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
								<span className="text-white font-bold text-lg">TD</span>
							</div>
							<span className="font-semibold text-lg">Tok Down</span>
						</Link>
						<p className="text-gray-400 text-sm mb-6 max-w-sm">
							The fastest and easiest way to download TikTok videos without
							watermark. 100% free and unlimited downloads.
						</p>

						{/* Social Links */}
						<div className="flex items-center gap-3">
							{socialLinks.map((social) => (
								<Link
									key={social.name}
									href={social.href}
									className="w-10 h-10 rounded-lg bg-dark-800 border border-dark-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-orange-500/50 transition-all"
									aria-label={social.name}
								>
									{social.icon}
								</Link>
							))}
						</div>
					</div>

					{/* Product Links */}
					<div>
						<h3 className="font-semibold mb-4">Product</h3>
						<ul className="space-y-3">
							{productLinks.map((link) => (
								<li key={link.name}>
									<Link
										href={link.href}
										className="text-gray-400 hover:text-white transition-colors text-sm"
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Company Links */}
					<div>
						<h3 className="font-semibold mb-4">Company</h3>
						<ul className="space-y-3">
							{companyLinks.map((link) => (
								<li key={link.name}>
									<Link
										href={link.href}
										className="text-gray-400 hover:text-white transition-colors text-sm"
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Legal Links */}
					<div>
						<h3 className="font-semibold mb-4">Legal</h3>
						<ul className="space-y-3">
							{legalLinks.map((link) => (
								<li key={link.name}>
									<Link
										href={link.href}
										className="text-gray-400 hover:text-white transition-colors text-sm"
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="border-t border-dark-700 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
					<p className="text-gray-500 text-sm flex items-center gap-1">
						© {new Date().getFullYear()} Tok Down. Made with{' '}
						<FiHeart className="w-4 h-4 text-red-500" /> for the community.
					</p>
					<p className="text-gray-500 text-sm">
						This site is not affiliated with TikTok.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
