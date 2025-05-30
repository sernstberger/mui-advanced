import type { Meta, StoryObj } from '@storybook/react';
import { ConnectedCheckbox } from './ConnectedCheckbox';
import { action } from '@storybook/addon-actions';
import { ConnectedForm } from '../ConnectedForm/ConnectedForm';

const meta: Meta<typeof ConnectedCheckbox> = {
  title: 'Form/ConnectedCheckbox',
  component: ConnectedCheckbox,
  decorators: [
    (Story) => (
      <ConnectedForm onSubmit={action('form-submit')}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            maxWidth: '400px',
          }}
        >
          <Story />
          <button type="submit" style={{ marginTop: '1rem' }}>
            Submit
          </button>
        </div>
      </ConnectedForm>
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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'checkbox',
    label: 'Accept Terms',
  },
};

export const WithHelperText: Story = {
  args: {
    name: 'checkbox',
    label: 'Subscribe to Newsletter',
    helperText: 'You can unsubscribe at any time',
  },
};

export const Required: Story = {
  args: {
    name: 'checkbox',
    label: 'I agree to the terms and conditions',
    required: true,
    helperText: 'This field is required',
  },
};

export const Disabled: Story = {
  args: {
    name: 'checkbox',
    label: 'Disabled Option',
    disabled: true,
    helperText: 'This checkbox is disabled',
  },
};

export const WithValidation: Story = {
  args: {
    name: 'checkbox',
    label: 'Custom Validation',
    required: true,
    rules: {
      validate: (value: any) => {
        if (!value) {
          return 'You must check this box to continue';
        }
        return true;
      },
    },
    helperText: 'Custom validation message on error',
  },
};
