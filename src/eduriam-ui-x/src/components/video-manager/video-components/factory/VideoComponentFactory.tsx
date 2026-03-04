import React from "react";

import { VideoComponent } from "../VideoComponent";
import { Browser } from "../components/Browser/Browser";
import { CodeExplainer } from "../components/CodeExplainer/CodeExplainer";
import { DatabaseTable } from "../components/DatabaseTable/DatabaseTable";
import { Gif } from "../components/Gif/Gif";
import { Image } from "../components/Image/Image";
import { List } from "../components/List/List";
import { Table } from "../components/Table/Table";
import { TerminalExplainer } from "../components/TerminalExplainer/TerminalExplainer";
import { Text } from "../components/Text/Text";
import { Video } from "../components/Video/Video";
import { MermaidArchitectureDiagram } from "../components/diagrams/specific/MermaidArchitectureDiagram/MermaidArchitectureDiagram";
import { MermaidClassDiagram } from "../components/diagrams/specific/MermaidClassDiagram/MermaidClassDiagram";
import { MermaidEntityRelationshipDiagram } from "../components/diagrams/specific/MermaidEntityRelationshipDiagram/MermaidEntityRelationshipDiagram";
import { MermaidFlowchartDiagram } from "../components/diagrams/specific/MermaidFlowchartDiagram/MermaidFlowchartDiagram";
import { MermaidGitGraphDiagram } from "../components/diagrams/specific/MermaidGitGraphDiagram/MermaidGitGraphDiagram";
import { MermaidStateDiagram } from "../components/diagrams/specific/MermaidStateDiagram/MermaidStateDiagram";

export class VideoComponentFactory {
  static renderComponent(comp: VideoComponent): React.ReactNode {
    switch (comp.type) {
      case "TEXT":
        return <Text comp={comp} />;
      case "LIST":
        return <List comp={comp} />;
      case "TABLE":
        return <Table comp={comp} />;
      case "DATABASE_TABLE":
        return <DatabaseTable comp={comp} />;
      case "BROWSER":
        return <Browser comp={comp} />;
      case "GIF":
        return <Gif comp={comp} />;
      case "IMAGE":
        return <Image comp={comp} />;
      case "VIDEO":
        return <Video comp={comp} />;
      case "CODE_EXPLAINER":
        return <CodeExplainer comp={comp} />;
      case "TERMINAL_EXPLAINER":
        return <TerminalExplainer comp={comp} />;
      case "FLOWCHART_DIAGRAM":
        return <MermaidFlowchartDiagram comp={comp} />;
      case "CLASS_DIAGRAM":
        return <MermaidClassDiagram comp={comp} />;
      case "STATE_DIAGRAM":
        return <MermaidStateDiagram comp={comp} />;
      case "ENTITY_RELATIONSHIP_DIAGRAM":
        return <MermaidEntityRelationshipDiagram comp={comp} />;
      case "GIT_GRAPH_DIAGRAM":
        return <MermaidGitGraphDiagram comp={comp} />;
      case "ARCHITECTURE_DIAGRAM":
        return <MermaidArchitectureDiagram comp={comp} />;
      default: {
        // Exhaustive check to ensure that all component types have been handled
        const _: never = comp;
        throw new Error(`Unhandled component type`);
      }
    }
  }
}
