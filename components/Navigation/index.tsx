'use client';

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { setNavHeight, useDispatch } from '../../redux';
import { FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
	{ name: 'Features', href: '#features' },
	{ name: 'How It Works', href: '#how-it-works' },
];

const Navigation = () => {
	const dispatch = useDispatch();
	const navRef = useRef<HTMLDivElement>(null);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		if (navRef.current) {
			dispatch(setNavHeight(navRef.current?.clientHeight));
		}
	}, [dispatch]);

	return (
		<header
			ref={navRef}
			className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl"
		>
			<div className="container">
				<nav className="flex items-center justify-between h-16">
					{/* Logo */}
					<Link
						className="flex items-center gap-2 group"
						href="/"
						onClick={() => setIsMobileMenuOpen(false)}
					>
						<div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
							<span className="text-white font-bold text-lg">TD</span>
						</div>
						<span className="font-semibold text-lg group-hover:text-violet-400 transition-colors">
							Tok Down
						</span>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center gap-8">
						{navLinks.map((link) => (
							<Link
								key={link.name}
								href={link.href}
								className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
							>
								{link.name}
							</Link>
						))}
						<Link
							href="#"
							className="px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl hover:from-violet-600 hover:to-purple-700 transition-all shadow-lg shadow-violet-500/25"
						>
							Get Started
						</Link>
					</div>

					{/* Mobile Menu Button */}
					<button
						className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						aria-label="Toggle menu"
					>
						{isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
					</button>
				</nav>

				{/* Mobile Menu */}
				<AnimatePresence>
					{isMobileMenuOpen && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.2 }}
							className="md:hidden border-t border-white/10 overflow-hidden"
						>
							<div className="py-4 flex flex-col gap-4">
								{navLinks.map((link) => (
									<Link
										key={link.name}
										href={link.href}
										className="text-base font-medium text-gray-400 hover:text-white transition-colors"
										onClick={() => setIsMobileMenuOpen(false)}
									>
										{link.name}
									</Link>
								))}
								<Link
									href="#"
									className="px-5 py-2.5 text-base font-medium bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl text-center"
									onClick={() => setIsMobileMenuOpen(false)}
								>
									Get Started
								</Link>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</header>
	);
};

export default Navigation;
