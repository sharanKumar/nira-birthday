"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

interface MusicContextValue {
  /** Whether audio is currently playing */
  isPlaying: boolean;
  /** Current volume (0–1) */
  volume: number;
  /** Start music with fade-in (call on first user interaction) */
  startMusic: () => void;
  /** Toggle play/pause with fade */
  toggleMusic: () => void;
  /** Set volume (0–1) */
  setVolume: (v: number) => void;
}

const MusicContext = createContext<MusicContextValue | null>(null);

const TARGET_VOLUME = 0.2;
const FADE_DURATION = 800; // ms
const FADE_STEPS = 20;

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(TARGET_VOLUME);

  // Lazily create the audio element (avoids SSR issues)
  const getAudio = useCallback(() => {
    if (!audioRef.current && typeof window !== "undefined") {
      const audio = new Audio("/music/Happy Kids.mp3");
      audio.loop = true;
      audio.volume = 0;
      audio.preload = "auto";
      audioRef.current = audio;
    }
    return audioRef.current;
  }, []);

  const clearFade = useCallback(() => {
    if (fadeTimerRef.current) {
      clearInterval(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
  }, []);

  const fadeTo = useCallback(
    (target: number, onComplete?: () => void) => {
      const audio = getAudio();
      if (!audio) return;

      clearFade();

      const start = audio.volume;
      const diff = target - start;
      const stepTime = FADE_DURATION / FADE_STEPS;
      let step = 0;

      fadeTimerRef.current = setInterval(() => {
        step++;
        const progress = step / FADE_STEPS;
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        audio.volume = Math.max(0, Math.min(1, start + diff * eased));

        if (step >= FADE_STEPS) {
          clearFade();
          audio.volume = target;
          onComplete?.();
        }
      }, stepTime);
    },
    [getAudio, clearFade]
  );

  const startMusic = useCallback(() => {
    const audio = getAudio();
    if (!audio || isPlaying) return;

    audio.volume = 0;
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        fadeTo(volume);
      })
      .catch((err) => {
        // Browser blocked autoplay — this is expected if called
        // before a genuine user gesture
        console.warn("Audio play blocked:", err.message);
      });
  }, [getAudio, fadeTo, isPlaying, volume]);

  const toggleMusic = useCallback(() => {
    const audio = getAudio();
    if (!audio) return;

    if (isPlaying) {
      // Fade out then pause
      fadeTo(0, () => {
        audio.pause();
        setIsPlaying(false);
      });
    } else {
      audio.volume = 0;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          fadeTo(volume);
        })
        .catch(() => {});
    }
  }, [getAudio, fadeTo, isPlaying, volume]);

  const setVolume = useCallback(
    (v: number) => {
      const clamped = Math.max(0, Math.min(1, v));
      setVolumeState(clamped);
      const audio = getAudio();
      if (audio && isPlaying) {
        audio.volume = clamped;
      }
    },
    [getAudio, isPlaying]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearFade();
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.src = "";
      }
    };
  }, [clearFade]);

  return (
    <MusicContext.Provider
      value={{ isPlaying, volume, startMusic, toggleMusic, setVolume }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return ctx;
}
