import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import config from '../data/config.json';

const LoveCounter = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const targetDays = useRef(0);

  useEffect(() => {
    const start = new Date(config.startDate);
    const now = new Date();
    const diff = now.getTime() - start.getTime();
    targetDays.current = Math.floor(diff / (1000 * 3600 * 24));
    setHours(now.getHours());
    setMinutes(now.getMinutes());
  }, []);

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const target = targetDays.current;
    const step = Math.ceil(target / 80);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setDays(target);
        clearInterval(timer);
      } else {
        setDays(current);
      }
    }, 25);
    return () => clearInterval(timer);
  }, [isInView]);

  const counterBlocks = [
    { value: days, label: 'Ngày' },
    { value: hours, label: 'Giờ' },
    { value: minutes, label: 'Phút' },
  ];

  return (
    <section ref={ref} className="section-padding gradient-romantic relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-[var(--color-primary-light)] opacity-30 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[var(--color-accent)] opacity-20 blur-3xl" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm tracking-[0.3em] uppercase text-[var(--color-text-soft)] font-light mb-3"
        >
          Tính từ ngày yêu nhau
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-12"
          style={{ fontFamily: 'var(--font-script)' }}
        >
          Chúng ta đã bên nhau
        </motion.h2>

        {/* Counter Blocks */}
        <div className="flex items-center justify-center gap-4 md:gap-8">
          {counterBlocks.map((block, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 glass rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-3xl md:text-5xl font-bold text-[var(--color-primary)]">
                  {block.value}
                </span>
              </div>
              <span className="mt-3 text-xs md:text-sm text-[var(--color-text-soft)] tracking-widest uppercase font-light">
                {block.label}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-10 text-lg md:text-xl text-[var(--color-text-soft)] font-light"
        >
          ...và vẫn đang đếm tiếp ❤️
        </motion.p>
      </div>
    </section>
  );
};

export default LoveCounter;
