import React from "react";

import { MermaidDiagram, type MermaidDiagramProps } from "@eduriam/ui-core/mermaid";

export interface EntityRelationshipDiagramProps extends MermaidDiagramProps {}

export const EntityRelationshipDiagram: React.FC<EntityRelationshipDiagramProps> = ({
  chart,
}) => {
  return <MermaidDiagram chart={chart} />;
};

export default EntityRelationshipDiagram;
