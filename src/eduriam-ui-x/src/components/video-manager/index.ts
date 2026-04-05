// RemotionVideoPlayer
export { VideoPlayer as RemotionVideoPlayer } from "./video-player/VideoPlayer";
export type { IVideoPlayer as IRemotionVideoPlayer } from "./video-player/VideoPlayer";
export { DEFAULT_VIDEO_FPS } from "./video-player/videoPlayerConfig";
export type { Caption } from "./video-scenes/Scene";

// VideoBuilder
export { VideoBuilder } from "./video-builder/VideoBuilder";

// Types - shared
export type { ComponentSize, ComponentSize as ImageSize } from "./types/shared";

// Types - scene & video
export type { Scene } from "./video-scenes/Scene";
export type { Video } from "./video/Video";
export type { VideoDefinition } from "./video/VideoDefinition";

// Types - slides
export type { BaseSlide } from "./video-slides/BaseSlide";
export type { IRawSlide } from "./video-slides/raw-slide/RawSlide";
export type { Slide, SlideType } from "./video-slides/Slide";
export type { SlideTemplates } from "./video-slides/slide-templates/SlideTemplate";
export type { ICodeExplanationSlide } from "./video-slides/slide-templates/specific/CodeExplanationSlide";
export type { IListSlide } from "./video-slides/slide-templates/specific/ListSlide";
export type { IOneCodeHeaderSlide } from "./video-slides/slide-templates/specific/OneCodeHeaderSlide";
export type { IOneHeaderSlide } from "./video-slides/slide-templates/specific/OneHeaderSlide";
export type { IOneImageSlide } from "./video-slides/slide-templates/specific/OneImageSlide";
export type { IThreeImagesSlide } from "./video-slides/slide-templates/specific/ThreeImagesSlide";

// Types - SceneComponent (and ComponentType)
export type {
  ComponentType,
  BaseVideoComponent as SceneComponent,
  VideoComponent as SceneComponentUnion,
} from "./video-components/VideoComponent";

// Types - component type aliases (backward compat)
export type { IBackgroundColor as BackgroundColorComponent } from "./video-components/components/BackgroundColor/BackgroundColor";
export type { IBackgroundImage as BackgroundImageComponent } from "./video-components/components/BackgroundImage/BackgroundImage";
export type { IBackgroundVideo as BackgroundVideoComponent } from "./video-components/components/BackgroundVideo/BackgroundVideo";
export type { IBrowser as BrowserComponent } from "./video-components/components/Browser/Browser";
export type {
  CodeExplainerAnnotation,
  ICodeExplainer as CodeExplainerComponent,
  CodeExplainerStep,
} from "./video-components/components/CodeExplainer/CodeExplainer";
export type {
  DatabaseColumn,
  DatabaseRow,
  IDatabaseTable as DatabaseTableComponent,
  DatabaseValue,
} from "./video-components/components/DatabaseTable/DatabaseTable";
export type {
  IMermaidDiagram as MermaidDiagramComponent,
  IMermaidDiagramProps as MermaidDiagramComponentProps,
  MermaidDiagramStep,
  MermaidDiagramType,
} from "./video-components/components/diagrams/MermaidDiagram/MermaidDiagram";
export type {
  IMermaidArchitectureDiagram as MermaidArchitectureDiagramComponent,
  MermaidArchitectureDiagramStep,
} from "./video-components/components/diagrams/specific/MermaidArchitectureDiagram/MermaidArchitectureDiagram";
export type {
  IMermaidClassDiagram as MermaidClassDiagramComponent,
  MermaidClassDiagramStep,
} from "./video-components/components/diagrams/specific/MermaidClassDiagram/MermaidClassDiagram";
export type {
  IMermaidEntityRelationshipDiagram as MermaidEntityRelationshipDiagramComponent,
  MermaidEntityRelationshipDiagramStep,
} from "./video-components/components/diagrams/specific/MermaidEntityRelationshipDiagram/MermaidEntityRelationshipDiagram";
export type {
  IMermaidFlowchartDiagram as MermaidFlowchartDiagramComponent,
  MermaidFlowchartDiagramStep,
} from "./video-components/components/diagrams/specific/MermaidFlowchartDiagram/MermaidFlowchartDiagram";
export type {
  IMermaidGitGraphDiagram as MermaidGitGraphDiagramComponent,
  MermaidGitGraphDiagramStep,
} from "./video-components/components/diagrams/specific/MermaidGitGraphDiagram/MermaidGitGraphDiagram";
export type {
  IMermaidStateDiagram as MermaidStateDiagramComponent,
  MermaidStateDiagramStep,
} from "./video-components/components/diagrams/specific/MermaidStateDiagram/MermaidStateDiagram";
export type { IGif as GifComponent } from "./video-components/components/Gif/Gif";
export type { IImage as ImageComponent } from "./video-components/components/Image/Image";
export type {
  IList as ListComponent,
  ListItem,
} from "./video-components/components/List/List";
export type {
  ITableProps,
  TableCell,
  ITable as TableComponent,
  TableRow,
} from "./video-components/components/Table/Table";
export type {
  ITerminalExplainer as TerminalExplainerComponent,
  TerminalExplainerStep,
} from "./video-components/components/TerminalExplainer/TerminalExplainer";
export type { IText as HeaderComponent } from "./video-components/components/Text/Text";
export type { IVideo as VideoComponent } from "./video-components/components/Video/Video";

// VM-prefixed type aliases for package public API
export type { IBackgroundColor as VMBackgroundColorComponent } from "./video-components/components/BackgroundColor/BackgroundColor";
export type { IBackgroundImage as VMBackgroundImageComponent } from "./video-components/components/BackgroundImage/BackgroundImage";
export type { IBackgroundVideo as VMBackgroundVideoComponent } from "./video-components/components/BackgroundVideo/BackgroundVideo";
export type { IBrowser as VMBrowserComponent } from "./video-components/components/Browser/Browser";
export type { ICodeExplainer as VMCodeExplainerComponent } from "./video-components/components/CodeExplainer/CodeExplainer";
export type { IDatabaseTable as VMDatabaseTableComponent } from "./video-components/components/DatabaseTable/DatabaseTable";
export type { IMermaidDiagram as VMMermaidDiagramComponent } from "./video-components/components/diagrams/MermaidDiagram/MermaidDiagram";
export type { IMermaidArchitectureDiagram as VMMermaidArchitectureDiagramComponent } from "./video-components/components/diagrams/specific/MermaidArchitectureDiagram/MermaidArchitectureDiagram";
export type { IMermaidClassDiagram as VMMermaidClassDiagramComponent } from "./video-components/components/diagrams/specific/MermaidClassDiagram/MermaidClassDiagram";
export type { IMermaidEntityRelationshipDiagram as VMMermaidEntityRelationshipDiagramComponent } from "./video-components/components/diagrams/specific/MermaidEntityRelationshipDiagram/MermaidEntityRelationshipDiagram";
export type { IMermaidFlowchartDiagram as VMMermaidFlowchartDiagramComponent } from "./video-components/components/diagrams/specific/MermaidFlowchartDiagram/MermaidFlowchartDiagram";
export type { IMermaidGitGraphDiagram as VMMermaidGitGraphDiagramComponent } from "./video-components/components/diagrams/specific/MermaidGitGraphDiagram/MermaidGitGraphDiagram";
export type { IMermaidStateDiagram as VMMermaidStateDiagramComponent } from "./video-components/components/diagrams/specific/MermaidStateDiagram/MermaidStateDiagram";
export type { IGif as VMGifComponent } from "./video-components/components/Gif/Gif";
export type { IImage as VMImageComponent } from "./video-components/components/Image/Image";
export type { IList as VMListComponent } from "./video-components/components/List/List";
export type { ITable as VMTableComponent } from "./video-components/components/Table/Table";
export type { ITerminalExplainer as VMTerminalExplainerComponent } from "./video-components/components/TerminalExplainer/TerminalExplainer";
export type { IText as VMHeaderComponent } from "./video-components/components/Text/Text";
export type { IVideo as VMVideoComponent } from "./video-components/components/Video/Video";

// Slides - renderers & factory
export { SlideFactory } from "./video-slides/factory/SlideFactory";
export { RawSlide } from "./video-slides/raw-slide/RawSlide";
export { CodeExplanationSlide } from "./video-slides/slide-templates/specific/CodeExplanationSlide";
export { ListSlide } from "./video-slides/slide-templates/specific/ListSlide";
export { OneCodeHeaderSlide } from "./video-slides/slide-templates/specific/OneCodeHeaderSlide";
export { OneHeaderSlide } from "./video-slides/slide-templates/specific/OneHeaderSlide";
export { OneImageSlide } from "./video-slides/slide-templates/specific/OneImageSlide";
export { ThreeImagesSlide } from "./video-slides/slide-templates/specific/ThreeImagesSlide";

// Utils
export { resolveSize } from "./utils/resolveSize";

// Scene components
export { BackgroundColor } from "./video-components/components/BackgroundColor/BackgroundColor";
export { BackgroundImage } from "./video-components/components/BackgroundImage/BackgroundImage";
export { BackgroundVideo } from "./video-components/components/BackgroundVideo/BackgroundVideo";
export {
  Browser,
  Browser as VideoBrowser,
} from "./video-components/components/Browser/Browser";
export {
  CodeExplainer,
  CodeExplainer as VideoCodeExplainer,
} from "./video-components/components/CodeExplainer/CodeExplainer";
export {
  DatabaseTable,
  DatabaseTable as VideoDatabaseTable,
} from "./video-components/components/DatabaseTable/DatabaseTable";
export { MermaidDiagram } from "./video-components/components/diagrams/MermaidDiagram/MermaidDiagram";
export { MermaidArchitectureDiagram } from "./video-components/components/diagrams/specific/MermaidArchitectureDiagram/MermaidArchitectureDiagram";
export { MermaidClassDiagram } from "./video-components/components/diagrams/specific/MermaidClassDiagram/MermaidClassDiagram";
export { MermaidEntityRelationshipDiagram } from "./video-components/components/diagrams/specific/MermaidEntityRelationshipDiagram/MermaidEntityRelationshipDiagram";
export { MermaidFlowchartDiagram } from "./video-components/components/diagrams/specific/MermaidFlowchartDiagram/MermaidFlowchartDiagram";
export { MermaidGitGraphDiagram } from "./video-components/components/diagrams/specific/MermaidGitGraphDiagram/MermaidGitGraphDiagram";
export { MermaidStateDiagram } from "./video-components/components/diagrams/specific/MermaidStateDiagram/MermaidStateDiagram";
export { Gif, Gif as VideoGif } from "./video-components/components/Gif/Gif";
export {
  Image,
  Image as VideoImage,
} from "./video-components/components/Image/Image";
export {
  List,
  List as VideoList,
} from "./video-components/components/List/List";
export { Table } from "./video-components/components/Table/Table";
export {
  TerminalExplainer,
  TerminalExplainer as VideoTerminalExplainer,
} from "./video-components/components/TerminalExplainer/TerminalExplainer";
export {
  Text,
  Text as VideoHeader,
} from "./video-components/components/Text/Text";
export { Video as VideoVideo } from "./video-components/components/Video/Video";

// Video
export type { IBackgroundColor } from "./video-components/components/BackgroundColor/BackgroundColor";
export type { IBackgroundImage } from "./video-components/components/BackgroundImage/BackgroundImage";
export type { IBackgroundVideo } from "./video-components/components/BackgroundVideo/BackgroundVideo";
export type { IBrowser } from "./video-components/components/Browser/Browser";
export type { ICodeExplainer } from "./video-components/components/CodeExplainer/CodeExplainer";
export type { IDatabaseTable } from "./video-components/components/DatabaseTable/DatabaseTable";
export type { IMermaidDiagram } from "./video-components/components/diagrams/MermaidDiagram/MermaidDiagram";
export type { IMermaidArchitectureDiagram } from "./video-components/components/diagrams/specific/MermaidArchitectureDiagram/MermaidArchitectureDiagram";
export type { IMermaidClassDiagram } from "./video-components/components/diagrams/specific/MermaidClassDiagram/MermaidClassDiagram";
export type { IMermaidEntityRelationshipDiagram } from "./video-components/components/diagrams/specific/MermaidEntityRelationshipDiagram/MermaidEntityRelationshipDiagram";
export type { IMermaidFlowchartDiagram } from "./video-components/components/diagrams/specific/MermaidFlowchartDiagram/MermaidFlowchartDiagram";
export type { IMermaidGitGraphDiagram } from "./video-components/components/diagrams/specific/MermaidGitGraphDiagram/MermaidGitGraphDiagram";
export type { IMermaidStateDiagram } from "./video-components/components/diagrams/specific/MermaidStateDiagram/MermaidStateDiagram";
export type { IGif } from "./video-components/components/Gif/Gif";
export type { IImage } from "./video-components/components/Image/Image";
export type { IList } from "./video-components/components/List/List";
export type { ITable } from "./video-components/components/Table/Table";
export type { ITerminalExplainer } from "./video-components/components/TerminalExplainer/TerminalExplainer";
export type { IText } from "./video-components/components/Text/Text";
export type { IVideo } from "./video-components/components/Video/Video";
