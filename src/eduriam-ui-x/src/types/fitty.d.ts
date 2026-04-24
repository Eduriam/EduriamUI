declare module "fitty" {
  export interface FittyOptions {
    minSize?: number;
    maxSize?: number;
    multiLine?: boolean;
    observeMutations?: boolean;
  }

  export interface FittyInstance {
    fit: (options?: { sync?: boolean }) => void;
    unsubscribe: () => void;
  }

  export default function fitty(
    element: HTMLElement,
    options?: FittyOptions,
  ): FittyInstance;
}
