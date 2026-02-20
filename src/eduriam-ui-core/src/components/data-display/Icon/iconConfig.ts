/**
 * Variant for Material Icons: filled (default) or outlined.
 */
export type IconVariant = "filled" | "outlined";

/**
 * Maps an icon config key to the Material UI icon glyph and variant.
 */
export interface IconConfigEntry {
  /** Material icon glyph name (e.g. "home", "report", "arrow_back"). */
  glyph: string;
  /** Icon style: filled (default) or outlined. */
  variant: IconVariant;
}

/**
 * Config mapping icon names to Material UI icon glyphs and variants.
 *
 * Icons sourced from Eduriam Figma design system:
 * https://www.figma.com/design/VZFuqWojrXq8yWjrBIq4OH/Eduriam-Web-App?node-id=2-627
 *
 * Add entries here to standardize which icon + variant is used for a given name.
 */
export const ICON_CONFIG = {
  home: { glyph: "home", variant: "filled" },
  chevronLeft: { glyph: "arrow_back_ios", variant: "outlined" },
  chevronRight: { glyph: "arrow_forward_ios", variant: "outlined" },
  arrowLeft: { glyph: "chevron_left", variant: "outlined" },
  arrowRight: { glyph: "chevron_right", variant: "outlined" },
  arrowDown: { glyph: "expand_more", variant: "outlined" },
  arrowUp: { glyph: "expand_less", variant: "outlined" },
  check: { glyph: "check", variant: "outlined" },
  close: { glyph: "close", variant: "outlined" },
  star: { glyph: "star_border", variant: "outlined" },
  study: { glyph: "school", variant: "filled" },
  profile: { glyph: "face", variant: "filled" },
  feed: { glyph: "chat", variant: "filled" },
  premium: { glyph: "offline_bolt", variant: "outlined" },
  menu: { glyph: "menu", variant: "outlined" },
  search: { glyph: "search", variant: "outlined" },
  report: { glyph: "flag", variant: "outlined" },
  settings: { glyph: "settings", variant: "outlined" },
  follow: { glyph: "person_add", variant: "outlined" },
  unfollow: { glyph: "person_remove", variant: "outlined" },
  lock: { glyph: "lock", variant: "outlined" },
  arrowUpFilled: { glyph: "arrow_drop_up", variant: "filled" },
  arrowDownFilled: { glyph: "arrow_drop_down", variant: "filled" },
  countdown: { glyph: "timer", variant: "outlined" },
  info: { glyph: "info", variant: "outlined" },
  play: { glyph: "play_arrow", variant: "filled" },
  account: { glyph: "person_outline", variant: "outlined" },
  preferences: { glyph: "tune", variant: "outlined" },
  notification: { glyph: "notifications_none", variant: "outlined" },
  logout: { glyph: "logout", variant: "outlined" },
  courses: { glyph: "library_books", variant: "outlined" },
  help: { glyph: "support", variant: "outlined" },
  legal: { glyph: "gavel", variant: "outlined" },
  thumbUp: { glyph: "thumb_up", variant: "outlined" },
  thumbDown: { glyph: "thumb_down", variant: "outlined" },
  removeFromReview: { glyph: "playlist_remove", variant: "outlined" },
  delete: { glyph: "delete", variant: "outlined" },
  shield: { glyph: "shield", variant: "filled" },
  add: { glyph: "add", variant: "filled" },
  shop: { glyph: "storefront", variant: "outlined" },
  certificate: { glyph: "workspace_premium", variant: "outlined" },
  share: { glyph: "share", variant: "filled" },
  addReaction: { glyph: "add_reaction", variant: "outlined" },
  studyPlan: { glyph: "list_alt", variant: "outlined" },
  dragIndicator: { glyph: "drag_indicator", variant: "outlined" },
  restore: { glyph: "restore", variant: "outlined" },
  audioOn: { glyph: "volume_up", variant: "outlined" },
  audioOff: { glyph: "volume_off", variant: "outlined" },
} as const satisfies Record<string, IconConfigEntry>;

/** Array of valid icon names. Use for Storybook controls. */
export const ICON_NAMES = Object.keys(
  ICON_CONFIG,
) as (keyof typeof ICON_CONFIG)[];
