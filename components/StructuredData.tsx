import React from 'react';
import Head from 'next/head';

interface StructuredDataProps {
	data: Record<string, unknown>;
}

export const StructuredData: React.FC<StructuredDataProps> = ({ data }) => {
	return (
		<Head>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(data),
				}}
			/>
		</Head>
	);
};

interface OrganizationSchemaProps {
	name?: string;
	url?: string;
	logo?: string;
	description?: string;
	email?: string;
	sameAs?: string[];
	founderName?: string;
	founderUrl?: string;
	foundingDate?: string;
}

export const OrganizationSchema: React.FC<OrganizationSchemaProps> = ({
	name = 'Tok Down',
	url = 'https://tokdown.vercel.app',
	logo = '/opengraph-image.jpg',
	description = 'Download TikTok videos without watermarks. Fast, free, and easy to use.',
	email = 'mahadi.dev.pm@gmail.com',
	sameAs = [],
	founderName = 'Mahadi Hasan',
	founderUrl = 'https://tokdown.vercel.app/#mahadi-hasan',
	foundingDate = '2024',
}) => {
	const schema = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name,
		url,
		logo,
		description,
		email,
		sameAs,
		founder: {
			'@type': 'Person',
			'@id': founderUrl,
			name: founderName,
		},
		foundingDate,
	};

	return <StructuredData data={schema} />;
};

interface FounderSchemaProps {
	name?: string;
	jobTitle?: string;
	description?: string;
	url?: string;
	image?: string;
	sameAs?: string[];
	knowsAbout?: string[];
	email?: string;
}

export const FounderSchema: React.FC<FounderSchemaProps> = ({
	name = 'Mahadi Hasan',
	jobTitle = 'Young Entrepreneur & Founder',
	description = "Full Stack Developer | AI Specialist | Top 1% Freelancer who's driven $100K+ growth through innovative tech solutions",
	url = 'https://mahadidev.vercel.app',
	image = '/img/Mahadi-Hasan-Founder.png',
	sameAs = [
		'https://linkedin.com/in/mahadidev/',
		'https://github.com/mahadidev',
	],
	knowsAbout = [
		'Entrepreneurship',
		'Tech Innovation',
		'Startup Development',
		'AI/LLMs',
		'React',
		'Next.js',
		'TypeScript',
	],
	email = 'mahadi.dev.pm@gmail.com',
}) => {
	const schema = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		'@id': 'https://tokdown.vercel.app/#mahadi-hasan',
		name,
		jobTitle,
		description,
		url,
		image: image.startsWith('http') ? image : `https://tokdown.vercel.app${image}`,
		sameAs,
		knowsAbout,
		email,
		worksFor: {
			'@type': 'Organization',
			name: 'Tok Down',
			url: 'https://tokdown.vercel.app',
		},
	};

	return <StructuredData data={schema} />;
};

interface WebsiteSchemaProps {
	name?: string;
	url?: string;
	description?: string;
}

export const WebsiteSchema: React.FC<WebsiteSchemaProps> = ({
	name = 'Tok Down',
	url = 'https://tokdown.vercel.app',
	description = 'Download TikTok videos without watermarks. Fast, free, and easy to use.',
}) => {
	const schema = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name,
		url,
		description,
		potentialAction: {
			'@type': 'SearchAction',
			target: {
				'@type': 'EntryPoint',
				urlTemplate: `${url}/?s={search_term_string}`,
			},
			'query-input': 'required name=search_term_string',
		},
	};

	return <StructuredData data={schema} />;
};

interface ArticleSchemaProps {
	headline: string;
	image?: string;
	datePublished: string;
	dateModified?: string;
	authorName?: string;
	description?: string;
	url?: string;
}

export const ArticleSchema: React.FC<ArticleSchemaProps> = ({
	headline,
	image,
	datePublished,
	dateModified,
	authorName = 'Mahadi',
	description,
	url = 'https://tokdown.vercel.app',
}) => {
	const schema = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline,
		image: image ? [image] : undefined,
		datePublished,
		dateModified: dateModified || datePublished,
		author: {
			'@type': 'Person',
			name: authorName,
		},
		description,
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': url,
		},
		publisher: {
			'@type': 'Organization',
			name: 'Tok Down',
			logo: {
				'@type': 'ImageObject',
				url: `${url}/opengraph-image.jpg`,
			},
		},
	};

	return <StructuredData data={schema} />;
};

interface BreadcrumbSchemaProps {
	items: Array<{ name: string; url: string }>;
}

export const BreadcrumbSchema: React.FC<BreadcrumbSchemaProps> = ({ items }) => {
	const schema = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: item.url,
		})),
	};

	return <StructuredData data={schema} />;
};

export default StructuredData;
