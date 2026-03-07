import Hero from './components/Hero'
import LoveCounter from './components/LoveCounter'
import FirstMeet from './components/FirstMeet'
import Timeline from './components/Timeline'
import VideoSection from './components/VideoSection'
import Reasons from './components/Reasons'
import Gallery from './components/Gallery'
import MiniGame from './components/MiniGame'
import Surprise from './components/Surprise'

function App() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Hero />
      <LoveCounter />
      <FirstMeet />
      <Timeline />
      <VideoSection />
      <Reasons />
      <Gallery />
      <MiniGame />
      <Surprise />

      {/* Footer nhỏ */}
      <footer className="py-8 text-center text-xs text-[var(--color-text-soft)]/50 font-light tracking-wider">
        Made with ❤️ for you
      </footer>
    </div>
  )
}

export default App
