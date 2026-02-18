'use client';

import React from 'react';
import { RootState, useSelector } from '../../redux';
import Feed from '../Feed';

/**
 * SearchResults - Simplified component that only renders the Feed
 * when videos exist or loading state is active.
 * Search functionality has been moved to the Hero component.
 */
const SearchInput = () => {
	const siteState = useSelector((state: RootState) => state.site);

	// Only show if there are videos or currently loading
	if (!siteState.videoLoading && (!siteState.videos || siteState.videos.length === 0)) {
		return null;
	}

	return <Feed />;
};

export default SearchInput;
