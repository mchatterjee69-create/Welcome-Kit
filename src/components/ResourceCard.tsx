import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ExternalLink,
  Brain,
  Wind,
  Moon,
  BookOpen,
  Sparkles,
  ChevronRight,
  Headphones,
} from 'lucide-react';
import { ResourceCardData, UserData } from '../types';

interface ResourceCardProps {
  card: ResourceCardData;
  index: number;
  onOpenPreview?: (cardId: string) => void;
  userData?: UserData | null;
  onRequireRegistration?: () => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  card,
  index,
  onOpenPreview,
  userData,
  onRequireRegistration,
}) => {
  const [ripple, setRipple] = useState<{ x: number; y: number; show: boolean }>({
    x: 0,
    y: 0,
    show: false,
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain':
        return <Brain className="w-6 h-6 text-[#D4AF37]" />;
      case 'Headphones':
      case 'Wind':
        return (
          <div className="relative flex items-center justify-center">
            <Headphones className="w-6 h-6 text-emerald-300 drop-shadow-[0_0_8px_rgba(110,231,183,0.5)]" />
            <div className="absolute -bottom-1 flex items-end justify-center gap-0.5 h-2">
              <span
                className="w-0.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce"
                style={{ animationDuration: '1.2s', animationDelay: '0ms' }}
              />
              <span
                className="w-0.5 h-2.5 bg-emerald-300 rounded-full animate-bounce"
                style={{ animationDuration: '1.2s', animationDelay: '250ms' }}
              />
              <span
                className="w-0.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce"
                style={{ animationDuration: '1.2s', animationDelay: '500ms' }}
              />
            </div>
          </div>
        );
      case 'Moon':
        return <Moon className="w-6 h-6 text-indigo-300" />;
      case 'BookOpen':
        return <BookOpen className="w-6 h-6 text-[#FFF2BE]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#D4AF37]" />;
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!userData && onRequireRegistration) {
      onRequireRegistration();
      return;
    }

    // Create ripple effect position
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setRipple({ x, y, show: true });
    setTimeout(() => setRipple((prev) => ({ ...prev, show: false })), 600);

    // Open target link in new tab safely
    window.open(card.buttonActionUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card glass-card-hover rounded-2xl p-5 sm:p-6 relative overflow-hidden group flex flex-col justify-between"
    >
      {/* Decorative Gold Ambient Glow inside Card */}
      <div className="absolute -right-12 -top-12 w-36 h-36 bg-[#D4AF37]/10 rounded-full blur-2xl group-hover:bg-[#D4AF37]/20 transition-all pointer-events-none" />
      <div className="absolute -left-12 -bottom-12 w-36 h-36 bg-[#1C6B63]/20 rounded-full blur-2xl group-hover:bg-[#1C6B63]/35 transition-all pointer-events-none" />

      <div>
        {/* Top Header Row with Icon & Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0F4C45] to-[#082924] border border-[#D4AF37]/30 flex items-center justify-center shadow-lg group-hover:border-[#D4AF37]/60 group-hover:scale-105 transition-all">
            {getIcon(card.iconName)}
          </div>

          <div className="flex items-center gap-2">
            {card.badge && (
              <span className="text-[10px] uppercase font-semibold px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#FFF2BE]">
                {card.badge}
              </span>
            )}
            <span className="text-xs text-slate-400 group-hover:text-[#D4AF37] transition-colors flex items-center gap-0.5">
              <span>Free</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </span>
          </div>
        </div>

        {/* Card Title */}
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#FFF2BE] transition-colors leading-snug">
          {card.title}
        </h3>

        {/* Card Description */}
        <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed font-light mb-6">
          {card.description}
        </p>
      </div>

      {/* Button Actions Area */}
      <div className="pt-2 flex flex-col gap-2.5">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleButtonClick}
          className="btn-gold ripple-button w-full py-3.5 px-5 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 text-[#07231F] cursor-pointer shadow-md hover:shadow-lg transition-all relative overflow-hidden"
        >
          <span>{card.buttonText}</span>
          <ExternalLink className="w-4 h-4 text-[#07231F]" />

          {/* Ripple animation overlay */}
          {ripple.show && (
            <span
              className="absolute bg-white/40 rounded-full animate-ping pointer-events-none"
              style={{
                left: ripple.x - 20,
                top: ripple.y - 20,
                width: 40,
                height: 40,
              }}
            />
          )}
        </motion.button>

        {/* Instant In-App Preview Option */}
        {onOpenPreview && (
          <button
            onClick={() => onOpenPreview(card.id)}
            className="w-full text-center py-1 text-xs text-emerald-200/70 hover:text-[#D4AF37] transition-colors flex items-center justify-center gap-1 font-medium cursor-pointer"
          >
            <span>✨ Quick In-App Teaser</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>
    </motion.div>
  );
};
