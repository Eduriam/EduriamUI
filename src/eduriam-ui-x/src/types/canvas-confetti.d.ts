declare module "canvas-confetti" {
  interface ConfettiOptions {
    particleCount?: number;
    spread?: number;
    origin?: { x?: number; y?: number };
    angle?: number;
    startVelocity?: number;
    decay?: number;
    scalar?: number;
    zIndex?: number;
  }

  type Confetti = (options?: ConfettiOptions) => Promise<null>;

  const confetti: Confetti;
  export default confetti;
}

