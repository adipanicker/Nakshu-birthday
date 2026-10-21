import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Sparkles, ArrowUpRight, Star } from "lucide-react";
import { useAudio } from "../hooks/useAudio";

export default function Gate({ onOpen }) {
  const { play } = useAudio();
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const reduceMotion = useReducedMotion();

  const message = "a little star was born";

  const stars = useMemo(
    () =>
      Array.from({ length: 75 }, (_, i) => ({
        id: i,
        top: (i * 47.73 + 11.2) % 100,
        left: (i * 67.31 + 7.8) % 100,
        size: i % 9 === 0 ? 3 : i % 3 === 0 ? 2 : 1,
        delay: (i % 11) * 0.37,
        duration: 2.5 + (i % 5) * 0.8,
      })),
    [],
  );

  useEffect(() => {
    let i = 0;
    let interval;

    setTyped("");
    setDone(false);

    if (reduceMotion) {
      setTyped(message);
      setDone(true);
      return;
    }

    const start = setTimeout(() => {
      interval = setInterval(() => {
        i++;
        setTyped(message.slice(0, i));

        if (i >= message.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, 75);
    }, 800);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [reduceMotion]);

  const handleOpen = () => {
    if (!done) return;
    play();
    onOpen();
  };

  return (
    <motion.main
      className="gate fixed inset-0 z-50 flex items-center justify-center overflow-hidden text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.025,
        filter: "blur(5px)",
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Atmospheric background */}
      <div className="gate-glow gate-glow-one" />
      <div className="gate-glow gate-glow-two" />

      {/* Starfield */}
      <div className="pointer-events-none absolute inset-0">
        {stars.map((star) => (
          <motion.span
            key={star.id}
            className="gate-star absolute rounded-full"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: star.size,
              height: star.size,
            }}
            animate={
              reduceMotion
                ? { opacity: 0.65 }
                : { opacity: [0.18, 0.9, 0.3, 0.85] }
            }
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Orbit rings */}
      <motion.div
        className="gate-orbit gate-orbit-one"
        animate={reduceMotion ? {} : { rotate: 360 }}
        transition={{
          duration: 100,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <span className="orbit-star">✦</span>
      </motion.div>

      <motion.div
        className="gate-orbit gate-orbit-two"
        animate={reduceMotion ? {} : { rotate: -360 }}
        transition={{
          duration: 140,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <span className="orbit-dot" />
      </motion.div>

      {/* Floating star: the meaning behind Nakshathra */}
      <motion.div
        className="gate-main-star"
        animate={
          reduceMotion
            ? {}
            : {
                y: [0, -11, 0],
                rotate: [-5, 5, -5],
                scale: [1, 1.035, 1],
              }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Star
          size={68}
          strokeWidth={1.1}
          fill="url(#gateStarFill)"
          color="#D8E7FF"
          className="gate-star-icon"
        />

        <svg width="0" height="0" aria-hidden="true">
          <defs>
            <linearGradient id="gateStarFill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="55%" stopColor="#C9DFFF" />
              <stop offset="100%" stopColor="#8EAFF0" />
            </linearGradient>
          </defs>
        </svg>

        <span className="gate-star-sparkle">✧</span>
      </motion.div>

      {/* Story */}
      <div className="gate-content relative z-10 flex w-full flex-col items-center px-5 text-center">
        <motion.div
          className="gate-label"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
        >
          <span className="gate-label-star">✦</span>
          SOMEWHERE, 22 YEARS AGO
          <span className="gate-label-star">✦</span>
        </motion.div>

        <h1 className="gate-name">
          <span>{typed || "\u00a0"}</span>

          <AnimatePresence>
            {!done && (
              <motion.span
                className="gate-cursor"
                aria-hidden="true"
                animate={{ opacity: [1, 0.2, 1] }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.85,
                  repeat: Infinity,
                }}
              />
            )}
          </AnimatePresence>
        </h1>

        <motion.p
          className="gate-subtitle"
          initial={{ opacity: 0, y: 8 }}
          animate={{
            opacity: done ? 1 : 0,
            y: done ? 0 : 8,
          }}
          transition={{ duration: 0.7 }}
        >
          and the universe got a little brighter.
        </motion.p>

        <motion.button
          onClick={handleOpen}
          disabled={!done}
          className="gate-button group"
          initial={{ opacity: 0, y: 12 }}
          animate={{
            opacity: done ? 1 : 0,
            y: done ? 0 : 12,
          }}
          transition={{ duration: 0.65, delay: 0.15 }}
          whileHover={done ? { scale: 1.035, y: -2 } : {}}
          whileTap={done ? { scale: 0.97 } : {}}
        >
          <span>Discover who</span>
          <Sparkles size={16} className="gate-button-sparkle" />
          <ArrowUpRight size={15} className="gate-button-arrow" />
        </motion.button>

        <motion.div
          className="gate-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: done ? 1 : 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <span className="gate-footer-line" />
          MADE JUST FOR YOU ♡
          <span className="gate-footer-line" />
        </motion.div>
      </div>

      <span className="gate-corner gate-corner-top">✧</span>
      <span className="gate-corner gate-corner-bottom">✦</span>
    </motion.main>
  );
}
