import React from 'react';
import { Heart, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenAdminLeads?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdminLeads }) => {
  return (
    <footer className="relative w-full max-w-2xl mx-auto py-10 px-4 text-center z-10 border-t border-[#1C6B63]/30 mt-12">
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-xs sm:text-sm text-slate-300 font-medium flex items-center justify-center gap-1.5">
          <span>Made with</span>
          <Heart className="w-4 h-4 text-emerald-400 fill-emerald-400 animate-pulse" />
          <span>by</span>
          <span className="font-bold text-[#FFF2BE] tracking-wide">Path to Inner Peace</span>
        </p>

        <p className="text-xs text-emerald-200/70 font-light italic max-w-md">
          &ldquo;Small daily practices create lasting mental strength.&rdquo;
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-3">
          <p className="text-[10px] text-slate-400/60">
            © {new Date().getFullYear()} Path to Inner Peace. All Rights Reserved.
          </p>

          {onOpenAdminLeads && (
            <button
              onClick={onOpenAdminLeads}
              className="text-[10px] text-[#D4AF37] hover:underline flex items-center gap-1 opacity-80 hover:opacity-100 cursor-pointer"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>Owner Dashboard (View Leads)</span>
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};
