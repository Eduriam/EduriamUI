import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import { TabBarPanel } from "./TabBarPanel";

const meta: Meta<typeof TabBarPanel> = {
  title: "core/components/TabBarPanel",
  component: TabBarPanel,
};

export default meta;
type Story = StoryObj<typeof TabBarPanel>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("1");
    return (
      <TabBarPanel
        value={value}
        onChange={(newValue) => setValue(newValue as string)}
        tabs={[
          { id: "1", name: "Tab 1" },
          { id: "2", name: "Tab 2" },
          { id: "3", name: "Tab 3" },
        ]}
        panelContent={<Typography>Content for tab {value}</Typography>}
      />
    );
  },
};
