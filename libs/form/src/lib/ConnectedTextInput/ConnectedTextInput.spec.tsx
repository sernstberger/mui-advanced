import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';
import { vi } from 'vitest';
import { ConnectedTextInput } from './ConnectedTextInput';

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

describe('ConnectedTextInput', () => {
  // Rendering Tests
  describe('Rendering', () => {
    it('should render with label', () => {
      render(
        <TestWrapper>
          <ConnectedTextInput name="test" label="Test Label" />
        </TestWrapper>
      );

      expect(screen.getByLabelText('Test Label')).toBeDefined();
      expect(screen.getByText('Test Label')).toBeDefined();
    });

    it('should render without label when hideLabel is true', () => {
      render(
        <TestWrapper>
          <ConnectedTextInput name="test" label="Test Label" hideLabel />
        </TestWrapper>
      );

      // Label text should not be visible
      expect(screen.queryByText('Test Label')).toBeNull();
      // Input should still be accessible (MUI handles this internally)
      expect(screen.getByRole('textbox')).toBeDefined();
    });

    it('should render with helper text', () => {
      render(
        <TestWrapper>
          <ConnectedTextInput
            name="test"
            label="Test Label"
            helperText="This is helper text"
          />
        </TestWrapper>
      );

      expect(screen.getByText('This is helper text')).toBeDefined();
    });

    it('should render required indicator', () => {
      render(
        <TestWrapper>
          <ConnectedTextInput name="test" label="Test Label" required />
        </TestWrapper>
      );

      // MUI shows required indicator with asterisk
      const labelElement = screen.getByText('Test Label');
      expect(labelElement).toBeDefined();
      const label = labelElement.closest('label');
      expect(label).toHaveClass('Mui-required');
    });

    it('should render with placeholder', () => {
      render(
        <TestWrapper>
          <ConnectedTextInput
            name="test"
            label="Test Label"
            placeholder="Enter text here"
          />
        </TestWrapper>
      );

      expect(screen.getByPlaceholderText('Enter text here')).toBeDefined();
    });
  });

  // Form Integration Tests
  describe('Form Integration', () => {
    it('should work inside FormProvider', () => {
      render(
        <TestWrapper>
          <ConnectedTextInput name="test" label="Test Label" />
        </TestWrapper>
      );

      const input = screen.getByLabelText('Test Label');
      expect(input).toBeDefined();
    });

    it('should register with form control', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(
        <TestWrapper onSubmit={mockSubmit}>
          <ConnectedTextInput name="testField" label="Test Label" />
          <button type="submit">Submit</button>
        </TestWrapper>
      );

      const input = screen.getByLabelText('Test Label');
      await user.type(input, 'test value');

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith(
          expect.objectContaining({ testField: 'test value' }),
          expect.any(Object) // Form submit event
        );
      });
    });

    it('should update form value on change', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(
        <TestWrapper onSubmit={mockSubmit}>
          <ConnectedTextInput name="dynamic" label="Dynamic Field" />
          <button type="submit">Submit</button>
        </TestWrapper>
      );

      const input = screen.getByLabelText('Dynamic Field');

      await user.type(input, 'first');
      await user.clear(input);
      await user.type(input, 'second');

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith(
          expect.objectContaining({ dynamic: 'second' }),
          expect.any(Object) // Form submit event
        );
      });
    });
  });

  // Validation Tests
  describe('Validation', () => {
    it('should show required field error', async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <ConnectedTextInput
            name="required"
            label="Required Field"
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

    it('should show min/max length errors', async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <ConnectedTextInput
            name="length"
            label="Length Field"
            rules={{
              minLength: { value: 3, message: 'Minimum 3 characters' },
              maxLength: { value: 10, message: 'Maximum 10 characters' },
            }}
          />
          <button type="submit">Submit</button>
        </TestWrapper>
      );

      const input = screen.getByLabelText('Length Field');
      const submitButton = screen.getByRole('button', { name: 'Submit' });

      // Test min length
      await user.type(input, 'ab');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Minimum 3 characters')).toBeDefined();
      });

      // Test max length
      await user.clear(input);
      await user.type(input, 'this is too long text');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Maximum 10 characters')).toBeDefined();
      });
    });

    it('should show custom validation errors', async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <ConnectedTextInput
            name="email"
            label="Email Field"
            rules={{
              validate: (value) => {
                if (!value?.includes('@')) {
                  return 'Must be a valid email';
                }
                return true;
              },
            }}
          />
          <button type="submit">Submit</button>
        </TestWrapper>
      );

      const input = screen.getByLabelText('Email Field');
      await user.type(input, 'invalid-email');

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Must be a valid email')).toBeDefined();
      });
    });

    it('should prevent whitespace-only input', async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <ConnectedTextInput name="noWhitespace" label="No Whitespace Field" />
          <button type="submit">Submit</button>
        </TestWrapper>
      );

      const input = screen.getByLabelText('No Whitespace Field');
      await user.type(input, '   '); // Only spaces

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText('Cannot be empty or whitespace only')
        ).toBeDefined();
      });
    });

    it('should clear errors on valid input', async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <ConnectedTextInput
            name="clearErrors"
            label="Clear Errors Field"
            rules={{ required: 'This field is required' }}
          />
          <button type="submit">Submit</button>
        </TestWrapper>
      );

      const input = screen.getByLabelText('Clear Errors Field');
      const submitButton = screen.getByRole('button', { name: 'Submit' });

      // Trigger error
      await user.click(submitButton);
      await waitFor(() => {
        expect(screen.getByText('This field is required')).toBeDefined();
      });

      // Clear error by entering valid input
      await user.type(input, 'valid input');

      await waitFor(() => {
        expect(screen.queryByText('This field is required')).toBeNull();
      });
    });
  });

  // Accessibility Tests
  describe('Accessibility', () => {
    it('should indicate validation state with aria-invalid', async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <ConnectedTextInput
            name="invalid"
            label="Invalid Field"
            rules={{ required: 'Required' }}
          />
          <button type="submit">Submit</button>
        </TestWrapper>
      );

      const input = screen.getByRole('textbox');
      const submitButton = screen.getByRole('button', { name: 'Submit' });

      // Initially valid
      expect(input).toHaveAttribute('aria-invalid', 'false');

      // Trigger validation error
      await user.click(submitButton);

      await waitFor(() => {
        expect(input).toHaveAttribute('aria-invalid', 'true');
      });
    });

    it('should be keyboard navigable', async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <ConnectedTextInput name="first" label="First Field" />
          <ConnectedTextInput name="second" label="Second Field" />
        </TestWrapper>
      );

      const firstInput = screen.getByLabelText('First Field');
      const secondInput = screen.getByLabelText('Second Field');

      // Tab navigation
      firstInput.focus();
      expect(document.activeElement).toBe(firstInput);

      await user.tab();
      expect(document.activeElement).toBe(secondInput);
    });
  });

  // Error Handling Tests
  describe('Error Handling', () => {
    it('should handle missing FormProvider gracefully', () => {
      // This would typically cause an error in react-hook-form
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(vi.fn());

      expect(() => {
        render(<ConnectedTextInput name="orphan" label="Orphan Field" />);
      }).toThrow();

      consoleSpy.mockRestore();
    });
  });
});
