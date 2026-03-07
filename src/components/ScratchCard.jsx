import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';
import config from '../data/config.json';

const SCRATCH_THRESHOLD = 55; // % cào để mở

const ScratchCard = () => {
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const isDrawing = useRef(false);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Vẽ lớp phủ gradient hồng
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#e8457c');
    gradient.addColorStop(1, '#f9a8c9');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Text hướng dẫn
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.font = `bold ${Math.min(canvas.width * 0.06, 24)}px 'Poppins', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ Cào tại đây để mở quà ✨', canvas.width / 2, canvas.height / 2);

    // Thêm sparkle dots
    for (let i = 0; i < 30; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 3 + 1, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.4 + 0.1})`;
      ctx.fill();
    }
  }, [isRevealed]);

  const scratch = (x, y) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    // Tính % đã cào
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) transparent++;
    }
    const pct = Math.round((transparent / (imageData.data.length / 4)) * 100);
    setScratchPercent(pct);

    if (pct >= SCRATCH_THRESHOLD && !hasTriggered.current) {
      hasTriggered.current = true;
      // Confetti
      confetti({ particleCount: 100, spread: 360, startVelocity: 25, origin: { y: 0.6 }, zIndex: 100 });
      setTimeout(() => setIsRevealed(true), 400);
    }
  };

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches ? e.touches[0] : e;
    return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
  };

  const handleStart = () => { isDrawing.current = true; };
  const handleEnd = () => { isDrawing.current = false; };
  const handleMove = (e) => {
    if (!isDrawing.current) return;
    e.preventDefault();
    const pos = getPos(e, canvasRef.current);
    scratch(pos.x, pos.y);
  };

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-[#1a0e14] to-[var(--color-bg)] relative overflow-hidden">
      <div className="max-w-lg mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="text-center mb-10">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-sm tracking-[0.3em] uppercase text-white/40 font-light mb-3">
            Bất ngờ
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-[var(--color-primary-light)]"
            style={{ fontFamily: 'var(--font-script)' }}>
            Cào thẻ may mắn 🎁
          </motion.h2>
        </div>

        {/* Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[var(--color-primary-light)]/20 bg-white"
          style={{ aspectRatio: '3/4' }}
        >
          {/* Hidden content underneath */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-white">
            {/* Bear SVG */}
            <motion.svg
              width="100" height="100" viewBox="0 0 100 100" fill="none"
              animate={isRevealed ? { y: [0, -6, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="mb-6 overflow-visible"
            >
              <circle cx="25" cy="25" r="13" fill="#C19A6B" />
              <circle cx="25" cy="25" r="6" fill="#E6C280" />
              <circle cx="75" cy="25" r="13" fill="#C19A6B" />
              <circle cx="75" cy="25" r="6" fill="#E6C280" />
              <circle cx="50" cy="50" r="33" fill="#C19A6B" />
              <circle cx="50" cy="62" r="13" fill="#E6C280" />
              <circle cx="50" cy="57" r="3.5" fill="#3D2B1F" />
              <path d="M 50 60 L 50 66" stroke="#3D2B1F" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M 46 66 Q 50 70 54 66" stroke="#3D2B1F" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <circle cx="36" cy="45" r="3.5" fill="#3D2B1F" />
              <circle cx="64" cy="45" r="3.5" fill="#3D2B1F" />
              <circle cx="29" cy="55" r="5" fill="#FFB6C1" opacity="0.5" />
              <circle cx="71" cy="55" r="5" fill="#FFB6C1" opacity="0.5" />
              <motion.g animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 0.7, repeat: Infinity }} style={{ transformOrigin: '50px 85px' }}>
                <path d="M50 100 C 50 100,20 75,20 60 A 15 15 0 0 1 50 45 A 15 15 0 0 1 80 60 C 80 75,50 100,50 100 Z" fill="var(--color-primary)" />
              </motion.g>
              <ellipse cx="30" cy="70" rx="7" ry="11" fill="#BA8D5D" transform="rotate(-30 30 70)" />
              <ellipse cx="70" cy="70" rx="7" ry="11" fill="#BA8D5D" transform="rotate(30 70 70)" />
            </motion.svg>

            <h3 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-4 text-center"
              style={{ fontFamily: 'var(--font-script)' }}>
              {config.surpriseConfig.messageTitle}
            </h3>
            <p className="text-[var(--color-text-soft)] text-center font-light leading-relaxed text-base">
              {config.surpriseConfig.messageBody}
            </p>
          </div>

          {/* Scratch Canvas – overlay on top */}
          {!isRevealed && (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full z-10 cursor-pointer touch-none"
              onMouseDown={handleStart}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
              onMouseMove={handleMove}
              onTouchStart={handleStart}
              onTouchEnd={handleEnd}
              onTouchMove={handleMove}
            />
          )}
        </motion.div>

        {/* Progress hint */}
        {!isRevealed && scratchPercent > 0 && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-white/30 text-sm mt-4 font-light">
            Đã cào {scratchPercent}% — tiếp tục nào! 🎉
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default ScratchCard;
