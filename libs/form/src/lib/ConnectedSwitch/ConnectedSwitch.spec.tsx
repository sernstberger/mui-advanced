import { render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { ConnectedSwitch } from './ConnectedSwitch';

function TestWrapper({ children }: { children: React.ReactNode }) {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form>{children}</form>
    </FormProvider>
  );
}

describe('ConnectedSwitch', () => {
  it('should render with label', () => {
    render(
      <TestWrapper>
        <ConnectedSwitch name="test" label="Test Switch" />
      </TestWrapper>
    );

    expect(screen.getByText('Test Switch')).toBeDefined();
  });
});
