'use client';

import { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  label: string;
  labelVi?: string;
  audioUrl?: string;
  icon?: string;
  disabled?: boolean;
}

export function AudioPlayer({ label, labelVi, audioUrl, icon, disabled = false }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = () => {
    if (disabled || !audioUrl) return;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    setIsPlaying(true);

    audio.play().catch(() => setIsPlaying(false));
    audio.onended = () => setIsPlaying(false);
    audio.onerror = () => setIsPlaying(false);
  };

  const isDisabled = disabled || !audioUrl;

  return (
    <button
      onClick={handlePlay}
      disabled={isDisabled}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all w-full text-left ${
        isDisabled
          ? 'border-[#e8ddd5] bg-[#f5ede3] text-[#b2aca6] cursor-not-allowed'
          : isPlaying
          ? 'border-[#FF6B35] bg-[#FFF0E8] text-[#FF6B35]'
          : 'border-[#e8ddd5] bg-white text-[#2D3436] hover:border-[#FF6B35] hover:bg-[#FFF0E8]'
      }`}
    >
      {icon && <span className="text-xl">{icon}</span>}
      {isDisabled ? (
        <VolumeX className="w-5 h-5 shrink-0" />
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
    </button>
  );
}
