import type { BaseVideoComponent } from "../../../VideoComponent";

export interface MermaidDiagramStep {
  id?: string;
  diagram: string;
  startTime: number;
}

export type MermaidDiagramType =
  | "FLOWCHART_DIAGRAM"
  | "CLASS_DIAGRAM"
  | "STATE_DIAGRAM"
  | "ENTITY_RELATIONSHIP_DIAGRAM"
  | "GIT_GRAPH_DIAGRAM"
  | "ARCHITECTURE_DIAGRAM";

export interface IMermaidDiagram extends BaseVideoComponent {
  type: MermaidDiagramType;
  steps: MermaidDiagramStep[];
}

export interface IMermaidDiagramProps {
  comp: IMermaidDiagram;
}

export type MermaidStepState = {
  index: number;
  startFrame: number;
  duration: number;
  frameInStep: number;
};
