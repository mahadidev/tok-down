import { configureStore } from '@reduxjs/toolkit';
import siteReducer from './slice/siteSlice';
import blogReducer from './slice/blogSlice';
import analyticsReducer from './slice/analyticsSlice';

export const store = configureStore({
	reducer: {
		site: siteReducer,
		blog: blogReducer,
		analytics: analyticsReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
