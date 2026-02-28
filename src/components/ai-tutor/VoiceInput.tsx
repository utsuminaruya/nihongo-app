"use client";

import { useState, useCallback, useRef } from "react";
import { Mic, MicOff } from "lucide-react";
import { useTranslations } from "next-intl";

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  disabled?: boolean;
}

export default function VoiceInput({ onTranscript, disabled }: VoiceInputProps) {
  const t = useTranslations("aiTutor");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  const toggleListening = useCallback(() => {
    // Check browser support
    const SpeechRecognitionAPI =
      typeof window !== "undefined"
        ? window.SpeechRecognition || window.webkitSpeechRecognition
        : null;

    if (!SpeechRecognitionAPI) {
      alert(t("voiceNotSupported"));
      return;
    }

    if (isListening) {
      // Stop listening
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    // Start listening
    const recognition = new SpeechRecognitionAPI();
    recognition.lang = "ja-JP";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      onTranscript(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, [isListening, onTranscript, t]);

  return (
    <button
      onClick={toggleListening}
      disabled={disabled}
      className={`p-2.5 rounded-full transition-all duration-200 ${
        isListening
          ? "bg-red-500 text-white animate-pulse shadow-lg shadow-red-200"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      title={isListening ? t("listening") : t("voiceInput")}
      aria-label={isListening ? t("listening") : t("voiceInput")}
    >
      {isListening ? (
        <MicOff className="w-5 h-5" />
      ) : (
        <Mic className="w-5 h-5" />
      )}
    </button>
  );
}

// Type declarations for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionInstance extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionInstance;
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionConstructor;
    webkitSpeechRecognition: SpeechRecognitionConstructor;
  }
}
