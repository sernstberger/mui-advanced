import type { Meta, StoryObj } from '@storybook/react';
import { ConnectedRadioGroup } from './ConnectedRadioGroup';
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

const meta: Meta<typeof ConnectedRadioGroup> = {
  component: ConnectedRadioGroup,
  title: 'ConnectedRadioGroup',
  decorators: [
    (Story, { args }) => (
      <FormWrapper defaultValues={{ [args.name || 'defaultField']: '' }}>
        <Story />
      </FormWrapper>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof ConnectedRadioGroup>;

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' },
];

const subscriptionOptions = [
  { value: 'free', label: 'Free Plan' },
  { value: 'pro', label: 'Pro Plan ($9.99/month)' },
  { value: 'enterprise', label: 'Enterprise Plan ($29.99/month)' },
  { value: 'custom', label: 'Custom Plan', disabled: true },
];

export const Primary: Story = {
  args: {
    name: 'gender',
    label: 'Gender',
    options: genderOptions,
    helperText: 'Please select your gender',
  },
};

export const Required: Story = {
  args: {
    name: 'subscription',
    label: 'Subscription Plan',
    required: true,
    options: subscriptionOptions,
    helperText: 'This field is required',
  },
};

export const WithValidation: Story = {
  args: {
    name: 'agreement',
    label: 'Terms and Conditions',
    required: true,
    options: [
      { value: 'agree', label: 'I agree to the terms and conditions' },
      { value: 'disagree', label: 'I do not agree' },
    ],
    rules: {
      required: 'You must agree to the terms to continue',
      validate: (value) => value === 'agree' || 'You must agree to continue',
    },
    helperText: 'Please read and accept the terms',
  },
};

export const HorizontalLayout: Story = {
  args: {
    name: 'preference',
    label: 'Communication Preference',
    options: [
      { value: 'email', label: 'Email' },
      { value: 'sms', label: 'SMS' },
      { value: 'phone', label: 'Phone' },
    ],
    row: true,
    helperText: 'Select your preferred communication method',
  },
};

export const HiddenLabel: Story = {
  args: {
    name: 'rating',
    label: 'Rating',
    hideLabel: true,
    options: [
      { value: '1', label: '⭐ Poor' },
      { value: '2', label: '⭐⭐ Fair' },
      { value: '3', label: '⭐⭐⭐ Good' },
      { value: '4', label: '⭐⭐⭐⭐ Very Good' },
      { value: '5', label: '⭐⭐⭐⭐⭐ Excellent' },
    ],
  },
};

export const PlaygroundTest: Story = {
  args: {
    name: 'testRadio',
    label: 'Test Radio Group',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    helperText: 'Select an option to test the component',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radioGroup = canvas.getByRole('radiogroup');
    expect(radioGroup).toBeTruthy();

    // Verify the radio group has the correct label
    expect(radioGroup).toHaveAttribute('aria-labelledby');

    // Verify individual radio buttons are present
    const radioButtons = canvas.getAllByRole('radio');
    expect(radioButtons).toHaveLength(3);
  },
};
