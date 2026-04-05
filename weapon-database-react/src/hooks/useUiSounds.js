import { useEffect, useRef } from "react";
import { assets } from "../lib/assets";

function primeAudio(src, volume) {
  if (!src) {
    return null;
  }

  const audio = new Audio(src);
  audio.preload = "auto";
  audio.volume = volume;
  return audio;
}

export default function useUiSounds() {
  const hoverRef = useRef(null);
  const clickRef = useRef(null);

  useEffect(() => {
    hoverRef.current = primeAudio(assets.hoverSound, 0.18);
    clickRef.current = primeAudio(assets.clickSound, 0.24);

    return () => {
      hoverRef.current = null;
      clickRef.current = null;
    };
  }, []);

  const playHover = () => {
    const audio = hoverRef.current;

    if (!audio) {
      return;
    }

    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  const playClick = () => {
    const audio = clickRef.current;

    if (!audio) {
      return;
    }

    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  return { playHover, playClick };
}
