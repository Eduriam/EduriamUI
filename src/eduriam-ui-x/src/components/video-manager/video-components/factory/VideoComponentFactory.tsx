import React from "react";

import { VideoComponent } from "../VideoComponent";
import BackgroundColor from "../components/BackgroundColor/BackgroundColor";
import BackgroundImage from "../components/BackgroundImage/BackgroundImage";
import { BackgroundVideo } from "../components/BackgroundVideo/BackgroundVideo";
import { CodeExplainer } from "../components/CodeExplainer/CodeExplainer";
import { DatabaseTableVideoComponent } from "../components/DatabaseTable/DatabaseTableVideoComponent";
import { Header } from "../components/Header/Header";
import { Image } from "../components/Image/Image";
import { List } from "../components/List/List";
import { PageHeader } from "../components/PageHeader/PageHeader";
import { PageSubheader } from "../components/PageSubheader/PageSubheader";
import { Paragraph } from "../components/Paragraph/Paragraph";
import { Table } from "../components/Table/Table";
import { Video } from "../components/Video/Video";

export class VideoComponentFactory {
  static renderComponent(comp: VideoComponent): React.ReactNode {
    switch (comp.type) {
      case "HEADER":
        return <Header comp={comp} />;
      case "PAGE_HEADER":
        return <PageHeader comp={comp} />;
      case "PAGE_SUBHEADER":
        return <PageSubheader comp={comp} />;
      case "PARAGRAPH":
        return <Paragraph comp={comp} />;
      case "LIST":
        return <List comp={comp} />;
      case "TABLE":
        return <Table comp={comp} />;
      case "DATABASE_TABLE":
        return <DatabaseTableVideoComponent comp={comp} />;
      case "IMAGE":
        return <Image comp={comp} />;
      case "VIDEO":
        return <Video comp={comp} />;
      case "BACKGROUND_COLOR":
        return <BackgroundColor comp={comp} />;
      case "BACKGROUND_IMAGE":
        return <BackgroundImage comp={comp} />;
      case "BACKGROUND_VIDEO":
        return <BackgroundVideo comp={comp} />;
      case "CODE_EXPLAINER":
        return <CodeExplainer comp={comp} />;
      default: {
        // Exhaustive check to ensure that all component types have been handled
        const _: never = comp;
        throw new Error(`Unhandled component type`);
      }
    }
  }
}
