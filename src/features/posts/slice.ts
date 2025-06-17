import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import mergeUnique from "../../utils/mergeUnique.ts";

export interface Post {
  id: string;
  name: string;
  tagline: string;
  url: string;
  votesCount: number;
  thumbnail?: {
    url?:string;
  }
}

export type OrderType = 'RANKING' | 'NEWEST';

type FetchPostsArgs = {
  order: OrderType;
  cursor: string | null;
}

interface PostsState {
  posts: Post[];
  hasMorePosts: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  order: OrderType;
  cursor: string | null;
}

export const initialState: PostsState = {
  posts: [],
  hasMorePosts: false,
  status: 'idle',
  error: null,
  order: "RANKING",
  cursor: null,
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (args: FetchPostsArgs) => {
    const { order, cursor = null } = args;
    const response = await fetch("https://api.producthunt.com/v2/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_PRODUCT_HUNT_API_KEY}`,
      },
      body: JSON.stringify({
        query: `query {posts(after: "${cursor}", first: 20, order: ${order}) {
          edges {
            node { id, name, tagline, url, votesCount, thumbnail { url } }
          }
          pageInfo {endCursor, hasNextPage}
        }}`,
      }),
    });

    return (await response.json()).data.posts;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<'RANKING' | 'NEWEST'>) => {
      state.posts = [];
      state.order = action.payload;
      state.status = 'idle';
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const posts = action.payload.edges.map((edge: { cursor: string, node: Post }) => edge.node) as Post[];
        state.posts = mergeUnique(state.posts, posts, 'id');
        state.hasMorePosts = action.payload.pageInfo.hasNextPage;
        state.cursor = action.payload.pageInfo.endCursor;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch posts';
      });
  }
});

export const { setOrder } = postsSlice.actions;
export default postsSlice.reducer;
