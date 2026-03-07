import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, X, Heart } from 'lucide-react';
import config from '../data/config.json';

/* Floating Hearts animation rải rác nền */
const FloatingHearts = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute text-[var(--color-primary-light)]"
        initial={{
          opacity: 0,
          y: '110%',
          x: `${Math.random() * 100}%`,
          scale: Math.random() * 0.6 + 0.4,
        }}
        animate={{ opacity: [0, 0.5, 0], y: '-10%' }}
        transition={{
          duration: Math.random() * 6 + 6,
          repeat: Infinity,
          delay: Math.random() * 4,
          ease: 'linear',
        }}
      >
        <Heart fill="currentColor" />
      </motion.div>
    ))}
  </div>
);

const Surprise = () => {
  const [showModal, setShowModal] = useState(false);

  const handleConfetti = () => {
    const duration = 3500;
    const end = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };
    const rand = (a, b) => Math.random() * (b - a) + a;

    const interval = setInterval(() => {
      if (Date.now() > end) return clearInterval(interval);
      const count = 40 * ((end - Date.now()) / duration);
      confetti({ ...defaults, particleCount: count, origin: { x: rand(0.1, 0.3), y: rand(0, 0.4) } });
      confetti({ ...defaults, particleCount: count, origin: { x: rand(0.7, 0.9), y: rand(0, 0.4) } });
    }, 250);

    setShowModal(true);
  };

  return (
    <section className="section-padding bg-gradient-to-t from-[var(--color-primary-light)] via-[var(--color-cream)] to-[var(--color-bg)] flex flex-col items-center justify-center relative overflow-hidden min-h-[60vh]">
      <FloatingHearts />

      <div className="text-center mb-10 relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm tracking-[0.3em] uppercase text-[var(--color-text-soft)] font-light mb-3"
        >
          Dành riêng cho em
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-[var(--color-primary)]"
          style={{ fontFamily: 'var(--font-script)' }}
        >
          Có một điều bất ngờ...
        </motion.h2>
      </div>

      <motion.button
        whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(232,69,124,0.35)' }}
        whileTap={{ scale: 0.96 }}
        onClick={handleConfetti}
        className="relative z-10 flex items-center gap-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white px-10 py-5 rounded-full font-semibold text-lg shadow-xl transition-colors"
      >
        <motion.div animate={{ rotate: [0, -8, 8, -8, 0] }} transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}>
          <Gift className="w-6 h-6" />
        </motion.div>
        {config.surpriseConfig.buttonText}
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-lg"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 40, transition: { duration: 0.2 } }}
              className="bg-white rounded-[2rem] p-8 md:p-12 max-w-md w-full relative shadow-2xl text-center border border-[var(--color-primary-light)]/30 overflow-hidden"
            >
              {/* Top glow */}
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-60 h-40 bg-[var(--color-primary-light)] opacity-30 blur-[60px] rounded-full" />

              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 p-2 text-[var(--color-text-soft)] hover:text-[var(--color-primary)] bg-gray-50 hover:bg-[var(--color-primary-light)]/30 rounded-full transition-colors z-20"
              >
                <X size={22} />
              </button>

              {/* Bear SVG */}
              <div className="flex justify-center mb-8 relative z-10">
                <motion.svg
                  width="100" height="100" viewBox="0 0 100 100" fill="none"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="overflow-visible"
                >
                  <circle cx="25" cy="25" r="13" fill="#C19A6B" />
                  <circle cx="25" cy="25" r="6" fill="#E6C280" />
                  <circle cx="75" cy="25" r="13" fill="#C19A6B" />
                  <circle cx="75" cy="25" r="6" fill="#E6C280" />
                  <circle cx="50" cy="50" r="33" fill="#C19A6B" />
                  <circle cx="50" cy="62" r="13" fill="#E6C280" />
                  <circle cx="50" cy="57" r="3.5" fill="#3D2B1F" />
                  <path d="M 50 60 L 50 66" stroke="#3D2B1F" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M 46 66 Q 50 70 54 66" stroke="#3D2B1F" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  <circle cx="36" cy="45" r="3.5" fill="#3D2B1F" />
                  <circle cx="64" cy="45" r="3.5" fill="#3D2B1F" />
                  <circle cx="29" cy="55" r="5" fill="#FFB6C1" opacity="0.5" />
                  <circle cx="71" cy="55" r="5" fill="#FFB6C1" opacity="0.5" />
                  <motion.g animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 0.7, repeat: Infinity }} style={{ transformOrigin: '50px 85px' }}>
                    <path d="M50 100 C 50 100,20 75,20 60 A 15 15 0 0 1 50 45 A 15 15 0 0 1 80 60 C 80 75,50 100,50 100 Z" fill="var(--color-primary)" />
                  </motion.g>
                  <ellipse cx="30" cy="70" rx="7" ry="11" fill="#BA8D5D" transform="rotate(-30 30 70)" />
                  <ellipse cx="70" cy="70" rx="7" ry="11" fill="#BA8D5D" transform="rotate(30 70 70)" />
                </motion.svg>
              </div>

              <h3
                className="text-3xl md:text-4xl text-[var(--color-primary)] mb-4 font-bold relative z-10"
                style={{ fontFamily: 'var(--font-script)' }}
              >
                {config.surpriseConfig.messageTitle}
              </h3>
              <p className="text-[var(--color-text-soft)] leading-relaxed text-base md:text-lg font-light relative z-10">
                {config.surpriseConfig.messageBody}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Surprise;
