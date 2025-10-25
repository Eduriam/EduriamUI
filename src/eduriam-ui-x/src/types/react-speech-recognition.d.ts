declare module "react-speech-recognition" {
  export interface UseSpeechRecognitionOptions {
    commands?: Array<unknown>;
  }

  export interface UseSpeechRecognitionResult {
    transcript: string;
    listening: boolean;
    browserSupportsSpeechRecognition: boolean;
    resetTranscript?: () => void;
  }

  export function useSpeechRecognition(
    options?: UseSpeechRecognitionOptions,
  ): UseSpeechRecognitionResult;

  const SpeechRecognition: {
    startListening: (options?: {
      language?: string;
      continuous?: boolean;
      interimResults?: boolean;
    }) => void;
    stopListening: () => void;
  };

  export default SpeechRecognition;
}
