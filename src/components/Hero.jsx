import { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import config from '../data/config.json';

const Hero = () => {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 600], [1, 1.15]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const textY = useTransform(scrollY, [0, 400], [0, 60]);

  // Tự động tính số ngày từ startDate đến hôm nay
  const heroTitle = useMemo(() => {
    const start = new Date(config.startDate);
    const today = new Date();
    const days = Math.floor((today - start) / (1000 * 60 * 60 * 24));
    return config.heroConfig.title.replace('{days}', days);
  }, []);

  return (
    <section className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Slow Zoom */}
      <motion.div style={{ scale }} className="absolute inset-0 z-0">
        <img
          src={config.heroConfig.image}
          alt="Hero"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Overlay: gradient từ dưới lên và viền tối nhẹ */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
      <div className="absolute inset-0 z-[1]" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)' }} />

      {/* Content */}
      <motion.div
        style={{ opacity, y: textY }}
        className="relative z-10 text-center text-white px-6 flex flex-col items-center gap-5 max-w-2xl"
      >
        {/* Small tag */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xs md:text-sm tracking-[0.35em] uppercase text-white/70 font-light"
        >
          Câu chuyện của chúng mình
        </motion.span>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-[3rem] leading-[1.1] md:text-[5rem] md:leading-[1.05] font-bold tracking-tight"
          style={{ fontFamily: 'var(--font-script)' }}
        >
          <span className="text-white">{heroTitle}</span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-16 h-[2px] bg-white/50 origin-center"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="text-base md:text-xl font-light text-white/80 max-w-md leading-relaxed"
        >
          {config.heroConfig.subtitle}
        </motion.p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-8 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-white/50 font-light">
          Cuộn xuống
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
