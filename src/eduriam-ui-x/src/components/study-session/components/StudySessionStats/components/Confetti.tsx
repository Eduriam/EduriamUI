import { soundCelebrationUrl } from "@eduriam/ui-core";
import confetti from "canvas-confetti";
import { useEffect } from "react";

/**
 * Lightweight confetti effect inspired by Magic UI's Confetti component.
 *
 * When mounted, fires a single celebratory confetti burst. Intended to be
 * rendered alongside full-screen layouts such as the study session stats page.
 */
export const Confetti: React.FC = () => {
  useEffect(() => {
    // Fire a single burst from the top-center of the viewport.
    void confetti({
      particleCount: 150,
      spread: 70,
      origin: { x: 0.5, y: 0.4 },
      zIndex: 100,
    });

    // Play celebration sound from the core design system.
    try {
      const audio = new Audio(soundCelebrationUrl);
      // Fire and forget; ignore play() Promise.
      void audio.play();
    } catch {
      // Best-effort only; ignore audio errors.
    }
  }, []);

  return null;
};

export default Confetti;
