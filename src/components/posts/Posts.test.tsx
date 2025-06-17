import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Posts } from './Posts';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPosts } from "../../features/posts/slice";

// Mock the dependencies
vi.mock('../../app/hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn()
}));

vi.mock('../../features/posts/slice', () => ({
  fetchPosts: vi.fn()
}));

vi.mock('@mui/material/CircularProgress', () => ({
  default: () => <span data-testid="circular-progress">Loading...</span>
}));

vi.mock('../', () => ({
  Post: ({ postData }: { postData: { id: string, title: string } }) => (
    <div data-testid={`post-${postData.id}`}>{postData.title}</div>
  )
}));

vi.mock('./posts.module.scss', () => ({
  default: {
    posts: 'posts-class',
    'posts__list': 'posts-list-class',
    loading: 'loading-class'
  }
}));

describe('Posts Component', () => {
  const mockDispatch = vi.fn();
  const mockPosts = [
    { id: '1', title: 'Post 1' },
    { id: '2', title: 'Post 2' },
    { id: '3', title: 'Post 3' }
  ];

  beforeEach(() => {
    vi.resetAllMocks();
    (useAppDispatch as any).mockReturnValue(mockDispatch);
  });

  it('should fetch posts when status is idle', () => {
    (useAppSelector as any).mockReturnValue({
      posts: [],
      status: 'idle',
      error: null,
      order: 'popular',
      cursor: null
    });

    render(<Posts />);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(fetchPosts).toHaveBeenCalledWith({
      order: 'popular',
      cursor: null
    });
  });

  it('should render posts when loading is succeeded', () => {
    (useAppSelector as any).mockReturnValue({
      posts: mockPosts,
      status: 'succeeded',
      error: null,
      order: 'popular',
      cursor: 'next-page'
    });

    render(<Posts />);

    expect(screen.getByTestId('posts-list')).toBeInTheDocument();
    expect(screen.getByTestId('post-1')).toBeInTheDocument();
    expect(screen.getByTestId('post-2')).toBeInTheDocument();
    expect(screen.getByTestId('post-3')).toBeInTheDocument();
  });

  it('should show loading indicator when status is loading', () => {
    (useAppSelector as any).mockReturnValue({
      posts: mockPosts,
      status: 'loading',
      error: null,
      order: 'popular',
      cursor: null
    });

    render(<Posts />);

    expect(screen.getByTestId('circular-progress')).toBeInTheDocument();
  });

  it('should display error message when status is failed', () => {
    const errorMessage = 'Failed to fetch posts';
    (useAppSelector as any).mockReturnValue({
      posts: [],
      status: 'failed',
      error: errorMessage,
      order: 'popular',
      cursor: null
    });

    render(<Posts />);

    expect(screen.getByTestId('error-message')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('should fetch more posts when scrolling near bottom', () => {
    (useAppSelector as any).mockReturnValue({
      posts: mockPosts,
      status: 'succeeded',
      error: null,
      order: 'popular',
      cursor: 'next-page'
    });

    render(<Posts />);

    // Mock the DOM elements and properties needed for scroll handling
    const section = screen.getByTestId('posts-list');
    Object.defineProperty(section, 'scrollTop', { value: 1000 });
    Object.defineProperty(section, 'scrollHeight', { value: 2000 });
    Object.defineProperty(section, 'clientHeight', { value: 800 });

    // Mock querySelector to return a fake li with height
    const mockLi = document.createElement('li');
    Object.defineProperty(mockLi, 'clientHeight', { value: 100 });
    section.querySelector = vi.fn().mockReturnValue(mockLi);

    // Trigger scroll event
    fireEvent.scroll(section);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(fetchPosts).toHaveBeenCalledWith({
      order: 'popular',
      cursor: 'next-page'
    });
  });

  it('should not fetch more posts when not near bottom', () => {
    (useAppSelector as any).mockReturnValue({
      posts: mockPosts,
      status: 'succeeded',
      error: null,
      order: 'popular',
      cursor: 'next-page'
    });

    render(<Posts />);

    // Mock the DOM elements and properties needed for scroll handling
    const section = screen.getByTestId('posts-list');
    Object.defineProperty(section, 'scrollTop', { value: 100 });
    Object.defineProperty(section, 'scrollHeight', { value: 2000 });
    Object.defineProperty(section, 'clientHeight', { value: 800 });

    // Mock querySelector to return a fake li with height
    const mockLi = document.createElement('li');
    Object.defineProperty(mockLi, 'clientHeight', { value: 100 });
    section.querySelector = vi.fn().mockReturnValue(mockLi);

    // Trigger scroll event
    fireEvent.scroll(section);

    expect(mockDispatch).not.toHaveBeenCalled();
  });
});