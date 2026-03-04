import React from "react";

import { MermaidDiagram, type MermaidDiagramProps } from "@eduriam/ui-core";

export interface ArchitectureDiagramProps extends MermaidDiagramProps {}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ chart }) => {
  return <MermaidDiagram chart={chart} />;
};

export default ArchitectureDiagram;
