import type { ID } from "../../../models/ID";
import type { IBackgroundColor } from "./components/BackgroundColor/BackgroundColor";
import { IBackgroundImage } from "./components/BackgroundImage/BackgroundImage";
import type { IBackgroundVideo } from "./components/BackgroundVideo/BackgroundVideo";
import type { ICodeExplainer } from "./components/CodeExplainer/CodeExplainer";
import type { IDatabaseTableVideoComponent } from "./components/DatabaseTable/DatabaseTableVideoComponent";
import type { IHeader } from "./components/Header/Header";
import type { IImage } from "./components/Image/Image";
import type { IList } from "./components/List/List";
import type { IMermaidClassDiagramVideoComponent } from "./components/MermaidClassDiagramVideoComponent/MermaidClassDiagramVideoComponent";
import type { IPageHeader } from "./components/PageHeader/PageHeader";
import type { IPageSubheader } from "./components/PageSubheader/PageSubheader";
import type { IParagraph } from "./components/Paragraph/Paragraph";
import type { ITable } from "./components/Table/TableVideoComponent";
import type { IVideo } from "./components/Video/Video";

export type VideoComponentColumn = "first" | "second" | "third";
export type BackgroundComponentType = BackgroundComponent["type"];

export interface BaseVideoComponent {
  id: ID;
  type: ComponentType;
  startTime: number;
  column: VideoComponentColumn;
}

export interface BackgroundVideoComponent {
  id: ID;
  type: BackgroundComponentType;
  startTime: number;
}

/** Union of all renderable content components in RAW slide columns. */
export type VideoComponent =
  | IHeader
  | IPageHeader
  | IPageSubheader
  | IParagraph
  | IList
  | ITable
  | IDatabaseTableVideoComponent
  | IImage
  | IVideo
  | ICodeExplainer
  | IMermaidClassDiagramVideoComponent;

/** Union of RAW slide background layer components. */
export type BackgroundComponent =
  | IBackgroundColor
  | IBackgroundImage
  | IBackgroundVideo;

export type ComponentType = VideoComponent["type"];
