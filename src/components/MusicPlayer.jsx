import { motion } from "framer-motion";
import { useAudio } from "../hooks/useAudio";

export default function MusicPlayer() {
  const { playing, toggle } = useAudio();

  return (
    <motion.button
      onClick={toggle}
      aria-label={playing ? "Mute music" : "Play music"}
      className="fixed right-4 top-4 z-40 flex h-12 items-center gap-2 rounded-full border-2 border-pink-main/50 bg-cream/90 px-4 shadow-lg shadow-pink-main/30 backdrop-blur"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      whileTap={{ scale: 0.92 }}
    >
      <div className="flex h-5 items-end gap-[3px]">
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className="w-[3px] origin-bottom rounded-full bg-rose"
            style={{ height: "100%" }}
            animate={
              playing ? { scaleY: [0.3, 1, 0.5, 0.9, 0.3] } : { scaleY: 0.2 }
            }
            transition={
              playing
                ? {
                    duration: 0.9,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }
                : { duration: 0.3 }
            }
          />
        ))}
      </div>
      <span className="text-sm">{playing ? "🔊" : "🔇"}</span>
    </motion.button>
  );
}
