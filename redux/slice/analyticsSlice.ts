import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnalyticsStats } from '@/types/blog';

export interface AnalyticsState {
	stats: AnalyticsStats | null;
	loading: boolean;
	error: string | null;
}

const initialState: AnalyticsState = {
	stats: null,
	loading: false,
	error: null,
};

export const analyticsSlice = createSlice({
	name: 'analytics',
	initialState,
	reducers: {
		setAnalyticsStats: (state, action: PayloadAction<AnalyticsStats>) => {
			state.stats = action.payload;
		},
		setAnalyticsLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setAnalyticsError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload;
		},
	},
});

export const {
	setAnalyticsStats,
	setAnalyticsLoading,
	setAnalyticsError,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;
