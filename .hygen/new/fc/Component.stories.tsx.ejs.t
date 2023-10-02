---
to: <%= abs_path %>/<%= component_name %>.stories.tsx
---

import type { Meta, StoryObj } from '@storybook/react';

import { <%= component_name %> } from './<%= component_name %>';

const meta: Meta<typeof <%= component_name %>> = {
  title: '<%= storybook_title %>',
  component: <%= component_name %>,
  parameters: {
    controls: { expanded: true },
  },
};
export default meta;

export const Base: StoryObj<typeof <%= component_name %>> = {
  name: '基本形',
<% if (have_props) { -%>
  args: {},
<% } -%>
};
