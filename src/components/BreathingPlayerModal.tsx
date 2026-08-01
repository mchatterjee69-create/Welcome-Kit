import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Pause, ExternalLink, Wind, Volume2, Sparkles, RefreshCw } from 'lucide-react';

interface BreathingPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  driveAudioUrl: string;
}

export const BreathingPlayerModal: React.FC<BreathingPlayerModalProps> = ({
  isOpen,
  onClose,
  driveAudioUrl,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [seconds, setSeconds] = useState(300); // 5 minutes
  const [timerActive, setTimerActive] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // Breathing loop timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setTimerActive(false);
      setIsPlaying(false);
      stopSynth();
    }
    return () => clearInterval(interval);
  }, [timerActive, seconds]);

  // Phase cycle (Inhale 4s -> Hold 4s -> Exhale 4s)
  useEffect(() => {
    if (!timerActive) return;

    const cycleInterval = setInterval(() => {
      setPhase((current) => {
        if (current === 'Inhale') return 'Hold';
        if (current === 'Hold') return 'Exhale';
        return 'Inhale';
      });
    }, 4000);

    return () => clearInterval(cycleInterval);
  }, [timerActive]);

  const startSynth = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Create soothing 432Hz sine wave with gentle chorus modulation
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(432, ctx.currentTime); // 432Hz calming tone

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      oscRef.current = osc;
      gainRef.current = gain;
    } catch {
      // Browser audio policy fallback
    }
  };

  const stopSynth = () => {
    if (gainRef.current && audioCtxRef.current) {
      gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.8);
      setTimeout(() => {
        oscRef.current?.stop();
        oscRef.current?.disconnect();
        oscRef.current = null;
      }, 800);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      setTimerActive(false);
      stopSynth();
    } else {
      setIsPlaying(true);
      setTimerActive(true);
      startSynth();
    }
  };

  const handleReset = () => {
    setSeconds(300);
    setPhase('Inhale');
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-[#07231F] border border-[#D4AF37]/50 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden text-center text-white"
        >
          {/* Close button */}
          <button
            onClick={() => {
              stopSynth();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#0F4C45]/50 border border-[#1C6B63] text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-center gap-2 mb-2">
            <Wind className="w-5 h-5 text-emerald-300" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
              Guided Breathing Practice
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold mb-1">🌬 5-Minute Stress Reset</h3>
          <p className="text-xs text-slate-300 font-light mb-6">
            Calm your nervous system with interactive guided breathwork & 432Hz ambient sound waves.
          </p>

          {/* Interactive Breathing Ring */}
          <div className="relative w-48 h-48 mx-auto my-6 flex items-center justify-center">
            {/* Outer Expanding Ring */}
            <motion.div
              animate={{
                scale: phase === 'Inhale' ? 1.35 : phase === 'Hold' ? 1.35 : 1,
                opacity: phase === 'Inhale' ? 0.8 : phase === 'Hold' ? 1 : 0.4,
              }}
              transition={{ duration: 4, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#1C6B63]/60 via-[#D4AF37]/30 to-[#0F4C45]/80 blur-md border border-[#D4AF37]/50"
            />

            {/* Inner Ring */}
            <motion.div
              animate={{
                scale: phase === 'Inhale' ? 1.15 : phase === 'Hold' ? 1.15 : 0.9,
              }}
              transition={{ duration: 4, ease: 'easeInOut' }}
              className="relative w-36 h-36 rounded-full bg-[#0F4C45] border-2 border-[#D4AF37] flex flex-col items-center justify-center shadow-inner"
            >
              <span className="text-xs uppercase tracking-widest text-[#FFF2BE] font-semibold mb-1">
                {phase}
              </span>
              <span className="text-2xl font-bold font-mono text-white">
                {formatTime(seconds)}
              </span>
            </motion.div>
          </div>

          {/* Player Control Bar */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={handleReset}
              className="p-3 rounded-full bg-[#0F4C45]/60 border border-[#1C6B63] text-slate-300 hover:text-white"
              title="Reset timer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={togglePlay}
              className="btn-gold px-8 py-3.5 rounded-full font-bold text-base flex items-center gap-2 text-[#07231F] shadow-lg"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-5 h-5 fill-current" />
                  <span>Pause Practice</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-current" />
                  <span>Start 5-Min Reset</span>
                </>
              )}
            </button>
          </div>

          {/* Google Drive Link Action */}
          <div className="pt-4 border-t border-[#1C6B63]/40 flex flex-col gap-2">
            <a
              href={driveAudioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-[#0F4C45]/50 border border-[#D4AF37]/40 text-xs font-medium text-emerald-200 hover:text-white hover:bg-[#0F4C45] transition-all flex items-center justify-center gap-2"
            >
              <Volume2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Open Original Audio in Google Drive</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
