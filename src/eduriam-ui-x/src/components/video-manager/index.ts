// RemotionVideoPlayer
export { VideoPlayer as RemotionVideoPlayer } from "./video-player/VideoPlayer";
export type { IVideoPlayer as IRemotionVideoPlayer } from "./video-player/VideoPlayer";
export type { Caption } from "./video-scenes/Scene";
export { DEFAULT_VIDEO_FPS } from "./video-player/videoPlayerConfig";

// VideoBuilder
export { VideoBuilder } from "./video-builder/VideoBuilder";

// Types – shared
export type {
  ComponentPosition,
  ComponentSize,
  ComponentSize as ImageSize,
  ComponentPosition as Position,
} from "./types/shared";
export type { Alignment } from "./video-components/components/Paragraph/Paragraph";

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
  CodeExplainerStep,
  ICodeExplainer as CodeExplainerComponent,
} from "./video-components/components/CodeExplainer/CodeExplainer";
export type { IHeader as HeaderComponent } from "./video-components/components/Header/Header";
export type { IImage as ImageComponent } from "./video-components/components/Image/Image";
export type {
  IList as ListComponent,
  ListItem,
} from "./video-components/components/List/List";
export type { IPageHeader as PageHeaderComponent } from "./video-components/components/PageHeader/PageHeader";
export type { IPageSubheader as PageSubheaderComponent } from "./video-components/components/PageSubheader/PageSubheader";
export type { IParagraph as ParagraphComponent } from "./video-components/components/Paragraph/Paragraph";
export type {
  TableCell,
  ITable as TableComponent,
  TableRow,
} from "./video-components/components/Table/Table";
export type { IVideo as VideoComponent } from "./video-components/components/Video/Video";

// VM-prefixed type aliases for package public API
export type { IBackgroundColor as VMBackgroundColorComponent } from "./video-components/components/BackgroundColor/BackgroundColor";
export type { IBackgroundImage as VMBackgroundImageComponent } from "./video-components/components/BackgroundImage/BackgroundImage";
export type { IBackgroundVideo as VMBackgroundVideoComponent } from "./video-components/components/BackgroundVideo/BackgroundVideo";
export type { ICodeExplainer as VMCodeExplainerComponent } from "./video-components/components/CodeExplainer/CodeExplainer";
export type { IHeader as VMHeaderComponent } from "./video-components/components/Header/Header";
export type { IImage as VMImageComponent } from "./video-components/components/Image/Image";
export type { IList as VMListComponent } from "./video-components/components/List/List";
export type { IPageHeader as VMPageHeaderComponent } from "./video-components/components/PageHeader/PageHeader";
export type { IPageSubheader as VMPageSubheaderComponent } from "./video-components/components/PageSubheader/PageSubheader";
export type { IParagraph as VMParagraphComponent } from "./video-components/components/Paragraph/Paragraph";
export type { ITable as VMTableComponent } from "./video-components/components/Table/Table";
export type { IVideo as VMVideoComponent } from "./video-components/components/Video/Video";

// Slides – renderers & factory
export { SlideFactory } from "./video-slides/factory/SlideFactory";
export { RawSlide } from "./video-slides/raw-slide/RawSlide";
export { OneHeaderSlide } from "./video-slides/slide-templates/specific/OneHeaderSlide";

// Utils
export { positionToStyle } from "./utils/positionToStyle";
export { resolveSize } from "./utils/resolveSize";

// Scene components
export { BackgroundColor } from "./video-components/components/BackgroundColor/BackgroundColor";
export { BackgroundImage } from "./video-components/components/BackgroundImage/BackgroundImage";
export { BackgroundVideo } from "./video-components/components/BackgroundVideo/BackgroundVideo";
export {
  CodeExplainer,
  CodeExplainer as VideoCodeExplainer,
} from "./video-components/components/CodeExplainer/CodeExplainer";
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
export {
  PageHeader,
  PageHeader as VideoPageHeader,
} from "./video-components/components/PageHeader/PageHeader";
export {
  PageSubheader,
  PageSubheader as VideoPageSubheader,
} from "./video-components/components/PageSubheader/PageSubheader";
export {
  Paragraph,
  Paragraph as VideoParagraph,
} from "./video-components/components/Paragraph/Paragraph";
export {
  Table,
  Table as VideoTable,
} from "./video-components/components/Table/Table";
export { Video as VideoVideo } from "./video-components/components/Video/Video";

export type { IBackgroundColorProps as IBackgroundColor } from "./video-components/components/BackgroundColor/BackgroundColor";
export type { IBackgroundImageProps as IBackgroundImage } from "./video-components/components/BackgroundImage/BackgroundImage";
export type { IBackgroundVideoProps as IBackgroundVideo } from "./video-components/components/BackgroundVideo/BackgroundVideo";
export type { ICodeExplainerProps as ICodeExplainer } from "./video-components/components/CodeExplainer/CodeExplainer";
export type { IHeaderProps as IHeader } from "./video-components/components/Header/Header";
export type { IImageProps as IImage } from "./video-components/components/Image/Image";
export type { IListProps as IList } from "./video-components/components/List/List";
export type { IPageHeaderProps as IPageHeader } from "./video-components/components/PageHeader/PageHeader";
export type { IPageSubheaderProps as IPageSubheader } from "./video-components/components/PageSubheader/PageSubheader";
export type { IParagraphProps as IParagraph } from "./video-components/components/Paragraph/Paragraph";
export type { ITableProps as ITable } from "./video-components/components/Table/Table";
export type { IVideoProps as IVideo } from "./video-components/components/Video/Video";
