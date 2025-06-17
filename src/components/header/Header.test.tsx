import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header Component', () => {
  it('renders the app title', () => {
    render(<Header />);
    const heading = screen.getByTestId('main-header');
    expect(heading).toBeInTheDocument();
  });

  it('displays the username', () => {
    render(<Header />);
    const username = screen.getByText('Username');
    expect(username).toBeInTheDocument();
  });

  it('renders the user avatar with correct attributes', () => {
    render(<Header />);
    const avatar = screen.getByAltText("Username's Avatar");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'https://avatars.githubusercontent.com/u/13870070?v=4');
  });

  it('renders navigation menu with three links', () => {
    render(<Header />);
    const profileLink = screen.getByText('Profile');
    const settingsLink = screen.getByText('Settings');
    const logoutLink = screen.getByText('Logout');

    expect(profileLink).toBeInTheDocument();
    expect(settingsLink).toBeInTheDocument();
    expect(logoutLink).toBeInTheDocument();
  });

  it('displays the current date', () => {
    // Mock the Date to return a consistent value
    const mockDate = new Date(2025, 4, 11); // May 11, 2025
    vi.spyOn(window, 'Date').mockImplementation(() => mockDate as unknown as string & Date);

    render(<Header />);

    // Format the date the same way as in the component
    const formattedDate = mockDate.toLocaleDateString("en-US", { dateStyle: "long" });
    const dateElement = screen.getByText(formattedDate);

    expect(dateElement).toBeInTheDocument();
    expect(dateElement).toHaveTextContent('May 11, 2025');

    // Restore the Date constructor
    vi.restoreAllMocks();
  });
});