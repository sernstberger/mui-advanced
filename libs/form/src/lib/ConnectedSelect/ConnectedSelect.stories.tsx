import type { Meta, StoryObj } from '@storybook/react';
import { ConnectedSelect } from './ConnectedSelect';
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

const meta: Meta<typeof ConnectedSelect> = {
  component: ConnectedSelect,
  title: 'ConnectedSelect',
  decorators: [
    (Story, { args }) => (
      <FormWrapper defaultValues={{ [args.name || 'defaultField']: '' }}>
        <Story />
      </FormWrapper>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof ConnectedSelect>;

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
];

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent', disabled: true },
];

export const Primary: Story = {
  args: {
    name: 'country',
    label: 'Country',
    options: countryOptions,
    helperText: 'Select your country',
  },
};

export const Required: Story = {
  args: {
    name: 'priority',
    label: 'Priority',
    required: true,
    options: priorityOptions,
    helperText: 'This field is required',
  },
};

export const WithPlaceholder: Story = {
  args: {
    name: 'category',
    label: 'Category',
    options: [
      { value: 'tech', label: 'Technology' },
      { value: 'finance', label: 'Finance' },
      { value: 'health', label: 'Healthcare' },
    ],
    placeholder: 'Choose a category...',
    helperText: 'Select a category from the dropdown',
  },
};

export const WithValidation: Story = {
  args: {
    name: 'department',
    label: 'Department',
    required: true,
    options: [
      { value: 'engineering', label: 'Engineering' },
      { value: 'marketing', label: 'Marketing' },
      { value: 'sales', label: 'Sales' },
      { value: 'hr', label: 'Human Resources' },
    ],
    rules: {
      required: 'Department selection is required',
    },
    helperText: 'Select your department',
  },
};

export const HiddenLabel: Story = {
  args: {
    name: 'status',
    label: 'Status',
    hideLabel: true,
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
      { value: 'pending', label: 'Pending' },
    ],
    placeholder: 'Select status...',
  },
};

export const PlaygroundTest: Story = {
  args: {
    name: 'testSelect',
    label: 'Test Select',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    helperText: 'Select an option to test the component',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selectElement = canvas.getByLabelText('Test Select');
    expect(selectElement).toBeTruthy();

    // Verify the select is properly connected to the form
    expect(selectElement).toHaveAttribute('name', 'testSelect');
  },
};
