import type { Meta, StoryObj } from '@storybook/react';
import { ConnectedTextInput } from './ConnectedTextInput';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Example zod schema for form validation
const exampleSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.number().min(18, 'Must be at least 18 years old'),
  website: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

type FormData = z.infer<typeof exampleSchema>;

// Wrapper component to provide FormProvider context
function FormWrapper({
  children,
  defaultValues = {},
  onSubmit,
}: {
  children: React.ReactNode;
  defaultValues?: Record<string, any>;
  onSubmit?: (data: FormData) => void;
}) {
  const form = useForm<FormData>({
    resolver: zodResolver(exampleSchema),
    defaultValues,
    mode: 'onChange',
  });

  const handleSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    onSubmit?.(data);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          maxWidth: '400px',
        }}
      >
        {children}
        <Button
          type="submit"
          variant="contained"
          disabled={form.formState.isSubmitting}
        >
          Submit
        </Button>
        <div className="text-sm text-gray-600">
          <p>Form Valid: {form.formState.isValid ? 'Yes' : 'No'}</p>
          <p>
            Has Errors:{' '}
            {Object.keys(form.formState.errors).length > 0 ? 'Yes' : 'No'}
          </p>
        </div>
      </form>
    </FormProvider>
  );
}

const meta: Meta<typeof ConnectedTextInput> = {
  component: ConnectedTextInput,
  title: 'Form/ConnectedTextInput',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    name: 'firstName',
    label: 'First Name',
    helperText: 'Enter your first name',
  },
};

export const Required: Story = {
  args: {
    name: 'email',
    label: 'Email',
    required: true,
    rules: { required: 'Email is required' },
    helperText: 'This field is required',
  },
};

export const WithValidation: Story = {
  args: {
    name: 'username',
    label: 'Username',
    rules: {
      required: 'Username is required',
      minLength: {
        value: 3,
        message: 'Username must be at least 3 characters',
      },
      maxLength: {
        value: 20,
        message: 'Username must be less than 20 characters',
      },
    },
    helperText: 'Username must be 3-20 characters long',
  },
};

export const HiddenLabel: Story = {
  args: {
    name: 'search',
    label: 'Search',
    hideLabel: true,
    placeholder: 'Search...',
  },
};

export const PlaygroundTest: Story = {
  args: {
    name: 'testField',
    label: 'Test Field',
    helperText: 'Type something to test the component',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Test Field');
    expect(input).toBeTruthy();

    // Verify the input is properly connected to the form
    expect(input).toHaveAttribute('name', 'testField');
  },
};

export const WithZodValidation: Story = {
  render: () => (
    <FormWrapper>
      <ConnectedTextInput
        name="email"
        label="Email"
        required
        placeholder="Enter your email"
      />
      <ConnectedTextInput
        name="name"
        label="Name"
        required
        placeholder="Enter your name"
      />
      <ConnectedTextInput
        name="website"
        label="Website"
        placeholder="https://example.com"
        helperText="Optional: Enter your website URL"
      />
    </FormWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: `
This example demonstrates the **recommended way** to use zod validation with ConnectedTextInput:

1. **Define a zod schema** at the form level
2. **Use zodResolver** with useForm hook
3. **Wrap form in FormProvider** to provide context
4. **Individual fields** get validation automatically from the schema

The validation happens automatically based on the schema:
- Email field validates email format
- Name field requires minimum 2 characters
- Website field validates URL format (optional)
- Built-in validation (like noWhitespaceOnly) still applies

This approach provides:
- ✅ Type safety across the entire form
- ✅ Centralized validation logic
- ✅ Better performance (single validation pass)
- ✅ Consistent error handling
        `,
      },
    },
  },
};

export const BasicUsage: Story = {
  render: () => (
    <FormWrapper>
      <ConnectedTextInput
        name="email"
        label="Email"
        required
        placeholder="Enter your email"
      />
    </FormWrapper>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <FormWrapper>
      <ConnectedTextInput
        name="name"
        label="Full Name"
        required
        placeholder="John Doe"
        helperText="Enter your first and last name"
      />
    </FormWrapper>
  ),
};

export const HiddenLabelWithZod: Story = {
  render: () => (
    <FormWrapper>
      <ConnectedTextInput
        name="email"
        label="Email Address"
        hideLabel
        required
        placeholder="Email Address"
      />
    </FormWrapper>
  ),
};
