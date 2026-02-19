import React from 'react';
import Head from 'next/head';

interface SEOProps {
	title?: string;
	description: string;
	image?: string;
	url?: string;
	type?: string;
	noindex?: boolean;
	noindexSuffix?: string;
	additionalMeta?: Array<{ name: string; content: string }>;
}

const siteUrl = 'https://tokdown.vercel.app';
const defaultTitle = 'Tok Down';
const defaultDescription = 'Download TikTok videos without watermarks. Fast, free, and easy to use. Save your favorite TikTok videos in original quality with just one click.';
const defaultImage = '/opengraph-image.jpg';

export const SEO: React.FC<SEOProps> = ({
	title,
	description,
	image = defaultImage,
	url = siteUrl,
	type = 'website',
	noindex = false,
	noindexSuffix,
	additionalMeta = [],
}) => {
	const fullTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;
	const fullUrl = url.startsWith('http') ? url : `${siteUrl}${url}`;
	const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

	return (
		<Head>
			{/* Primary Meta Tags */}
			<title>{fullTitle}</title>
			<meta name="title" content={fullTitle} />
			<meta name="description" content={description} />

			{/* Open Graph / Facebook */}
			<meta property="og:type" content={type} />
			<meta property="og:url" content={fullUrl} />
			<meta property="og:title" content={fullTitle} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content={fullImage} />
			<meta property="og:site_name" content={defaultTitle} />

			{/* Twitter */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:url" content={fullUrl} />
			<meta name="twitter:title" content={fullTitle} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={fullImage} />

			{/* Canonical URL */}
			<link rel="canonical" href={fullUrl} />

			{/* No Index */}
			{noindex && <meta name="robots" content="noindex, nofollow" />}
			{noindexSuffix && <meta name="googlebot" content={noindexSuffix} />}

			{/* Additional Meta Tags */}
			{additionalMeta.map((meta, index) => (
				<meta key={index} name={meta.name} content={meta.content} />
			))}
		</Head>
	);
};

export default SEO;
