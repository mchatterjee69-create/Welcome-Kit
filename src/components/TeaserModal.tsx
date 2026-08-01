import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { ResourceCardData } from '../types';

interface TeaserModalProps {
  card: ResourceCardData | null;
  onClose: () => void;
}

export const TeaserModal: React.FC<TeaserModalProps> = ({ card, onClose }) => {
  if (!card) return null;

  const getTeaserHighlights = (cardId: string) => {
    switch (cardId) {
      case 'card-1':
        return {
          subtitle: 'Identify Your Mental Resilience Baseline',
          bullets: [
            'Evaluates 5 Key Pillars: Stress control, Sleep depth, Overthinking index, Emotional focus, & Daily vigor.',
            'Takes less than 2 minutes to complete with zero cost.',
            'Generates a custom breakdown with tailored daily mental workouts.',
          ],
        };
      case 'card-3':
        return {
          subtitle: 'The 3-Step Nighttime Relaxation System',
          bullets: [
            'Digital Sunset Rule: Turn down blue light 45 minutes before sleep.',
            '4-7-8 Breathing Technique to activate parasympathetic calm.',
            'Nightly Mind Dump exercise to clear racing thoughts before head hits pillow.',
          ],
        };
      case 'card-4':
        return {
          subtitle: 'Foundational Mental Conditioning Toolkit',
          bullets: [
            'CBT-based Cognitive Reframing exercises for high-pressure moments.',
            'Daily 10-Minute Mindful Anchor habit to stay centered.',
            'Simple daily checklists to build sustainable mental strength.',
          ],
        };
      default:
        return {
          subtitle: 'Premium Mental Wellness Resource',
          bullets: [
            'Designed by leading mental conditioning experts.',
            '100% free with instant lifetime access.',
            'Actionable exercises you can use immediately today.',
          ],
        };
    }
  };

  const highlights = getTeaserHighlights(card.id);

  const handleOpenFull = () => {
    window.open(card.buttonActionUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-[#07231F] border border-[#D4AF37]/50 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-white"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#0F4C45]/50 border border-[#1C6B63] text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
              Resource Teaser
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">{card.title}</h3>

          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-6">
            {card.description}
          </p>

          <div className="bg-[#0F4C45]/40 border border-[#1C6B63]/60 rounded-2xl p-4 mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFF2BE] mb-3">
              ✨ Key Highlights: {highlights.subtitle}
            </h4>

            <ul className="space-y-2.5">
              {highlights.bullets.map((b, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={handleOpenFull}
            className="btn-gold w-full py-3.5 px-5 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 text-[#07231F] shadow-md"
          >
            <span>{card.buttonText}</span>
            <ExternalLink className="w-4 h-4 text-[#07231F]" />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
