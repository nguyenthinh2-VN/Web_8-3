import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import Hero from './components/Hero'
import LoveCounter from './components/LoveCounter'
import FirstMeet from './components/FirstMeet'
import Timeline from './components/Timeline'
import VideoSection from './components/VideoSection'
import Reasons from './components/Reasons'
import Gallery from './components/Gallery'
import GiftsFromHer from './components/GiftsFromHer'
import MiniGame from './components/MiniGame'
import ScratchCard from './components/ScratchCard'

// 5 mẫu Loading Screen – xem tất cả rồi chọn 1 mẫu đẹp nhất
import LoadingMemories from './components/loaders/LoadingMemories'
import LoadingHeart from './components/loaders/LoadingHeart'
import LoadingPolaroid from './components/loaders/LoadingPolaroid'
import LoadingTyping from './components/loaders/LoadingTyping'
import LoadingCountdown from './components/loaders/LoadingCountdown'

/*
  ============================================================
  ĐỂ TEST TẤT CẢ MẪU LOADING:
  - Đổi giá trị ACTIVE_LOADER bên dưới (1-5) để xem từng mẫu
  - Hoặc đặt = 0 để tắt loading screen
  ============================================================
  1 = LoadingMemories  (progress bar + text theo %)
  2 = LoadingHeart     (trái tim vẽ dần + pulse glow)
  3 = LoadingPolaroid  (ảnh polaroid rơi xuống)
  4 = LoadingTyping    (typewriter: "Every love story...")
  5 = LoadingCountdown (3→2→1→ "{days} Days With You")
*/
const ACTIVE_LOADER = 4;

const loaders = {
  1: LoadingMemories,
  2: LoadingHeart,
  3: LoadingPolaroid,
  4: LoadingTyping,
  5: LoadingCountdown,
};

function App() {
  const [loading, setLoading] = useState(ACTIVE_LOADER !== 0);

  const ActiveLoader = loaders[ACTIVE_LOADER];

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {loading && ActiveLoader && (
          <ActiveLoader onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main Content */}
      {!loading && (
        <div className="min-h-screen bg-[var(--color-bg)]">
          <Hero />
          <LoveCounter />
          <FirstMeet />
          <Timeline />
          <VideoSection />
          <Reasons />
          <Gallery />
          <GiftsFromHer />
          <MiniGame />
          <ScratchCard />
          <footer className="py-8 text-center text-xs text-[var(--color-text-soft)]/50 font-light tracking-wider">
            Made with ❤️ for you
          </footer>
        </div>
      )}
    </>
  )
}

export default App
