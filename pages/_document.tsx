import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				{/* Theme Color */}
				<meta name="theme-color" content="#121314" />
				<meta name="msapplication-TileColor" content="#121314" />

				{/* Favicon */}
				<link rel="icon" href="/favicon.ico" />

				{/* Manifest */}
				<link rel="manifest" href="/manifest.json" />

				{/* Additional Meta */}
				<meta name="application-name" content="Tok Down" />
				<meta name="apple-mobile-web-app-title" content="Tok Down" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

				{/* DNS Prefetch for performance */}
				<link rel="dns-prefetch" href="//tiktok-video-no-watermark2.p.rapidapi.com" />
				<link rel="preconnect" href="https://tiktok-video-no-watermark2.p.rapidapi.com" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
