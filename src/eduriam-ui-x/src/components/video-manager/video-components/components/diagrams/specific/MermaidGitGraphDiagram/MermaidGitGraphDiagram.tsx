import React from "react";

import {
  type IMermaidDiagram,
  MermaidDiagram,
  type MermaidDiagramStep,
} from "../../MermaidDiagram/MermaidDiagram";

export interface IMermaidGitGraphDiagram extends IMermaidDiagram {
  type: "GIT_GRAPH_DIAGRAM";
}

export interface IMermaidGitGraphDiagramProps {
  comp: IMermaidGitGraphDiagram;
}

export type MermaidGitGraphDiagramStep = MermaidDiagramStep;

export const MermaidGitGraphDiagram: React.FC<IMermaidGitGraphDiagramProps> = ({
  comp,
}) => {
  return <MermaidDiagram comp={comp} />;
};

export default MermaidGitGraphDiagram;
