import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';
import {
  ConnectedAutocomplete,
  AutocompleteOption,
} from './ConnectedAutocomplete';

const mockOptions: AutocompleteOption[] = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3', disabled: true },
];

function TestWrapper({
  children,
  defaultValues = {},
  onSubmit,
}: {
  children: React.ReactNode;
  defaultValues?: Record<string, any>;
  onSubmit?: (data: any) => void;
}) {
  const methods = useForm({ defaultValues });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={onSubmit ? methods.handleSubmit(onSubmit) : undefined}
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  );
}

describe('ConnectedAutocomplete', () => {
  describe('Rendering', () => {
    it('should render with label', () => {
      render(
        <TestWrapper defaultValues={{ test: null }}>
          <ConnectedAutocomplete
            name="test"
            label="Test Label"
            options={mockOptions}
          />
        </TestWrapper>
      );

      expect(screen.getByLabelText('Test Label')).toBeDefined();
      expect(
        screen.getByRole('combobox', { name: 'Test Label' })
      ).toBeDefined();
    });

    it('should render without label when hideLabel is true', () => {
      render(
        <TestWrapper defaultValues={{ test: null }}>
          <ConnectedAutocomplete
            name="test"
            label="Test Label"
            options={mockOptions}
            hideLabel
          />
        </TestWrapper>
      );

      expect(screen.queryByText('Test Label')).toBeNull();
      expect(screen.getByRole('combobox')).toBeDefined();
    });

    it('should render with helper text', () => {
      render(
        <TestWrapper defaultValues={{ test: null }}>
          <ConnectedAutocomplete
            name="test"
            label="Test Label"
            options={mockOptions}
            helperText="This is helper text"
          />
        </TestWrapper>
      );

      expect(screen.getByText('This is helper text')).toBeDefined();
    });

    it('should render with placeholder', () => {
      render(
        <TestWrapper defaultValues={{ test: null }}>
          <ConnectedAutocomplete
            name="test"
            label="Test Label"
            options={mockOptions}
            placeholder="Choose an option"
          />
        </TestWrapper>
      );

      expect(screen.getByPlaceholderText('Choose an option')).toBeDefined();
    });
  });

  describe('Validation', () => {
    it('should show required field error', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(
        <TestWrapper defaultValues={{ required: null }} onSubmit={mockSubmit}>
          <ConnectedAutocomplete
            name="required"
            label="Required Field"
            options={mockOptions}
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

    it('should show custom validation error', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(
        <TestWrapper defaultValues={{ custom: null }} onSubmit={mockSubmit}>
          <ConnectedAutocomplete
            name="custom"
            label="Custom Field"
            options={mockOptions}
            validate={(value: AutocompleteOption) => {
              if (value && value.value === '2') {
                return 'Option 2 is not allowed';
              }
              return true;
            }}
          />
          <button type="submit">Submit</button>
        </TestWrapper>
      );

      const input = screen.getByRole('combobox');
      await user.click(input);

      await waitFor(() => {
        const option2 = screen.getByText('Option 2');
        expect(option2).toBeDefined();
      });

      await user.click(screen.getByText('Option 2'));

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Option 2 is not allowed')).toBeDefined();
      });
    });
  });

  describe('Form Integration', () => {
    it('should register with form control', async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(
        <TestWrapper defaultValues={{ testField: null }} onSubmit={mockSubmit}>
          <ConnectedAutocomplete
            name="testField"
            label="Test Label"
            options={mockOptions}
          />
          <button type="submit">Submit</button>
        </TestWrapper>
      );

      const input = screen.getByRole('combobox');
      await user.click(input);

      await waitFor(() => {
        const option1 = screen.getByText('Option 1');
        expect(option1).toBeDefined();
      });

      await user.click(screen.getByText('Option 1'));

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            testField: expect.objectContaining({
              value: '1',
              label: 'Option 1',
            }),
          }),
          expect.any(Object)
        );
      });
    });
  });
});
