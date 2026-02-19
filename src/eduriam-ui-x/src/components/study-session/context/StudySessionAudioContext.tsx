import { createContext, useContext, useMemo, useState } from "react";

interface StudySessionAudioContextValue {
  isMuted: boolean;
  toggleMute: () => void;
}

const StudySessionAudioContext =
  createContext<StudySessionAudioContextValue | null>(null);

export const StudySessionAudioProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);

  const value = useMemo<StudySessionAudioContextValue>(
    () => ({
      isMuted,
      toggleMute: () => setIsMuted((prev) => !prev),
    }),
    [isMuted],
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
