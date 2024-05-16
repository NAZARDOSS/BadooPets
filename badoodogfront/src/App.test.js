import { render, screen } from '@testing-library/react';
import Dogs from "./App";

test('renders learn react link', () => {
  render(<Dogs />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
