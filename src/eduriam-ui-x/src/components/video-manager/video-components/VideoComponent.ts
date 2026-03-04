import type { ID } from "../../../models/ID";
import type { IBackgroundColor } from "./components/BackgroundColor/BackgroundColor";
import { IBackgroundImage } from "./components/BackgroundImage/BackgroundImage";
import type { IBackgroundVideo } from "./components/BackgroundVideo/BackgroundVideo";
import type { IBrowser } from "./components/Browser/Browser";
import type { ICodeExplainer } from "./components/CodeExplainer/CodeExplainer";
import type { IDatabaseTable } from "./components/DatabaseTable/DatabaseTable";
import type { IGif } from "./components/Gif/Gif";
import type { IImage } from "./components/Image/Image";
import type { IList } from "./components/List/List";
import type { ITerminalExplainer } from "./components/TerminalExplainer/TerminalExplainer";
import type { IMermaidArchitectureDiagram } from "./components/diagrams/specific/MermaidArchitectureDiagram/MermaidArchitectureDiagram";
import type { IMermaidClassDiagram } from "./components/diagrams/specific/MermaidClassDiagram/MermaidClassDiagram";
import type { IMermaidEntityRelationshipDiagram } from "./components/diagrams/specific/MermaidEntityRelationshipDiagram/MermaidEntityRelationshipDiagram";
import type { IMermaidFlowchartDiagram } from "./components/diagrams/specific/MermaidFlowchartDiagram/MermaidFlowchartDiagram";
import type { IMermaidGitGraphDiagram } from "./components/diagrams/specific/MermaidGitGraphDiagram/MermaidGitGraphDiagram";
import type { IMermaidStateDiagram } from "./components/diagrams/specific/MermaidStateDiagram/MermaidStateDiagram";
import type { ITable } from "./components/Table/Table";
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
  | IDatabaseTable
  | IBrowser
  | IGif
  | IImage
  | IVideo
  | ICodeExplainer
  | ITerminalExplainer
  | IMermaidFlowchartDiagram
  | IMermaidClassDiagram
  | IMermaidStateDiagram
  | IMermaidEntityRelationshipDiagram
  | IMermaidGitGraphDiagram
  | IMermaidArchitectureDiagram;

/** Union of RAW slide background layer components. */
export type BackgroundComponent =
  | IBackgroundColor
  | IBackgroundImage
  | IBackgroundVideo;

export type ComponentType = VideoComponent["type"];
