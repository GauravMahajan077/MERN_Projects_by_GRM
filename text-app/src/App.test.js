// src/App.test.js

import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the main heading", () => {
    render(<App />);
    const headingElement = screen.getByText(/Testing React Components/i);
    expect(headingElement).toBeInTheDocument();
});

test('renders the button with label "Click Me"', () => {
    render(<App />);
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeInTheDocument();
});

test('renders the fetch button with label "Fetch Data"', () => {
    render(<App />);
    const fetchButtonElement = screen.getByText(/Fetch Data/i);
    expect(fetchButtonElement).toBeInTheDocument();
});