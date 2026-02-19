/**
 * Sound effect URLs (data URLs) for use with the Web Audio API or HTMLAudioElement.
 * Use with `new Audio(soundSuccessUrl).play()` or similar.
 */
import celebrationWav from "../public/sounds/celebration.wav";
import errorWav from "../public/sounds/error.wav";
import successWav from "../public/sounds/success.wav";

/** Data URL for the celebration sound. */
export const soundCelebrationUrl: string = celebrationWav as string;

/** Data URL for the error/incorrect sound. */
export const soundErrorUrl: string = errorWav as string;

/** Data URL for the success/correct sound. */
export const soundSuccessUrl: string = successWav as string;
