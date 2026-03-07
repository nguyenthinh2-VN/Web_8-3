import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';
import config from '../data/config.json';

const EMOJIS = ['💕', '🌹', '🧸'];
// Tạo 6 thẻ (3 cặp), shuffle
const createCards = () => {
  const cards = [...EMOJIS, ...EMOJIS].map((emoji, i) => ({
    id: i,
    emoji,
    flipped: false,
    matched: false,
  }));
  // Fisher-Yates shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
};

const MemoryMatch = () => {
  const [cards, setCards] = useState(createCards);
  const [selected, setSelected] = useState([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const [checking, setChecking] = useState(false);

  const handleFlip = useCallback((id) => {
    if (checking || won) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.flipped || card.matched) return;

    const newCards = cards.map((c) => c.id === id ? { ...c, flipped: true } : c);
    setCards(newCards);

    const newSelected = [...selected, id];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      setMoves((m) => m + 1);
      setChecking(true);
      const [a, b] = newSelected;
      const cardA = newCards.find((c) => c.id === a);
      const cardB = newCards.find((c) => c.id === b);

      if (cardA.emoji === cardB.emoji) {
        // Match!
        setTimeout(() => {
          setCards((prev) => prev.map((c) =>
            c.id === a || c.id === b ? { ...c, matched: true } : c
          ));
          setSelected([]);
          setChecking(false);
        }, 500);
      } else {
        // No match – flip back
        setTimeout(() => {
          setCards((prev) => prev.map((c) =>
            c.id === a || c.id === b ? { ...c, flipped: false } : c
          ));
          setSelected([]);
          setChecking(false);
        }, 800);
      }
    }
  }, [cards, selected, checking, won]);

  // Check win
  useEffect(() => {
    if (cards.length > 0 && cards.every((c) => c.matched)) {
      setTimeout(() => {
        setWon(true);
        confetti({ particleCount: 120, spread: 360, startVelocity: 25, origin: { y: 0.5 }, zIndex: 100 });
      }, 600);
    }
  }, [cards]);

  const resetGame = () => {
    setCards(createCards());
    setSelected([]);
    setMoves(0);
    setWon(false);
    setChecking(false);
  };

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-[#1a0e14] to-[var(--color-bg)] relative overflow-hidden">
      <div className="max-w-md mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="text-center mb-10">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-sm tracking-[0.3em] uppercase text-white/40 font-light mb-3">
            Trò chơi nhỏ
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[var(--color-primary-light)]"
            style={{ fontFamily: 'var(--font-script)' }}>
            Lật thẻ tìm cặp 💌
          </motion.h2>
          <p className="text-white/30 text-sm mt-3 font-light">Tìm 3 cặp giống nhau để mở quà!</p>
        </div>

        {/* Card Grid – 3x2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          {cards.map((card) => (
            <motion.div
              key={card.id}
              onClick={() => handleFlip(card.id)}
              className="aspect-square cursor-pointer"
              style={{ perspective: '600px' }}
            >
              <motion.div
                animate={{ rotateY: card.flipped || card.matched ? 180 : 0 }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-full"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Back (hidden side – mặt úp) */}
                <div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center shadow-lg border-2 border-white/10"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <span className="text-3xl">❓</span>
                </div>

                {/* Front (emoji side – mặt ngửa) */}
                <div
                  className={`absolute inset-0 rounded-2xl flex items-center justify-center shadow-lg border-2 transition-colors duration-300 ${
                    card.matched
                      ? 'bg-green-50 border-green-300'
                      : 'bg-white border-[var(--color-primary-light)]/30'
                  }`}
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <span className="text-4xl md:text-5xl">{card.emoji}</span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Moves counter */}
        <p className="text-center text-white/30 text-sm font-light mb-6">
          Số lần lật: {moves}
        </p>

        {/* Win State */}
        <AnimatePresence>
          {won && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-white rounded-3xl p-8 md:p-10 text-center shadow-2xl border border-[var(--color-primary-light)]/20"
            >
              {/* Bear SVG */}
              <motion.svg
                width="80" height="80" viewBox="0 0 100 100" fill="none"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="mx-auto mb-5"
              >
                <circle cx="25" cy="25" r="13" fill="#C19A6B" />
                <circle cx="25" cy="25" r="6" fill="#E6C280" />
                <circle cx="75" cy="25" r="13" fill="#C19A6B" />
                <circle cx="75" cy="25" r="6" fill="#E6C280" />
                <circle cx="50" cy="50" r="33" fill="#C19A6B" />
                <circle cx="50" cy="62" r="13" fill="#E6C280" />
                <circle cx="50" cy="57" r="3.5" fill="#3D2B1F" />
                <path d="M 46 66 Q 50 70 54 66" stroke="#3D2B1F" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <circle cx="36" cy="45" r="3.5" fill="#3D2B1F" />
                <circle cx="64" cy="45" r="3.5" fill="#3D2B1F" />
                <circle cx="29" cy="55" r="5" fill="#FFB6C1" opacity="0.5" />
                <circle cx="71" cy="55" r="5" fill="#FFB6C1" opacity="0.5" />
              </motion.svg>

              <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-primary)] mb-3"
                style={{ fontFamily: 'var(--font-script)' }}>
                {config.surpriseConfig.messageTitle}
              </h3>
              <p className="text-[var(--color-text-soft)] font-light leading-relaxed mb-6">
                {config.surpriseConfig.messageBody}
              </p>
              <p className="text-sm text-[var(--color-text-soft)]/60 font-light">
                Hoàn thành sau {moves} lần lật 🎉
              </p>
              <button
                onClick={resetGame}
                className="mt-5 px-6 py-2 rounded-full bg-[var(--color-primary-light)]/20 text-[var(--color-primary)] text-sm font-medium hover:bg-[var(--color-primary-light)]/30 transition-colors"
              >
                Chơi lại
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MemoryMatch;
