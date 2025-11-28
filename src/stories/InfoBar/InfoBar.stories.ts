// Story for InfoBar
import type { Meta, StoryObj } from '@storybook/react';
import InfoBar from './InfoBar';

const meta: Meta<typeof InfoBar> = {
  title: 'Stories/InfoBar',
  component: InfoBar,
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    infoType: {
      control: { type: 'select' },
      options: ['warning', 'error', 'success', 'default'],
    },
    title: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof InfoBar>;

export const Primary: Story = {
  args: {
    infoType: 'warning',
    title: 'Warning InfoBar',
  },
};
