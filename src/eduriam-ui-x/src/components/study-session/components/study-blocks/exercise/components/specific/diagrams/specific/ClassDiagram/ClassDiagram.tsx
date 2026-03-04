import React from "react";

import { MermaidDiagram, type MermaidDiagramProps } from "@eduriam/ui-core";

export interface ClassDiagramProps extends MermaidDiagramProps {}

export const ClassDiagram: React.FC<ClassDiagramProps> = ({ chart }) => {
  return <MermaidDiagram chart={chart} />;
};

export default ClassDiagram;
