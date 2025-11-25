// Story for {{NAME}}
import type { Meta, StoryObj } from '@storybook/react';
import {{NAME}} from './{{NAME}}';

const meta: Meta<typeof {{NAME}}> = {
  title: 'Stories/{{NAME}}',
  component: {{NAME}},
};

export default meta;

type Story = StoryObj<typeof {{NAME}}>;

export const Primary: Story = {
  args: {
    label: '{{NAME}} example',
  },
};
