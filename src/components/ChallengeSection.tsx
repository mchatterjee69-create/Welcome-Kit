import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Calendar, Clock, Youtube, Sparkles, BellRing, Share2, ArrowRight } from 'lucide-react';

interface ChallengeSectionProps {
  onJoinChallenge: () => void;
}

export const ChallengeSection: React.FC<ChallengeSectionProps> = ({ onJoinChallenge }) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const benefits = [
    "Reduce Stress Naturally",
    "Stop Overthinking",
    "Improve Sleep",
    "Increase Focus",
    "Build Emotional Balance",
    "Develop Mental Strength",
  ];

  const handleShareChallenge = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-2xl mx-auto px-4 my-8 z-10"
    >
      {/* Darker Luxury Glass Box with Glowing Gold Border */}
      <div className="relative rounded-3xl p-6 sm:p-8 md:p-10 bg-[#051C18]/90 backdrop-blur-xl border-2 border-[#D4AF37]/70 shadow-[0_16px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(212,175,55,0.2)] overflow-hidden">
        {/* Subtle Ambient Background Rays */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1C6B63]/25 rounded-full blur-3xl pointer-events-none" />

        {/* Top Challenge Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#FFF2BE] text-xs font-semibold mb-6 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
          <Sparkles className="w-4 h-4 text-[#D4AF37] animate-spin-slow" />
          <span>FREE 5-Day • 30-Minute Mental Reset</span>
        </div>

        {/* Challenge Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2 leading-tight">
          🚀 Join the FREE 5-Day<br />
          <span className="gold-text-gradient">30-Minute Mental Reset Challenge</span>
        </h2>

        {/* Tagline / Subtitle */}
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-emerald-300 mb-4">
          Train Your Mind. Transform Your Life.
        </p>

        {/* Description */}
        <p className="text-sm sm:text-base text-slate-200/90 leading-relaxed font-light mb-6">
          Join us every morning for 30 minutes of guided mental fitness training using practical breathwork, CBT-based techniques, mindfulness, and daily mental conditioning.
        </p>

        {/* Schedule Display Badge */}
        <div className="bg-[#0A2E2A] border border-[#D4AF37]/35 rounded-2xl p-4 mb-8 flex flex-wrap items-center justify-between gap-3 shadow-inner">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-slate-300 font-medium">Schedule</div>
              <div className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                <span>🕡 Every Morning</span>
                <span className="text-[#D4AF37]">•</span>
                <span>6:30 AM</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200 text-xs font-semibold">
            <Youtube className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            <span>YouTube LIVE</span>
          </div>
        </div>

        {/* You'll Learn Title */}
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#FFF2BE] mb-4 flex items-center gap-2">
            <span>✨ You&apos;ll Learn</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#0F4C45]/30 border border-[#1C6B63]/40 backdrop-blur-sm"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-slate-100">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* PRIMARY CTA Button */}
        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onJoinChallenge}
            className="btn-gold animate-pulse-gold w-full py-4 px-6 rounded-2xl font-extrabold text-base sm:text-lg flex items-center justify-center gap-3 text-[#07231F] cursor-pointer shadow-[0_10px_35px_rgba(212,175,55,0.4)] border border-[#FFF2BE]/60"
          >
            <span>🚀 Join the Challenge Now</span>
            <ArrowRight className="w-5 h-5 text-[#07231F]" />
          </motion.button>

          <p className="text-center text-xs text-slate-400 font-light flex items-center justify-center gap-1.5 pt-1">
            <BellRing className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>100% Free • Daily Morning Access • No Card Required</span>
          </p>
        </div>
      </div>
    </motion.section>
  );
};
