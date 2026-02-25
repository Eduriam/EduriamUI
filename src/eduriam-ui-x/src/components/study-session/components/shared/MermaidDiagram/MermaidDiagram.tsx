import { useEffect, useRef } from "react";
import type { FC } from "react";

let isMermaidInitialized = false;
let renderCounter = 0;

export interface MermaidDiagramProps {
  chart: string;
}

export const MermaidDiagram: FC<MermaidDiagramProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isCancelled = false;
    const container = containerRef.current;

    if (!container) {
      return;
    }

    if (!chart.trim()) {
      container.innerHTML = "";
      return;
    }

    const renderDiagram = async () => {
      try {
        // Use Mermaid's bundled ESM build to avoid pulling langium's Node entrypoints
        // into consumer app builds (e.g. Next.js webpack critical dependency warnings).
        const mermaid = (await import("mermaid/dist/mermaid.esm.mjs")).default;

        if (!isMermaidInitialized) {
          mermaid.initialize({
            startOnLoad: false,
            securityLevel: "strict",
          });
          isMermaidInitialized = true;
        }

        const id = `mermaid-diagram-${renderCounter++}`;
        const { svg, bindFunctions } = await mermaid.render(id, chart);

        if (isCancelled || !containerRef.current) {
          return;
        }

        containerRef.current.innerHTML = svg;
        bindFunctions?.(containerRef.current);
      } catch {
        if (isCancelled || !containerRef.current) {
          return;
        }

        containerRef.current.innerHTML = "";
      }
    };

    void renderDiagram();

    return () => {
      isCancelled = true;
    };
  }, [chart]);

  return <div ref={containerRef} />;
};

export default MermaidDiagram;
