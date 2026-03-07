import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import memories from '../data/memories.json';
import 'swiper/css';
import 'swiper/css/pagination';

const Timeline = () => {
  return (
    <section className="py-20 md:py-28 bg-[var(--color-cream)] relative overflow-hidden">
      {/* Blobs */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-[var(--color-primary-light)] opacity-20 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-[var(--color-accent)] opacity-15 blur-[80px] rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10 px-6">
        {/* Title */}
        <div className="text-center mb-12 md:mb-16">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-sm tracking-[0.3em] uppercase text-[var(--color-text-soft)] font-light mb-3">
            Kỷ niệm
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-bold text-[var(--color-primary)]" style={{ fontFamily: 'var(--font-script)' }}>
            Hành trình của chúng mình
          </motion.h2>
        </div>

        {/* Swiper Carousel – NO navigation arrows */}
        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={24}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={false}
          grabCursor
          className="timeline-swiper !pb-14"
        >
          {memories.map((item, index) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex flex-col md:flex-row md:h-[420px]">
                {/* Image */}
                <div className="w-full md:w-1/2 h-[250px] md:h-full overflow-hidden relative flex-shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" loading="lazy" draggable={false} />
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-sm font-bold text-[var(--color-primary)] shadow-sm">
                    {index + 1}
                  </div>
                </div>
                {/* Text */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <span className="text-xs tracking-[0.2em] uppercase text-[var(--color-accent)] font-medium mb-3">Kỷ niệm #{index + 1}</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-4" style={{ fontFamily: 'var(--font-script)' }}>{item.title}</h3>
                  <p className="text-[var(--color-text-soft)] font-light leading-relaxed">{item.text}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Swiper styles */}
      <style>{`
        .timeline-swiper .swiper-pagination-bullet {
          background: var(--color-primary-light);
          opacity: 1; width: 10px; height: 10px;
        }
        .timeline-swiper .swiper-pagination-bullet-active {
          background: var(--color-primary);
          width: 28px; border-radius: 6px;
        }
      `}</style>
    </section>
  );
};

export default Timeline;
