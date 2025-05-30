import type { Meta, StoryObj } from '@storybook/react';
import { ConnectedTextInput } from './ConnectedTextInput';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '@mui/material';

// Wrapper component to provide FormProvider context
function FormWrapper({
  children,
  defaultValues = {},
}: {
  children: React.ReactNode;
  defaultValues?: Record<string, any>;
}) {
  const methods = useForm({ defaultValues });

  const onSubmit = (data: any) => {
    console.log('Form submitted:', data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          maxWidth: '400px',
        }}
      >
        {children}
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </FormProvider>
  );
}

const meta: Meta<typeof ConnectedTextInput> = {
  component: ConnectedTextInput,
  title: 'ConnectedTextInput',
  decorators: [
    (Story, { args }) => (
      <FormWrapper defaultValues={{ [args.name || 'defaultField']: '' }}>
        <Story />
      </FormWrapper>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof ConnectedTextInput>;

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
