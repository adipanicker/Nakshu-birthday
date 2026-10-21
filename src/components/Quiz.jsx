import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { content } from "../data/content";
import Reveal from "./ui/Reveal";

export default function Quiz() {
  const { quiz } = content;
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = quiz[step];
  const answered = selected !== null;

  const pick = (i) => {
    if (answered) return;
    setSelected(i);
    if (i === current.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (step + 1 >= quiz.length) {
      setFinished(true);
    } else {
      setStep((s) => s + 1);
      setSelected(null);
    }
  };

  const restart = () => {
    setStep(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  const optionStyle = (i) => {
    if (!answered) return "border-pink-main/40 bg-cream hover:bg-pink-soft/60";
    if (i === current.answer) return "border-rose bg-pink-main text-white";
    if (i === selected) return "border-lavender bg-lavender/50 line-through";
    return "border-pink-main/20 bg-cream opacity-50";
  };

  return (
    <section className="bg-gradient-to-b from-blush via-pink-soft/50 to-blush px-6 py-20">
      <Reveal className="text-center">
        <h2 className="font-heading text-3xl text-rose">{content.quizTitle}</h2>
        <p className="mt-2 text-sm text-ink/60">{content.quizSub}</p>
      </Reveal>

      <Reveal className="mx-auto mt-10 max-w-md rounded-3xl border-2 border-pink-main/40 bg-cream p-6 shadow-xl shadow-pink-main/20">
        {/* progress */}
        {!finished && (
          <div className="mb-6">
            <div className="mb-2 flex justify-between text-xs font-bold text-rose">
              <span>
                Question {step + 1} / {quiz.length}
              </span>
              <span>♡ {score}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-pink-soft">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-pink-main to-rose"
                animate={{
                  width: `${((step + (answered ? 1 : 0)) / quiz.length) * 100}%`,
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-heading text-xl leading-snug text-ink">
                {current.q}
              </h3>

              <div className="mt-5 flex flex-col gap-3">
                {current.options.map((opt, i) => (
                  <button
                    key={opt}
                    onClick={() => pick(i)}
                    className={`rounded-2xl border-2 px-4 py-3 text-left text-sm font-semibold transition-colors ${optionStyle(i)}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {answered && (
                <motion.div
                  className="mt-5"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="rounded-2xl bg-pink-soft/70 px-4 py-3 text-sm font-semibold leading-snug text-ink">
                    {current.reveal}
                  </div>
                  <div className="mt-4 text-right">
                    <button
                      onClick={next}
                      className="rounded-full bg-rose px-5 py-2 text-sm font-bold text-white"
                    >
                      {step + 1 >= quiz.length ? "see result ✨" : "next →"}
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              className="py-6 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-5xl">🎀</p>
              <h3 className="mt-4 font-heading text-4xl text-rose">
                {score}/{quiz.length}
              </h3>
              <p className="mt-4 text-lg font-semibold text-ink">
                you got {score}/{quiz.length}, but it doesn't matter coz you're
                a 10/10 baddie 💅✨
              </p>
              <button
                onClick={restart}
                className="mt-6 text-sm font-bold text-rose underline underline-offset-4"
              >
                try again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </Reveal>
    </section>
  );
}
