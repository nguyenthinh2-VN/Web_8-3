import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LoadingHeart = ({ onComplete }) => {
  const [phase, setPhase] = useState(0); // 0=drawing, 1=pulsing, 2=done

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 2000);
    const t2 = setTimeout(() => setPhase(2), 3200);
    const t3 = setTimeout(() => onComplete?.(), 3800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[100] bg-[#0f0a12] flex flex-col items-center justify-center"
    >
      {/* Heart SVG drawn with stroke animation */}
      <motion.svg
        viewBox="0 0 100 100"
        className="w-32 h-32 md:w-40 md:h-40 mb-8"
        animate={phase >= 1 ? { scale: [1, 1.15, 1] } : {}}
        transition={phase >= 1 ? { duration: 0.7, repeat: Infinity } : {}}
      >
        <motion.path
          d="M50 88 C 50 88, 10 60, 10 35 A 20 20 0 0 1 50 25 A 20 20 0 0 1 90 35 C 90 60, 50 88, 50 88 Z"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0.5 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
        {phase >= 1 && (
          <motion.path
            d="M50 88 C 50 88, 10 60, 10 35 A 20 20 0 0 1 50 25 A 20 20 0 0 1 90 35 C 90 60, 50 88, 50 88 Z"
            fill="var(--color-primary)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </motion.svg>

      {/* Glow */}
      {phase >= 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute w-60 h-60 rounded-full bg-[var(--color-primary)] blur-[80px]"
        />
      )}

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-white/60 text-sm tracking-[0.2em] uppercase font-light"
      >
        Preparing something special for you...
      </motion.p>
    </motion.div>
  );
};

export default LoadingHeart;
