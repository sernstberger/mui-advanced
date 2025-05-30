import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { z } from 'zod';
import { ConnectedForm } from './ConnectedForm';
import { ConnectedTextInput } from '../ConnectedTextInput/ConnectedTextInput';
import { ConnectedSelect } from '../ConnectedSelect/ConnectedSelect';
import { ConnectedCheckbox } from '../ConnectedCheckbox/ConnectedCheckbox';
import { Button, Stack, Typography } from '@mui/material';

const meta: Meta<typeof ConnectedForm> = {
  title: 'Form/ConnectedForm',
  component: ConnectedForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ConnectedForm>;

// Basic form schema
const basicSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  role: z.string().min(1, 'Please select a role'),
  agreeToTerms: z.boolean().refine((val) => val, 'You must agree to the terms'),
});

type BasicFormData = z.infer<typeof basicSchema>;

export const BasicForm: Story = {
  render: () => (
    <ConnectedForm<BasicFormData>
      schema={basicSchema}
      onSubmit={action('form-submit')}
      onError={action('form-error')}
      data-testid="basic-form"
    >
      <Stack spacing={3} sx={{ minWidth: 400 }}>
        <Typography variant="h6">User Registration</Typography>

        <ConnectedTextInput
          name="name"
          label="Full Name"
          placeholder="Enter your full name"
          required
        />

        <ConnectedTextInput
          name="email"
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          required
        />

        <ConnectedSelect
          name="role"
          label="Role"
          options={[
            { label: 'Developer', value: 'developer' },
            { label: 'Designer', value: 'designer' },
            { label: 'Manager', value: 'manager' },
          ]}
          required
        />

        <ConnectedCheckbox
          name="agreeToTerms"
          label="I agree to the terms and conditions"
          required
        />

        <Button type="submit" variant="contained" size="large">
          Register
        </Button>
      </Stack>
    </ConnectedForm>
  ),
};

export const FormWithoutSchema: Story = {
  render: () => (
    <ConnectedForm
      onSubmit={action('form-submit')}
      data-testid="no-schema-form"
    >
      <Stack spacing={3} sx={{ minWidth: 400 }}>
        <Typography variant="h6">Simple Form (No Schema)</Typography>

        <ConnectedTextInput
          name="message"
          label="Message"
          placeholder="Enter your message"
          multiline
          rows={4}
        />

        <Button type="submit" variant="contained">
          Send Message
        </Button>
      </Stack>
    </ConnectedForm>
  ),
};

export const FormWithCustomProps: Story = {
  render: () => (
    <ConnectedForm
      formProps={{
        defaultValues: {
          name: 'John Doe',
          email: 'john@example.com',
        },
        mode: 'onChange',
      }}
      onSubmit={action('form-submit')}
      id="custom-form"
      className="custom-form-class"
      data-testid="custom-form"
    >
      <Stack spacing={3} sx={{ minWidth: 400 }}>
        <Typography variant="h6">Form with Custom Props</Typography>

        <ConnectedTextInput name="name" label="Name" required />

        <ConnectedTextInput name="email" label="Email" type="email" required />

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Stack>
    </ConnectedForm>
  ),
};
