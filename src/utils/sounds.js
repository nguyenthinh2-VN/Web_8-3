// Tạo âm thanh bằng Web Audio API – không cần file mp3
const ctx = () => {
  if (!window._audioCtx) window._audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return window._audioCtx;
};

const playTone = (freq, duration, type = 'sine', vol = 0.15) => {
  try {
    const c = ctx();
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
    osc.connect(gain).connect(c.destination);
    osc.start(); osc.stop(c.currentTime + duration);
  } catch (e) { /* silent fail */ }
};

// Bấm phím numpad
export const playTap = () => playTone(800, 0.06, 'sine', 0.08);

// Nhập ký tự vào ô
export const playInput = () => playTone(1200, 0.05, 'sine', 0.06);

// Xóa ký tự
export const playDelete = () => playTone(300, 0.08, 'triangle', 0.07);

// Sai – tiếng lỗi
export const playError = () => {
  playTone(200, 0.15, 'square', 0.1);
  setTimeout(() => playTone(150, 0.2, 'square', 0.08), 100);
};

// Đúng – chime lên
export const playCorrect = () => {
  playTone(523, 0.12, 'sine', 0.12); // C5
  setTimeout(() => playTone(659, 0.12, 'sine', 0.12), 100); // E5
  setTimeout(() => playTone(784, 0.15, 'sine', 0.14), 200); // G5
  setTimeout(() => playTone(1047, 0.25, 'sine', 0.12), 300); // C6
};

// Phong ấn vỡ – whoosh
export const playSealBreak = () => {
  const c = ctx();
  try {
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(400, c.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, c.currentTime + 0.3);
    gain.gain.setValueAtTime(0.12, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.4);
    osc.connect(gain).connect(c.destination);
    osc.start(); osc.stop(c.currentTime + 0.4);
  } catch (e) {}
};

// Victory fanfare
export const playVictory = () => {
  const notes = [523, 659, 784, 1047, 784, 1047, 1319];
  notes.forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.2, 'sine', 0.12), i * 120);
  });
};

// Typewriter tick
export const playType = () => playTone(1400, 0.02, 'sine', 0.03);

// Dialogue next
export const playNext = () => playTone(600, 0.08, 'sine', 0.06);
