import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, QrCode, Share2, Sparkles } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const appUrl = window.location.href;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(appUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-sm bg-[#07231F] border border-[#D4AF37]/50 rounded-3xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-center text-white"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#0F4C45]/50 border border-[#1C6B63] text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-center gap-1.5 text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-2">
            <QrCode className="w-4 h-4" />
            <span>Digital Welcome QR Hub</span>
          </div>

          <h3 className="text-xl font-bold mb-1">Share Welcome Kit</h3>
          <p className="text-xs text-slate-300 font-light mb-5">
            Scan with any smartphone camera to instantly access the free mental wellness resources.
          </p>

          {/* SVG QR Code Graphic */}
          <div className="w-48 h-48 mx-auto bg-white p-3 rounded-2xl shadow-xl flex items-center justify-center border-4 border-[#D4AF37] mb-5">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                appUrl
              )}&color=07231F&bgcolor=FFFFFF`}
              alt="QR Code Welcome Kit"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="space-y-3">
            <button
              onClick={handleCopyLink}
              className="btn-gold w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 text-[#07231F] shadow-md"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#07231F]" />
                  <span>Link Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#07231F]" />
                  <span>Copy Direct Welcome Link</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
