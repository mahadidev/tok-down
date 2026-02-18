/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./cmpt/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				border: 'hsl(var(--border))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					50: '#f5f3ff',
					100: '#ede9fe',
					200: '#ddd6fe',
					300: '#c4b5fd',
					400: '#a78bfa',
					500: '#8b5cf6',
					600: '#7c3aed',
					700: '#6d28d9',
					800: '#5b21b6',
					900: '#4c1d95',
				},
				secondary: 'hsl(var(--secondary))',
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					violet: '#8b5cf6',
					purple: '#6366f1',
					indigo: '#6366f1',
				},
				// Background colors
				black: '#0a0a0a',
				dark: {
					50: '#fafafa',
					100: '#f5f5f5',
					150: '#e5e5e5',
					200: '#d4d4d4',
					250: '#a3a3a3',
					300: '#737373',
					400: '#525252',
					500: '#404040',
					600: '#262626',
					700: '#171717',
					800: '#141414',
					900: '#0a0a0a',
					950: '#050505',
				},
			},
			borderRadius: {
				lg: '12px',
				xl: '16px',
				'2xl': '20px',
				'3xl': '24px',
			},
			spacing: {
				18: '4.5rem',
				88: '22rem',
				128: '32rem',
			},
			animation: {
				'shimmer': 'shimmer 2s linear infinite',
				'marquee': 'marquee 25s linear infinite',
				'spin-slow': 'spin 3s linear infinite',
				'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
			},
			keyframes: {
				shimmer: {
					from: { backgroundPosition: '0 0' },
					to: { backgroundPosition: '-200% 0' },
				},
				marquee: {
					'0%': { transform: 'translateX(0%)' },
					'100%': { transform: 'translateX(-100%)' },
				},
			},
			backdropBlur: {
				xs: '2px',
			},
		},
	},
	plugins: [],
};
