import type { Meta, StoryObj } from "@storybook/react";

import Typography from "@mui/material/Typography";

import { CodeBlank } from "./CodeBlank";

const meta: Meta<typeof CodeBlank> = {
  title: "x/study-session/shared/CodeBlank",
  component: CodeBlank,
};

export default meta;
type Story = StoryObj<typeof CodeBlank>;

export const Filled: Story = {
  args: { code: "print('Hello')", filled: true },
};

export const Blank: Story = {
  args: { code: "print('Hello')", filled: false },
};

/** CodeBlank used inline inside a sentence (blank state). */
export const InlineInSentenceBlank: Story = {
  render: () => (
    <Typography component="p" variant="body1">
      Use the <CodeBlank code="_____" filled={false} /> component to show a
      fill-in blank inside text, like in &ldquo;The{" "}
      <CodeBlank code="br" filled={false} /> tag inserts a line break.&rdquo;
    </Typography>
  ),
};

/** CodeBlank used inline inside a sentence (filled state). */
export const InlineInSentenceFilled: Story = {
  render: () => (
    <Typography component="p" variant="body1">
      In HTML, <CodeBlank code="<br>" filled /> inserts a line break. You can
      mix blanks and filled: <CodeBlank code="_____" filled={false} /> and{" "}
      <CodeBlank code="<p>" filled /> in the same sentence.
    </Typography>
  ),
};
