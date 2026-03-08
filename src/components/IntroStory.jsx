import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock } from 'lucide-react';
import config from '../data/config.json';

const lines = [
  { text: 'Trong hàng triệu người trên thế giới này...', font: 'dancing' },
  { text: 'Em đã tìm thấy anh.', font: 'dancing' },
  { text: 'Không phải ngẫu nhiên, mà là định mệnh.', font: 'poppins' },
  { text: 'Từng ngày trôi qua, yêu thêm một chút...', font: 'poppins' },
];

/** Floating heart particle */
const FloatingHeart = ({ delay }) => (
  <motion.span
    initial={{ opacity: 0, y: '100vh', x: `${Math.random() * 100}vw`, scale: Math.random() * 0.5 + 0.3 }}
    animate={{ opacity: [0, 0.6, 0], y: '-10vh' }}
    transition={{ duration: Math.random() * 6 + 6, delay, repeat: Infinity, ease: 'linear' }}
    className="fixed text-[var(--color-primary)] pointer-events-none select-none"
    style={{ fontSize: `${Math.random() * 14 + 10}px`, left: `${Math.random() * 100}%` }}
  >
    ♥
  </motion.span>
);

const IntroStory = ({ onUnlockClick }) => {
  const [lineIndex, setLineIndex] = useState(0);
  const [phase, setPhase] = useState('typing'); // 'typing' | 'showing' | 'exit' | 'done'
  const [charIndex, setCharIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);

  const daysCount = useMemo(() => {
    const start = new Date(config.startDate);
    const now = new Date();
    return Math.floor((now - start) / (1000 * 60 * 60 * 24));
  }, []);

  // Dòng cuối cùng (dynamic)
  const lastLine = { text: `Và hôm nay, chúng mình đã bên nhau ${daysCount} ngày ❤️`, font: 'poppins' };
  const allLines = [...lines, lastLine];
  const currentLine = allLines[lineIndex];

  // Typewriter effect
  useEffect(() => {
    if (phase !== 'typing' || !currentLine) return;
    if (charIndex < currentLine.text.length) {
      const timer = setTimeout(() => setCharIndex((c) => c + 1), 45);
      return () => clearTimeout(timer);
    } else {
      // Typing xong → show
      const timer = setTimeout(() => setPhase('showing'), 800);
      return () => clearTimeout(timer);
    }
  }, [phase, charIndex, currentLine]);

  // Show xong → exit
  useEffect(() => {
    if (phase !== 'showing') return;
    const timer = setTimeout(() => setPhase('exit'), 1200);
    return () => clearTimeout(timer);
  }, [phase]);

  // Exit xong → next line
  useEffect(() => {
    if (phase !== 'exit') return;
    const timer = setTimeout(() => {
      if (lineIndex < allLines.length - 1) {
        setLineIndex((i) => i + 1);
        setCharIndex(0);
        setPhase('typing');
      } else {
        setPhase('done');
        setTimeout(() => setShowButton(true), 600);
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [phase, lineIndex, allLines.length]);

  // Tạo mảng ký tự hiện tại
  const displayedText = currentLine ? currentLine.text.slice(0, charIndex) : '';
  const chars = displayedText.split('');

  return (
    <div className="fixed inset-0 z-[200] bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden">
      {/* Floating Hearts */}
      {Array.from({ length: 15 }).map((_, i) => (
        <FloatingHeart key={i} delay={i * 0.8} />
      ))}

      {/* Animated Text */}
      <div className="relative z-10 text-center px-8 min-h-[100px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {phase !== 'done' && currentLine && (
            <motion.p
              key={lineIndex}
              className={`text-xl md:text-3xl leading-relaxed text-white/90 ${
                currentLine.font === 'dancing' ? '' : 'font-light'
              }`}
              style={{
                fontFamily: currentLine.font === 'dancing' ? 'var(--font-script)' : 'var(--font-body)',
              }}
              // Exit: ký tự bung ra mọi hướng
              exit="scatter"
              variants={{
                scatter: {
                  transition: { staggerChildren: 0.02, staggerDirection: 1 },
                },
              }}
            >
              {chars.map((char, i) => (
                <motion.span
                  key={i}
                  // Enter: slide up + deblur
                  initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.3, delay: i * 0.02 }}
                  // Exit: scatter outward
                  variants={{
                    scatter: {
                      opacity: 0,
                      x: (Math.random() - 0.5) * 300,
                      y: (Math.random() - 0.5) * 300,
                      rotate: (Math.random() - 0.5) * 360,
                      scale: 0,
                      filter: 'blur(6px)',
                      transition: { duration: 0.6, ease: 'easeIn' },
                    },
                  }}
                  className="inline-block"
                  style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Unlock Button */}
      <AnimatePresence>
        {showButton && (
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onUnlockClick}
            className="relative z-10 mt-10 flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white font-medium text-base shadow-lg shadow-[var(--color-primary)]/30 hover:shadow-xl hover:shadow-[var(--color-primary)]/40 transition-shadow"
          >
            <Lock size={18} />
            Mở Khóa Câu chuyện
          </motion.button>
        )}
      </AnimatePresence>

      {/* Subtle glow */}
      <div className="absolute w-96 h-96 rounded-full bg-[var(--color-primary)] opacity-[0.03] blur-[120px]" />
    </div>
  );
};

export default IntroStory;
