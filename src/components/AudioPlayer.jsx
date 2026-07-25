import React, { useRef, useState } from "react";
import { LETTER_CONFIG } from "../config/letterConfig";

export const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Audio play error:", err));
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const time = audioRef.current.currentTime;
      setCurrentTime(time);

      if (time >= LETTER_CONFIG.loopDurationSeconds) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="w-full bg-[#f9f3ea] border border-[#ebd8c8] rounded-xl p-2.5 my-3 flex items-center justify-between shadow-inner relative z-10">
      <audio
        ref={audioRef}
        src={LETTER_CONFIG.audioSrc}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
      />

      <div className="w-9 h-9 bg-white rounded-lg border border-[#e0d4c8] flex items-center justify-center text-base shrink-0 shadow-sm">
        🌸
      </div>

      <div className="flex-1 px-2.5 text-left overflow-hidden">
        <div className="font-['Playfair_Display',serif] font-bold text-xs text-[#2d2626] truncate">
          {LETTER_CONFIG.songTitle}
        </div>
        <div className="text-[8px] font-semibold tracking-wider text-[#a38a83] uppercase">
          {LETTER_CONFIG.songSubtext}
        </div>

        <div className="mt-1 flex items-center gap-2">
          <div className="flex-1 bg-[#e2d6c8] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#d91b5c] h-full transition-all duration-300"
              style={{
                width: `${(currentTime / LETTER_CONFIG.loopDurationSeconds) * 100}%`,
              }}
            />
          </div>
          <span className="text-[8px] font-mono text-[#8c7d7b]">
            {formatTime(currentTime)}
          </span>
        </div>
      </div>

      <button
        onClick={togglePlay}
        className="w-8 h-8 rounded-full bg-[#d91b5c] hover:bg-[#b8124a] active:scale-90 text-white flex items-center justify-center transition-all shadow-md shrink-0 cursor-pointer"
      >
        {isPlaying ? (
          <span className="text-[9px] font-bold">❚❚</span>
        ) : (
          <span className="text-[9px] font-bold pl-0.5">▶</span>
        )}
      </button>
    </div>
  );
};