import { useCallback, useEffect, useRef } from "react";

import { useStudySessionAudio } from "../context/StudySessionAudioContext";

/**
 * Plays an ordered list of audio URLs sequentially when `enabled` is true.
 *
 * Respects the session-wide mute state from `StudySessionAudioContext`.
 * When muted, no audio is played. When the component unmounts or the
 * `enabled` flag becomes false the current playback is stopped.
 */
export function useStudyBlockAudio(
  audioUrls: (string | undefined)[],
  enabled: boolean,
) {
  const { isMuted } = useStudySessionAudio();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const indexRef = useRef(0);
  const stoppedRef = useRef(false);

  const stop = useCallback(() => {
    stoppedRef.current = true;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeAttribute("src");
      audioRef.current.load();
      audioRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!enabled || isMuted) {
      stop();
      return;
    }

    const urls = audioUrls.filter((u): u is string => Boolean(u));
    if (urls.length === 0) return;

    stoppedRef.current = false;
    indexRef.current = 0;

    function playNext() {
      if (stoppedRef.current || indexRef.current >= urls.length) return;

      const audio = new Audio(urls[indexRef.current]);
      audioRef.current = audio;

      audio.addEventListener("ended", () => {
        indexRef.current += 1;
        playNext();
      });

      audio.addEventListener("error", () => {
        indexRef.current += 1;
        playNext();
      });

      audio.play().catch(() => {
        indexRef.current += 1;
        playNext();
      });
    }

    playNext();

    return () => {
      stop();
    };
    // We intentionally depend on the serialised URL list so the effect
    // re-runs only when the actual URLs change, not on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, isMuted, JSON.stringify(audioUrls)]);
}
