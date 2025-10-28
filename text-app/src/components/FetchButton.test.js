import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FetchButton from './FetchButton';  // ← Fix this (same folder)

test('fetches and displays data when button is clicked', async () => {
    const mockFetchData = jest.fn().mockResolvedValue('Hello, World!');

    render(<FetchButton fetchData={mockFetchData} />);

    fireEvent.click(screen.getByText(/fetch data/i));

    const dataElement = await screen.findByText(/hello, world!/i);
    expect(dataElement).toBeInTheDocument();
    expect(mockFetchData).toHaveBeenCalledTimes(1);
});