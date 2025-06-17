import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs } from './Tabs';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setOrder } from '../../features/posts/slice';

// Mock dependencies
vi.mock('../../app/hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn()
}));

vi.mock('../../features/posts/slice', () => ({
  setOrder: vi.fn()
}));

// Mock CSS module
vi.mock('./tabs.module.scss', () => ({
  default: {
    'tabs__item': 'tabs-item-class',
    'tabs__item--active': 'active-tab-class'
  }
}));

describe('Tabs Component', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    (useAppDispatch as any).mockReturnValue(mockDispatch);
  });

  it('renders both tabs correctly', () => {
    (useAppSelector as any).mockReturnValue({ order: 'RANKING' });

    render(<Tabs />);

    expect(screen.getByText('Popular')).toBeInTheDocument();
    expect(screen.getByText('Newest')).toBeInTheDocument();
  });

  it('highlights the active tab based on state', () => {
    (useAppSelector as any).mockReturnValue({ order: 'RANKING' });

    render(<Tabs />);

    const popularButton = screen.getByText('Popular');
    const newestButton = screen.getByText('Newest');

    const popularTab = popularButton.closest('li');
    const newestTab = newestButton.closest('li');

    expect(popularTab?.className).toContain('tabs-item-class active-tab-class');
    expect(newestTab?.className).toContain('tabs-item-class');
    expect(newestTab?.className).not.toContain('active-tab-class');
  });

  it('dispatches setOrder when clicking on a tab', () => {
    (useAppSelector as any).mockReturnValue({ order: 'RANKING' });

    render(<Tabs />);

    const newestButton = screen.getByText('Newest');
    fireEvent.click(newestButton);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(setOrder).toHaveBeenCalledWith('NEWEST');
  });

  it('handles switching to a different tab', () => {
    (useAppSelector as any).mockReturnValue({ order: 'NEWEST' });

    render(<Tabs />);

    const popularButton = screen.getByText('Popular');
    const newestButton = screen.getByText('Newest');

    const popularTab = popularButton.closest('li');
    const newestTab = newestButton.closest('li');

    expect(newestTab?.className).toContain('active-tab-class');
    expect(popularTab?.className).not.toContain('active-tab-class');

    fireEvent.click(popularButton);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(setOrder).toHaveBeenCalledWith('RANKING');
  });
});