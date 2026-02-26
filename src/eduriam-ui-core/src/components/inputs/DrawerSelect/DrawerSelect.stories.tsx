import type { Meta, StoryObj } from "@storybook/react";

import React, { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import {
  DrawerSelect,
  type DrawerSelectProps,
  type DrawerSelectSection,
} from "./DrawerSelect";

const meta: Meta<typeof DrawerSelect> = {
  title: "core/inputs/DrawerSelect",
  component: DrawerSelect,
};

export default meta;
type Story = StoryObj<typeof DrawerSelect>;

const sections: DrawerSelectSection[] = [
  {
    id: "header-1",
    title: "Selection Header 1",
    dataTest: "section-1",
    options: [
      { id: "opt-1", label: "Select option 1", dataTest: "section-1-option-1" },
      { id: "opt-2", label: "Select option 2", dataTest: "section-1-option-2" },
      { id: "opt-3", label: "Select option 3", dataTest: "section-1-option-3" },
    ],
  },
  {
    id: "header-2",
    title: "Selection Header 2",
    dataTest: "section-2",
    options: [
      { id: "opt-4", label: "Select option 4", dataTest: "section-2-option-1" },
      { id: "opt-5", label: "Select option 5", dataTest: "section-2-option-2" },
    ],
  },
];

const DrawerSelectStory: React.FC<Pick<DrawerSelectProps, "data-test">> = (
  args,
) => {
  const [open, setOpen] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string | undefined>(
    undefined,
  );

  return (
    <Box>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open drawer
      </Button>
      <DrawerSelect
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        sections={sections}
        selectedOptionId={selectedOptionId}
        onChange={({ optionId }) => {
          setSelectedOptionId(optionId);
          setOpen(false);
        }}
      />
      <Typography variant="body2" sx={{ mt: 2 }}>
        Selected: {selectedOptionId ?? "none"}
      </Typography>
    </Box>
  );
};

export const Default: Story = {
  render: (args) => <DrawerSelectStory {...args} />,
  args: {
    "data-test": "drawer-select",
  },
};
