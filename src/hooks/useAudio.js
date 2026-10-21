import { useEffect, useState } from "react";

const audio = new Audio("/music/song.mp3");
audio.loop = true;

export function useAudio() {
  const [playing, setPlaying] = useState(!audio.paused);

  useEffect(() => {
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  const play = () => audio.play().catch(() => {});
  const pause = () => audio.pause();
  const toggle = () => (audio.paused ? play() : pause());

  return { playing, play, pause, toggle };
}
