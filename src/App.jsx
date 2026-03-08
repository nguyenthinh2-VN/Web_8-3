import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import GameIntro from './components/GameIntro'

import Hero from './components/Hero'
import LoveCounter from './components/LoveCounter'
import FirstMeet from './components/FirstMeet'
import Timeline from './components/Timeline'
import VideoSection from './components/VideoSection'
import Reasons from './components/Reasons'
import Gallery from './components/Gallery'
import GiftsFromHer from './components/GiftsFromHer'
import MiniGame from './components/MiniGame'
import MemoryMatch from './components/MemoryMatch'

/*
  Đổi SKIP_INTRO = true để bỏ qua game intro (dev mode)
*/
const SKIP_INTRO = false;

function App() {
  const [started, setStarted] = useState(SKIP_INTRO);

  return (
    <>
      {/* Game Intro */}
      <AnimatePresence>
        {!started && (
          <motion.div key="game" exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
            <GameIntro onComplete={() => setStarted(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence>
        {started && (
          <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1 }} className="min-h-screen bg-[var(--color-bg)]">
            <Hero />
            <LoveCounter />
            <FirstMeet />
            <Timeline />
            <VideoSection />
            <Reasons />
            <Gallery />
            <GiftsFromHer />
            <MiniGame />
            <MemoryMatch />
            <footer className="py-8 text-center text-xs text-[var(--color-text-soft)]/50 font-light tracking-wider">
              Made with ❤️ for you
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default App
