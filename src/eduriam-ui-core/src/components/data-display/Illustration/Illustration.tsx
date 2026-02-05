import bell from "../../../../public/images/illustrations/bell.svg";
import certificate from "../../../../public/images/illustrations/certificate.svg";
import check from "../../../../public/images/illustrations/check.svg";
import chest from "../../../../public/images/illustrations/chest.svg";
import clappingHands from "../../../../public/images/illustrations/clappingHands.svg";
import coin from "../../../../public/images/illustrations/coin.svg";
import concept from "../../../../public/images/illustrations/concept.svg";
import confetti from "../../../../public/images/illustrations/confetti.svg";
import cross from "../../../../public/images/illustrations/cross.svg";
import eduriamLogo from "../../../../public/images/illustrations/eduriam-logo.svg";
import energy from "../../../../public/images/illustrations/energy.svg";
import finish from "../../../../public/images/illustrations/finish.svg";
import fire from "../../../../public/images/illustrations/fire.svg";
import fireDisabled from "../../../../public/images/illustrations/fireDisabled.svg";
import googleLogo from "../../../../public/images/illustrations/google-logo.svg";
import hairExample1 from "../../../../public/images/illustrations/hairExample1.svg";
import hairExample2 from "../../../../public/images/illustrations/hairExample2.svg";
import heart from "../../../../public/images/illustrations/heart.svg";
import improvement from "../../../../public/images/illustrations/improvement.svg";
import magnifyingGlass from "../../../../public/images/illustrations/magnifyingGlass.svg";
import muscle from "../../../../public/images/illustrations/muscle.svg";
import prize from "../../../../public/images/illustrations/prize.svg";
import review from "../../../../public/images/illustrations/review.svg";
import rocket from "../../../../public/images/illustrations/rocket.svg";
import sadFace from "../../../../public/images/illustrations/sadFace.svg";
import streakFreeze from "../../../../public/images/illustrations/streakFreeze.svg";
import sunglasses from "../../../../public/images/illustrations/sunglasses.svg";
import target from "../../../../public/images/illustrations/target.svg";
import timer from "../../../../public/images/illustrations/timer.svg";
import xp from "../../../../public/images/illustrations/xp.svg";

/**
 * Valid illustration names that map to the bundled SVG assets.
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

const ILLUSTRATION_SRC_BY_NAME: Record<IllustrationName, string> = {
  bell,
  certificate,
  check,
  chest,
  clappingHands,
  coin,
  concept,
  confetti,
  cross,
  "eduriam-logo": eduriamLogo,
  energy,
  finish,
  fire,
  fireDisabled,
  "google-logo": googleLogo,
  hairExample1,
  hairExample2,
  heart,
  improvement,
  magnifyingGlass,
  muscle,
  prize,
  review,
  rocket,
  sadFace,
  streakFreeze,
  sunglasses,
  target,
  timer,
  xp,
};

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
  const src = ILLUSTRATION_SRC_BY_NAME[name];

  return <img src={src} width={width} height={height} alt="" />;
};

export default Illustration;
