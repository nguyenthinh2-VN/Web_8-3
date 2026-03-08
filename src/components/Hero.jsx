import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, animate } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import config from '../data/config.json';

const SLIDE_DURATION = 5000;
const SWIPE_THRESHOLD = 50;

/* Animation từng ký tự */
const AnimatedTitle = ({ text }) => {
  const chars = text.split('');
  return (
    <motion.span className="inline-flex flex-wrap justify-center">
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30, rotateX: -40 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.8 + i * 0.04,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const textY = useTransform(scrollY, [0, 400], [0, 60]);

  const images = config.heroConfig.images;
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);
  const dragX = useMotionValue(0);

  const heroTitle = useMemo(() => {
    const start = new Date(config.startDate);
    const today = new Date();
    const days = Math.floor((today - start) / (1000 * 60 * 60 * 24));
    return config.heroConfig.title.replace('{days}', days);
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, SLIDE_DURATION);
  }, [images.length]);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    if (offset < -SWIPE_THRESHOLD) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      resetTimer();
    } else if (offset > SWIPE_THRESHOLD) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      resetTimer();
    }
    animate(dragX, 0, { duration: 0.3 });
  };

  return (
    <section className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      {images.map((src, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={{ opacity: i === currentIndex ? 1 : 0, scale: i === currentIndex ? 1 : 1.1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="absolute inset-0 z-0"
        >
          <img src={src} alt={`Slide ${i + 1}`} className="w-full h-full object-cover object-center" draggable={false} loading="lazy" />
        </motion.div>
      ))}

      {/* Drag layer */}
      <motion.div
        className="absolute inset-0 z-[2] cursor-grab active:cursor-grabbing touch-pan-y"
        drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.15}
        style={{ x: dragX }} onDragEnd={handleDragEnd}
      />

      {/* Overlay */}
      <div className="absolute inset-0 z-[3] bg-gradient-to-t from-black/70 via-black/30 to-black/10 pointer-events-none" />
      <div className="absolute inset-0 z-[3] pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)' }} />

      {/* Content */}
      <motion.div style={{ opacity, y: textY }} className="relative z-10 text-center text-white px-6 flex flex-col items-center gap-5 max-w-2xl pointer-events-none">
        <motion.span
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1, delay: 0.3 }}
          className="text-xs md:text-sm tracking-[0.35em] uppercase text-white/70 font-light"
        >
          Câu chuyện của chúng mình
        </motion.span>

        {/* Animated Title – từng chữ */}
        <h1 className="text-[3rem] leading-[1.1] md:text-[5rem] md:leading-[1.05] font-bold tracking-tight" style={{ fontFamily: 'var(--font-script)' }}>
          <AnimatedTitle text={heroTitle} />
        </h1>

        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.8 }} className="w-16 h-[2px] bg-white/50 origin-center" />

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.6 }} className="text-base md:text-xl font-light text-white/80 max-w-md leading-relaxed">
          {config.heroConfig.subtitle}
        </motion.p>
      </motion.div>

      {/* Slide Indicators */}
      <div className="absolute bottom-24 z-10 flex gap-2">
        {images.map((_, i) => (
          <button key={i} onClick={() => { setCurrentIndex(i); resetTimer(); }}
            className={`h-[3px] rounded-full transition-all duration-500 ${i === currentIndex ? 'w-8 bg-white' : 'w-4 bg-white/40 hover:bg-white/60'}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} style={{ opacity }} className="absolute bottom-8 z-10 flex flex-col items-center gap-2">
        <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-white/50 font-light">Cuộn xuống</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}>
          <ChevronDown size={20} className="text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
