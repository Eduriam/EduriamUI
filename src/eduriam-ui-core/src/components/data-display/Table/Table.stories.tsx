import type { Meta, StoryObj } from "@storybook/react";

import { Table } from "./Table";

const meta: Meta<typeof Table> = {
  title: "core/data-display/Table",
  component: Table,
};

export default meta;
type Story = StoryObj<typeof Table>;

const columns = [
  { key: "id", label: "Id" },
  { key: "name", label: "Name" },
  { key: "lastLogin", label: "Last Login" },
];

const rows = [
  { id: "10", name: "Pepa", lastLogin: "2026-02-18" },
  { id: "11", name: "Pepa2", lastLogin: "2026-02-19" },
  { id: "12", name: "Pepa3", lastLogin: "2026-02-20" },
];

export const Default: Story = {
  args: {
    columns,
    rows,
  },
};
