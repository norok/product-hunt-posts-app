import { type ReactNode } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the dependencies
vi.mock('./components', () => ({
  Header: () => <div data-testid="mock-header">Header Component</div>,
  Tabs: () => <div data-testid="mock-tabs">Tabs Component</div>,
  Posts: () => <div data-testid="mock-posts">Posts Component</div>
}));

vi.mock('react-redux', () => ({
  Provider: ({ children }: { children: ReactNode }) => (
    <div data-testid="mock-provider">{children}</div>
  )
}));

vi.mock('./app/store.ts', () => ({
  store: {}
}));

describe('App Component', () => {
  it('renders the main element with correct testId', () => {
    render(<App/>);
    const mainElement = screen.getByTestId('main');
    expect(mainElement).toBeInTheDocument();
  });
});