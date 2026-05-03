import { createContext, useCallback, useContext, useMemo, useState } from "react";

interface StudySessionAudioContextValue {
  isMuted: boolean;
  toggleMute: () => void;
}

const StudySessionAudioContext =
  createContext<StudySessionAudioContextValue | null>(null);

export const StudySessionAudioProvider: React.FC<{
  children: React.ReactNode;
  isMuted?: boolean;
  onMutedChange?: (isMuted: boolean) => void;
}> = ({ children, isMuted: isMutedProp, onMutedChange }) => {
  const [uncontrolledIsMuted, setUncontrolledIsMuted] = useState(false);
  const isControlled = isMutedProp !== undefined;
  const isMuted = isControlled ? isMutedProp : uncontrolledIsMuted;

  const setMuted = useCallback(
    (next: boolean | ((prev: boolean) => boolean)) => {
      const resolvedNext =
        typeof next === "function" ? next(isMuted) : next;

      if (!isControlled) {
        setUncontrolledIsMuted(resolvedNext);
      }

      onMutedChange?.(resolvedNext);
    },
    [isControlled, isMuted, onMutedChange],
  );

  const value = useMemo<StudySessionAudioContextValue>(
    () => ({
      isMuted,
      toggleMute: () => setMuted((prev) => !prev),
    }),
    [isMuted, setMuted],
  );

  return (
    <StudySessionAudioContext.Provider value={value}>
      {children}
    </StudySessionAudioContext.Provider>
  );
};

export function useStudySessionAudio(): StudySessionAudioContextValue {
  const ctx = useContext(StudySessionAudioContext);
  if (!ctx) {
    throw new Error(
      "useStudySessionAudio must be used within <StudySessionAudioProvider>",
    );
  }
  return ctx;
}
