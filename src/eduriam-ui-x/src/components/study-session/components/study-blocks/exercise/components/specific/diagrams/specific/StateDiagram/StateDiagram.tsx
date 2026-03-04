import React from "react";

import { MermaidDiagram, type MermaidDiagramProps } from "@eduriam/ui-core";

export interface StateDiagramProps extends MermaidDiagramProps {}

export const StateDiagram: React.FC<StateDiagramProps> = ({ chart }) => {
  return <MermaidDiagram chart={chart} />;
};

export default StateDiagram;
