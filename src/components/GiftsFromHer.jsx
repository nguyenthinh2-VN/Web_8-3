import { motion } from 'framer-motion';
import { Heart, Gift } from 'lucide-react';
import gifts from '../data/gifts.json';

const GiftsFromHer = () => {
  return (
    <section className="relative overflow-hidden">
      {/* ===== PART 1: Những món quà em tặng anh – Tags style ===== */}
      <div className="py-20 md:py-28 bg-[var(--color-cream)]">
        <div className="max-w-3xl mx-auto relative z-10 px-6">
          {/* Title */}
          <div className="text-center mb-12 md:mb-16">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-sm tracking-[0.3em] uppercase text-[var(--color-text-soft)] font-light mb-3">
              Trân trọng
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-[var(--color-primary)]"
              style={{ fontFamily: 'var(--font-script)' }}>
              Những món quà em tặng anh 🎀
            </motion.h2>
          </div>

          {/* Gift Tags – flex wrap */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {gifts.map((gift, i) => (
              <motion.div
                key={gift.id}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="flex items-center gap-2 px-5 py-3 bg-white rounded-full shadow-md border border-[var(--color-primary-light)]/30 cursor-default"
              >
                <Gift size={16} className="text-[var(--color-primary)] flex-shrink-0" />
                <span className="text-[var(--color-text)] font-medium text-sm md:text-base whitespace-nowrap">
                  {gift.title}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== PART 2: "Nhưng anh lại rất ít tặng em..." – Emotional Bridge ===== */}
      <div className="py-24 md:py-32 bg-gradient-to-b from-[var(--color-cream)] via-[#1a0e14] to-[#1a0e14] relative">
        <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
          {/* Dòng 1 */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="text-2xl md:text-4xl text-white/90 leading-relaxed mb-6"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            Nhưng anh lại rất ít tặng em...
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-16 h-[2px] bg-[var(--color-primary)] mx-auto origin-center mb-6"
          />

          {/* Dòng 2 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-base md:text-lg text-white/50 font-light leading-relaxed mb-10"
          >
            Anh biết anh chưa giỏi thể hiện, chưa lãng mạn, chưa tặng em nhiều món quà xứng đáng...
            <br />Nhưng hãy tin rằng —
          </motion.p>

          {/* Dòng 3: highlight */}
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 1.2 }}
            className="text-3xl md:text-5xl font-bold text-[var(--color-primary-light)]"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            Trái tim anh là món quà lớn nhất
            <br />dành cho em ❤️
          </motion.p>

          {/* Floating heart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.8 }}
            className="mt-10 flex justify-center"
          >
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}>
              <Heart className="w-8 h-8 text-[var(--color-primary)]" fill="var(--color-primary)" />
            </motion.div>
          </motion.div>
        </div>

        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[var(--color-primary)] opacity-5 blur-[100px]" />
      </div>
    </section>
  );
};

export default GiftsFromHer;
