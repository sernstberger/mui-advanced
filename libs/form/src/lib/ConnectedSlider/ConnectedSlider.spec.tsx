import { render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { ConnectedSlider } from './ConnectedSlider';

function TestWrapper({ children }: { children: React.ReactNode }) {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form>{children}</form>
    </FormProvider>
  );
}

describe('ConnectedSlider', () => {
  it('should render with label', () => {
    render(
      <TestWrapper>
        <ConnectedSlider name="test" label="Test Slider" />
      </TestWrapper>
    );

    expect(screen.getByText('Test Slider')).toBeDefined();
  });
});
