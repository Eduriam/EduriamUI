import type { ID } from "../../../models/ID";
import type { IBackgroundColor } from "./components/BackgroundColor/BackgroundColor";
import { IBackgroundImage } from "./components/BackgroundImage/BackgroundImage";
import type { IBackgroundVideo } from "./components/BackgroundVideo/BackgroundVideo";
import type { IBrowser } from "./components/Browser/Browser";
import type { ICodeExplainer } from "./components/CodeExplainer/CodeExplainer";
import type { IDatabaseTableVideoComponent } from "./components/DatabaseTable/DatabaseTableVideoComponent";
import type { IGif } from "./components/Gif/Gif";
import type { IImage } from "./components/Image/Image";
import type { IList } from "./components/List/List";
import type { IMermaidClassDiagramVideoComponent } from "./components/MermaidClassDiagramVideoComponent/MermaidClassDiagramVideoComponent";
import type { ITable } from "./components/Table/TableVideoComponent";
import type { IText } from "./components/Text/Text";
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
  | IText
  | IList
  | ITable
  | IDatabaseTableVideoComponent
  | IBrowser
  | IGif
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


