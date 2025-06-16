// src/components/post/Post.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Post } from './Post';
import type { Post as PostDataType } from "../../features/posts/slice";

// Mock the MUI icon
vi.mock('@mui/icons-material/KeyboardDoubleArrowUpRounded', () => ({
  default: () => <div data-testid="upvote-icon">UpvoteIcon</div>
}));

describe('Post Component', () => {
  const mockPostData: PostDataType = {
    id: '123',
    name: 'Test Product',
    tagline: 'This is a test product',
    url: 'https://example.com',
    votesCount: 42,
    thumbnail: {
      url: 'https://example.com/image.jpg'
    }
  };

  it('renders post with correct structure', () => {
    render(<Post postData={mockPostData} />);

    expect(screen.getByTestId('post-item')).toBeInTheDocument();
    expect(screen.getByTestId('post-image')).toBeInTheDocument();
    expect(screen.getByTestId('post-meta')).toBeInTheDocument();
    expect(screen.getByTestId('post-votes')).toBeInTheDocument();
  });

  it('renders post with correct content', () => {
    render(<Post postData={mockPostData} />);

    expect(screen.getByRole('heading')).toHaveTextContent('Test Product');
    expect(screen.getByText('This is a test product')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
    const link = screen.getByTestId('post-link');
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('displays the thumbnail when available', () => {
    render(<Post postData={mockPostData} />);

    const postImage = screen.getByTestId('post-image');
    const image = postImage.querySelector('img');
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(image).toHaveAttribute('alt', 'Product Logo');
  });

  it('handles missing thumbnail gracefully', () => {
    const postWithoutThumbnail = {
      ...mockPostData,
      thumbnail: undefined
    };

    render(<Post postData={postWithoutThumbnail} />);

    const postImage = screen.getByTestId('post-image');
    const image = postImage.querySelector('img');
    expect(image).toHaveAttribute('src', '/src/assets/no-logo.png');
  });

  it('displays upvote icon and vote count', () => {
    render(<Post postData={mockPostData} />);

    const votesSection = screen.getByTestId('post-votes');
    expect(screen.getByTestId('upvote-icon')).toBeInTheDocument();
    expect(votesSection).toHaveTextContent('42');
  });
});