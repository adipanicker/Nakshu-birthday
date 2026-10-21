import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { content } from "../data/content";
import Reveal from "./ui/Reveal";

export default function Polaroids() {
  const [active, setActive] = useState(null);

  return (
    <section className="bg-linear-to-b from-blush via-lavender/30 to-blush px-6 py-20">
      <Reveal className="text-center">
        <h2 className="font-heading text-3xl text-rose">
          {content.polaroidsTitle}
        </h2>
        <p className="mt-2 text-sm text-ink/60">{content.polaroidsHint}</p>
      </Reveal>

      <div className="mx-auto mt-12 grid max-w-md grid-cols-2 gap-x-4 gap-y-8 sm:max-w-3xl sm:grid-cols-3">
        {content.photos.map((p, i) => (
          <motion.button
            key={p.src}
            onClick={() => setActive(p)}
            className="bg-cream p-2 pb-8 text-center shadow-lg shadow-pink-main/30"
            initial={{ opacity: 0, y: 40, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: p.tilt }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
            whileTap={{ scale: 0.96 }}
          >
            <img
              src={p.src}
              alt={p.caption}
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
            <p className="mt-2 font-heading text-sm text-ink">{p.caption}</p>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="max-w-sm bg-cream p-3 pb-10 text-center shadow-2xl"
              initial={{ scale: 0.8, rotate: -6 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={active.src}
                alt={active.caption}
                className="max-h-[65vh] w-full object-contain"
              />
              <p className="mt-4 font-heading text-lg text-rose">
                {active.caption}
              </p>
              <button
                onClick={() => setActive(null)}
                className="mt-3 text-xs font-bold text-ink/50 underline"
              >
                close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
