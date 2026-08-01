import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export const BeautifulDivider: React.FC = () => {
  return (
    <div className="relative w-full max-w-2xl mx-auto my-12 px-4 flex items-center justify-center">
      {/* Glowing horizontal line left */}
      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-[#D4AF37]" />

      {/* Center glowing badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="px-5 py-2 rounded-full bg-[#0F4C45]/80 border border-[#D4AF37]/50 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.25)] flex items-center gap-2 mx-3 text-xs sm:text-sm font-semibold tracking-wide text-[#FFF2BE]"
      >
        <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
        <span>✨ Your Journey Starts Here ✨</span>
        <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
      </motion.div>

      {/* Glowing horizontal line right */}
      <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#D4AF37]/50 to-[#D4AF37]" />
    </div>
  );
};
