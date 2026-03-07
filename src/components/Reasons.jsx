import { motion } from 'framer-motion';
import { Sparkles, Heart, Sun } from 'lucide-react';

const reasons = [
  {
    id: 1,
    title: 'Nụ cười của em',
    text: 'Mỗi lần em cười, dường như mọi mệt mỏi trong anh đều tan biến. Nụ cười ấy là ánh dương rực rỡ nhất.',
    icon: Sun,
    gradient: 'from-orange-100 to-pink-100',
  },
  {
    id: 2,
    title: 'Sự ấm áp',
    text: 'Những cái ôm, những lời hỏi han ân cần của em làm anh cảm thấy thực sự bình yên và yêu đời hơn.',
    icon: Heart,
    gradient: 'from-pink-100 to-rose-100',
  },
  {
    id: 3,
    title: 'Gia vị cuộc sống',
    text: 'Bên em, cuộc sống tẻ nhạt của anh bỗng có thêm muôn vàn màu sắc thú vị và những kỷ niệm khó quên.',
    icon: Sparkles,
    gradient: 'from-purple-100 to-pink-100',
  },
];

const Reasons = () => {
  return (
    <section className="section-padding bg-[var(--color-bg)] relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Title */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm tracking-[0.3em] uppercase text-[var(--color-text-soft)] font-light mb-3"
          >
            Lý do
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-[var(--color-primary)]"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            Và cứ thế... anh yêu em ❤️
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: idx * 0.15, type: 'spring', stiffness: 80 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className={`rounded-3xl p-8 bg-gradient-to-br ${item.gradient} border border-white/60 shadow-sm hover:shadow-xl transition-shadow cursor-default`}
              >
                <div className="w-14 h-14 rounded-2xl bg-white/70 flex items-center justify-center mb-6 shadow-sm">
                  <Icon className="w-7 h-7 text-[var(--color-primary)]" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--color-text)] mb-3">{item.title}</h3>
                <p className="text-[var(--color-text-soft)] font-light leading-relaxed text-sm">{item.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Reasons;
