import type { Meta, StoryObj } from '@storybook/react';
import { ConnectedCheckboxGroup } from './ConnectedCheckboxGroup';
import { FormProvider, useForm } from 'react-hook-form';
import { action } from '@storybook/addon-actions';

const options = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular', disabled: true },
  { value: 'svelte', label: 'Svelte' },
];

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

const meta: Meta<typeof ConnectedCheckboxGroup> = {
  title: 'Form/ConnectedCheckboxGroup',
  component: ConnectedCheckboxGroup,
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
    hideLabel: { control: 'boolean' },
    row: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'technologies',
    label: 'Select Technologies',
    options: options,
  },
};

export const WithHelperText: Story = {
  args: {
    name: 'technologies',
    label: 'Preferred Technologies',
    options: options,
    helperText: 'Select all technologies you are familiar with',
  },
};

export const Required: Story = {
  args: {
    name: 'technologies',
    label: 'Required Skills',
    options: options,
    required: true,
    helperText: 'At least one selection is required',
  },
};

export const InRow: Story = {
  args: {
    name: 'technologies',
    label: 'Technologies (Row Layout)',
    options: options,
    row: true,
    helperText: 'Checkboxes arranged horizontally',
  },
};

export const HiddenLabel: Story = {
  args: {
    name: 'technologies',
    label: 'Hidden Label',
    options: options,
    hideLabel: true,
    helperText: 'Label is hidden but accessible',
  },
};

export const WithValidation: Story = {
  args: {
    name: 'technologies',
    label: 'Validated Selection',
    options: options,
    required: true,
    rules: {
      validate: (value: any) => {
        if (!value || value.length === 0) {
          return 'Please select at least one technology';
        }
        if (value.length > 3) {
          return 'Please select no more than 3 technologies';
        }
        return true;
      },
    },
    helperText: 'Select 1-3 technologies',
  },
};
