import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Phone, Mail, Sparkles, CheckCircle2, Send, Lock } from 'lucide-react';
import { UserData } from '../types';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: UserData | null;
  onSaveUserData: (data: UserData) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  userData,
  onSaveUserData,
}) => {
  const [name, setName] = useState(userData?.name || '');
  const [mobile, setMobile] = useState(userData?.mobile || '');
  const [email, setEmail] = useState(userData?.email || '');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !mobile.trim() || !email.trim()) {
      setErrorMsg('Please fill in all fields (Name, Mobile No, and Email ID).');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    const newUserData: UserData = {
      name: name.trim(),
      mobile: mobile.trim(),
      email: email.trim(),
      registeredAt: new Date().toISOString(),
    };

    try {
      // 1. Post to backend API route for server memory & CSV export
      fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUserData),
      }).catch(() => {});

      // 2. Post directly to FormSubmit AJAX endpoint targeting mchatterjee69@gmail.com
      await fetch('https://formsubmit.co/ajax/mchatterjee69@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: newUserData.name,
          mobile: newUserData.mobile,
          email: newUserData.email,
          _subject: `New Welcome Kit Lead: ${newUserData.name}`,
          _replyto: newUserData.email,
          _template: 'table',
        }),
      }).catch(() => {});

      onSaveUserData(newUserData);
      setSubmitted(true);
    } catch {
      onSaveUserData(newUserData);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-[#07231F] border-2 border-[#D4AF37] rounded-3xl p-6 sm:p-8 shadow-[0_25px_70px_rgba(212,175,55,0.3)] text-white overflow-hidden"
        >
          {/* Close button - only shown if user is already registered and modifying profile */}
          {userData && (
            <button
              onClick={onClose}
              type="button"
              className="absolute top-4 right-4 p-2 rounded-full bg-[#0F4C45]/50 border border-[#1C6B63] text-slate-300 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#FFF2BE] text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Unlock FREE Welcome Kit</span>
            </div>

            <h3 className="text-2xl font-bold gold-text-gradient">
              {userData ? 'Your Member Profile' : 'Enter Your Details'}
            </h3>

            <p className="text-xs text-slate-300 mt-1 font-light">
              Get instant access to all mental fitness resources & 5-day challenge guides.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs text-center">
              {errorMsg}
            </div>
          )}

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 mb-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-200 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0F4C45]/60 border border-[#1C6B63] text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-200 mb-1.5">
                  Mobile Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0F4C45]/60 border border-[#1C6B63] text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-200 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0F4C45]/60 border border-[#1C6B63] text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-gold animate-pulse-gold w-full py-3.5 rounded-xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 text-[#07231F] shadow-lg cursor-pointer mt-2"
              >
                {loading ? (
                  <span>Registering...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 fill-current" />
                    <span>Access FREE Welcome Kit</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-light pt-1">
                <Lock className="w-3 h-3 text-[#D4AF37]" />
                <span>Your information is 100% private and secure</span>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-2"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-7 h-7 text-emerald-400 animate-bounce" />
              </div>

              <h4 className="text-xl font-bold text-white mb-1">Welcome Kit Unlocked! 🎉</h4>
              <p className="text-xs text-slate-200 mb-4 leading-relaxed">
                Thank you <strong className="text-[#FFF2BE]">{name}</strong>! You now have full access to all Welcome Kit resources below.
              </p>

              <div className="p-3.5 rounded-xl bg-[#0F4C45]/60 border border-[#1C6B63] text-left text-xs space-y-1.5 mb-5">
                <p className="text-slate-300"><strong>Name:</strong> {name}</p>
                <p className="text-slate-300"><strong>Mobile:</strong> {mobile}</p>
                <p className="text-slate-300"><strong>Email:</strong> {email}</p>
              </div>

              <button
                onClick={onClose}
                className="btn-gold w-full py-3 rounded-xl font-bold text-sm text-[#07231F] cursor-pointer"
              >
                Explore Welcome Kit Resources
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
