import { motion, useReducedMotion } from "framer-motion";
import { content } from "../data/content";
import Sparkles from "./ui/Sparkles";
import { Heart, Sparkle } from "lucide-react";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-pink-soft via-blush to-lavender/40 px-6 py-16 text-center">
      <Sparkles />

      {/* Soft ambient glow behind Nakshathra */}
      <div className="pointer-events-none absolute left-1/2 top-[31%] h-48 w-48 -translate-x-1/2 rounded-full bg-pink-main/20 blur-[65px]" />

      {/* Floating decorative stars */}
      <motion.div
        className="pointer-events-none absolute right-[18%] top-[19%] text-rose/60"
        animate={reduceMotion ? {} : { y: [0, -8, 0], rotate: [0, 12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Heart size={16} />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute left-[18%] top-[36%] text-pink-main/70"
        animate={reduceMotion ? {} : { scale: [1, 1.2, 1], rotate: [0, 15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkle size={15} />
      </motion.div>

      {/* Kawaii star character ⭐ */}
      <motion.div
        className="relative z-10 mb-9"
        animate={reduceMotion ? {} : { y: [0, -10, 0], rotate: [-3, 3, -3] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="relative h-40 w-40 sm:h-44 sm:w-44"
          animate={reduceMotion ? {} : { rotate: [0, 3, 0, -3, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Star silhouette */}
          <svg
            viewBox="0 0 160 160"
            className="absolute inset-0 h-full w-full overflow-visible drop-shadow-[0_12px_22px_rgba(255,105,155,0.24)]"
            aria-label="A cute smiling pink star"
            role="img"
          >
            <defs>
              <linearGradient
                id="nakshuStarGradient"
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop offset="0%" stopColor="#FFF5D9" />
                <stop offset="48%" stopColor="#FFC8DC" />
                <stop offset="100%" stopColor="#FF8FB8" />
              </linearGradient>
            </defs>

            <path
              d="M80 5
                 Q84 5 87 13
                 L104 49
                 L143 54
                 Q153 56 146 65
                 L117 93
                 L124 132
                 Q126 142 116 137
                 L80 118
                 L44 137
                 Q34 142 36 132
                 L43 93
                 L14 65
                 Q7 56 17 54
                 L56 49
                 L73 13
                 Q76 5 80 5 Z"
              fill="url(#nakshuStarGradient)"
              stroke="#FFF8FC"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </svg>

          {/* Little face */}
          <div className="absolute inset-0">
            <span className="absolute left-[34%] top-[43%] h-[9px] w-[9px] rounded-full bg-ink/80" />
            <span className="absolute right-[34%] top-[43%] h-[9px] w-[9px] rounded-full bg-ink/80" />

            {/* Blushy cheeks */}
            <span className="absolute left-[22%] top-[54%] h-3 w-5 rounded-full bg-[#FF78A5]/45 blur-[3px]" />
            <span className="absolute right-[22%] top-[54%] h-3 w-5 rounded-full bg-[#FF78A5]/45 blur-[3px]" />

            {/* Smile */}
            <svg
              viewBox="0 0 24 12"
              className="absolute left-1/2 top-[53%] h-3 w-6 -translate-x-1/2"
              aria-hidden="true"
            >
              <path
                d="M3 2 Q12 14 21 2"
                fill="none"
                stroke="#A64F75"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Tiny twinkle */}
          <motion.span
            className="absolute -right-3 top-5 text-xl text-white"
            animate={
              reduceMotion
                ? {}
                : { opacity: [0.4, 1, 0.4], scale: [0.8, 1.15, 0.8] }
            }
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            ✦
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Birthday heading */}
      <motion.p
        className="relative z-10 font-heading text-2xl text-rose sm:text-3xl"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.7 }}
      >
        {content.heroLine}
      </motion.p>

      <motion.h1
        className="relative z-10 mt-1 font-heading text-5xl leading-tight text-rose sm:text-7xl"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.8 }}
      >
        {content.nickname}
      </motion.h1>

      {/* Personalised favourite star badge */}
      <motion.div
        className="relative z-10 mt-5"
        initial={{ opacity: 0, y: 12, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.85, duration: 0.7 }}
      >
        <div className="group inline-flex items-center gap-2.5 rounded-full border border-white/80 bg-white/45 px-5 py-3 shadow-[0_8px_30px_rgba(255,105,155,0.10)] backdrop-blur-md transition-all duration-300 hover:border-rose/30 hover:bg-white/65">
          <Sparkle
            size={15}
            className="text-rose transition-transform duration-300 group-hover:rotate-45"
          />

          <p className="text-sm font-medium tracking-wide text-ink/75 sm:text-base">
            My favourite <span className="font-semibold text-rose">star</span>
            <span className="ml-1 ">frfr</span>
          </p>
          <Sparkle
            size={15}
            className="text-rose transition-transform duration-300 group-hover:rotate-45"
          />
        </div>

        <p className="mt-3 font-heading text-lg text-rose/70">
          and she's one of a kind ♡
        </p>
      </motion.div>

      {/* Scroll prompt */}
      <motion.button
        onClick={() =>
          window.scrollBy({
            top: window.innerHeight * 0.75,
            behavior: reduceMotion ? "auto" : "smooth",
          })
        }
        className="absolute bottom-7 z-10 flex flex-col items-center gap-2 text-xs tracking-wide text-ink/50"
        animate={reduceMotion ? {} : { y: [0, 5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        aria-label="Scroll down to continue"
      >
        <span>scroll below</span>
        <span className="text-base">↓</span>
      </motion.button>
    </section>
  );
}
