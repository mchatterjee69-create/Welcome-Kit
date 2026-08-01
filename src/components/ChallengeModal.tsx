import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Bell, CheckCircle2, Youtube, Sparkles, Download, Copy, ExternalLink } from 'lucide-react';

interface ChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChallengeModal: React.FC<ChallengeModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubmitted(true);
    // Store in localStorage for persistent state
    localStorage.setItem('path_inner_peace_registered', 'true');
    localStorage.setItem('path_inner_peace_email', email);
  };

  const handleDownloadCalendar = () => {
    // Generate .ics calendar invite content
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Path to Inner Peace//FREE 5-Day Mental Reset Challenge//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:🚀 FREE 5-Day Mental Reset Challenge (Path to Inner Peace)
DESCRIPTION:Join us every morning for 30 minutes of guided mental fitness training using practical breathwork, CBT-based techniques, mindfulness, and daily mental conditioning on YouTube LIVE.
LOCATION:YouTube LIVE
RRULE:FREQ=DAILY;COUNT=5
DTSTART:${new Date().toISOString().replace(/-|:|\.\d\d\d/g, '').substring(0, 8)}T063000Z
DTEND:${new Date().toISOString().replace(/-|:|\.\d\d\d/g, '').substring(0, 8)}T070000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', '5-Day-Mental-Reset-Challenge.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyYoutube = () => {
    navigator.clipboard.writeText('https://youtube.com/@pathtoinnerpeace');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-[#07231F] border-2 border-[#D4AF37] rounded-3xl p-6 sm:p-8 shadow-[0_25px_70px_rgba(212,175,55,0.25)] overflow-hidden text-white"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#0F4C45]/50 border border-[#1C6B63] text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#FFF2BE] text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Free Registration Hub</span>
            </div>

            <h3 className="text-2xl font-bold gold-text-gradient">
              🚀 5-Day Mental Reset Challenge
            </h3>

            <p className="text-xs text-slate-300 mt-1 font-light">
              6:30 AM Every Morning • YouTube LIVE
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleRegister} className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-medium text-emerald-200 mb-1">
                  Enter your email to receive morning live access links & reminder alerts:
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#0F4C45]/60 border border-[#1C6B63] text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#D4AF37] transition-all"
                />
              </div>

              <button
                type="submit"
                className="btn-gold w-full py-3.5 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 text-[#07231F] shadow-md"
              >
                <Bell className="w-4 h-4 fill-current" />
                <span>Confirm My Free Seat</span>
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#0F4C45]/50 border border-emerald-400/50 rounded-2xl p-4 mb-6 text-center"
            >
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2 animate-bounce" />
              <h4 className="font-bold text-white text-base">You&apos;re Registered! 🎉</h4>
              <p className="text-xs text-slate-200 mt-1">
                We will send daily 6:30 AM morning session reminders to <strong className="text-[#FFF2BE]">{email}</strong>.
              </p>
            </motion.div>
          )}

          {/* Quick Action Utilities */}
          <div className="space-y-2.5 pt-2 border-t border-[#1C6B63]/40">
            <button
              onClick={handleDownloadCalendar}
              className="w-full py-3 px-4 rounded-xl bg-[#0F4C45]/60 border border-[#D4AF37]/40 text-xs font-semibold text-emerald-200 hover:text-white hover:border-[#D4AF37] transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              <span>Add 6:30 AM Challenge to Calendar (.ics)</span>
              <Download className="w-3.5 h-3.5" />
            </button>

            <div className="flex gap-2">
              <button
                onClick={handleCopyYoutube}
                className="flex-1 py-2.5 px-3 rounded-xl bg-[#0F4C45]/40 border border-[#1C6B63] text-xs font-medium text-slate-300 hover:text-white transition-all flex items-center justify-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{copied ? 'Copied Channel!' : 'Copy YouTube Link'}</span>
              </button>

              <a
                href="https://youtube.com/@pathtoinnerpeace"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 rounded-xl bg-red-950/40 border border-red-500/40 text-xs font-semibold text-red-200 hover:bg-red-900/50 transition-all flex items-center justify-center gap-1.5"
              >
                <Youtube className="w-4 h-4 text-red-500 fill-red-500" />
                <span>Visit Channel</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
