import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LoveLetter = () => {
  const fullText =
    'Gửi em, cô gái bé nhỏ của anh...\n\nAnh chỉ muốn viết vài dòng ngắn gọn để nói rằng: Cảm ơn em vì đã đến và làm cho mỗi ngày của anh trở nên đặc biệt hơn.\n\nCảm ơn những nụ cười, sự quan tâm và tình yêu em dành cho anh.\n\nChúc em một ngày 8/3 thật vui vẻ, luôn xinh đẹp và hạnh phúc nhé.\n\nAnh yêu em! ❤️';
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText.charAt(index));
        setIndex((prev) => prev + 1);
      }, 40);
      return () => clearTimeout(timeout);
    }
  }, [index, fullText]);

  const isComplete = index >= fullText.length;

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden border border-[var(--color-primary-light)]/40"
      >
        {/* Top decorative line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-primary-light)] to-transparent" />

        <h3
          className="text-3xl md:text-4xl text-[var(--color-primary)] mb-8 text-center"
          style={{ fontFamily: 'var(--font-script)' }}
        >
          Nhật ký tình yêu
        </h3>

        <p className="text-[var(--color-text)] leading-[2] text-base md:text-lg whitespace-pre-line font-light">
          {displayedText}
          {!isComplete && <span className="inline-block w-[2px] h-5 bg-[var(--color-primary)] ml-[2px] animate-pulse align-middle" />}
        </p>

        {/* Chữ ký */}
        {isComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="mt-12 text-right"
          >
            <p className="text-[var(--color-text-soft)] font-light text-sm mb-1">Người Yêu Em,</p>
            <p
              className="text-3xl text-[var(--color-primary)]"
              style={{ fontFamily: 'var(--font-script)' }}
            >
              Anh ❤️
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default LoveLetter;
