import { render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { ConnectedRating } from './ConnectedRating';

function TestWrapper({ children }: { children: React.ReactNode }) {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form>{children}</form>
    </FormProvider>
  );
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
