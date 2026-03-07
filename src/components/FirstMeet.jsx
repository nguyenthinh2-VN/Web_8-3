import { motion } from 'framer-motion';
import config from '../data/config.json';

const FirstMeet = () => {
  return (
    <section className="section-padding overflow-hidden bg-[var(--color-bg)]">
      <div className="max-w-6xl mx-auto">
        {/* Section Label */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm tracking-[0.3em] uppercase text-[var(--color-text-soft)] font-light mb-3"
          >
            Nơi bắt đầu
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-[var(--color-primary)]"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            {config.firstMeetConfig.title}
          </motion.h2>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Image – chiếm 7 cột trên desktop */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="md:col-span-7 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] md:aspect-[3/4]">
              <img
                src={config.firstMeetConfig.image}
                alt="Ngày đầu gặp mặt"
                className="w-full h-full object-cover"
              />
              {/* Decorative border */}
              <div className="absolute inset-3 rounded-2xl border border-white/30 pointer-events-none" />
            </div>
            {/* Floating accent square */}
            <div className="hidden md:block absolute -bottom-6 -right-6 w-32 h-32 bg-[var(--color-primary-light)] rounded-2xl -z-10" />
          </motion.div>

          {/* Text – chiếm 5 cột trên desktop */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="md:col-span-5 flex flex-col gap-6"
          >
            <div className="w-12 h-[3px] bg-[var(--color-primary)] rounded-full" />
            <p className="text-lg md:text-xl text-[var(--color-text-soft)] leading-relaxed font-light">
              {config.firstMeetConfig.description}
            </p>
            <p className="text-sm text-[var(--color-accent)] font-light italic">
              — Khoảnh khắc ấy, anh biết đời mình đã khác.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FirstMeet;
