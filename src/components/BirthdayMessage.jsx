import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { content } from "../data/content";

export default function BirthdayMessage() {
  const [revealed, setRevealed] = useState(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blush via-lavender/30 to-blush px-6 py-24">
      {/* Soft decorative sparkles */}
      <div className="pointer-events-none absolute left-[12%] top-20 text-rose/40">
        <Sparkles size={22} />
      </div>
      <div className="pointer-events-none absolute right-[12%] top-40 text-rose/30">
        <Heart size={18} />
      </div>

      <div className="relative mx-auto max-w-lg text-center">
        <motion.p
          className="mb-4 text-xs uppercase tracking-[0.25em] text-rose/70"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          just for you ✦
        </motion.p>

        <motion.h2
          className="font-heading text-4xl leading-tight text-rose sm:text-5xl"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          I have a little
          <br />
          message.
        </motion.h2>

        <p className="mt-4 text-sm text-ink/60">
          A little something I wanted you to have ♡
        </p>

        {!revealed && (
          <motion.button
            onClick={() => setRevealed(true)}
            className="group mt-9 inline-flex items-center gap-3 rounded-full border border-rose/30 bg-cream/70 px-7 py-4 text-sm font-medium text-rose shadow-lg shadow-pink-main/10 backdrop-blur-sm transition-colors hover:bg-cream"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            aria-expanded={revealed}
          >
            Open your little message
            <Heart
              size={16}
              className="transition-transform group-hover:scale-110"
            />
          </motion.button>
        )}

        <AnimatePresence>
          {revealed && (
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {/* Photo reveal */}
              <motion.div
                className="mx-auto max-w-sm bg-cream p-3 pb-5 shadow-2xl shadow-pink-main/20"
                initial={{ opacity: 0, scale: 0.92, rotate: 3 }}
                animate={{ opacity: 1, scale: 1, rotate: -2 }}
                transition={{ delay: 0.15, duration: 0.65 }}
              >
                <img
                  src={content.messagePhoto}
                  alt="A favourite memory"
                  className="aspect-[4/5] w-full object-cover"
                />

                <p className="mt-4 font-heading text-lg text-ink">
                  {content.messagePhotoCaption}
                </p>
              </motion.div>

              {/* One birthday paragraph */}
              <motion.div
                className="mx-auto mt-10 max-w-md"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.7 }}
              >
                <div className="mb-5 flex items-center justify-center gap-3 text-rose/50">
                  <span className="h-px w-10 bg-rose/25" />
                  <Heart size={14} fill="currentColor" />
                  <span className="h-px w-10 bg-rose/25" />
                </div>

                <p className="mt-6 font-heading text-xl text-rose">
                  Happy birthday, Nakshu! 🩵 I hope this next year brings you so
                  much happiness, exciting new experiences, and little moments
                  that make you smile when you least expect them. I'm genuinely
                  glad I got to know you, and I hope life brings you so many
                  beautiful things in this next chapter. Keep being you, and
                  have the loveliest birthday. ♡
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
