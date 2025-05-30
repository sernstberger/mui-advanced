import type { Meta, StoryObj } from '@storybook/react';
import { ConnectedTextInput } from './ConnectedTextInput';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { Button } from '@mui/material';
import { z } from 'zod';
import { ConnectedForm } from '../ConnectedForm/ConnectedForm';

// Example zod schema for form validation
const exampleSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.number().min(18, 'Must be at least 18 years old'),
  website: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

type FormData = z.infer<typeof exampleSchema>;

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
    <ConnectedForm<FormData>
      schema={exampleSchema}
      onSubmit={(data) => console.log('Form submitted:', data)}
      formProps={{ mode: 'onChange' }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          maxWidth: '400px',
        }}
      >
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
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </div>
    </ConnectedForm>
  ),
  parameters: {
    docs: {
      description: {
        story: `
This example demonstrates the **simplified way** to use zod validation with ConnectedForm:

1. **Define a zod schema** at the form level
2. **Pass schema to ConnectedForm** - no need for manual zodResolver setup
3. **Individual fields** get validation automatically from the schema
4. **Built-in form handling** with submit and error handling

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
- ✅ Simplified setup with ConnectedForm
        `,
      },
    },
  },
};

export const BasicUsage: Story = {
  render: () => (
    <ConnectedForm>
      <ConnectedTextInput
        name="email"
        label="Email"
        required
        placeholder="Enter your email"
      />
    </ConnectedForm>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <ConnectedForm>
      <ConnectedTextInput
        name="name"
        label="Full Name"
        required
        placeholder="John Doe"
        helperText="Enter your first and last name"
      />
    </ConnectedForm>
  ),
};

export const HiddenLabelWithZod: Story = {
  render: () => (
    <ConnectedForm>
      <ConnectedTextInput
        name="email"
        label="Email Address"
        hideLabel
        required
        placeholder="Email Address"
      />
    </ConnectedForm>
  ),
};
