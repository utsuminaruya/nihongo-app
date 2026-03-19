'use client';

import { useState, useRef } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';

type AudioType = 'standard' | 'fast' | 'elderly';

interface AudioPlayerProps {
  label: string;
  labelVi?: string;
  /** 直接再生するURL（プリジェネレート済み音声） */
  audioUrl?: string;
  /** ElevenLabs TTS で読み上げるテキスト */
  text?: string;
  /** TTS 音声タイプ: standard / fast / elderly */
  audioType?: AudioType;
  icon?: string;
}

export function AudioPlayer({ label, labelVi, audioUrl, text, audioType = 'standard', icon }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 有効なURL: 直接指定 > TTS API > なし
  const effectiveUrl = audioUrl || (text
    ? `/api/audio?text=${encodeURIComponent(text)}&type=${audioType}`
    : undefined);

  const isDisabled = !effectiveUrl;

  const handlePlay = async () => {
    if (isDisabled || isLoading) return;
    setHasError(false);

    // 再生中なら停止
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // TTSのURL（/api/audio?...）は最初のリクエストで少し待つ
    if (!audioUrl && text) {
      setIsLoading(true);
    }

    const audio = new Audio(effectiveUrl);
    audioRef.current = audio;

    audio.oncanplay = () => {
      setIsLoading(false);
    };

    audio.onended = () => {
      setIsPlaying(false);
      setIsLoading(false);
    };

    audio.onerror = () => {
      setIsPlaying(false);
      setIsLoading(false);
      setHasError(true);
    };

    try {
      await audio.play();
      setIsPlaying(true);
      setIsLoading(false);
    } catch {
      setIsPlaying(false);
      setIsLoading(false);
      setHasError(true);
    }
  };

  return (
    <button
      onClick={handlePlay}
      disabled={isDisabled}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all w-full text-left ${
        isDisabled
          ? 'border-[#e8ddd5] bg-[#f5ede3] text-[#b2aca6] cursor-not-allowed'
          : hasError
          ? 'border-red-200 bg-red-50 text-red-400'
          : isPlaying
          ? 'border-[#FF6B35] bg-[#FFF0E8] text-[#FF6B35]'
          : 'border-[#e8ddd5] bg-white text-[#2D3436] hover:border-[#FF6B35] hover:bg-[#FFF0E8]'
      }`}
    >
      {icon && <span className="text-xl">{icon}</span>}

      {isDisabled ? (
        <VolumeX className="w-5 h-5 shrink-0" />
      ) : isLoading ? (
        <Loader2 className="w-5 h-5 shrink-0 animate-spin text-[#FF6B35]" />
      ) : (
        <Volume2 className={`w-5 h-5 shrink-0 ${isPlaying ? 'animate-pulse' : ''}`} />
      )}

      <div className="flex-1 min-w-0">
        <span className="text-sm font-medium block">{label}</span>
        {labelVi && <span className="text-[10px] text-[#b2aca6] block">{labelVi}</span>}
      </div>

      {isDisabled && (
        <span className="text-[10px] text-[#b2aca6] shrink-0">準備中</span>
      )}
      {hasError && (
        <span className="text-[10px] text-red-400 shrink-0">エラー</span>
      )}
      {isLoading && (
        <span className="text-[10px] text-[#FF6B35] shrink-0">生成中…</span>
      )}
    </button>
  );
}
