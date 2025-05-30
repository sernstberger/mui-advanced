import { render, screen } from '@testing-library/react';
import { ConnectedSwitch } from './ConnectedSwitch';
import { ConnectedForm } from '../ConnectedForm/ConnectedForm';

function TestWrapper({ children }: { children: React.ReactNode }) {
  return <ConnectedForm>{children}</ConnectedForm>;
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
