/**
 * Valid illustration names that map to `/images/illustrations/{name}.svg`.
 *
 * Use these to avoid typos and keep illustration choices consistent.
 */
export const ILLUSTRATION_NAMES = [
  "bell",
  "certificate",
  "check",
  "chest",
  "clappingHands",
  "coin",
  "concept",
  "confetti",
  "cross",
  "eduriam-logo",
  "energy",
  "finish",
  "fire",
  "fireDisabled",
  "google-logo",
  "hairExample1",
  "hairExample2",
  "heart",
  "improvement",
  "magnifyingGlass",
  "muscle",
  "prize",
  "review",
  "rocket",
  "sadFace",
  "streakFreeze",
  "sunglasses",
  "target",
  "timer",
  "xp",
] as const;

export type IllustrationName = (typeof ILLUSTRATION_NAMES)[number];

/**
 * Props for the `Illustration` component.
 *
 * Renders a static SVG illustration from the design system illustration set.
 */
export interface IllustrationProps {
  /**
   * Which illustration asset to show. Must be one of `ILLUSTRATION_NAMES`.
   */
  name: IllustrationName;

  /**
   * Display width in pixels.
   */
  width: number;

  /**
   * Display height in pixels.
   */
  height: number;
}

/**
 * Displays a design-system illustration image by name.
 *
 * Use this for decorative or explanatory visuals; do not use for user
 * uploaded images or arbitrary URLs.
 */
export const Illustration: React.FC<IllustrationProps> = ({
  name,
  width,
  height,
}) => {
  const src = `/images/illustrations/${name}.svg`;

  return <img src={src} width={width} height={height} alt="" />;
};

export default Illustration;
