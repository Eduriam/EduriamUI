import type { IBackgroundColor } from "./BackgroundColor/BackgroundColor";
import type { IBackgroundImage } from "./BackgroundImage/BackgroundImage";
import type { IBackgroundVideo } from "./BackgroundVideo/BackgroundVideo";
import type { IHeader } from "./Header/Header";
import type { IImage } from "./Image/Image";
import type { IList } from "./List/List";
import type { IPageHeader } from "./PageHeader/PageHeader";
import type { IPageSubheader } from "./PageSubheader/PageSubheader";
import type { IParagraph } from "./Paragraph/Paragraph";
import type { ITable } from "./Table/Table";
import type { IVideo } from "./Video/Video";

export type SceneComponent =
  | IHeader
  | IBackgroundColor
  | IPageHeader
  | IPageSubheader
  | IParagraph
  | IList
  | ITable
  | IImage
  | IVideo
  | IBackgroundImage
  | IBackgroundVideo;

/** Union of the `type` discriminant of all scene components. */
export type ComponentType = SceneComponent["type"];
