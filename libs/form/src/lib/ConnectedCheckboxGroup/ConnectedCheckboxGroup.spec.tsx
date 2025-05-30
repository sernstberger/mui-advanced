import { render, screen } from '@testing-library/react';
import { ConnectedCheckboxGroup } from './ConnectedCheckboxGroup';
import { ConnectedForm } from '../ConnectedForm/ConnectedForm';

const testOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

function TestWrapper({ children }: { children: React.ReactNode }) {
  return <ConnectedForm>{children}</ConnectedForm>;
}

describe('ConnectedCheckboxGroup', () => {
  it('should render with label', () => {
    render(
      <TestWrapper>
        <ConnectedCheckboxGroup
          name="test"
          label="Test Group"
          options={testOptions}
        />
      </TestWrapper>
    );

    expect(screen.getByText('Test Group')).toBeDefined();
  });
});
