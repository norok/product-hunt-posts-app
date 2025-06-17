import { describe, it, expect, vi, beforeEach } from 'vitest';
import reducer, {
  initialState,
  setOrder,
  fetchPosts,
  type Post
} from './slice';

// Mock mergeUnique utility
vi.mock('../../utils/mergeUnique.ts', () => ({
  default: vi.fn((original, incoming) => [...original, ...incoming])
}));

describe('posts slice', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('reducers', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle setOrder', () => {
      const newState = reducer(initialState, setOrder('NEWEST'));

      expect(newState.order).toEqual('NEWEST');
      expect(newState.posts).toEqual([]);
      expect(newState.status).toEqual('idle');
    });

    it('should reset posts when changing order', () => {
      const prevState = {
        ...initialState,
        posts: [{ id: '1', name: 'Test', tagline: 'Test', url: '', votesCount: 10 }] as Post[]
      };

      const newState = reducer(prevState, setOrder('NEWEST'));

      expect(newState.posts).toEqual([]);
    });
  });

  describe('async actions', () => {
    it('should set status to loading when fetchPosts is pending', () => {
      const action = { type: fetchPosts.pending.type };
      const state = reducer(initialState, action);

      expect(state.status).toEqual('loading');
    });

    it('should update state when fetchPosts is fulfilled', () => {
      const mockPayload = {
        edges: [
          { node: { id: '1', name: 'Post 1', tagline: 'Tagline 1', url: 'url1', votesCount: 100 } },
          { node: { id: '2', name: 'Post 2', tagline: 'Tagline 2', url: 'url2', votesCount: 200 } }
        ],
        pageInfo: {
          endCursor: 'cursor123',
          hasNextPage: true
        }
      };

      const action = {
        type: fetchPosts.fulfilled.type,
        payload: mockPayload
      };

      const state = reducer(initialState, action);

      expect(state.status).toEqual('succeeded');
      expect(state.posts).toHaveLength(2);
      expect(state.cursor).toEqual('cursor123');
      expect(state.hasMorePosts).toEqual(true);
    });

    it('should handle fetchPosts rejection', () => {
      const errorMessage = 'Network error';
      const action = {
        type: fetchPosts.rejected.type,
        error: { message: errorMessage }
      };

      const state = reducer(initialState, action);

      expect(state.status).toEqual('failed');
      expect(state.error).toEqual(errorMessage);
    });

    it('should use default error message when error has no message', () => {
      const action = {
        type: fetchPosts.rejected.type,
        error: {}
      };

      const state = reducer(initialState, action);

      expect(state.error).toEqual('Failed to fetch posts');
    });
  });
});
