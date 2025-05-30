import { render, screen } from '@testing-library/react';
import { ConnectedCheckbox } from './ConnectedCheckbox';
import { ConnectedForm } from '../ConnectedForm/ConnectedForm';

function TestWrapper({ children }: { children: React.ReactNode }) {
  return <ConnectedForm>{children}</ConnectedForm>;
}

describe('ConnectedCheckbox', () => {
  it('should render with label', () => {
    render(
      <TestWrapper>
        <ConnectedCheckbox name="test" label="Test Checkbox" />
      </TestWrapper>
    );

    expect(screen.getByText('Test Checkbox')).toBeDefined();
    expect(screen.getByRole('checkbox')).toBeDefined();
  });

  it('should render with helper text', () => {
    render(
      <TestWrapper>
        <ConnectedCheckbox
          name="test"
          label="Test Checkbox"
          helperText="This is helper text"
        />
      </TestWrapper>
    );

    expect(screen.getByText('This is helper text')).toBeDefined();
  });

  it('should be disabled when disabled prop is true', () => {
    render(
      <TestWrapper>
        <ConnectedCheckbox name="test" label="Test Checkbox" disabled />
      </TestWrapper>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDefined();
    expect(checkbox).toBeDisabled();
  });
});
