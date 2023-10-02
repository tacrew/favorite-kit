---
to: <%= abs_path %>/<%= component_name %>.stories.tsx
---

import type { Meta, StoryObj } from '@storybook/react';

import { <%= page_component_name %> } from './<%= component_name %>';

const meta: Meta<typeof <%= page_component_name %>> = {
  title: '<%= storybook_title %>',
  component: <%= page_component_name %>,
  parameters: {
    controls: { expanded: true },
  },
};
export default meta;

export const Base: StoryObj<typeof <%= page_component_name %>> = {
  name: '正常系',
};
