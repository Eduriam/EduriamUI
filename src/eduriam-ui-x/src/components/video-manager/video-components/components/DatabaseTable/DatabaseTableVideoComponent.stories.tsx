import { theme } from "@eduriam/ui-core";
import type { Meta, StoryObj } from "@storybook/react";

import { DatabaseTableVideoComponent } from "./DatabaseTableVideoComponent";

const meta: Meta<typeof DatabaseTableVideoComponent> = {
  title: "x/video-manager/video-components/DatabaseTable",
  component: DatabaseTableVideoComponent,
  decorators: [
    (Story) => (
      <div
        style={{
          width: "100%",
          aspectRatio: "1920/1080",
          position: "relative",
          overflow: "hidden",
          background: theme.palette.background.paper,
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DatabaseTableVideoComponent>;

export const QueryResult: Story = {
  args: {
    comp: {
      id: "db-query-1",
      type: "DATABASE_TABLE",
      startTime: 0,
      position: "CENTER",
      tableName: "query_result",
      columns: [
        { key: "id", label: "id" },
        { key: "email", label: "email" },
        { key: "country", label: "country" },
        { key: "active", label: "active" },
        { key: "last_login", label: "last_login" },
      ],
      rows: [
        {
          id: 101,
          email: "hana.rivera@eduriam.dev",
          country: "US",
          active: true,
          last_login: "2026-02-18 08:11:45",
        },
        {
          id: 102,
          email: "lin.park@eduriam.dev",
          country: "KR",
          active: false,
          last_login: null,
        },
        {
          id: 103,
          email: "marco.vega@eduriam.dev",
          country: "ES",
          active: true,
          last_login: "2026-02-20 22:41:09",
        },
      ],
    },
  },
};

export const UsersTable: Story = {
  args: {
    comp: {
      id: "db-users-1",
      type: "DATABASE_TABLE",
      startTime: 0,
      position: "CENTER",
      tableName: "users",
      columns: [
        { key: "user_id", label: "user_id" },
        { key: "username", label: "username" },
        { key: "plan", label: "plan" },
        { key: "created_at", label: "created_at" },
      ],
      rows: [
        {
          user_id: 1,
          username: "nina",
          plan: "pro",
          created_at: "2025-11-03",
        },
        {
          user_id: 2,
          username: "kevin",
          plan: "free",
          created_at: "2026-01-12",
        },
        {
          user_id: 3,
          username: "sara",
          plan: "team",
          created_at: "2026-02-08",
        },
      ],
    },
  },
};
