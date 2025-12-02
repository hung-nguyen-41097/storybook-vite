// Story for BarChart
import type { Meta, StoryObj } from '@storybook/react';
import BarChart from './BarChart';

const meta: Meta<typeof BarChart> = {
  title: 'Stories/BarChart',
  component: BarChart,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    data: { control: 'object' },
  },
};

export default meta;

type Story = StoryObj<typeof BarChart>;
    const data = [
      {
        category: "Research",
        value1: 1000,
        value2: 588,
      },
      {
        category: "Marketing",
        value1: 1200,
        value2: 1800,
      },
      {
        category: "Sales",
        value1: 850,
        value2: 1230,
      },
    ];
    
export const Primary: Story = {
  args: {
    data: data,
  },
};
