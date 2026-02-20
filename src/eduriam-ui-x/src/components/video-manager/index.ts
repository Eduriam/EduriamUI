// RemotionVideoPlayer
export { RemotionVideoPlayer } from "./RemotionVideoPlayer";
export type { IRemotionVideoPlayer } from "./RemotionVideoPlayer";

// VideoBuilder
export { VideoBuilder } from "./VideoBuilder";
export type { VideoBuilderResult } from "./VideoBuilder";

// Types – shared
export type { Alignment } from "./components/Paragraph/Paragraph";
export type {
  ComponentPosition,
  ComponentSize,
  ComponentSize as ImageSize,
  ComponentPosition as Position,
} from "./types/shared";

// Types – scene
export type { CustomSlide, OneHeaderSlide, Slide, SlideType } from "./slides";
export type {
  Scene,
  SlideComponent,
  StudyBlock,
  StudyBlockExplanation,
  SubtitleSegment,
} from "./types/scene";
export type { VideoDefinition } from "./types/VideoDefinition";

// Types – SceneComponent (and ComponentType)
export type {
  ComponentType,
  SceneComponent,
} from "./components/SceneComponent";

// Types – component type aliases (backward compat)
export type { IBackgroundColor as BackgroundColorComponent } from "./components/BackgroundColor/BackgroundColor";
export type { IBackgroundImage as BackgroundImageComponent } from "./components/BackgroundImage/BackgroundImage";
export type { IBackgroundVideo as BackgroundVideoComponent } from "./components/BackgroundVideo/BackgroundVideo";
export type { IHeader as HeaderComponent } from "./components/Header/Header";
export type { IImage as ImageComponent } from "./components/Image/Image";
export type { IList as ListComponent, ListItem } from "./components/List/List";
export type { IPageHeader as PageHeaderComponent } from "./components/PageHeader/PageHeader";
export type { IPageSubheader as PageSubheaderComponent } from "./components/PageSubheader/PageSubheader";
export type { IParagraph as ParagraphComponent } from "./components/Paragraph/Paragraph";
export type {
  TableCell,
  ITable as TableComponent,
  TableRow,
} from "./components/Table/Table";
export type { IVideo as VideoComponent } from "./components/Video/Video";

// VM-prefixed type aliases for package public API
export type { IBackgroundColor as VMBackgroundColorComponent } from "./components/BackgroundColor/BackgroundColor";
export type { IBackgroundImage as VMBackgroundImageComponent } from "./components/BackgroundImage/BackgroundImage";
export type { IBackgroundVideo as VMBackgroundVideoComponent } from "./components/BackgroundVideo/BackgroundVideo";
export type { IHeader as VMHeaderComponent } from "./components/Header/Header";
export type { IImage as VMImageComponent } from "./components/Image/Image";
export type { IList as VMListComponent } from "./components/List/List";
export type { IPageHeader as VMPageHeaderComponent } from "./components/PageHeader/PageHeader";
export type { IPageSubheader as VMPageSubheaderComponent } from "./components/PageSubheader/PageSubheader";
export type { IParagraph as VMParagraphComponent } from "./components/Paragraph/Paragraph";
export type { ITable as VMTableComponent } from "./components/Table/Table";
export type { IVideo as VMVideoComponent } from "./components/Video/Video";
export type {
  SlideComponent as VMSlideComponent,
  StudyBlock as VMStudyBlock,
} from "./types/scene";

// Slide materialization
export { CustomSlideClass, OneHeaderSlideClass } from "./slides";
export type { SlideClass } from "./slides";

// Utils
export { positionToStyle } from "./utils/positionToStyle";
export { resolveSize } from "./utils/resolveSize";

// Scene components
export { BackgroundColor } from "./components/BackgroundColor/BackgroundColor";
export { BackgroundImage } from "./components/BackgroundImage/BackgroundImage";
export { BackgroundVideo } from "./components/BackgroundVideo/BackgroundVideo";
export { Header, Header as VideoHeader } from "./components/Header/Header";
export { Image, Image as VideoImage } from "./components/Image/Image";
export { List, List as VideoList } from "./components/List/List";
export {
  PageHeader,
  PageHeader as VideoPageHeader,
} from "./components/PageHeader/PageHeader";
export {
  PageSubheader,
  PageSubheader as VideoPageSubheader,
} from "./components/PageSubheader/PageSubheader";
export {
  Paragraph,
  Paragraph as VideoParagraph,
} from "./components/Paragraph/Paragraph";
export { Table, Table as VideoTable } from "./components/Table/Table";
export { Video, Video as VideoVideo } from "./components/Video/Video";

export type { IBackgroundColorProps as IBackgroundColor } from "./components/BackgroundColor/BackgroundColor";
export type { IBackgroundImageProps as IBackgroundImage } from "./components/BackgroundImage/BackgroundImage";
export type { IBackgroundVideoProps as IBackgroundVideo } from "./components/BackgroundVideo/BackgroundVideo";
export type { IHeaderProps as IHeader } from "./components/Header/Header";
export type { IImageProps as IImage } from "./components/Image/Image";
export type { IListProps as IList } from "./components/List/List";
export type { IPageHeaderProps as IPageHeader } from "./components/PageHeader/PageHeader";
export type { IPageSubheaderProps as IPageSubheader } from "./components/PageSubheader/PageSubheader";
export type { IParagraphProps as IParagraph } from "./components/Paragraph/Paragraph";
export type { ITableProps as ITable } from "./components/Table/Table";
export type { IVideoProps as IVideo } from "./components/Video/Video";
