import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import audioSrc from "../assets/audio.mp3";

export function WelcomeAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let cancelled = false;
    const tryPlay = () => audio.play().then(() => !cancelled && setPlaying(true));

    const onInteraction = () => {
      tryPlay().catch(() => {});
    };

    tryPlay().catch(() => {
      document.addEventListener("click", onInteraction, { once: true });
      document.addEventListener("touchstart", onInteraction, { once: true });
      document.addEventListener("keydown", onInteraction, { once: true });
    });

    return () => {
      cancelled = true;
      document.removeEventListener("click", onInteraction);
      document.removeEventListener("touchstart", onInteraction);
      document.removeEventListener("keydown", onInteraction);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setPlaying(true));
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={audioSrc} loop />
      <button
        onClick={toggle}
        aria-label={playing ? "Tắt âm thanh chào mừng" : "Bật âm thanh chào mừng"}
        className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 w-11 h-11 rounded-full gradient-forest text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
      >
        {playing ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </button>
    </>
  );
}
