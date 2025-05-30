import { render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { ConnectedCheckbox } from './ConnectedCheckbox';

function TestWrapper({ children }: { children: React.ReactNode }) {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form>{children}</form>
    </FormProvider>
  );
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
    expect(checkbox.hasAttribute('disabled')).toBe(true);
  });
});
