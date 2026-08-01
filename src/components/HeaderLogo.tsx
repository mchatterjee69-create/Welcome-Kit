import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Share2, UserCheck, UserPlus } from 'lucide-react';
import { UserData } from '../types';

interface HeaderLogoProps {
  onOpenShare: () => void;
  onOpenRegistration: () => void;
  userData: UserData | null;
}

export const HeaderLogo: React.FC<HeaderLogoProps> = ({
  onOpenShare,
  onOpenRegistration,
  userData,
}) => {
  return (
    <header className="relative w-full max-w-2xl mx-auto pt-6 pb-4 px-4 text-center z-10">
      {/* Top Utility Bar (Share & Member Pass / Registration Toggle) */}
      <div className="flex items-center justify-between mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenRegistration}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border transition-all cursor-pointer ${
            userData
              ? 'bg-[#0F4C45]/80 border-[#D4AF37] text-[#FFF2BE] shadow-[0_0_15px_rgba(212,175,55,0.3)]'
              : 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#FFF2BE] shadow-[0_0_12px_rgba(212,175,55,0.4)] animate-pulse'
          }`}
          title="View or update your Welcome Kit registration details"
        >
          {userData ? (
            <>
              <UserCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Pass: {userData.name.split(' ')[0]}</span>
            </>
          ) : (
            <>
              <UserPlus className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Unlock Welcome Kit</span>
            </>
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenShare}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#0F4C45]/40 border border-[#1C6B63]/60 text-slate-300 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all backdrop-blur-md cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Share Kit</span>
        </motion.button>
      </div>

      {/* Animated Path to Inner Peace Emblem Logo (Exact Attached Replica - Full Logo, Circular, No White Cover) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative inline-flex items-center justify-center mb-6"
      >
        {/* Soft Outer Glowing Ambient Ring */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.35, 0.65, 0.35],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-r from-[#D4AF37]/30 via-[#1C6B63]/40 to-[#D4AF37]/30 blur-2xl pointer-events-none"
        />

        {/* Circular Emblem Container - Perfect circular crop with gold accent border, no square white background */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full p-1 bg-gradient-to-b from-[#D4AF37] via-[#FFF2BE] to-[#AA8412] shadow-[0_0_35px_rgba(212,175,55,0.4)] flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center relative shadow-inner">
            <svg
              viewBox="0 0 500 500"
              className="w-full h-full object-contain"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Upper curved arc path for top text */}
                <path
                  id="topCurvedArc"
                  d="M 68,250 A 182,182 0 0,1 432,250"
                  fill="none"
                />
                {/* Lower curved arc path for bottom text */}
                <path
                  id="bottomCurvedArc"
                  d="M 432,250 A 182,182 0 0,1 68,250"
                  fill="none"
                />
              </defs>

              {/* Outer double circular border */}
              <circle cx="250" cy="250" r="236" fill="none" stroke="#111827" strokeWidth="9" />
              <circle cx="250" cy="250" r="226" fill="none" stroke="#111827" strokeWidth="2.5" />

              {/* Top Curved Text */}
              <text
                fill="#111827"
                fontSize="27"
                fontWeight="900"
                letterSpacing="1"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                <textPath href="#topCurvedArc" startOffset="50%" textAnchor="middle">
                  A Holistic Inner Transformation
                </textPath>
              </text>

              {/* Left and Right Separator Dots */}
              <circle cx="48" cy="250" r="11" fill="#111827" />
              <circle cx="452" cy="250" r="11" fill="#111827" />

              {/* Bottom Curved Text */}
              <text
                fill="#111827"
                fontSize="25"
                fontWeight="900"
                letterSpacing="0.8"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                <textPath href="#bottomCurvedArc" startOffset="50%" textAnchor="middle">
                  Transform Your Mind, Elevate Your Life
                </textPath>
              </text>

              {/* Left Green Leafy Branch */}
              <g id="greenBranch">
                <path
                  d="M 210,380 C 190,320 180,260 215,160 C 217,155 210,150 205,155 C 170,250 180,310 205,382 Z"
                  fill="#1B7A3E"
                />
                {/* Leaves */}
                <path d="M 205,170 C 160,150 140,190 200,205 Z" fill="#1B7A3E" />
                <path d="M 195,220 C 135,200 120,250 185,260 Z" fill="#1B7A3E" />
                <path d="M 200,280 C 140,270 130,320 190,325 Z" fill="#1B7A3E" />
                <path d="M 202,330 C 160,335 150,375 200,370 Z" fill="#1B7A3E" />

                <path d="M 208,185 C 240,165 250,200 210,215 Z" fill="#1B7A3E" />
                <path d="M 200,240 C 245,225 255,265 202,280 Z" fill="#1B7A3E" />
                <path d="M 205,300 C 245,290 250,335 205,340 Z" fill="#1B7A3E" />
              </g>

              {/* Right Golden Flame */}
              <g id="goldenFlame">
                <path
                  d="M 290,380 C 310,330 315,260 280,160 C 320,200 370,250 350,320 C 340,360 310,385 290,380 Z"
                  fill="#F59E0B"
                />
                <path
                  d="M 310,370 C 345,340 380,290 355,200 C 390,260 415,330 380,375 C 350,410 320,385 310,370 Z"
                  fill="#FBBF24"
                />
              </g>

              {/* Center Black Silhouette Figure in Lotus Pose with Arms Overhead */}
              <g id="meditatingFigure">
                {/* Head */}
                <circle cx="250" cy="175" r="24" fill="#000000" stroke="#FFFFFF" strokeWidth="2" />

                {/* Raised Arms Overhead in Anjali Mudra (Prayer Pose) */}
                <path
                  d="M 250,118 C 242,130 220,160 210,200 C 218,208 232,190 246,140 C 248,130 250,122 250,118 Z"
                  fill="#000000"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
                <path
                  d="M 250,118 C 258,130 280,160 290,200 C 282,208 268,190 254,140 C 252,130 250,122 250,118 Z"
                  fill="#000000"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />

                {/* Torso */}
                <path
                  d="M 210,200 C 220,240 225,280 220,320 L 280,320 C 275,280 280,240 290,200 Z"
                  fill="#000000"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />

                {/* Crossed Lotus Legs */}
                <path
                  d="M 180,335 C 160,325 140,340 145,355 C 150,370 200,385 250,385 C 300,385 350,370 355,355 C 360,340 340,325 320,335 C 290,350 210,350 180,335 Z"
                  fill="#000000"
                  stroke="#FFFFFF"
                  strokeWidth="3"
                />
              </g>

              {/* Center Horizontal Banner Box "Path to Inner Peace" */}
              <g id="centerBanner">
                {/* White Banner Background Box */}
                <rect
                  x="75"
                  y="252"
                  width="350"
                  height="46"
                  rx="6"
                  fill="#FFFFFF"
                  stroke="#1B7A3E"
                  strokeWidth="4"
                />
                {/* Green Banner Text */}
                <text
                  x="250"
                  y="285"
                  fill="#1B7A3E"
                  fontSize="29"
                  fontWeight="900"
                  textAnchor="middle"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  letterSpacing="0.5"
                >
                  Path to Inner Peace
                </text>
              </g>
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Brand Header & Tagline */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#D4AF37] block mb-1">
          Path to Inner Peace
        </span>
        <p className="text-[11px] sm:text-xs text-emerald-200/80 tracking-wider font-light italic mb-5">
          Train Your Mind. Transform Your Life.
        </p>
      </motion.div>

      {/* Main Large Title */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mb-3"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white flex items-center justify-center gap-2">
          <span>🎁</span>
          <span className="gold-text-gradient">FREE Welcome Kit</span>
        </h1>
        <p className="text-xs text-slate-300/90 font-light mt-1.5 flex items-center justify-center gap-1">
          <span>Powered by</span>
          <span className="font-semibold text-emerald-300">Path to Inner Peace</span>
        </p>
      </motion.div>

      {/* Description Paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="text-sm sm:text-base text-slate-200/90 leading-relaxed font-light max-w-xl mx-auto mb-6 px-2"
      >
        <span className="block font-medium text-white mb-1">Welcome!</span>
        We&apos;ve prepared a collection of premium mental wellness resources to help you reduce stress, improve sleep, and begin your journey toward a calmer, stronger mind.
      </motion.p>

      {/* Premium Value Badges */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
      >
        <div className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#0F4C45]/60 border border-[#D4AF37]/40 text-[#FFF2BE] shadow-[0_2px_12px_rgba(212,175,55,0.15)] flex items-center justify-center backdrop-blur-md">
          <span>Worth Thousands in Value</span>
        </div>

        <div className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#1C6B63]/50 border border-emerald-400/40 text-emerald-200 shadow-[0_2px_12px_rgba(45,212,191,0.15)] flex items-center gap-1.5 backdrop-blur-md">
          <Heart className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
          <span>💚 Completely FREE</span>
        </div>
      </motion.div>
    </header>
  );
};
