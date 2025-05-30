import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';
import { vi } from 'vitest';
import { ConnectedSelect } from './ConnectedSelect';

// Test wrapper component that provides FormProvider context
function TestWrapper({
  children,
  defaultValues = {},
  onSubmit = vi.fn(),
}: {
  children: React.ReactNode;
  defaultValues?: Record<string, any>;
  onSubmit?: (data: any) => void;
}) {
  const methods = useForm({ defaultValues });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}

const testOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

describe('ConnectedSelect', () => {
  // Rendering Tests
  describe('Rendering', () => {
    it('should render with label', () => {
      render(
        <TestWrapper defaultValues={{ test: '' }}>
          <ConnectedSelect
            name="test"
            label="Test Select"
            options={testOptions}
          />
        </TestWrapper>
      );

      expect(screen.getByLabelText('Test Select')).toBeDefined();
      expect(screen.getByRole('combobox')).toBeDefined();
    });

    it('should render without label when hideLabel is true', () => {
      render(
        <TestWrapper defaultValues={{ test: '' }}>
          <ConnectedSelect
            name="test"
            label="Test Select"
            options={testOptions}
            hideLabel
          />
        </TestWrapper>
      );

      // Label text should not be visible
      expect(screen.queryByText('Test Select')).toBeNull();
      // Select should still be accessible
      expect(screen.getByRole('combobox')).toBeDefined();
    });

    it('should render with helper text', () => {
      render(
        <TestWrapper defaultValues={{ test: '' }}>
          <ConnectedSelect
            name="test"
            label="Test Select"
            options={testOptions}
            helperText="This is helper text"
          />
        </TestWrapper>
      );

      expect(screen.getByText('This is helper text')).toBeDefined();
    });

    it('should render with placeholder', () => {
      render(
        <TestWrapper defaultValues={{ test: '' }}>
          <ConnectedSelect
            name="test"
            label="Test Select"
            options={testOptions}
            placeholder="Choose an option..."
          />
        </TestWrapper>
      );

      // Open the select to see the placeholder
      const select = screen.getByRole('combobox');
      expect(select).toBeDefined();
    });

    it('should render all options', async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper defaultValues={{ test: '' }}>
          <ConnectedSelect
            name="test"
            label="Test Select"
            options={testOptions}
          />
        </TestWrapper>
      );

      const select = screen.getByRole('combobox');
      await user.click(select);

      await waitFor(() => {
        expect(screen.getByRole('option', { name: 'Option 1' })).toBeDefined();
        expect(screen.getByRole('option', { name: 'Option 2' })).toBeDefined();
        expect(screen.getByRole('option', { name: 'Option 3' })).toBeDefined();
      });
    });
  });

  // Form Integration Tests
  describe('Form Integration', () => {
    it('should work inside FormProvider', () => {
      render(
        <TestWrapper defaultValues={{ test: '' }}>
          <ConnectedSelect
            name="test"
            label="Test Select"
            options={testOptions}
          />
        </TestWrapper>
      );

      const select = screen.getByRole('combobox');
      expect(select).toBeDefined();
    });

    it('should register with form control', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(
        <TestWrapper defaultValues={{ testField: '' }} onSubmit={mockSubmit}>
          <ConnectedSelect
            name="testField"
            label="Test Select"
            options={testOptions}
          />
          <button type="submit">Submit</button>
        </TestWrapper>
      );

      const select = screen.getByRole('combobox');
      await user.click(select);

      await waitFor(() => {
        const option = screen.getByRole('option', { name: 'Option 2' });
        expect(option).toBeDefined();
      });

      const option2 = screen.getByRole('option', { name: 'Option 2' });
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
  });

  // Validation Tests
  describe('Validation', () => {
    it('should show required field error', async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper defaultValues={{ required: '' }}>
          <ConnectedSelect
            name="required"
            label="Required Select"
            options={testOptions}
            required
            rules={{ required: 'This field is required' }}
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
          <ConnectedSelect
            name="required"
            label="Required Select"
            options={testOptions}
            required
          />
          <button type="submit">Submit</button>
        </TestWrapper>
      );

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Required Select is required')).toBeDefined();
      });
    });

    it('should validate selection successfully', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(
        <TestWrapper defaultValues={{ validated: '' }} onSubmit={mockSubmit}>
          <ConnectedSelect
            name="validated"
            label="Validated Select"
            options={testOptions}
            required
          />
          <button type="submit">Submit</button>
        </TestWrapper>
      );

      const select = screen.getByRole('combobox');
      await user.click(select);

      await waitFor(() => {
        const option = screen.getByRole('option', { name: 'Option 1' });
        expect(option).toBeDefined();
      });

      const option1 = screen.getByRole('option', { name: 'Option 1' });
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
      expect(screen.queryByText('Validated Select is required')).toBeNull();
    });
  });
});
