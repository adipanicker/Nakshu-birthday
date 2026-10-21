import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { content } from "../data/content";
import Reveal from "./ui/Reveal";

function CakeBody() {
  return (
    <div className="absolute inset-0">
      {/* plate */}
      <div className="absolute bottom-0 left-1/2 h-3 w-72 -translate-x-1/2 rounded-full bg-lavender shadow-md" />

      {/* bottom tier */}
      <div className="absolute bottom-2 left-0 right-0 h-24 rounded-2xl bg-pink-soft">
        <div className="absolute inset-x-0 top-0 h-6 rounded-t-2xl bg-cream" />
        {[12, 32, 52, 72, 90].map((l) => (
          <span
            key={l}
            className="absolute top-5 h-5 w-4 -translate-x-1/2 rounded-b-full bg-cream"
            style={{ left: `${l}%` }}
          />
        ))}
        <span className="absolute bottom-3 left-6 text-lg">🍓</span>
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-lg">
          💗
        </span>
        <span className="absolute bottom-3 right-6 text-lg">🍓</span>
      </div>

      {/* top tier */}
      <div className="absolute bottom-[6.5rem] left-8 right-8 h-20 rounded-2xl bg-pink-main">
        <div className="absolute inset-x-0 top-0 h-5 rounded-t-2xl bg-cream" />
        {[15, 40, 65, 88].map((l) => (
          <span
            key={l}
            className="absolute top-4 h-4 w-3 -translate-x-1/2 rounded-b-full bg-cream"
            style={{ left: `${l}%` }}
          />
        ))}
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-lg">
          ✨
        </span>
      </div>
    </div>
  );
}

function Candle({ left, lit, delay }) {
  return (
    <div
      className="absolute bottom-[11.5rem] -translate-x-1/2"
      style={{ left: `${left}%` }}
    >
      <motion.div
        className="mx-auto h-4 w-3 origin-bottom rounded-full bg-gradient-to-t from-orange-400 to-yellow-200"
        animate={
          lit
            ? { scaleY: [1, 1.25, 0.9, 1.15, 1], opacity: 1 }
            : { scaleY: 0, opacity: 0 }
        }
        transition={
          lit ? { duration: 0.8, repeat: Infinity, delay } : { duration: 0.3 }
        }
      />
      <div className="mx-auto h-8 w-2 rounded-sm bg-gradient-to-b from-lavender to-white" />
    </div>
  );
}

export default function Cake() {
  // 0 = candles lit, 1 = blown out, 2 = cut
  const [stage, setStage] = useState(0);

  const confetti = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 8 + 6,
        delay: Math.random() * 0.8,
        duration: Math.random() * 2 + 2.5,
        rotate: Math.random() * 720 - 360,
        color: ["#ff8fb8", "#ff5c93", "#d9c8ff", "#ffd6e7", "#fffaf3"][i % 5],
      })),
    [],
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blush via-pink-soft/60 to-lavender/40 px-6 py-20">
      <Reveal className="text-center">
        <h2 className="font-heading text-3xl text-rose">{content.cakeTitle}</h2>
        <p className="mt-2 min-h-[1.25rem] text-sm text-ink/60">
          {stage === 0 && content.cakeBlowHint}
          {stage === 1 && content.cakeCutHint}
        </p>
      </Reveal>

      <Reveal className="mx-auto mt-14 w-64">
        <div
          className="relative mx-auto h-56 w-64"
          onClick={() => stage === 0 && setStage(1)}
        >
          {/* left piece (stays) */}
          <div
            className="absolute inset-0"
            style={{ clipPath: "inset(0 30% 0 0)" }}
          >
            <CakeBody />
          </div>

          {/* right piece (slides out when cut) */}
          <motion.div
            className="absolute inset-0"
            style={{ clipPath: "inset(0 0 0 70%)" }}
            animate={
              stage === 2
                ? { x: 36, y: 6, rotate: 5 }
                : { x: 0, y: 0, rotate: 0 }
            }
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <CakeBody />
          </motion.div>

          {/* candles (on the left piece only) */}
          <Candle left={28} lit={stage === 0} delay={0} />
          <Candle left={44} lit={stage === 0} delay={0.2} />
          <Candle left={60} lit={stage === 0} delay={0.4} />

          {/* knife */}
          {stage === 2 && (
            <motion.span
              className="absolute left-[68%] top-0 text-3xl"
              initial={{ y: -30, opacity: 1 }}
              animate={{ y: 150, opacity: [1, 1, 0] }}
              transition={{ duration: 0.9, ease: "easeIn" }}
            >
              🔪
            </motion.span>
          )}
        </div>
      </Reveal>

      <div className="mt-10 flex min-h-[3rem] justify-center">
        {stage === 0 && (
          <button
            onClick={() => setStage(1)}
            className="rounded-full bg-rose px-6 py-3 text-sm font-bold text-white shadow-lg shadow-pink-main/40"
          >
            blow the candles 🕯️
          </button>
        )}
        {stage === 1 && (
          <motion.button
            onClick={() => setStage(2)}
            className="rounded-full bg-rose px-6 py-3 text-sm font-bold text-white shadow-lg shadow-pink-main/40"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            cut the cake 🔪
          </motion.button>
        )}
      </div>

      {stage === 2 && (
        <motion.p
          className="mx-auto mt-6 max-w-xs text-center font-heading text-2xl leading-snug text-rose"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {content.cakeFinal}
        </motion.p>
      )}

      {/* confetti */}
      {stage === 2 && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {confetti.map((c) => (
            <motion.span
              key={c.id}
              className="absolute top-0 rounded-sm"
              style={{
                left: `${c.left}%`,
                width: c.size,
                height: c.size,
                background: c.color,
              }}
              initial={{ y: -20, opacity: 1, rotate: 0 }}
              animate={{ y: 700, opacity: [1, 1, 0], rotate: c.rotate }}
              transition={{
                duration: c.duration,
                delay: c.delay,
                ease: "easeIn",
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
