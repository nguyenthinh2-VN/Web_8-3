import { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import config from '../../data/config.json';

const lines = [
  'Mỗi câu chuyện tình yêu đều đặc biệt...',
  'Nhưng câu chuyện của chúng mình',
  'là yêu thích nhất của anh.',
];

const LoadingTyping = ({ onComplete }) => {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState(['']);
  const [allDone, setAllDone] = useState(false);
  const [showDays, setShowDays] = useState(false);
  const onCompleteRef = useRef(onComplete);

  const daysCount = useMemo(() => {
    const start = new Date(config.startDate);
    const now = new Date();
    return Math.floor((now - start) / (1000 * 60 * 60 * 24));
  }, []);

  // Typing logic
  useEffect(() => {
    if (allDone) return;
    if (lineIndex >= lines.length) {
      setAllDone(true);
      return;
    }

    const currentLine = lines[lineIndex];
    if (charIndex < currentLine.length) {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => {
          const updated = [...prev];
          updated[lineIndex] = currentLine.slice(0, charIndex + 1);
          return updated;
        });
        setCharIndex((c) => c + 1);
      }, 55);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setLineIndex((l) => l + 1);
        setCharIndex(0);
        setDisplayedLines((prev) => [...prev, '']);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [lineIndex, charIndex, allDone]);

  // Sau khi gõ xong → hiện số ngày → chuyển trang
  useEffect(() => {
    if (!allDone) return;
    const t1 = setTimeout(() => setShowDays(true), 600);
    const t2 = setTimeout(() => onCompleteRef.current?.(), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [allDone]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[100] bg-[#0f0a12] flex flex-col items-center justify-center px-8"
    >
      <div className="max-w-lg text-center">
        {displayedLines.map((line, i) => (
          line !== undefined && (
            <p key={i} className="text-white text-xl md:text-3xl font-light leading-relaxed mb-3" style={{ fontFamily: 'var(--font-script)' }}>
              {line}
              {i === lineIndex && !allDone && (
                <span className="inline-block w-[2px] h-5 md:h-7 bg-white/70 ml-1 animate-pulse align-middle" />
              )}
            </p>
          )
        ))}

        {/* Hiện số ngày sau khi gõ xong */}
        {showDays && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl md:text-5xl font-bold text-[var(--color-primary-light)] mt-8"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            {daysCount} Days With You ❤️
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default LoadingTyping;
