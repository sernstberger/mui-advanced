import type { Meta, StoryObj } from '@storybook/react';
import { ConnectedSlider } from './ConnectedSlider';
import { action } from '@storybook/addon-actions';
import { ConnectedForm } from '../ConnectedForm/ConnectedForm';

const meta: Meta<typeof ConnectedSlider> = {
  title: 'Form/ConnectedSlider',
  component: ConnectedSlider,
  decorators: [
    (Story) => (
      <ConnectedForm onSubmit={action('form-submit')}>
        <div
          style={{
            width: '300px',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
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
    hideLabel: { control: 'boolean' },
    disabled: { control: 'boolean' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    size: { control: 'select', options: ['small', 'medium'] },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'slider',
    label: 'Select Value',
  },
};

export const WithHelperText: Story = {
  args: {
    name: 'slider',
    label: 'Volume Level',
    helperText: 'Adjust the volume level',
    min: 0,
    max: 100,
  },
};

export const Required: Story = {
  args: {
    name: 'slider',
    label: 'Required Slider',
    required: true,
    helperText: 'This value is required',
  },
};

export const CustomRange: Story = {
  args: {
    name: 'slider',
    label: 'Temperature (°C)',
    min: -20,
    max: 50,
    step: 5,
    helperText: 'Select temperature in 5° increments',
  },
};

export const WithMarks: Story = {
  args: {
    name: 'slider',
    label: 'Rating Scale',
    min: 0,
    max: 10,
    step: 1,
    marks: [
      { value: 0, label: '0' },
      { value: 2, label: '2' },
      { value: 5, label: '5' },
      { value: 8, label: '8' },
      { value: 10, label: '10' },
    ],
    helperText: 'Rate from 0 to 10',
  },
};

export const Range: Story = {
  args: {
    name: 'slider',
    label: 'Price Range',
    min: 0,
    max: 1000,
    step: 10,
    valueLabelDisplay: 'on',
    helperText: 'Select a price range',
  },
};

export const SmallSize: Story = {
  args: {
    name: 'slider',
    label: 'Small Slider',
    size: 'small',
    helperText: 'Small size slider',
  },
};

export const Disabled: Story = {
  args: {
    name: 'slider',
    label: 'Disabled Slider',
    disabled: true,
    helperText: 'This slider is disabled',
  },
};

export const HiddenLabel: Story = {
  args: {
    name: 'slider',
    label: 'Hidden Label',
    hideLabel: true,
    helperText: 'Label is hidden but accessible',
  },
};

export const WithValueLabel: Story = {
  args: {
    name: 'slider',
    label: 'Progress',
    min: 0,
    max: 100,
    valueLabelDisplay: 'auto',
    valueLabelFormat: (value: number) => `${value}%`,
    helperText: 'Shows percentage on hover',
  },
};

export const WithValidation: Story = {
  args: {
    name: 'slider',
    label: 'Validated Slider',
    min: 0,
    max: 100,
    required: true,
    rules: {
      validate: (value: any) => {
        if (value < 20) {
          return 'Value must be at least 20';
        }
        if (value > 80) {
          return 'Value must not exceed 80';
        }
        return true;
      },
    },
    helperText: 'Value must be between 20 and 80',
  },
};
