import React from "react";

import { MermaidDiagram, type MermaidDiagramProps } from "@eduriam/ui-core";

export interface FlowchartDiagramProps extends MermaidDiagramProps {}

export const FlowchartDiagram: React.FC<FlowchartDiagramProps> = ({ chart }) => {
  return <MermaidDiagram chart={chart} />;
};

export default FlowchartDiagram;
