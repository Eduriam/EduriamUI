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
export type { IOneHeaderSlide } from "./video-slides/slide-templates/specific/OneHeaderSlide";

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
export type { IGif as GifComponent } from "./video-components/components/Gif/Gif";
export type { IImage as ImageComponent } from "./video-components/components/Image/Image";
export type {
  IList as ListComponent,
  ListItem,
} from "./video-components/components/List/List";
export type {
  IMermaidClassDiagram as MermaidClassDiagramComponent,
  MermaidClassDiagramStep,
} from "./video-components/components/diagrams/specific/MermaidClassDiagram/MermaidClassDiagram";
export type {
  IMermaidFlowchartDiagram as MermaidFlowchartDiagramComponent,
  MermaidFlowchartDiagramStep,
} from "./video-components/components/diagrams/specific/MermaidFlowchartDiagram/MermaidFlowchartDiagram";
export type {
  IMermaidStateDiagram as MermaidStateDiagramComponent,
  MermaidStateDiagramStep,
} from "./video-components/components/diagrams/specific/MermaidStateDiagram/MermaidStateDiagram";
export type {
  IMermaidEntityRelationshipDiagram as MermaidEntityRelationshipDiagramComponent,
  MermaidEntityRelationshipDiagramStep,
} from "./video-components/components/diagrams/specific/MermaidEntityRelationshipDiagram/MermaidEntityRelationshipDiagram";
export type {
  IMermaidGitGraphDiagram as MermaidGitGraphDiagramComponent,
  MermaidGitGraphDiagramStep,
} from "./video-components/components/diagrams/specific/MermaidGitGraphDiagram/MermaidGitGraphDiagram";
export type {
  IMermaidArchitectureDiagram as MermaidArchitectureDiagramComponent,
  MermaidArchitectureDiagramStep,
} from "./video-components/components/diagrams/specific/MermaidArchitectureDiagram/MermaidArchitectureDiagram";
export type {
  IMermaidDiagram as MermaidDiagramComponent,
  IMermaidDiagramProps as MermaidDiagramComponentProps,
  MermaidDiagramStep,
  MermaidDiagramType,
} from "./video-components/components/diagrams/MermaidDiagram/MermaidDiagram";
export type {
  ITableProps,
  TableCell,
  ITable as TableComponent,
  TableRow,
} from "./video-components/components/Table/Table";
export type { IText as HeaderComponent } from "./video-components/components/Text/Text";
export type { IVideo as VideoComponent } from "./video-components/components/Video/Video";

// VM-prefixed type aliases for package public API
export type { IBackgroundColor as VMBackgroundColorComponent } from "./video-components/components/BackgroundColor/BackgroundColor";
export type { IBackgroundImage as VMBackgroundImageComponent } from "./video-components/components/BackgroundImage/BackgroundImage";
export type { IBackgroundVideo as VMBackgroundVideoComponent } from "./video-components/components/BackgroundVideo/BackgroundVideo";
export type { IBrowser as VMBrowserComponent } from "./video-components/components/Browser/Browser";
export type { ICodeExplainer as VMCodeExplainerComponent } from "./video-components/components/CodeExplainer/CodeExplainer";
export type { IDatabaseTable as VMDatabaseTableComponent } from "./video-components/components/DatabaseTable/DatabaseTable";
export type { IGif as VMGifComponent } from "./video-components/components/Gif/Gif";
export type { IImage as VMImageComponent } from "./video-components/components/Image/Image";
export type { IList as VMListComponent } from "./video-components/components/List/List";
export type { IMermaidClassDiagram as VMMermaidClassDiagramComponent } from "./video-components/components/diagrams/specific/MermaidClassDiagram/MermaidClassDiagram";
export type { IMermaidFlowchartDiagram as VMMermaidFlowchartDiagramComponent } from "./video-components/components/diagrams/specific/MermaidFlowchartDiagram/MermaidFlowchartDiagram";
export type { IMermaidStateDiagram as VMMermaidStateDiagramComponent } from "./video-components/components/diagrams/specific/MermaidStateDiagram/MermaidStateDiagram";
export type { IMermaidEntityRelationshipDiagram as VMMermaidEntityRelationshipDiagramComponent } from "./video-components/components/diagrams/specific/MermaidEntityRelationshipDiagram/MermaidEntityRelationshipDiagram";
export type { IMermaidGitGraphDiagram as VMMermaidGitGraphDiagramComponent } from "./video-components/components/diagrams/specific/MermaidGitGraphDiagram/MermaidGitGraphDiagram";
export type { IMermaidArchitectureDiagram as VMMermaidArchitectureDiagramComponent } from "./video-components/components/diagrams/specific/MermaidArchitectureDiagram/MermaidArchitectureDiagram";
export type { IMermaidDiagram as VMMermaidDiagramComponent } from "./video-components/components/diagrams/MermaidDiagram/MermaidDiagram";
export type { ITable as VMTableComponent } from "./video-components/components/Table/Table";
export type { IText as VMHeaderComponent } from "./video-components/components/Text/Text";
export type { IVideo as VMVideoComponent } from "./video-components/components/Video/Video";

// Slides - renderers & factory
export { SlideFactory } from "./video-slides/factory/SlideFactory";
export { RawSlide } from "./video-slides/raw-slide/RawSlide";
export { OneHeaderSlide } from "./video-slides/slide-templates/specific/OneHeaderSlide";

// Utils
export { resolveSize } from "./utils/resolveSize";

// Scene components
export { BackgroundColor } from "./video-components/components/BackgroundColor/BackgroundColor";
export { BackgroundImage } from "./video-components/components/BackgroundImage/BackgroundImage";
export { BackgroundVideo } from "./video-components/components/BackgroundVideo/BackgroundVideo";
export { Browser, Browser as VideoBrowser } from "./video-components/components/Browser/Browser";
export {
  CodeExplainer,
  CodeExplainer as VideoCodeExplainer,
} from "./video-components/components/CodeExplainer/CodeExplainer";
export {
  DatabaseTable,
  DatabaseTable as VideoDatabaseTable,
} from "./video-components/components/DatabaseTable/DatabaseTable";
export { Gif, Gif as VideoGif } from "./video-components/components/Gif/Gif";
export { Image, Image as VideoImage } from "./video-components/components/Image/Image";
export { List, List as VideoList } from "./video-components/components/List/List";
export { MermaidDiagram } from "./video-components/components/diagrams/MermaidDiagram/MermaidDiagram";
export { MermaidFlowchartDiagram } from "./video-components/components/diagrams/specific/MermaidFlowchartDiagram/MermaidFlowchartDiagram";
export { MermaidClassDiagram } from "./video-components/components/diagrams/specific/MermaidClassDiagram/MermaidClassDiagram";
export { MermaidStateDiagram } from "./video-components/components/diagrams/specific/MermaidStateDiagram/MermaidStateDiagram";
export { MermaidEntityRelationshipDiagram } from "./video-components/components/diagrams/specific/MermaidEntityRelationshipDiagram/MermaidEntityRelationshipDiagram";
export { MermaidGitGraphDiagram } from "./video-components/components/diagrams/specific/MermaidGitGraphDiagram/MermaidGitGraphDiagram";
export { MermaidArchitectureDiagram } from "./video-components/components/diagrams/specific/MermaidArchitectureDiagram/MermaidArchitectureDiagram";
export { Table } from "./video-components/components/Table/Table";
export { Text, Text as VideoHeader } from "./video-components/components/Text/Text";
export { Video as VideoVideo } from "./video-components/components/Video/Video";

export type { IBackgroundColorProps as IBackgroundColor } from "./video-components/components/BackgroundColor/BackgroundColor";
export type { IBackgroundImageProps as IBackgroundImage } from "./video-components/components/BackgroundImage/BackgroundImage";
export type { IBackgroundVideoProps as IBackgroundVideo } from "./video-components/components/BackgroundVideo/BackgroundVideo";
export type { IBrowserProps as IBrowser } from "./video-components/components/Browser/Browser";
export type { ICodeExplainerProps as ICodeExplainer } from "./video-components/components/CodeExplainer/CodeExplainer";
export type { IDatabaseTableProps as IDatabaseTable } from "./video-components/components/DatabaseTable/DatabaseTable";
export type { IGifProps as IGif } from "./video-components/components/Gif/Gif";
export type { IImageProps as IImage } from "./video-components/components/Image/Image";
export type { IListProps as IList } from "./video-components/components/List/List";
export type { IMermaidDiagramProps as IMermaidDiagram } from "./video-components/components/diagrams/MermaidDiagram/MermaidDiagram";
export type { IMermaidClassDiagramProps as IMermaidClassDiagram } from "./video-components/components/diagrams/specific/MermaidClassDiagram/MermaidClassDiagram";
export type { IMermaidFlowchartDiagramProps as IMermaidFlowchartDiagram } from "./video-components/components/diagrams/specific/MermaidFlowchartDiagram/MermaidFlowchartDiagram";
export type { IMermaidStateDiagramProps as IMermaidStateDiagram } from "./video-components/components/diagrams/specific/MermaidStateDiagram/MermaidStateDiagram";
export type { IMermaidEntityRelationshipDiagramProps as IMermaidEntityRelationshipDiagram } from "./video-components/components/diagrams/specific/MermaidEntityRelationshipDiagram/MermaidEntityRelationshipDiagram";
export type { IMermaidGitGraphDiagramProps as IMermaidGitGraphDiagram } from "./video-components/components/diagrams/specific/MermaidGitGraphDiagram/MermaidGitGraphDiagram";
export type { IMermaidArchitectureDiagramProps as IMermaidArchitectureDiagram } from "./video-components/components/diagrams/specific/MermaidArchitectureDiagram/MermaidArchitectureDiagram";
export type { ITableProps as ITable } from "./video-components/components/Table/Table";
export type { ITextProps as IHeader } from "./video-components/components/Text/Text";
export type { IVideoProps as IVideo } from "./video-components/components/Video/Video";
