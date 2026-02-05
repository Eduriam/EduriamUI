/**
 * Props for the `Emoji` component.
 *
 * Renders a Twemoji SVG for a single emoji character.
 */
export interface EmojiProps {
  /**
   * Single Unicode emoji character to render, e.g. "🎉" or "✅".
   */
  emoji: string;

  /**
   * Display width in pixels.
   *
   * @default 24
   */
  width?: number;

  /**
   * Display height in pixels.
   *
   * @default 24
   */
  height?: number;
}

/**
 * Emoji component backed by the Twemoji CDN.
 *
 * Use this instead of plain text emoji when you want consistent rendering
 * across platforms.
 */
export const Emoji: React.FC<EmojiProps> = ({
  emoji,
  width = 24,
  height = 24,
}) => {
  const codepoint = emoji.codePointAt(0);
  const emojiCode =
    codepoint !== undefined ? codepoint.toString(16) : undefined;

  return (
    <>
      {emojiCode ? (
        <img
          src={`https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/${emojiCode}.svg`}
          height={height}
          width={width}
          alt={emoji}
        />
      ) : null}
    </>
  );
};

export default Emoji;
