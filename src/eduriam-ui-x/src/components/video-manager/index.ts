// RemotionVideoPlayer
export { VideoPlayer as RemotionVideoPlayer } from "./video-player/VideoPlayer";
export type { IVideoPlayer as IRemotionVideoPlayer } from "./video-player/VideoPlayer";
export { DEFAULT_VIDEO_FPS } from "./video-player/videoPlayerConfig";
export type { Caption } from "./video-scenes/Scene";

// VideoBuilder
export { VideoBuilder } from "./video-builder/VideoBuilder";

// Types – shared
export type {
  ComponentSize,
  ComponentSize as ImageSize,
} from "./types/shared";

// Types – scene & video
export type { Scene } from "./video-scenes/Scene";
export type { Video } from "./video/Video";
export type { VideoDefinition } from "./video/VideoDefinition";

// Types – slides
export type { BaseSlide } from "./video-slides/BaseSlide";
export type { IRawSlide } from "./video-slides/raw-slide/RawSlide";
export type { Slide, SlideType } from "./video-slides/Slide";
export type { SlideTemplates } from "./video-slides/slide-templates/SlideTemplate";
export type { IOneHeaderSlide } from "./video-slides/slide-templates/specific/OneHeaderSlide";

// Types – SceneComponent (and ComponentType)
export type {
  ComponentType,
  BaseVideoComponent as SceneComponent,
  VideoComponent as SceneComponentUnion,
} from "./video-components/VideoComponent";

// Types – component type aliases (backward compat)
export type { IBackgroundColor as BackgroundColorComponent } from "./video-components/components/BackgroundColor/BackgroundColor";
export type { IBackgroundImage as BackgroundImageComponent } from "./video-components/components/BackgroundImage/BackgroundImage";
export type { IBackgroundVideo as BackgroundVideoComponent } from "./video-components/components/BackgroundVideo/BackgroundVideo";
export type {
  CodeExplainerAnnotation,
  ICodeExplainer as CodeExplainerComponent,
  CodeExplainerStep,
} from "./video-components/components/CodeExplainer/CodeExplainer";
export type {
  IMermaidClassDiagramVideoComponent as MermaidClassDiagramComponent,
  MermaidClassDiagramStep,
} from "./video-components/components/MermaidClassDiagramVideoComponent/MermaidClassDiagramVideoComponent";
export type {
  DatabaseColumn,
  DatabaseRow,
  IDatabaseTableVideoComponent as DatabaseTableComponent,
  DatabaseValue,
} from "./video-components/components/DatabaseTable/DatabaseTableVideoComponent";
export type { IHeader as HeaderComponent } from "./video-components/components/Header/Header";
export type { IImage as ImageComponent } from "./video-components/components/Image/Image";
export type {
  IList as ListComponent,
  ListItem,
} from "./video-components/components/List/List";
export type {
  ITableVideoComponentProps,
  TableCell,
  ITable as TableComponent,
  TableRow,
} from "./video-components/components/Table/TableVideoComponent";
export type { IVideo as VideoComponent } from "./video-components/components/Video/Video";

// VM-prefixed type aliases for package public API
export type { IBackgroundColor as VMBackgroundColorComponent } from "./video-components/components/BackgroundColor/BackgroundColor";
export type { IBackgroundImage as VMBackgroundImageComponent } from "./video-components/components/BackgroundImage/BackgroundImage";
export type { IBackgroundVideo as VMBackgroundVideoComponent } from "./video-components/components/BackgroundVideo/BackgroundVideo";
export type { ICodeExplainer as VMCodeExplainerComponent } from "./video-components/components/CodeExplainer/CodeExplainer";
export type { IMermaidClassDiagramVideoComponent as VMMermaidClassDiagramComponent } from "./video-components/components/MermaidClassDiagramVideoComponent/MermaidClassDiagramVideoComponent";
export type { IDatabaseTableVideoComponent as VMDatabaseTableComponent } from "./video-components/components/DatabaseTable/DatabaseTableVideoComponent";
export type { IHeader as VMHeaderComponent } from "./video-components/components/Header/Header";
export type { IImage as VMImageComponent } from "./video-components/components/Image/Image";
export type { IList as VMListComponent } from "./video-components/components/List/List";
export type { ITable as VMTableComponent } from "./video-components/components/Table/TableVideoComponent";
export type { IVideo as VMVideoComponent } from "./video-components/components/Video/Video";

// Slides – renderers & factory
export { SlideFactory } from "./video-slides/factory/SlideFactory";
export { RawSlide } from "./video-slides/raw-slide/RawSlide";
export { OneHeaderSlide } from "./video-slides/slide-templates/specific/OneHeaderSlide";

// Utils
export { resolveSize } from "./utils/resolveSize";

// Scene components
export { BackgroundColor } from "./video-components/components/BackgroundColor/BackgroundColor";
export { BackgroundImage } from "./video-components/components/BackgroundImage/BackgroundImage";
export { BackgroundVideo } from "./video-components/components/BackgroundVideo/BackgroundVideo";
export {
  CodeExplainer,
  CodeExplainer as VideoCodeExplainer,
} from "./video-components/components/CodeExplainer/CodeExplainer";
export { MermaidClassDiagramVideoComponent } from "./video-components/components/MermaidClassDiagramVideoComponent/MermaidClassDiagramVideoComponent";
export {
  DatabaseTableVideoComponent as DatabaseTable,
  DatabaseTableVideoComponent,
  DatabaseTableVideoComponent as VideoDatabaseTable,
} from "./video-components/components/DatabaseTable/DatabaseTableVideoComponent";
export {
  Header,
  Header as VideoHeader,
} from "./video-components/components/Header/Header";
export {
  Image,
  Image as VideoImage,
} from "./video-components/components/Image/Image";
export {
  List,
  List as VideoList,
} from "./video-components/components/List/List";
export { TableVideoComponent } from "./video-components/components/Table/TableVideoComponent";
export { Video as VideoVideo } from "./video-components/components/Video/Video";

export type { IBackgroundColorProps as IBackgroundColor } from "./video-components/components/BackgroundColor/BackgroundColor";
export type { IBackgroundImageProps as IBackgroundImage } from "./video-components/components/BackgroundImage/BackgroundImage";
export type { IBackgroundVideoProps as IBackgroundVideo } from "./video-components/components/BackgroundVideo/BackgroundVideo";
export type { ICodeExplainerProps as ICodeExplainer } from "./video-components/components/CodeExplainer/CodeExplainer";
export type { IMermaidClassDiagramVideoComponentProps as IMermaidClassDiagramVideoComponent } from "./video-components/components/MermaidClassDiagramVideoComponent/MermaidClassDiagramVideoComponent";
export type { IDatabaseTableVideoComponentProps as IDatabaseTable } from "./video-components/components/DatabaseTable/DatabaseTableVideoComponent";
export type { IHeaderProps as IHeader } from "./video-components/components/Header/Header";
export type { IImageProps as IImage } from "./video-components/components/Image/Image";
export type { IListProps as IList } from "./video-components/components/List/List";
export type { ITableVideoComponentProps as ITable } from "./video-components/components/Table/TableVideoComponent";
export type { IVideoProps as IVideo } from "./video-components/components/Video/Video";
