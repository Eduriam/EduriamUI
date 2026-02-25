import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { Header } from "../../data-display/Header";
import { Paragraph } from "../../data-display/Paragraph";
import { IconButton } from "../../inputs/IconButton";
import { LargeButton } from "../../inputs/LargeButton";
import { Drawer } from "../../navigation/Drawer";

/**
 * Props for the `ExplanationDrawer` component.
 *
 * Renders a drawer that contains an explanation block with title, body text,
 * optional feedback icons (thumbs up/down), and a continue button that closes the drawer.
 */
export interface ExplanationDrawerDataTest {
  /**
   * Data test id for the explanation drawer section.
   */
  explanationSection?: string;

  /**
   * Data test id for the "Got it"/continue button.
   */
  gotItButton?: string;
}

export interface ExplanationDrawerProps {
  /**
   * Whether the drawer is open.
   */
  open: boolean;

  /**
   * Called when the drawer requests to be closed (backdrop, Escape, or continue button).
   */
  onClose: () => void;

  /**
   * Heading text shown at the top.
   */
  title: string;

  /**
   * Body text shown below the title.
   */
  bodyText: string;

  /**
   * Label for the continue button (closes the drawer when pressed).
   */
  continueButtonLabel: string;

  /**
   * Called when the user taps the thumbs-up icon. If omitted, feedback icons are hidden.
   */
  onThumbsUp?: () => void;

  /**
   * Called when the user taps the thumbs-down icon. If omitted, feedback icons are hidden.
   */
  onThumbsDown?: () => void;

  /**
   * Optional data test ids for the drawer section and continue button.
   */
  dataTest?: ExplanationDrawerDataTest;
}

/**
 * Explanation drawer: a `Drawer` that displays a title, body text, optional
 * thumbs up/down feedback, and a continue button that closes the drawer.
 *
 * Composes `Drawer`, `Header`, `Paragraph`, `IconButton` (thumbs up/down),
 * and `LargeButton`.
 */
export const ExplanationDrawer: React.FC<ExplanationDrawerProps> = ({
  open,
  onClose,
  title,
  bodyText,
  continueButtonLabel,
  onThumbsUp,
  onThumbsDown,
  dataTest,
}) => {
  const showFeedback = onThumbsUp !== undefined || onThumbsDown !== undefined;

  return (
    <Drawer
      open={open}
      onClose={onClose}
      data-test={dataTest?.explanationSection}
    >
      <Stack spacing={3} sx={{ flex: 1, minHeight: 0 }}>
        <Header variant="section" text={title} />
        <Paragraph text={bodyText} />
        {showFeedback && (
          <Box display="flex" justifyContent="flex-end" gap={1}>
            {onThumbsUp !== undefined && (
              <IconButton
                icon="thumbUp"
                variant="text"
                color="textPrimary"
                onClick={onThumbsUp}
              />
            )}
            {onThumbsDown !== undefined && (
              <IconButton
                icon="thumbDown"
                variant="text"
                color="textPrimary"
                onClick={onThumbsDown}
              />
            )}
          </Box>
        )}
        <Box sx={{ width: "100%", paddingTop: showFeedback ? 0 : 12 }}>
          <LargeButton onClick={onClose} data-test={dataTest?.gotItButton}>
            {continueButtonLabel}
          </LargeButton>
        </Box>
      </Stack>
    </Drawer>
  );
};

export default ExplanationDrawer;
