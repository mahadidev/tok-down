import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { SiteState, SetVideosPayload, SetPaginationPayload } from '@/types/redux';
import { TikTokVideo } from '@/types/tiktok';

const initialState: SiteState = {
	navHeight: 0,
	footerHeight: 0,
	feedTitle: null,
	videos: null,
	videoLoading: false,
	currentPage: 0,
	perPage: 12,
	hasSearched: false,
	searchTerm: null,
};

export const themeSlice = createSlice({
	name: 'site',
	initialState,
	reducers: {
		setNavHeight: (state, action: PayloadAction<number>) => {
			state.navHeight = action.payload;
		},
		setFooterHeight: (state, action: PayloadAction<number>) => {
			state.footerHeight = action.payload;
		},
		setVideoLoading: (state, action: PayloadAction<boolean>) => {
			state.videoLoading = action.payload;
		},
		setVidoes: (state, action: PayloadAction<SetVideosPayload>) => {
			state.feedTitle = action.payload.title;
			state.videos = action.payload.videos;
		},
		setPagination: (state, action: PayloadAction<SetPaginationPayload>) => {
			state.currentPage = action.payload.currentPage ?? state.currentPage;
			state.perPage = action.payload.perPage ?? state.perPage;
		},
		setHasSearched: (state, action: PayloadAction<boolean>) => {
			state.hasSearched = action.payload;
		},
		setSearchTerm: (state, action: PayloadAction<string | null>) => {
			state.searchTerm = action.payload;
		},
	},
});

export const {
	setNavHeight,
	setFooterHeight,
	setVidoes,
	setVideoLoading,
	setPagination,
	setHasSearched,
	setSearchTerm,
} = themeSlice.actions;

export default themeSlice.reducer;
