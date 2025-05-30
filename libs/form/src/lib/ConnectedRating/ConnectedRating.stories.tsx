import type { Meta, StoryObj } from '@storybook/react';
import { ConnectedRating } from './ConnectedRating';
import { FormProvider, useForm } from 'react-hook-form';
import { action } from '@storybook/addon-actions';
import { Favorite } from '@mui/icons-material';

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

const meta: Meta<typeof ConnectedRating> = {
  title: 'Form/ConnectedRating',
  component: ConnectedRating,
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
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    max: { control: 'number' },
    precision: { control: 'number' },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'rating',
    label: 'Rate this product',
  },
};

export const WithHelperText: Story = {
  args: {
    name: 'rating',
    label: 'Product Rating',
    helperText: 'Please rate from 1 to 5 stars',
  },
};

export const Required: Story = {
  args: {
    name: 'rating',
    label: 'Required Rating',
    required: true,
    helperText: 'This rating is required',
  },
};

export const CustomMax: Story = {
  args: {
    name: 'rating',
    label: '10-Star Rating',
    max: 10,
    helperText: 'Rate from 1 to 10',
  },
};

export const HalfStars: Story = {
  args: {
    name: 'rating',
    label: 'Precise Rating',
    precision: 0.5,
    helperText: 'Half-star precision allowed',
  },
};

export const LargeSize: Story = {
  args: {
    name: 'rating',
    label: 'Large Rating',
    size: 'large',
    helperText: 'Large size rating component',
  },
};

export const SmallSize: Story = {
  args: {
    name: 'rating',
    label: 'Small Rating',
    size: 'small',
    helperText: 'Small size rating component',
  },
};

export const CustomIcon: Story = {
  args: {
    name: 'rating',
    label: 'Custom Icon',
    icon: <Favorite fontSize="inherit" />,
    emptyIcon: <Favorite fontSize="inherit" />,
    helperText: 'Using heart icons instead of stars',
  },
};

export const HiddenLabel: Story = {
  args: {
    name: 'rating',
    label: 'Hidden Label',
    hideLabel: true,
    helperText: 'Label is hidden but accessible',
  },
};

export const Disabled: Story = {
  args: {
    name: 'rating',
    label: 'Disabled Rating',
    disabled: true,
    helperText: 'This rating is disabled',
  },
};

export const ReadOnly: Story = {
  args: {
    name: 'rating',
    label: 'Read-only Rating',
    readOnly: true,
    value: 4,
    helperText: 'This rating is read-only',
  },
};

export const WithValidation: Story = {
  args: {
    name: 'rating',
    label: 'Validated Rating',
    required: true,
    rules: {
      validate: (value: any) => {
        if (value && value < 3) {
          return 'Rating must be at least 3 stars';
        }
        return true;
      },
    },
    helperText: 'Must be at least 3 stars',
  },
};
