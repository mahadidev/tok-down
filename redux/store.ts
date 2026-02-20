import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import siteReducer from './slice/siteSlice';
import blogReducer from './slice/blogSlice';
import analyticsReducer from './slice/analyticsSlice';

export const store = configureStore({
	reducer: {
		site: siteReducer,
		blog: blogReducer,
		analytics: analyticsReducer,
		// Add RTK Query reducers here when implemented
		// [tiktokApi.reducerPath]: tiktokApi.reducer,
	},
	// Add RTK Query middleware
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			// Thunks may contain async logic
			serializableCheck: false,
		}),
		// .concat(tiktokApi.middleware),
});

// Enable refetchOnFocus/refetchOnReconnect for RTK Query
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
