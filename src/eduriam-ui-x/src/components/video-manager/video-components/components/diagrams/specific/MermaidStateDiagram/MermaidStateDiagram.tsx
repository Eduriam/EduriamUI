import React from "react";

import {
  type IMermaidDiagram,
  MermaidDiagram,
  type MermaidDiagramStep,
} from "../../MermaidDiagram/MermaidDiagram";

export interface IMermaidStateDiagram extends IMermaidDiagram {
  type: "STATE_DIAGRAM";
}

export interface IMermaidStateDiagramProps {
  comp: IMermaidStateDiagram;
}

export type MermaidStateDiagramStep = MermaidDiagramStep;

export const MermaidStateDiagram: React.FC<IMermaidStateDiagramProps> = ({
  comp,
}) => {
  return <MermaidDiagram comp={comp} />;
};

export default MermaidStateDiagram;
