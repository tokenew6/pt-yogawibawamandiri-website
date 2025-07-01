import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from '@/App';

// Basic sanity check to verify the React tree mounts.
describe('App', () => {
  it('renders without crashing', () => {
    expect(() => render(<App />)).not.toThrow();
  });
});