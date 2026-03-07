import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const steps = [
  { pct: 10, text: 'Lần đầu gặp em...' },
  { pct: 30, text: 'Hẹn đầu tiên...' },
  { pct: 55, text: 'Chuyến đi đầu tiên...' },
  { pct: 80, text: 'Những khoảnh khắc hạnh phúc nhất...' },
  { pct: 100, text: 'Vẫn bên nhau ❤️' },
];

const LoadingMemories = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const currentStep = steps.findLast((s) => progress >= s.pct) || steps[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(timer); return 100; }
        return p + 1;
      });
    }, 40);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => onComplete?.(), 600);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[100] bg-gradient-to-br from-[#1a0a10] via-[#2d1520] to-[#0f0a15] flex flex-col items-center justify-center px-8"
    >
      {/* Background blur image */}
      <div className="absolute inset-0 opacity-10">
        <img src="/images/hero_namTay_1.jpg" className="w-full h-full object-cover blur-2xl" alt="" />
      </div>

      <div className="relative z-10 w-full max-w-md text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white/50 text-sm tracking-[0.3em] uppercase font-light mb-8"
        >
          Loading our memories...
        </motion.p>

        {/* Step text */}
        <motion.p key={currentStep.text} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-white text-lg font-light mb-8 h-8" style={{ fontFamily: 'var(--font-script)' }}>
          {currentStep.text}
        </motion.p>

        {/* Progress bar */}
        <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden mb-4">
          <motion.div className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-full" style={{ width: `${progress}%` }} />
        </div>

        <p className="text-white/40 text-sm font-light">{progress}%</p>
      </div>
    </motion.div>
  );
};

export default LoadingMemories;
