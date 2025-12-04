// Story for CustomInput
import type { Meta, StoryObj } from '@storybook/react';
import CustomInput from './CustomInput';

const meta: Meta<typeof CustomInput> = {
  title: 'Stories/CustomInput',
  component: CustomInput,
};

export default meta;

type Story = StoryObj<typeof CustomInput>;

export const Primary: Story = {
  args: {
    label: 'CustomInput example',
  },
};
