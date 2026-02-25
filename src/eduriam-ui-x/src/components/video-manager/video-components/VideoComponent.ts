import type { ID } from "../../../models/ID";
import type { IBackgroundColor } from "./components/BackgroundColor/BackgroundColor";
import { IBackgroundImage } from "./components/BackgroundImage/BackgroundImage";
import type { IBackgroundVideo } from "./components/BackgroundVideo/BackgroundVideo";
import type { ICodeExplainer } from "./components/CodeExplainer/CodeExplainer";
import type { IDatabaseTableVideoComponent } from "./components/DatabaseTable/DatabaseTableVideoComponent";
import type { IHeader } from "./components/Header/Header";
import type { IImage } from "./components/Image/Image";
import type { IList } from "./components/List/List";
import type { IPageHeader } from "./components/PageHeader/PageHeader";
import type { IPageSubheader } from "./components/PageSubheader/PageSubheader";
import type { IParagraph } from "./components/Paragraph/Paragraph";
import type { ITable } from "./components/Table/TableVideoComponent";
import type { IVideo } from "./components/Video/Video";

export interface BaseVideoComponent {
  id: ID;
  type: ComponentType;
  startTime: number;
}

export type ComponentType = VideoComponent["type"];

/** Union of all concrete scene component types. */
export type VideoComponent =
  | IHeader
  | IBackgroundColor
  | IPageHeader
  | IPageSubheader
  | IParagraph
  | IList
  | ITable
  | IDatabaseTableVideoComponent
  | IImage
  | IVideo
  | IBackgroundImage
  | IBackgroundVideo
  | ICodeExplainer;
