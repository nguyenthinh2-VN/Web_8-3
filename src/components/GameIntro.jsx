import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Delete, CheckCircle2, ChevronRight, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import config from '../data/config.json';
import questions from '../data/questions.json';
import { playTap, playInput, playDelete, playError, playCorrect, playSealBreak, playVictory, playType, playNext } from '../utils/sounds';

const PROLOGUE = [
  { text: 'Trong hàng triệu người trên thế giới này...', font: 'dancing' },
  { text: 'Em đã tìm thấy anh.', font: 'dancing' },
  { text: 'Không phải ngẫu nhiên, mà là định mệnh.', font: 'poppins' },
  { text: 'Từng ngày trôi qua, yêu thêm một chút...', font: 'poppins' },
];

const NARRATIVES = [
  ['Nhưng trước khi bước vào câu chuyện...', 'Trái tim này đang bị phong ấn.', 'Hãy chứng minh rằng em nhớ mọi thứ...', '🔒 Ải 1: Chương đầu tiên'],
  ['Một mảnh phong ấn đã vỡ!', 'Nhưng hành trình chưa dừng lại.', '🔒 Ải 2: Ký ức sâu hơn'],
  ['Gần lắm rồi...', 'Còn mảnh phong ấn cuối cùng.', '🔒 Ải cuối: Giải phóng trái tim'],
];

const KEYS = ['1','2','3','4','5','6','7','8','9','⌫','0','✓'];

// ─── FLOATING HEARTS ────────────────────────────────────
const FloatingHeart = ({ delay }) => (
  <motion.span
    initial={{ opacity: 0, y: '110vh' }}
    animate={{ opacity: [0, 0.4, 0], y: '-10vh' }}
    transition={{ duration: Math.random() * 8 + 7, delay, repeat: Infinity, ease: 'linear' }}
    className="fixed pointer-events-none select-none text-[var(--color-primary)]"
    style={{ fontSize: `${Math.random() * 12 + 8}px`, left: `${Math.random() * 100}%` }}
  >♥</motion.span>
);

// ─── TYPEWRITER ─────────────────────────────────────────
const TypewriterLine = ({ text, font, onDone }) => {
  const [ci, setCi] = useState(0);
  useEffect(() => {
    if (ci < text.length) { const t = setTimeout(() => { playType(); setCi(c => c + 1); }, 38); return () => clearTimeout(t); }
    else { const t = setTimeout(() => onDone?.(), 500); return () => clearTimeout(t); }
  }, [ci, text.length]);

  return (
    <p className={`text-xl md:text-3xl leading-relaxed text-white/90 ${font !== 'dancing' ? 'font-light' : ''}`}
       style={{ fontFamily: font === 'dancing' ? 'var(--font-script)' : 'var(--font-body)' }}>
      {text.slice(0, ci).split('').map((ch, i) => (
        <motion.span key={i} initial={{ opacity: 0, y: 12, filter: 'blur(5px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.2 }}
          className="inline-block" style={{ whiteSpace: ch === ' ' ? 'pre' : 'normal' }}>{ch}</motion.span>
      ))}
      <span className="inline-block w-[2px] h-5 md:h-7 bg-white/50 ml-1 animate-pulse align-middle" />
    </p>
  );
};

// ─── SEALED HEART (REDESIGNED) ──────────────────────────
const SealedHeart = ({ sealsRemaining, hit }) => {
  const totalSeals = questions.length;
  return (
    <div className="relative w-36 h-36 md:w-44 md:h-44 mx-auto mb-5">
      {/* Outer glow pulse */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute inset-[-20px] rounded-full bg-[var(--color-primary)] blur-[50px]"
      />

      {/* Heart container */}
      <motion.div
        animate={hit ? { x: [-10, 10, -7, 7, -3, 3, 0], rotate: [-3, 3, -2, 2, 0] } : { y: [0, -5, 0] }}
        transition={hit ? { duration: 0.5 } : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-full h-full"
      >
        {/* Heart SVG */}
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-2xl overflow-visible">
          <defs>
            <radialGradient id="heartGlow" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#ff8fb4" />
              <stop offset="60%" stopColor="#e8457c" />
              <stop offset="100%" stopColor="#c73566" />
            </radialGradient>
            <filter id="heartShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#e8457c" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Heart shape */}
          <path
            d="M60 100 C60 100,18 72,18 42 A21 21 0 0 1 60 28 A21 21 0 0 1 102 42 C102 72,60 100,60 100Z"
            fill="url(#heartGlow)" filter="url(#heartShadow)"
          />

          {/* Inner highlight */}
          <ellipse cx="45" cy="42" rx="8" ry="10" fill="white" opacity="0.15" transform="rotate(-15 45 42)" />

          {/* Seal rings – orbiting circles */}
          {sealsRemaining >= 1 && (
            <motion.g initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 2 }}>
              <circle cx="60" cy="60" r="52" fill="none" stroke="#94a3b8" strokeWidth="2.5"
                strokeDasharray="8 6" opacity="0.6" />
            </motion.g>
          )}
          {sealsRemaining >= 2 && (
            <motion.g initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 2 }}>
              <circle cx="60" cy="60" r="44" fill="none" stroke="#64748b" strokeWidth="2"
                strokeDasharray="5 8" opacity="0.45" />
            </motion.g>
          )}
          {sealsRemaining >= 3 && (
            <motion.g initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 2 }}>
              <circle cx="60" cy="60" r="36" fill="none" stroke="#475569" strokeWidth="1.5"
                strokeDasharray="3 5" opacity="0.35" />
            </motion.g>
          )}

          {/* Lock icon in center (only when sealed) */}
          {sealsRemaining > 0 && (
            <g opacity="0.8">
              <rect x="53" y="55" width="14" height="11" rx="2" fill="#334155" />
              <path d="M56 55 V51 A4 4 0 0 1 64 51 V55" fill="none" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="60" cy="60" r="1.5" fill="#94a3b8" />
            </g>
          )}
        </svg>

        {/* Hit flash overlay */}
        <AnimatePresence>
          {hit && (
            <motion.div
              initial={{ opacity: 0.8, scale: 0.8 }}
              animate={{ opacity: 0, scale: 1.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 rounded-full bg-red-500/30 blur-md"
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Seal count label */}
      {sealsRemaining > 0 && (
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
          <span className="text-[10px] text-white/30 font-light tracking-wider">
            {sealsRemaining} phong ấn
          </span>
        </div>
      )}
    </div>
  );
};

// ─── HP BAR ─────────────────────────────────────────────
const HPBar = ({ hp, maxHp }) => (
  <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
    className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
    <Heart size={14} fill="#e8457c" className="text-[var(--color-primary)]" />
    <div className="flex gap-1">
      {Array.from({ length: maxHp }).map((_, i) => (
        <motion.div key={i}
          animate={i >= hp ? { scale: [1, 0.5], opacity: [1, 0.2] } : {}}
          className={`w-5 h-2 rounded-full transition-all duration-300 ${
            i < hp ? 'bg-[var(--color-primary)]' : 'bg-white/10'
          }`} />
      ))}
    </div>
    <span className="text-white/40 text-xs ml-1">{hp}/{maxHp}</span>
  </motion.div>
);

// ─── NARRATIVE DIALOGUE ─────────────────────────────────
const NarrativeDialogue = ({ lines, onComplete }) => {
  const [li, setLi] = useState(0);
  const [done, setDone] = useState(false);
  const handleNext = () => {
    if (!done) return;
    playNext();
    if (li < lines.length - 1) { setLi(i => i + 1); setDone(false); }
    else onComplete?.();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-20 flex flex-col items-center justify-end pb-10 md:pb-16 px-5"
      onClick={handleNext}>
      <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="w-full max-w-lg bg-black/50 backdrop-blur-xl rounded-2xl border border-white/10 p-5 md:p-7 cursor-pointer">
        <AnimatePresence mode="wait">
          <motion.div key={li} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
            <TypewriterLine text={lines[li]} font={li === lines.length - 1 ? 'dancing' : 'poppins'}
              onDone={() => setDone(true)} />
          </motion.div>
        </AnimatePresence>
        {done && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex items-center justify-end gap-1 mt-3 text-white/25 text-xs">
            <span>Chạm để tiếp tục</span>
            <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1 }}>
              <ChevronRight size={14} />
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

// ─── QUESTION PANEL (supports numpad / text / yesno) ────
const QuestionPanel = ({ question, onCorrect, onWrong }) => {
  const [input, setInput] = useState('');
  const [shake, setShake] = useState(false);
  const [correct, setCorrect] = useState(false);
  const inputRef = useRef(null);
  const type = question.inputType || 'numpad';

  const checkAnswer = useCallback((val) => {
    const ans = val ?? input;
    if (ans.trim().toLowerCase() === question.answer.toLowerCase()) {
      setCorrect(true);
      playCorrect();
    } else {
      setShake(true);
      playError();
      onWrong?.();
      setTimeout(() => { setShake(false); setInput(''); }, 700);
    }
  }, [input, question, onWrong]);

  // Numpad key handler
  const handleKey = useCallback((key) => {
    if (correct) return;
    if (key === '⌫') { playDelete(); setInput(p => p.slice(0, -1)); }
    else if (key === '✓') { playTap(); checkAnswer(); }
    else if (input.length < question.inputLength) { playInput(); setInput(p => p + key); }
  }, [input, question, correct, checkAnswer]);

  // Yes/No handler
  const handleYesNo = useCallback((val) => {
    if (correct) return;
    setInput(val);
    playTap();
    if (val.toLowerCase() === question.answer.toLowerCase()) {
      setCorrect(true);
    } else {
      setShake(true);
      onWrong?.();
      setTimeout(() => { setShake(false); setInput(''); }, 700);
    }
  }, [question, correct, onWrong]);

  useEffect(() => {
    if (!correct) return;
    const end = Date.now() + 800;
    const interval = setInterval(() => {
      if (Date.now() > end) { clearInterval(interval); return; }
      confetti({ particleCount: 5, angle: 90, spread: 120, startVelocity: 30,
        origin: { x: Math.random(), y: 0.6 }, zIndex: 400,
        shapes: ['circle'], colors: ['#e8457c', '#f9a8c9', '#ff6b9d', '#fff'] });
    }, 80);
    const t = setTimeout(() => onCorrect?.(), 1600);
    return () => { clearInterval(interval); clearTimeout(t); };
  }, [correct, onCorrect]);

  return (
    <motion.div initial={{ scale: 0.85, opacity: 0, y: 40 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: -30 }}
      transition={{ type: 'spring', stiffness: 250, damping: 22 }}
      className="w-full max-w-sm mx-auto">

      {/* Question */}
      <div className="text-center mb-5">
        <p className="text-white text-lg md:text-xl font-medium mb-1" style={{ fontFamily: 'var(--font-script)' }}>
          {question.question}
        </p>
        <p className="text-white/20 text-xs font-light">{question.hint}</p>
      </div>

      {/* ── NUMPAD INPUT ── */}
      {type === 'numpad' && (
        <>
          <motion.div animate={shake ? { x: [-14, 14, -10, 10, -5, 5, 0] } : {}} transition={{ duration: 0.4 }}
            className="flex justify-center gap-1.5 mb-2">
            {Array.from({ length: question.inputLength }).map((_, i) => {
              const filled = i < input.length;
              return (
                <motion.div key={i} animate={filled ? { scale: [0.7, 1.2, 1] } : {}} transition={{ duration: 0.15 }}
                  className={`w-9 h-12 rounded-xl border-2 flex items-center justify-center text-lg font-bold transition-all ${
                    correct ? 'border-green-400 bg-green-400/15 text-green-300' :
                    shake ? 'border-red-500 bg-red-500/15 text-red-300' :
                    filled ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-white' :
                    'border-white/10 bg-white/5 text-white/15'
                  }`}>
                  {filled ? input[i] : ''}
                </motion.div>
              );
            })}
          </motion.div>
          {question.inputLength === 8 && <p className="text-white/15 text-[10px] text-center mb-3">DD / MM / YYYY</p>}

          {!correct && (
            <div className="grid grid-cols-3 gap-2 mt-4">
              {KEYS.map((key) => (
                <motion.button key={key} whileTap={{ scale: 0.88 }} onClick={() => handleKey(key)}
                  className={`h-14 rounded-2xl flex items-center justify-center text-lg font-medium transition-all ${
                    key === '✓' ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/25' :
                    key === '⌫' ? 'bg-white/5 text-white/40' :
                    'bg-white/[0.07] text-white/80 hover:bg-white/[0.12]'
                  }`}>
                  {key === '⌫' ? <Delete size={20} /> : key === '✓' ? <CheckCircle2 size={20} /> : key}
                </motion.button>
              ))}
            </div>
          )}
        </>
      )}

      {/* ── TEXT INPUT ── */}
      {type === 'text' && !correct && (
        <motion.div animate={shake ? { x: [-14, 14, -10, 10, -5, 5, 0] } : {}} transition={{ duration: 0.4 }}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') checkAnswer(); }}
            placeholder="Nhập câu trả lời..."
            autoFocus
            className={`w-full px-5 py-4 rounded-2xl border-2 text-center text-lg font-medium bg-white/5 outline-none transition-all ${
              shake ? 'border-red-500 text-red-300' :
              'border-white/15 text-white focus:border-[var(--color-primary)] placeholder:text-white/20'
            }`}
          />
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => checkAnswer()}
            className="w-full mt-3 h-14 rounded-2xl bg-[var(--color-primary)] text-white font-medium shadow-lg shadow-[var(--color-primary)]/25 flex items-center justify-center gap-2">
            <CheckCircle2 size={20} /> Xác nhận
          </motion.button>
        </motion.div>
      )}

      {/* ── YES/NO ── */}
      {type === 'yesno' && !correct && (
        <motion.div animate={shake ? { x: [-14, 14, -10, 10, -5, 5, 0] } : {}} transition={{ duration: 0.4 }}
          className="flex gap-4 justify-center">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}
            onClick={() => handleYesNo('Có')}
            className="flex-1 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-white text-xl font-bold shadow-lg shadow-[var(--color-primary)]/25">
            Có ❤️
          </motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}
            onClick={() => handleYesNo('Không')}
            className="flex-1 h-16 rounded-2xl bg-white/[0.07] text-white/50 text-xl font-medium border border-white/10 hover:bg-white/[0.12]">
            Không
          </motion.button>
        </motion.div>
      )}

      {/* Success text */}
      <AnimatePresence>
        {correct && (
          <motion.p initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="text-center text-green-300 text-sm font-light mt-4">
            {question.successText || 'Chính xác! ✨'}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════
const GameIntro = ({ onComplete }) => {
  const [phase, setPhase] = useState('prologue');
  const [prologueIdx, setPrologueIdx] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [seals, setSeals] = useState(questions.length);
  const [hp, setHp] = useState(5);
  const [hitAnim, setHitAnim] = useState(false);
  const [screenFlash, setScreenFlash] = useState('');
  const [prologueDone, setPrologueDone] = useState(false);

  const daysCount = useMemo(() => {
    const s = new Date(config.startDate), n = new Date();
    return Math.floor((n - s) / 86400000);
  }, []);

  const allPrologue = [...PROLOGUE, { text: `Và hôm nay, chúng mình đã bên nhau ${daysCount} ngày ❤️`, font: 'poppins' }];
  const currentBg = (phase === 'question' || phase === 'narrative') ? questions[qIdx]?.bgImage : null;

  const handlePrologueDone = useCallback(() => {
    setPrologueDone(true);
    setTimeout(() => {
      if (prologueIdx < allPrologue.length - 1) {
        setPrologueIdx(i => i + 1); setPrologueDone(false);
      } else {
        setScreenFlash('white');
        setTimeout(() => { setScreenFlash(''); setPhase('narrative'); }, 400);
      }
    }, 700);
  }, [prologueIdx, allPrologue.length]);

  const handleCorrect = useCallback(() => {
    setSeals(s => s - 1);
    setScreenFlash('white');
    playSealBreak();
    confetti({ particleCount: 40, spread: 100, startVelocity: 20, origin: { y: 0.3 },
      colors: ['#718096', '#a0aec0', '#e8457c', '#fff'], zIndex: 400 });
    setTimeout(() => {
      setScreenFlash('');
      if (qIdx < questions.length - 1) { setQIdx(i => i + 1); setPhase('narrative'); }
      else {
        setPhase('victory');
        playVictory();
        confetti({ particleCount: 200, spread: 360, startVelocity: 35, origin: { y: 0.4 },
          colors: ['#e8457c', '#f9a8c9', '#ff6b9d', '#ffd1dc', '#fff'], zIndex: 400 });
      }
    }, 500);
  }, [qIdx]);

  const handleWrong = useCallback(() => {
    setHp(h => Math.max(0, h - 1));
    setHitAnim(true); setScreenFlash('red');
    playError();
    setTimeout(() => { setHitAnim(false); setScreenFlash(''); }, 500);
  }, []);

  return (
    <div className="fixed inset-0 z-[200] bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <AnimatePresence mode="sync">
        {currentBg && (
          <motion.div key={currentBg} initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} exit={{ opacity: 0 }}
            transition={{ duration: 1 }} className="absolute inset-0 z-0">
            <img src={currentBg} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-[#0a0a0a]/80" />
          </motion.div>
        )}
      </AnimatePresence>

      {Array.from({ length: 10 }).map((_, i) => <FloatingHeart key={i} delay={i * 1.1} />)}

      <AnimatePresence>
        {screenFlash && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: screenFlash === 'red' ? 0.35 : 0.6 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
            className={`fixed inset-0 z-[300] pointer-events-none ${screenFlash === 'red' ? 'bg-red-600' : 'bg-white'}`} />
        )}
      </AnimatePresence>

      {(phase === 'question' || phase === 'narrative') && <HPBar hp={hp} maxHp={5} />}

      {phase !== 'prologue' && phase !== 'victory' && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-30 w-48">
          <div className="flex justify-between text-[10px] text-white/25 uppercase tracking-wider mb-1">
            <span>Phong ấn</span><span>{questions.length - seals}/{questions.length}</span>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-green-400 to-emerald-300 rounded-full"
              animate={{ width: `${((questions.length - seals) / questions.length) * 100}%` }}
              transition={{ duration: 0.6 }} />
          </div>
        </div>
      )}

      {/* PROLOGUE */}
      {phase === 'prologue' && (
        <div className="relative z-10 text-center px-8 min-h-[80px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div key={prologueIdx} exit={{ opacity: 0, scale: 1.8, filter: 'blur(16px)' }}
              transition={{ duration: 0.5 }}>
              <TypewriterLine text={allPrologue[prologueIdx].text}
                font={allPrologue[prologueIdx].font} onDone={handlePrologueDone} />
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* NARRATIVE */}
      <AnimatePresence mode="wait">
        {phase === 'narrative' && (
          <>
            <div className="relative z-10 mt-[-40px]">
              <SealedHeart sealsRemaining={seals} hit={false} />
            </div>
            <NarrativeDialogue key={`n-${qIdx}`} lines={NARRATIVES[qIdx]}
              onComplete={() => setPhase('question')} />
          </>
        )}
      </AnimatePresence>

      {/* QUESTION */}
      <AnimatePresence mode="wait">
        {phase === 'question' && (
          <motion.div key={`q-${qIdx}`} className="relative z-10 px-6 w-full">
            <SealedHeart sealsRemaining={seals} hit={hitAnim} />
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              className="text-center mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20">
                <span className="text-[var(--color-primary-light)] text-xs font-medium tracking-wider uppercase">
                  Ải {qIdx + 1} / {questions.length}
                </span>
              </div>
            </motion.div>
            <QuestionPanel question={questions[qIdx]} onCorrect={handleCorrect} onWrong={handleWrong} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* VICTORY */}
      <AnimatePresence>
        {phase === 'victory' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="relative z-10 text-center px-8">
            <motion.svg viewBox="0 0 120 120" className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 drop-shadow-2xl overflow-visible"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0, y: [0, -8, 0] }}
              transition={{ scale: { type: 'spring', stiffness: 180, damping: 12, delay: 0.3 },
                y: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 } }}>
              <defs>
                <radialGradient id="vhg2" cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#ff8fb4" /><stop offset="100%" stopColor="#e8457c" />
                </radialGradient>
              </defs>
              <path d="M60 100 C60 100,18 72,18 42 A21 21 0 0 1 60 28 A21 21 0 0 1 102 42 C102 72,60 100,60 100Z"
                fill="url(#vhg2)" />
              <ellipse cx="45" cy="42" rx="8" ry="10" fill="white" opacity="0.15" transform="rotate(-15 45 42)" />
            </motion.svg>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }} className="text-3xl md:text-5xl font-bold text-white mb-3"
              style={{ fontFamily: 'var(--font-script)' }}>
              Trái tim đã được giải phóng! 💖
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
              className="text-white/40 font-light text-sm mb-8">
              Câu chuyện tình yêu bắt đầu từ đây...
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => setPhase('reveal')}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white font-medium shadow-lg shadow-[var(--color-primary)]/30 flex items-center gap-2 mx-auto">
                <Heart size={18} fill="white" /> Bắt đầu câu chuyện
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* REVEAL PHOTO */}
      <AnimatePresence>
        {phase === 'reveal' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-10 flex flex-col items-center justify-center"
          >
            {/* Shimmer loading placeholder → ảnh thật */}
            <motion.div
              initial={{ scale: 1.3, filter: 'blur(30px) brightness(0.3)' }}
              animate={{ scale: 1, filter: 'blur(0px) brightness(1)' }}
              transition={{ duration: 2.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full h-full"
            >
              <img
                src="/images/Anh_ghep.jpg"
                alt="Chúng mình"
                className="w-full h-full object-cover"
              />

              {/* Vignette overlay */}
              <div className="absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.7) 100%)',
                }} />

              {/* Bottom gradient for text */}
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />

              {/* Sparkle particles */}
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                  transition={{
                    duration: Math.random() * 2 + 1.5,
                    delay: Math.random() * 2 + 0.5,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 3,
                  }}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    boxShadow: '0 0 6px 2px rgba(255,255,255,0.6)',
                  }}
                />
              ))}
            </motion.div>

            {/* Text overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-center z-20">
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="text-2xl md:text-4xl font-bold text-white mb-2"
                style={{ fontFamily: 'var(--font-script)', textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
              >
                Chúng mình 💕
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.8 }}
                className="text-white/60 font-light text-sm mb-8"
                style={{ textShadow: '0 1px 10px rgba(0,0,0,0.8)' }}
              >
                Mãi bên nhau nhé...
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 0.6 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onComplete}
                  className="px-8 py-4 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white font-medium shadow-lg flex items-center gap-2 mx-auto hover:bg-white/25 transition-colors"
                >
                  <Heart size={18} fill="white" /> Vào câu chuyện của chúng mình
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute w-80 h-80 rounded-full bg-[var(--color-primary)] opacity-[0.03] blur-[100px]" />
    </div>
  );
};

export default GameIntro;
