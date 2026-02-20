/**
 * Main Components Barrel File
 * Export all components from a single entry point
 */

// Hero components
export * from './Hero';

// Video components
export * from './Video';

// Feed components
export * from './Feed';

// Error components
export * from './Error';

// UI components
export * from './ui';

// Animation components
export * from './animations';

// Other components
export { default as Navigation } from './Navigation';
export { default as Footer } from './Footer';
export { default as Sponsors } from './Sponsors';
export { default as Features } from './Features';
export { default as Stats } from './Stats';
export { default as HowItWorks } from './HowItWorks';

// Legacy component exports (for backward compatibility)
// Import from the original component files (renamed from index.tsx)
export { default as Hero } from './Hero/Hero';
export { default as Video } from './Video/Video';
export { default as Feed } from './Feed/Feed';
export { default as SearchInput } from './SearchInput';
