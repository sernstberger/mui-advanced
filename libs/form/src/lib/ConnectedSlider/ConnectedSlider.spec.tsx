import { render, screen } from '@testing-library/react';
import { ConnectedSlider } from './ConnectedSlider';
import { ConnectedForm } from '../ConnectedForm/ConnectedForm';

function TestWrapper({ children }: { children: React.ReactNode }) {
  return <ConnectedForm>{children}</ConnectedForm>;
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
