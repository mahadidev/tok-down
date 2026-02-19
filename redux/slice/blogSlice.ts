import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BlogPost, Category, Tag } from '@/types/blog';

export interface BlogState {
	posts: BlogPost[];
	currentPost: BlogPost | null;
	categories: Category[];
	tags: Tag[];
	loading: boolean;
	error: string | null;
	totalPosts: number;
}

const initialState: BlogState = {
	posts: [],
	currentPost: null,
	categories: [],
	tags: [],
	loading: false,
	error: null,
	totalPosts: 0,
};

export const blogSlice = createSlice({
	name: 'blog',
	initialState,
	reducers: {
		setPosts: (state, action: PayloadAction<BlogPost[]>) => {
			state.posts = action.payload;
		},
		setCurrentPost: (state, action: PayloadAction<BlogPost | null>) => {
			state.currentPost = action.payload;
		},
		setCategories: (state, action: PayloadAction<Category[]>) => {
			state.categories = action.payload;
		},
		setTags: (state, action: PayloadAction<Tag[]>) => {
			state.tags = action.payload;
		},
		setBlogLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setBlogError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload;
		},
		setTotalPosts: (state, action: PayloadAction<number>) => {
			state.totalPosts = action.payload;
		},
		addPost: (state, action: PayloadAction<BlogPost>) => {
			state.posts.unshift(action.payload);
			state.totalPosts += 1;
		},
		updatePost: (state, action: PayloadAction<BlogPost>) => {
			const index = state.posts.findIndex((p) => p.id === action.payload.id);
			if (index !== -1) {
				state.posts[index] = action.payload;
			}
			if (state.currentPost?.id === action.payload.id) {
				state.currentPost = action.payload;
			}
		},
		deletePost: (state, action: PayloadAction<string>) => {
			state.posts = state.posts.filter((p) => p.id !== action.payload);
			state.totalPosts -= 1;
			if (state.currentPost?.id === action.payload) {
				state.currentPost = null;
			}
		},
	},
});

export const {
	setPosts,
	setCurrentPost,
	setCategories,
	setTags,
	setBlogLoading,
	setBlogError,
	setTotalPosts,
	addPost,
	updatePost,
	deletePost,
} = blogSlice.actions;

export default blogSlice.reducer;
