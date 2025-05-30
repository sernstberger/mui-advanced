import type { Meta, StoryObj } from '@storybook/react';
import { ConnectedAutocomplete } from './ConnectedAutocomplete';
import { action } from '@storybook/addon-actions';
import { ConnectedForm } from '../ConnectedForm/ConnectedForm';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4 (Disabled)', disabled: true },
  { value: 'option5', label: 'Option 5' },
];

const meta: Meta<typeof ConnectedAutocomplete> = {
  title: 'Form/ConnectedAutocomplete',
  component: ConnectedAutocomplete,
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
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    required: { control: 'boolean' },
    hideLabel: { control: 'boolean' },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'autocomplete',
    label: 'Select Option',
    options: options,
  },
};

export const WithPlaceholder: Story = {
  args: {
    name: 'autocomplete',
    label: 'Select Option',
    options: options,
    placeholder: 'Choose an option...',
  },
};

export const WithHelperText: Story = {
  args: {
    name: 'autocomplete',
    label: 'Select Option',
    options: options,
    helperText: 'Choose one of the available options',
  },
};

export const Required: Story = {
  args: {
    name: 'autocomplete',
    label: 'Required Field',
    options: options,
    required: true,
    helperText: 'This field is required',
  },
};

export const Multiple: Story = {
  args: {
    name: 'autocomplete',
    label: 'Multiple Selection',
    options: options,
    multiple: true,
    helperText: 'Select multiple options',
  },
};

export const Disabled: Story = {
  args: {
    name: 'autocomplete',
    label: 'Disabled Field',
    options: options,
    disabled: true,
    helperText: 'This field is disabled',
  },
};

export const HiddenLabel: Story = {
  args: {
    name: 'autocomplete',
    label: 'Hidden Label',
    options: options,
    hideLabel: true,
    placeholder: 'Label is hidden but accessible',
  },
};

export const WithValidation: Story = {
  args: {
    name: 'autocomplete',
    label: 'Validated Field',
    options: options,
    required: true,
    rules: {
      validate: (value: any) => {
        if (value && value.value === 'option4') {
          return 'Option 4 is not allowed';
        }
        return true;
      },
    },
    helperText: 'Option 4 will trigger a validation error',
  },
};
