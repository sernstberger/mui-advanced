import { render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { ConnectedCheckboxGroup } from './ConnectedCheckboxGroup';

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
];

function TestWrapper({ children }: { children: React.ReactNode }) {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form>{children}</form>
    </FormProvider>
  );
}

describe('ConnectedCheckboxGroup', () => {
  it('should render with label', () => {
    render(
      <TestWrapper>
        <ConnectedCheckboxGroup
          name="test"
          label="Test Group"
          options={options}
        />
      </TestWrapper>
    );

    expect(screen.getByText('Test Group')).toBeDefined();
  });
});
