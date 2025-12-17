// Story for CustomInput
import type { Meta, StoryObj } from '@storybook/react';
import CustomInput from './CustomInput';
import { fn } from 'storybook/test';

const meta: Meta<typeof CustomInput> = {
  title: 'Stories/CustomInput',
  component: CustomInput,
  args: {
    label: 'Default Input',
    isRequired: false,
    errorMessage: '',
    isError: false,
    labelTagTitle: '',
    isNewLabel: false,
    InputBaseProps: {
      onChange: fn(),
    }
  },
};

export default meta;

type Story = StoryObj<typeof CustomInput>;

export const PrimaryInput: Story = {
  args: {
    label: 'Primary Input',

  },
};

export const DisabledInput: Story = {
  args: {
    label: 'Disabled Input',
    InputBaseProps: {
      disabled: true,
    },
  },
};

export const RequiredInput: Story = {
  args: {
    label: 'Required Input',
    isRequired: true,
  },
};

export const ErrorInput: Story = {
  args: {
    label: 'Error Input',
    errorMessage: 'This is required field',
    isError: true,
    isRequired: true,
  },
};

export const LabeledInput: Story = {
  args: {
    label: 'Labeled Input',
    labelTagTitle: 'New',
    isNewLabel: true,
  },
};


