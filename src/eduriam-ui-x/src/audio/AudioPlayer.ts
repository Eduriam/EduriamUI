import {
  soundCelebrationUrl,
  soundErrorUrl,
  soundSuccessUrl,
} from "@eduriam/ui-core";

/**
 * Sound names that can be played by {@link AudioPlayer}.
 */
export type AudioPlayerSound = "celebration" | "error" | "success";

const SOUND_URLS: Record<AudioPlayerSound, string> = {
  celebration: soundCelebrationUrl,
  error: soundErrorUrl,
  success: soundSuccessUrl,
};

/**
 * Plays study-session sound effects (success, error) using the Web Audio API.
 * Use this when you need to play sounds in response to user actions (e.g. correct/incorrect answer).
 */
export class AudioPlayer {
  /**
   * Plays the given sound.
   *
   * @param sound - `"success"` for correct/positive feedback, `"error"` for incorrect/negative feedback, `"celebration"` for celebration.
   * @returns A promise that resolves when playback has started, or rejects if playback fails
   *          (e.g. autoplay policy, load error). Callers may safely ignore the rejection.
   */
  play(sound: AudioPlayerSound): Promise<void> {
    const url = SOUND_URLS[sound];
    const audio = new Audio(url);
    return audio.play();
  }
}
