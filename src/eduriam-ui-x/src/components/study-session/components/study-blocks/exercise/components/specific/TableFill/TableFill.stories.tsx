import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, waitFor } from "storybook/test";

import { StudyBlockComponentType } from "../../StudyBlockComponentTypes";
import { TableFill } from "./TableFill";

const meta = {
  title: "x/study-session/study-blocks/exercise-components/TableFill",
  component: TableFill,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof TableFill>;

export default meta;
type Story = StoryObj<typeof meta>;

const tableContent = [
  ["je", "suis", "content"],
  ["tu", "es", "triste"],
];
const blankCellCoords = [
  [0, 0],
  [1, 1],
];

export const Base: Story = {
  args: {
    onAnswerStateChange: fn(),
    component: {
      type: StudyBlockComponentType.TABLE_FILL,
      id: "tbl-1",
      title: "Complete the table",
      tableContent,
      blankCellCoords,
      characterButtons: ["'"],
    },
    showAnswerState: false,
  },
  play: async ({ canvas, args, step, userEvent }) => {
    await step?.("None", async () => {
      await expect(args.onAnswerStateChange).toHaveBeenCalledWith("NONE");
    });

    await step?.("Fill correct cells", async () => {
      const input00 = canvas.getByTestId("blank-0-0") as HTMLInputElement;
      await userEvent.type(input00, "je");
      const input11 = canvas.getByTestId("blank-1-1") as HTMLInputElement;
      await userEvent.type(input11, "es");
      await waitFor(() =>
        expect(args.onAnswerStateChange).toHaveBeenLastCalledWith("RIGHT"),
      );
    });

    await step?.("Make an incorrect cell", async () => {
      const input11 = canvas.getByTestId("blank-1-1") as HTMLInputElement;
      await userEvent.clear(input11);
      await userEvent.type(input11, "est");
      await waitFor(() =>
        expect(args.onAnswerStateChange).toHaveBeenLastCalledWith("WRONG"),
      );
    });
  },
};
