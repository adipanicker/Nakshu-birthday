import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Gate from "./components/Gate";
import Hero from "./components/Hero";
import AppreciationCards from "./components/AppreciationCards";
import Quiz from "./components/Quiz";
import Polaroids from "./components/Polaroids";
import BirthdayMessage from "./components/BirthdayMessage";
import MusicPlayer from "./components/MusicPlayer";
import CakeCutting from "./components/CakeCutting";

export default function App() {
  const [opened, setOpened] = useState(false);

  return (
    <AnimatePresence mode="wait" initial={false}>
      {!opened ? (
        <Gate key="gate" onOpen={() => setOpened(true)} />
      ) : (
        <motion.main
          key="birthday"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <MusicPlayer />
          <Hero />
          <AppreciationCards />
          <Quiz />
          <BirthdayMessage />
          <CakeCutting />
        </motion.main>
      )}
    </AnimatePresence>
  );
}
