import type { AppProps } from 'next/app';
import { Footer, Navigation } from '../components';
import { Provider, store } from '../redux';
import { SessionProvider } from 'next-auth/react';
import { usePageTracking } from '../lib/hooks/usePageTracking';
import '../styles/globals.css';

function AppContent({ Component, pageProps }: AppProps) {
	// Track page views for analytics (excluded on admin pages automatically)
	usePageTracking();

	return <Component {...pageProps} />;
}

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<SessionProvider session={pageProps.session}>
				<AppContent Component={Component} pageProps={pageProps} />
			</SessionProvider>
		</Provider>
	);
}
