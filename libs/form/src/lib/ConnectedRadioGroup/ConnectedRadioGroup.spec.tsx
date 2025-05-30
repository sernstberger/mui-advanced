import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { ConnectedRadioGroup } from './ConnectedRadioGroup';
import { ConnectedForm } from '../ConnectedForm/ConnectedForm';

// Test wrapper component that provides form context
function TestWrapper({
  children,
  defaultValues = {},
  onSubmit = vi.fn(),
}: {
  children: React.ReactNode;
  defaultValues?: Record<string, any>;
  onSubmit?: (data: any) => void;
}) {
  return (
    <ConnectedForm formProps={{ defaultValues }} onSubmit={onSubmit}>
      {children}
    </ConnectedForm>
  );
}

const testOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

describe('ConnectedRadioGroup', () => {
  // Rendering Tests
  describe('Rendering', () => {
    it('should render with label', () => {
      render(
        <TestWrapper defaultValues={{ test: '' }}>
          <ConnectedRadioGroup
            name="test"
            label="Test Radio Group"
            options={testOptions}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Test Radio Group')).toBeDefined();
      expect(screen.getByRole('radiogroup')).toBeDefined();
    });

    it('should render without label when hideLabel is true', () => {
      render(
        <TestWrapper defaultValues={{ test: '' }}>
          <ConnectedRadioGroup
            name="test"
            label="Test Radio Group"
            options={testOptions}
            hideLabel
          />
        </TestWrapper>
      );

      // Label text should not be visible
      expect(screen.queryByText('Test Radio Group')).toBeNull();
      // Radio group should still be accessible
      expect(screen.getByRole('radiogroup')).toBeDefined();
    });

    it('should render with helper text', () => {
      render(
        <TestWrapper defaultValues={{ test: '' }}>
          <ConnectedRadioGroup
            name="test"
            label="Test Radio Group"
            options={testOptions}
            helperText="This is helper text"
          />
        </TestWrapper>
      );

      expect(screen.getByText('This is helper text')).toBeDefined();
    });

    it('should render all radio options', () => {
      render(
        <TestWrapper defaultValues={{ test: '' }}>
          <ConnectedRadioGroup
            name="test"
            label="Test Radio Group"
            options={testOptions}
          />
        </TestWrapper>
      );

      expect(screen.getByLabelText('Option 1')).toBeDefined();
      expect(screen.getByLabelText('Option 2')).toBeDefined();
      expect(screen.getByLabelText('Option 3')).toBeDefined();

      const radioButtons = screen.getAllByRole('radio');
      expect(radioButtons).toHaveLength(3);
    });
  });

  // Form Integration Tests
  describe('Form Integration', () => {
    it('should work inside FormProvider', () => {
      render(
        <TestWrapper defaultValues={{ test: '' }}>
          <ConnectedRadioGroup
            name="test"
            label="Test Radio Group"
            options={testOptions}
          />
        </TestWrapper>
      );

      const radioGroup = screen.getByRole('radiogroup');
      expect(radioGroup).toBeDefined();
    });

    it('should register with form control', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(
        <TestWrapper defaultValues={{ testField: '' }} onSubmit={mockSubmit}>
          <ConnectedRadioGroup
            name="testField"
            label="Test Radio Group"
            options={testOptions}
          />
          <button type="submit">Submit</button>
        </TestWrapper>
      );

      const option2 = screen.getByLabelText('Option 2');
      await user.click(option2);

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith(
          expect.objectContaining({ testField: 'option2' }),
          expect.any(Object)
        );
      });
    });

    it('should allow radio button selection', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(
        <TestWrapper defaultValues={{ exclusive: '' }} onSubmit={mockSubmit}>
          <ConnectedRadioGroup
            name="exclusive"
            label="Exclusive Radio Group"
            options={testOptions}
          />
          <button type="submit">Submit</button>
        </TestWrapper>
      );

      const option1 = screen.getByLabelText('Option 1');
      await user.click(option1);

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith(
          expect.objectContaining({ exclusive: 'option1' }),
          expect.any(Object)
        );
      });
    });
  });

  // Validation Tests
  describe('Validation', () => {
    it('should show required field error', async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper defaultValues={{ required: '' }}>
          <ConnectedRadioGroup
            name="required"
            label="Required Radio Group"
            options={testOptions}
            required="This field is required"
          />
          <button type="submit">Submit</button>
        </TestWrapper>
      );

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('This field is required')).toBeDefined();
      });
    });

    it('should show default required message when required prop is true', async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper defaultValues={{ required: '' }}>
          <ConnectedRadioGroup
            name="required"
            label="Required Radio Group"
            options={testOptions}
            required
          />
          <button type="submit">Submit</button>
        </TestWrapper>
      );

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText('Required Radio Group is required')
        ).toBeDefined();
      });
    });

    it('should validate selection successfully', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(
        <TestWrapper defaultValues={{ validated: '' }} onSubmit={mockSubmit}>
          <ConnectedRadioGroup
            name="validated"
            label="Validated Radio Group"
            options={testOptions}
            required
          />
          <button type="submit">Submit</button>
        </TestWrapper>
      );

      const option1 = screen.getByLabelText('Option 1');
      await user.click(option1);

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith(
          expect.objectContaining({ validated: 'option1' }),
          expect.any(Object)
        );
      });

      // No error message should be shown
      expect(
        screen.queryByText('Validated Radio Group is required')
      ).toBeNull();
    });
  });
});
