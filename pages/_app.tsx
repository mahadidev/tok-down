import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Footer, Navigation } from '../components';
import { Provider, store } from '../redux';
import { SessionProvider } from 'next-auth/react';
import { usePageTracking } from '../lib/hooks/usePageTracking';
import { ErrorBoundary } from '../components/ErrorBoundary';
import '../styles/globals.css';

function AppContent({ Component, pageProps, router }: Omit<AppProps, 'session'>) {
	// Track page views for analytics (excluded on admin pages automatically)
	usePageTracking();

	return <Component {...pageProps} />;
}

export default function App({ Component, pageProps, router }: AppProps) {
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
			</Head>
			<ErrorBoundary>
				<Provider store={store}>
					<SessionProvider session={pageProps.session}>
						<AppContent Component={Component} pageProps={pageProps} router={router} />
					</SessionProvider>
				</Provider>
			</ErrorBoundary>
		</>
	);
}
