import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail } from 'lucide-react';
import LoveLetter from './LoveLetter';

const MiniGame = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isGameDone, setIsGameDone] = useState(false);

  const handleOpenLetter = () => {
    setIsOpen(true);
    setTimeout(() => setIsGameDone(true), 1200);
  };

  return (
    <section className="section-padding bg-[var(--color-bg)] flex flex-col items-center justify-center min-h-[80vh] relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-[var(--color-primary-light)] opacity-20 blur-[60px]" />
      <div className="absolute bottom-10 right-10 w-56 h-56 rounded-full bg-[var(--color-accent)] opacity-15 blur-[80px]" />

      <AnimatePresence mode="wait">
        {!isGameDone ? (
          <motion.div
            key="envelope"
            exit={{ opacity: 0, y: -60, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-8 relative z-10"
          >
            {/* Prompt */}
            <div className="text-center">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm tracking-[0.3em] uppercase text-[var(--color-text-soft)] font-light mb-3"
              >
                Một bức thư cho em
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-5xl font-bold text-[var(--color-primary)]"
                style={{ fontFamily: 'var(--font-script)' }}
              >
                Chạm để mở nhé 💌
              </motion.h2>
            </div>

            {/* Envelope */}
            <motion.div
              onClick={handleOpenLetter}
              className="cursor-pointer group relative"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Envelope body */}
              <div className="w-72 h-52 md:w-80 md:h-56 bg-gradient-to-br from-[#fce4f3] to-[#fbd5e8] rounded-2xl shadow-2xl relative overflow-hidden border border-white/50">
                {/* Inner lines to mimic paper texture */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-30 pt-8">
                  <div className="w-3/5 h-[2px] bg-[var(--color-primary-light)] rounded-full" />
                  <div className="w-2/5 h-[2px] bg-[var(--color-primary-light)] rounded-full" />
                  <div className="w-1/3 h-[2px] bg-[var(--color-primary-light)] rounded-full" />
                </div>
                {/* Mail icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Mail className="w-12 h-12 text-[var(--color-primary)] opacity-40 group-hover:opacity-60 transition-opacity" />
                </div>
              </div>

              {/* Flap */}
              <motion.div
                animate={isOpen ? { rotateX: 180 } : { rotateX: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="absolute -top-1 left-0 right-0 h-28 origin-top"
                style={{ perspective: 800 }}
              >
                <div
                  className="w-full h-full bg-gradient-to-b from-[#f9a8c9] to-[#fce4f3] rounded-t-2xl"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                />
              </motion.div>

              {/* Lift glow on hover */}
              <div className="absolute -inset-4 rounded-3xl bg-[var(--color-primary)] opacity-0 group-hover:opacity-10 blur-2xl transition-opacity" />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full relative z-10"
          >
            <LoveLetter />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MiniGame;
