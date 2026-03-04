import React from "react";

import { VideoComponent } from "../VideoComponent";
import { CodeExplainer } from "../components/CodeExplainer/CodeExplainer";
import { DatabaseTableVideoComponent } from "../components/DatabaseTable/DatabaseTableVideoComponent";
import { Header } from "../components/Header/Header";
import { Image } from "../components/Image/Image";
import { List } from "../components/List/List";
import { MermaidClassDiagramVideoComponent } from "../components/MermaidClassDiagramVideoComponent/MermaidClassDiagramVideoComponent";
import { Paragraph } from "../components/Paragraph/Paragraph";
import { TableVideoComponent } from "../components/Table/TableVideoComponent";
import { Video } from "../components/Video/Video";

export class VideoComponentFactory {
  static renderComponent(comp: VideoComponent): React.ReactNode {
    switch (comp.type) {
      case "HEADER":
        return <Header comp={comp} />;
      case "PARAGRAPH":
        return <Paragraph comp={comp} />;
      case "LIST":
        return <List comp={comp} />;
      case "TABLE":
        return <TableVideoComponent comp={comp} />;
      case "DATABASE_TABLE":
        return <DatabaseTableVideoComponent comp={comp} />;
      case "IMAGE":
        return <Image comp={comp} />;
      case "VIDEO":
        return <Video comp={comp} />;
      case "CODE_EXPLAINER":
        return <CodeExplainer comp={comp} />;
      case "MERMAID_CLASS_DIAGRAM":
        return <MermaidClassDiagramVideoComponent comp={comp} />;
      default: {
        // Exhaustive check to ensure that all component types have been handled
        const _: never = comp;
        throw new Error(`Unhandled component type`);
      }
    }
  }
}

