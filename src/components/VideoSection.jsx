import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const VideoSection = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.4 });

  useEffect(() => {
    if (!videoRef.current) return;
    if (isInView) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[85vh] md:h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/VID_ConHem.mp4"
        muted
        loop
        playsInline
        preload="none"
        poster="/images/hero_namTay_2.jpg"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center text-white px-6 max-w-3xl mx-auto flex flex-col items-center gap-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-xs md:text-sm tracking-[0.35em] uppercase text-white/60 font-light"
        >
          Khoảnh khắc đẹp nhất
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
          style={{ fontFamily: 'var(--font-script)' }}
        >
          Mỗi giây phút bên em<br />
          <span className="text-[var(--color-primary-light)]">đều là mãi mãi</span>
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-16 h-[2px] bg-white/40 origin-center"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base md:text-lg text-white/70 font-light leading-relaxed max-w-lg"
        >
          Dù thời gian có trôi qua bao lâu, anh vẫn luôn trân trọng từng khoảnh khắc nhỏ bé bên em.
        </motion.p>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-bg)] to-transparent z-20" />
    </section>
  );
};

export default VideoSection;
