import React from "react";

import {
  type IMermaidDiagram,
  MermaidDiagram,
  type MermaidDiagramStep,
} from "../../MermaidDiagram/MermaidDiagram";

export interface IMermaidEntityRelationshipDiagram extends IMermaidDiagram {
  type: "ENTITY_RELATIONSHIP_DIAGRAM";
}

export interface IMermaidEntityRelationshipDiagramProps {
  comp: IMermaidEntityRelationshipDiagram;
}

export type MermaidEntityRelationshipDiagramStep = MermaidDiagramStep;

export const MermaidEntityRelationshipDiagram: React.FC<
  IMermaidEntityRelationshipDiagramProps
> = ({ comp }) => {
  return <MermaidDiagram comp={comp} />;
};

export default MermaidEntityRelationshipDiagram;
