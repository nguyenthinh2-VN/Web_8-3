import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Delete, CheckCircle2, X, Lock, Unlock } from 'lucide-react';
import questions from '../data/questions.json';

const KEYS = ['1','2','3','4','5','6','7','8','9','⌫','0','✓'];

const UnlockPopup = ({ onUnlocked, onClose }) => {
  const [level, setLevel] = useState(0); // 0, 1, 2
  const [input, setInput] = useState('');
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const [direction, setDirection] = useState(1); // 1=forward

  const q = questions[level];

  const handleKey = useCallback((key) => {
    if (success || allDone) return;

    if (key === '⌫') {
      setInput((prev) => prev.slice(0, -1));
    } else if (key === '✓') {
      // Check answer
      if (input === q.answer) {
        setSuccess(true);
        confetti({ particleCount: 60, spread: 90, origin: { y: 0.7 }, zIndex: 300 });
        setTimeout(() => {
          if (level < questions.length - 1) {
            setDirection(1);
            setLevel((l) => l + 1);
            setInput('');
            setSuccess(false);
          } else {
            // All done!
            setAllDone(true);
            confetti({ particleCount: 150, spread: 360, startVelocity: 30, origin: { y: 0.5 }, zIndex: 300 });
            setTimeout(() => onUnlocked?.(), 2000);
          }
        }, 1000);
      } else {
        // Wrong
        setShake(true);
        setTimeout(() => { setShake(false); setInput(''); }, 600);
      }
    } else {
      if (input.length < q.inputLength) {
        setInput((prev) => prev + key);
      }
    }
  }, [input, q, level, success, allDone, onUnlocked]);

  // Slide variants
  const slideVariants = {
    enter: (d) => ({ x: d > 0 ? 300 : -300, opacity: 0, scale: 0.9 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d) => ({ x: d > 0 ? -300 : 300, opacity: 0, scale: 0.9 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[250] flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 40 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative z-10 w-full max-w-sm bg-gradient-to-b from-[#1c1220] to-[#140e18] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
      >
        {/* Header */}
        <div className="p-6 pb-4 text-center relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/30 hover:text-white/60 transition-colors">
            <X size={20} />
          </button>

          {/* Level indicator */}
          <div className="flex justify-center gap-2 mb-4">
            {questions.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${
                i < level ? 'w-8 bg-green-400' :
                i === level ? 'w-8 bg-[var(--color-primary)]' :
                'w-4 bg-white/15'
              }`} />
            ))}
          </div>

          <motion.div
            animate={allDone ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            {allDone ? (
              <Unlock size={32} className="mx-auto mb-2 text-green-400" />
            ) : (
              <Lock size={28} className="mx-auto mb-2 text-[var(--color-primary-light)]" />
            )}
          </motion.div>

          <p className="text-white/40 text-xs tracking-[0.2em] uppercase font-light">
            {allDone ? 'Đã mở khóa!' : `Ải ${level + 1} / ${questions.length}`}
          </p>
        </div>

        {/* Question area – slides */}
        <div className="px-6 overflow-hidden" style={{ minHeight: '180px' }}>
          <AnimatePresence mode="wait" custom={direction}>
            {!allDone ? (
              <motion.div
                key={level}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              >
                {/* Question */}
                <p className="text-white text-lg font-medium text-center mb-2" style={{ fontFamily: 'var(--font-script)' }}>
                  {q.question}
                </p>
                <p className="text-white/30 text-xs text-center mb-5 font-light">{q.hint}</p>

                {/* Input boxes */}
                <motion.div
                  animate={shake ? { x: [-12, 12, -8, 8, -4, 4, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  className="flex justify-center gap-1.5 mb-2"
                >
                  {Array.from({ length: q.inputLength }).map((_, i) => {
                    const filled = i < input.length;
                    const isWrong = shake;
                    const isCorrect = success;
                    return (
                      <motion.div
                        key={i}
                        animate={filled ? { scale: [0.8, 1.1, 1] } : {}}
                        transition={{ duration: 0.15 }}
                        className={`w-8 h-11 rounded-lg border-2 flex items-center justify-center text-lg font-semibold transition-all duration-200 ${
                          isCorrect ? 'border-green-400 bg-green-400/10 text-green-400' :
                          isWrong ? 'border-red-400 bg-red-400/10 text-red-400' :
                          filled ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-white' :
                          'border-white/15 bg-white/5 text-white/20'
                        }`}
                      >
                        {filled ? input[i] : '·'}
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Separator for date format */}
                {q.inputLength === 8 && (
                  <p className="text-white/20 text-[10px] text-center font-light tracking-wider">DD / MM / YYYY</p>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <p className="text-3xl font-bold text-[var(--color-primary-light)] mb-2" style={{ fontFamily: 'var(--font-script)' }}>
                  Chúc mừng! 🎉
                </p>
                <p className="text-white/50 text-sm font-light">Đang mở câu chuyện của chúng mình...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Numpad */}
        {!allDone && (
          <div className="p-4 pt-3">
            <div className="grid grid-cols-3 gap-2">
              {KEYS.map((key) => (
                <motion.button
                  key={key}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleKey(key)}
                  className={`h-14 rounded-2xl flex items-center justify-center text-lg font-medium transition-colors ${
                    key === '✓'
                      ? 'bg-[var(--color-primary)] text-white active:bg-[var(--color-primary)]/80'
                      : key === '⌫'
                      ? 'bg-white/5 text-white/50 active:bg-white/10'
                      : 'bg-white/8 text-white hover:bg-white/12 active:bg-white/15'
                  }`}
                >
                  {key === '⌫' ? <Delete size={20} /> : key === '✓' ? <CheckCircle2 size={20} /> : key}
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default UnlockPopup;
