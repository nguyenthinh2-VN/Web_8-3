import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import config from '../../data/config.json';

const LoadingCountdown = ({ onComplete }) => {
  const [count, setCount] = useState(3);
  const [showTitle, setShowTitle] = useState(false);

  const daysCount = useMemo(() => {
    const start = new Date(config.startDate);
    const now = new Date();
    return Math.floor((now - start) / (1000 * 60 * 60 * 24));
  }, []);

  useEffect(() => {
    if (count > 0) {
      const t = setTimeout(() => setCount((c) => c - 1), 900);
      return () => clearTimeout(t);
    } else if (!showTitle) {
      const t = setTimeout(() => setShowTitle(true), 300);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => onComplete?.(), 1500);
      return () => clearTimeout(t);
    }
  }, [count, showTitle, onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[100] bg-[#0f0a12] flex items-center justify-center"
    >
      <AnimatePresence mode="wait">
        {count > 0 ? (
          <motion.span
            key={count}
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-8xl md:text-[10rem] font-bold text-white/20"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            {count}
          </motion.span>
        ) : showTitle ? (
          <motion.div
            key="title"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center px-8"
          >
            <p className="text-5xl md:text-8xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-script)' }}>
              {daysCount} Days
            </p>
            <p className="text-2xl md:text-4xl text-[var(--color-primary-light)] font-light" style={{ fontFamily: 'var(--font-script)' }}>
              With You ❤️
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Subtle glow */}
      <div className="absolute w-80 h-80 rounded-full bg-[var(--color-primary)] opacity-10 blur-[100px]" />
    </motion.div>
  );
};

export default LoadingCountdown;
