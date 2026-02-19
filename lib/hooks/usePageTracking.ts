import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const usePageTracking = () => {
	const pathname = usePathname();

	useEffect(() => {
		if (typeof window === 'undefined') return;

		// Don't track admin pages
		if (pathname.startsWith('/admin')) return;

		// Track page view
		fetch('/api/analytics/track', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				page_path: pathname,
				referrer: document.referrer,
				user_agent: navigator.userAgent,
			}),
		}).catch((error) => {
			// Silently fail - don't break the app if analytics fails
			console.debug('Analytics tracking failed:', error);
		});
	}, [pathname]);
};
