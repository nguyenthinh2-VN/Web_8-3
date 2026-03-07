import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import album from '../data/album.json';

const Gallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const previewCount = 4;
  const remaining = album.length - previewCount;

  return (
    <section className="section-padding bg-[var(--color-cream)]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm tracking-[0.3em] uppercase text-[var(--color-text-soft)] font-light mb-3"
          >
            Khoảnh khắc
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-[var(--color-primary)]"
            style={{ fontFamily: 'var(--font-script)' }}
          >
            Album Kỷ Niệm
          </motion.h2>
        </div>

        {/* Grid Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-3 md:gap-4 cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          {/* Ảnh 1 */}
          <div className="aspect-square rounded-2xl overflow-hidden relative group">
            <img src={album[0]} alt="Gallery 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" referrerPolicy="no-referrer" />
          </div>

          {/* Ảnh 2 */}
          {album.length > 1 && (
            <div className="aspect-square rounded-2xl overflow-hidden relative group">
              <img src={album[1]} alt="Gallery 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" referrerPolicy="no-referrer" />
            </div>
          )}

          {/* Ảnh 3 */}
          {album.length > 2 && (
            <div className="aspect-square rounded-2xl overflow-hidden relative group">
              <img src={album[2]} alt="Gallery 3" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" referrerPolicy="no-referrer" />
            </div>
          )}

          {/* Ảnh 4 + overlay "+N" */}
          {album.length > 3 && (
            <div className="aspect-square rounded-2xl overflow-hidden relative group">
              <img src={album[3]} alt="Gallery 4" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" referrerPolicy="no-referrer" />
              {remaining > 0 && (
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  <div className="text-center text-white">
                    <span className="text-4xl md:text-6xl font-light">+{remaining}</span>
                    <p className="text-sm mt-1 text-white/70 font-light">Xem tất cả</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col p-4 md:p-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white/80 text-lg font-light">{album.length} ảnh</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="columns-2 md:columns-3 gap-3 space-y-3">
                {album.map((imgSrc, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className="break-inside-avoid rounded-xl overflow-hidden"
                  >
                    <img src={imgSrc} className="w-full object-cover" alt={`Album ${index + 1}`} loading="lazy" referrerPolicy="no-referrer" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
