import { useState } from "react";
import { motion } from "framer-motion";
import { content } from "../data/content";
import Reveal from "./ui/Reveal";

function FlipCard({ card }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="h-44 w-full cursor-pointer"
      style={{ perspective: 1000 }}
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* front */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border-2 border-pink-main/50 bg-cream shadow-lg shadow-pink-main/20"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="text-4xl">{card.emoji}</span>
          <p className="mt-3 px-4 text-center font-heading text-xl text-rose">
            {card.front}
          </p>
        </div>

        {/* back */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-3xl bg-gradient-to-br from-pink-soft to-lavender p-5 shadow-lg shadow-pink-main/20"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="text-center text-base font-semibold text-ink">
            {card.back}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function AppreciationCards() {
  return (
    <section className="bg-gradient-to-b from-lavender/40 via-blush to-blush px-6 py-20">
      <Reveal className="text-center">
        <h2 className="font-heading text-3xl text-rose">
          {content.cardsTitle}
        </h2>
        <p className="mt-2 text-sm text-ink/60">{content.cardsHint}</p>
      </Reveal>

      <div className="mx-auto mt-10 grid max-w-md gap-5 sm:max-w-2xl sm:grid-cols-2">
        {content.cards.map((card, i) => (
          <Reveal key={card.front} delay={i * 0.1}>
            <FlipCard card={card} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
