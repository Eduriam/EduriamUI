import React from "react";

import {
  type IMermaidDiagram,
  MermaidDiagram,
  type MermaidDiagramStep,
} from "../../MermaidDiagram/MermaidDiagram";

export interface IMermaidClassDiagram extends IMermaidDiagram {
  type: "CLASS_DIAGRAM";
}

export interface IMermaidClassDiagramProps {
  comp: IMermaidClassDiagram;
}

export type MermaidClassDiagramStep = MermaidDiagramStep;

export const MermaidClassDiagram: React.FC<IMermaidClassDiagramProps> = ({
  comp,
}) => {
  return <MermaidDiagram comp={comp} />;
};

export default MermaidClassDiagram;
