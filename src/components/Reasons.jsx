import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import reasons from '../data/reasons.json';
import 'swiper/css';
import 'swiper/css/pagination';

const MediaCard = ({ item }) => (
  <div className="relative h-[450px] md:h-[500px] rounded-3xl overflow-hidden shadow-lg group">
    {/* Media */}
    {item.mediaType === 'video' ? (
      <video src={item.media} className="w-full h-full object-cover" muted loop playsInline autoPlay />
    ) : (
      <img src={item.media} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" draggable={false} />
    )}

    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

    {/* Text content */}
    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-script)' }}>
        {item.title}
      </h3>
      <p className="text-white/80 font-light text-sm md:text-base leading-relaxed">
        {item.text}
      </p>
    </div>
  </div>
);

const Reasons = () => {
  return (
    <section className="py-20 md:py-28 bg-[var(--color-bg)] relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10 px-6">
        {/* Title */}
        <div className="text-center mb-12 md:mb-16">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-sm tracking-[0.3em] uppercase text-[var(--color-text-soft)] font-light mb-3">
            Lý do
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-bold text-[var(--color-primary)]" style={{ fontFamily: 'var(--font-script)' }}>
            Và cứ thế... anh yêu em ❤️
          </motion.h2>
        </div>

        {/* Swiper – NO loop, NO navigation */}
        <Swiper
          modules={[Pagination]}
          slidesPerView={1.15}
          spaceBetween={16}
          centeredSlides
          pagination={{ clickable: true }}
          grabCursor
          loop={false}
          breakpoints={{
            640: { slidesPerView: 1.5, spaceBetween: 20 },
            1024: { slidesPerView: 2.3, spaceBetween: 28, centeredSlides: false },
          }}
          className="reasons-swiper !pb-14"
        >
          {reasons.map((item) => (
            <SwiperSlide key={item.id}>
              <MediaCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        .reasons-swiper .swiper-pagination-bullet {
          background: var(--color-primary-light); opacity: 1;
          width: 10px; height: 10px;
        }
        .reasons-swiper .swiper-pagination-bullet-active {
          background: var(--color-primary);
          width: 28px; border-radius: 6px;
        }
      `}</style>
    </section>
  );
};

export default Reasons;
