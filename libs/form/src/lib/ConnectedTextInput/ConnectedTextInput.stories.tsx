import type { Meta, StoryObj } from '@storybook/react';
import { ConnectedTextInput } from './ConnectedTextInput';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof ConnectedTextInput> = {
  component: ConnectedTextInput,
  title: 'ConnectedTextInput',
};
export default meta;
type Story = StoryObj<typeof ConnectedTextInput>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to ConnectedTextInput!/gi)).toBeTruthy();
  },
};
