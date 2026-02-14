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

export const ScrollableLongLabels: Story = {
  render: () => {
    const Example = () => {
      const [value, setValue] = useState("overview");
      return (
        <Tabs
          value={value}
          onChange={(newValue) => setValue(newValue as string)}
          tabs={[
            {
              label: "Overview & Summary",
              value: "overview",
            },
            {
              label: "Detailed Configuration Settings",
              value: "config",
            },
            {
              label: "Analytics & Reports",
              value: "analytics",
            },
            {
              label: "User Management & Permissions",
              value: "users",
            },
            {
              label: "Billing & Subscription Plans",
              value: "billing",
            },
          ]}
        />
      );
    };

    return <Example />;
  },
};

export const FullWidth: Story = {
  render: () => {
    const Example = () => {
      const [value, setValue] = useState("tab-1");
      return (
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={(newValue) => setValue(newValue as string)}
          tabs={[
            { label: "Overview", value: "tab-1" },
            { label: "Details", value: "tab-2" },
            { label: "History", value: "tab-3" },
          ]}
        />
      );
    };

    return <Example />;
  },
};
