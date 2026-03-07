import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import memories from '../../data/memories.json';

const LoadingPolaroid = ({ onComplete }) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const photos = memories.slice(0, 4).map((m) => m.image);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= photos.length) { clearInterval(interval); return prev; }
        return prev + 1;
      });
    }, 700);
    return () => clearInterval(interval);
  }, [photos.length]);

  useEffect(() => {
    if (visibleCount >= photos.length) {
      const timeout = setTimeout(() => onComplete?.(), 1000);
      return () => clearTimeout(timeout);
    }
  }, [visibleCount, photos.length, onComplete]);

  const positions = [
    { x: '-15%', y: '-10%', rotate: -12 },
    { x: '15%', y: '-5%', rotate: 8 },
    { x: '-8%', y: '12%', rotate: -5 },
    { x: '10%', y: '8%', rotate: 10 },
  ];

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[100] bg-[#0f0a12] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Polaroids */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 mb-12">
        <AnimatePresence>
          {photos.slice(0, visibleCount).map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -100, rotate: 0, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, rotate: positions[i].rotate, scale: 1, x: positions[i].x, }}
              transition={{ type: 'spring', stiffness: 120, damping: 14 }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ zIndex: i }}
            >
              <div className="bg-white p-3 pb-12 rounded-md shadow-2xl w-48 md:w-56">
                <div className="aspect-square overflow-hidden rounded-sm">
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-white/50 text-sm tracking-[0.2em] uppercase font-light"
      >
        Collecting our memories...
      </motion.p>
    </motion.div>
  );
};

export default LoadingPolaroid;
