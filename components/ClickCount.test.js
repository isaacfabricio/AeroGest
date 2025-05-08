import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import ClickCount from './ClickCount';

describe('ClickCount component', () => {
  it('renders initial count', () => {
    const { getByText } = render(<ClickCount />);
    expect(getByText(/Clicks: 0/i)).toBeTruthy();
  });

  it('increments count on button click', async () => {
    const { getByText } = render(<ClickCount />);
    const button = getByText(/Click me/i);
    await fireEvent.click(button);
    expect(getByText(/Clicks: 1/i)).toBeTruthy();
  });
});
