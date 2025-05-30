import type { Meta, StoryObj } from '@storybook/react';
import { ConnectedSwitch } from './ConnectedSwitch';
import { FormProvider, useForm } from 'react-hook-form';
import { action } from '@storybook/addon-actions';

function StoryWrapper({ children }: { children: React.ReactNode }) {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(action('form-submit'))}>
        {children}
        <button type="submit" style={{ marginTop: '1rem' }}>
          Submit
        </button>
      </form>
    </FormProvider>
  );
}

const meta: Meta<typeof ConnectedSwitch> = {
  title: 'Form/ConnectedSwitch',
  component: ConnectedSwitch,
  decorators: [
    (Story) => (
      <StoryWrapper>
        <Story />
      </StoryWrapper>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    label: { control: 'text' },
    helperText: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['small', 'medium'] },
    color: {
      control: 'select',
      options: [
        'default',
        'primary',
        'secondary',
        'error',
        'info',
        'success',
        'warning',
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'switch',
    label: 'Enable Notifications',
  },
};

export const WithHelperText: Story = {
  args: {
    name: 'switch',
    label: 'Dark Mode',
    helperText: 'Toggle between light and dark theme',
  },
};

export const Required: Story = {
  args: {
    name: 'switch',
    label: 'Accept Terms',
    required: true,
    helperText: 'You must accept the terms to continue',
  },
};

export const Disabled: Story = {
  args: {
    name: 'switch',
    label: 'Disabled Option',
    disabled: true,
    helperText: 'This switch is disabled',
  },
};

export const SmallSize: Story = {
  args: {
    name: 'switch',
    label: 'Small Switch',
    size: 'small',
    helperText: 'Small size switch component',
  },
};

export const PrimaryColor: Story = {
  args: {
    name: 'switch',
    label: 'Primary Switch',
    color: 'primary',
    helperText: 'Switch with primary color',
  },
};

export const SecondaryColor: Story = {
  args: {
    name: 'switch',
    label: 'Secondary Switch',
    color: 'secondary',
    helperText: 'Switch with secondary color',
  },
};

export const SuccessColor: Story = {
  args: {
    name: 'switch',
    label: 'Success Switch',
    color: 'success',
    helperText: 'Switch with success color',
  },
};

export const ErrorColor: Story = {
  args: {
    name: 'switch',
    label: 'Error Switch',
    color: 'error',
    helperText: 'Switch with error color',
  },
};

export const WarningColor: Story = {
  args: {
    name: 'switch',
    label: 'Warning Switch',
    color: 'warning',
    helperText: 'Switch with warning color',
  },
};

export const InfoColor: Story = {
  args: {
    name: 'switch',
    label: 'Info Switch',
    color: 'info',
    helperText: 'Switch with info color',
  },
};

export const WithValidation: Story = {
  args: {
    name: 'switch',
    label: 'Privacy Agreement',
    required: true,
    rules: {
      validate: (value: any) => {
        if (!value) {
          return 'You must accept the privacy agreement';
        }
        return true;
      },
    },
    helperText: 'Must be enabled to proceed',
  },
};
