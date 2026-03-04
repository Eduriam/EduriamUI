import React from "react";

import {
  type IMermaidDiagram,
  MermaidDiagram,
  type MermaidDiagramStep,
} from "../../MermaidDiagram/MermaidDiagram";

export interface IMermaidArchitectureDiagram extends IMermaidDiagram {
  type: "ARCHITECTURE_DIAGRAM";
}

export interface IMermaidArchitectureDiagramProps {
  comp: IMermaidArchitectureDiagram;
}

export type MermaidArchitectureDiagramStep = MermaidDiagramStep;

export const MermaidArchitectureDiagram: React.FC<
  IMermaidArchitectureDiagramProps
> = ({ comp }) => {
  return <MermaidDiagram comp={comp} />;
};

export default MermaidArchitectureDiagram;
