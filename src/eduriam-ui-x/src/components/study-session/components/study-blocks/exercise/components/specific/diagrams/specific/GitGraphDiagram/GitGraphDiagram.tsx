import React from "react";

import { MermaidDiagram, type MermaidDiagramProps } from "@eduriam/ui-core";

export interface GitGraphDiagramProps extends MermaidDiagramProps {}

export const GitGraphDiagram: React.FC<GitGraphDiagramProps> = ({ chart }) => {
  return <MermaidDiagram chart={chart} />;
};

export default GitGraphDiagram;
