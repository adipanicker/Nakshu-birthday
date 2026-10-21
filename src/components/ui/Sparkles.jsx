import { useMemo } from "react";
import { motion } from "framer-motion";

const symbols = ["✦", "✧", "♡", "⋆", "✿"];

export default function Sparkles({ count = 18 }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 14 + 10,
        delay: Math.random() * 3,
        duration: Math.random() * 2 + 2,
        symbol: symbols[i % symbols.length],
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((s) => (
        <motion.span
          key={s.id}
          className="absolute select-none text-pink-main"
          style={{ top: `${s.top}%`, left: `${s.left}%`, fontSize: s.size }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {s.symbol}
        </motion.span>
      ))}
    </div>
  );
}
