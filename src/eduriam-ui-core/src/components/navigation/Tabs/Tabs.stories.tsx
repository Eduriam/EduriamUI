import type { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";

import { Tabs } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "core/navigation/Tabs",
  component: Tabs,
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => {
    const Example = () => {
      const [value, setValue] = useState("tab-1");
      return (
        <Tabs
          value={value}
          onChange={(newValue) => setValue(newValue as string)}
          tabs={[
            { label: "Tab", value: "tab-1" },
            { label: "Tab", value: "tab-2" },
          ]}
        />
      );
    };

    return <Example />;
  },
};
