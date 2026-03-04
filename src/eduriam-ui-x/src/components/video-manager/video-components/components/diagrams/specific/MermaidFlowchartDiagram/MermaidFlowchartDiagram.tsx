import React from "react";

import {
  type IMermaidDiagram,
  MermaidDiagram,
  type MermaidDiagramStep,
} from "../../MermaidDiagram/MermaidDiagram";

export interface IMermaidFlowchartDiagram extends IMermaidDiagram {
  type: "FLOWCHART_DIAGRAM";
}

export interface IMermaidFlowchartDiagramProps {
  comp: IMermaidFlowchartDiagram;
}

export type MermaidFlowchartDiagramStep = MermaidDiagramStep;

export const MermaidFlowchartDiagram: React.FC<
  IMermaidFlowchartDiagramProps
> = ({ comp }) => {
  return <MermaidDiagram comp={comp} />;
};

export default MermaidFlowchartDiagram;
