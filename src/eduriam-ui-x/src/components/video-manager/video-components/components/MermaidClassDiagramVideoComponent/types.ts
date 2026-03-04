import type { BaseVideoComponent } from "../../VideoComponent";

export interface MermaidClassDiagramStep {
  id?: string;
  diagram: string;
  startTime: number;
}

export interface IMermaidClassDiagramVideoComponent extends BaseVideoComponent {
  type: "MERMAID_CLASS_DIAGRAM";
  steps: MermaidClassDiagramStep[];
}

export interface IMermaidClassDiagramVideoComponentProps {
  comp: IMermaidClassDiagramVideoComponent;
}

export type MermaidStepState = {
  index: number;
  startFrame: number;
  duration: number;
  frameInStep: number;
};
