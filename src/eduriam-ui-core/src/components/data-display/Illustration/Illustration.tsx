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

export interface IllustrationProps {
  name: IllustrationName;
  width: number;
  height: number;
}

export const Illustration: React.FC<IllustrationProps> = ({
  name,
  width,
  height,
}) => {
  const src = `/images/illustrations/${name}.svg`;

  return <img src={src} width={width} height={height} alt="" />;
};

export default Illustration;
