import { theme } from "@eduriam/ui-core";
import type { Meta, StoryObj } from "@storybook/react";

import { Browser } from "./Browser";

const meta: Meta<typeof Browser> = {
  title: "x/video-manager/video-components/Browser",
  component: Browser,
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
type Story = StoryObj<typeof Browser>;

export const HtmlPreview: Story = {
  args: {
    comp: {
      id: "browser1",
      type: "BROWSER",
      startTime: 0,
      column: "first",
      html: `
        <main style="font-family: Inter, Arial, sans-serif; padding: 24px;">
          <h1 style="margin:0 0 8px; color:#0f172a;">Eduriam Docs</h1>
          <p style="margin:0 0 16px; color:#334155;">Build lessons, assign exercises, and track progress in one place.</p>
          <button style="padding:10px 14px; border-radius:10px; border:none; background:#0ea5e9; color:white; font-weight:600;">Get Started</button>
        </main>
      `,
      inlineCss: "body{margin:0;background:#f8fafc;}",
    },
  },
};
