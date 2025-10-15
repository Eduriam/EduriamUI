export interface EmojiProps {
  emoji: string;
  width?: number;
  height?: number;
}

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
