import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import memories from '../data/memories.json';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Timeline = () => {
  const carouselRef = useRef(null);
  const [dragWidth, setDragWidth] = useState(0);

  // Tính khoảng kéo tối đa = tổng width nội dung - width container
  useEffect(() => {
    if (carouselRef.current) {
      const scrollW = carouselRef.current.scrollWidth;
      const clientW = carouselRef.current.offsetWidth;
      setDragWidth(scrollW - clientW);
    }
  }, []);

  return (
    <section className="py-20 md:py-28 bg-[var(--color-cream)] relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-[var(--color-primary-light)] opacity-20 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-[var(--color-accent)] opacity-15 blur-[80px] rounded-full" />

      <div className="relative z-10">
        {/* Title */}
        <div className="text-center mb-12 md:mb-16 px-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm tracking-[0.3em] uppercase text-[var(--color-text-soft)] font-light mb-3"
          >
            Kỷ niệm
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-[var(--color-primary)]"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            Hành trình của chúng mình
          </motion.h2>
          <p className="mt-4 text-[var(--color-text-soft)] font-light text-sm">
            ← Kéo sang ngang để xem →
          </p>
        </div>

        {/* Framer Motion Drag Carousel */}
        <motion.div
          ref={carouselRef}
          className="cursor-grab active:cursor-grabbing overflow-hidden px-6"
        >
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -dragWidth }}
            dragElastic={0.1}
            className="flex gap-6"
          >
            {memories.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-shrink-0 w-[80vw] sm:w-[60vw] md:w-[380px]"
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-500 h-full flex flex-col border border-gray-100">
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover pointer-events-none"
                      draggable={false}
                    />
                    {/* Index badge */}
                    <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-sm font-bold text-[var(--color-primary)] shadow-sm">
                      {index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-xs tracking-[0.2em] uppercase text-[var(--color-accent)] font-medium mb-2">
                      Kỷ niệm #{index + 1}
                    </span>
                    <h3 className="text-xl font-semibold text-[var(--color-text)] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-[var(--color-text-soft)] font-light leading-relaxed text-sm flex-1">
                      {item.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Decorative timeline line + dots dưới carousel */}
        <div className="relative max-w-5xl mx-auto mt-10 px-6">
          <div className="h-[2px] bg-[var(--color-primary-light)] rounded-full relative">
            {memories.map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[var(--color-primary)] border-2 border-white shadow-sm"
                style={{ left: `${(i / (memories.length - 1)) * 100}%`, transform: 'translate(-50%, -50%)' }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
