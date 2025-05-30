import { render, screen } from '@testing-library/react';
import { ConnectedRating } from './ConnectedRating';
import { ConnectedForm } from '../ConnectedForm/ConnectedForm';

function TestWrapper({ children }: { children: React.ReactNode }) {
  return <ConnectedForm>{children}</ConnectedForm>;
}

describe('ConnectedRating', () => {
  it('should render with label', () => {
    render(
      <TestWrapper>
        <ConnectedRating name="test" label="Test Rating" />
      </TestWrapper>
    );

    expect(screen.getByText('Test Rating')).toBeDefined();
  });

  it('should render with helper text', () => {
    render(
      <TestWrapper>
        <ConnectedRating
          name="test"
          label="Test Rating"
          helperText="Rate this item"
        />
      </TestWrapper>
    );

    expect(screen.getByText('Rate this item')).toBeDefined();
  });
});
