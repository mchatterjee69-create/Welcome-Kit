import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { FloatingParticles } from './components/FloatingParticles';
import { HeaderLogo } from './components/HeaderLogo';
import { ResourceCard } from './components/ResourceCard';
import { BeautifulDivider } from './components/BeautifulDivider';
import { ChallengeSection } from './components/ChallengeSection';
import { Footer } from './components/Footer';
import { BreathingPlayerModal } from './components/BreathingPlayerModal';
import { ChallengeModal } from './components/ChallengeModal';
import { ShareModal } from './components/ShareModal';
import { TeaserModal } from './components/TeaserModal';
import { RegistrationModal } from './components/RegistrationModal';
import { AdminLeadsModal } from './components/AdminLeadsModal';
import { ResourceCardData, UserData } from './types';

export default function App() {
  const confettiCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeModal, setActiveModal] = useState<
    'audio' | 'challenge' | 'share' | 'teaser' | 'registration' | 'adminLeads' | null
  >(null);
  const [selectedTeaserCard, setSelectedTeaserCard] = useState<ResourceCardData | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  // Load saved user registration data on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('path_inner_peace_user_data');
      if (saved) {
        setUserData(JSON.parse(saved));
      } else {
        // Auto-prompt registration modal after brief delay if not registered yet
        const regTimer = setTimeout(() => {
          setActiveModal('registration');
        }, 800);
        return () => clearTimeout(regTimer);
      }
    } catch {
      // Ignore JSON parse errors
    }
  }, []);

  // Trigger subtle luxury gold/emerald confetti burst on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const canvas = confettiCanvasRef.current;
        if (canvas && typeof canvas.getBoundingClientRect === 'function') {
          const myConfetti = confetti.create(canvas, {
            resize: true,
          });
          myConfetti({
            particleCount: 35,
            spread: 60,
            origin: { y: 0.35 },
            colors: ['#D4AF37', '#FFF2BE', '#1C6B63', '#6EE7B7'],
            ticks: 200,
            gravity: 0.7,
            scalar: 0.9,
            disableForReducedMotion: true,
          });
        }
      } catch (err) {
        console.warn('Confetti effect bypassed:', err);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const handleSaveUserData = (data: UserData) => {
    setUserData(data);
    localStorage.setItem('path_inner_peace_user_data', JSON.stringify(data));
  };

  const resourceCards: ResourceCardData[] = [
    {
      id: 'card-1',
      iconName: 'Brain',
      title: '🧠 Mental Fitness Assessment & Personalized Mind Report',
      description:
        'Discover your Mental Fitness Score, identify your strengths and growth areas, and receive a personalized report designed just for you.',
      buttonText: '📊 Start My Assessment',
      buttonActionUrl: 'https://mental-fitness-asessment-e15c.vercel.app',
      badge: 'Assessment',
      hasPreview: true,
    },
    {
      id: 'card-2',
      iconName: 'Headphones',
      title: '🌬 5-Minute Stress Reset Audio',
      description:
        'A quick guided breathing practice to instantly calm your mind, reduce stress, and reset your nervous system in just five minutes.',
      buttonText: '🎧 Listen Now',
      buttonActionUrl:
        'https://drive.google.com/file/d/1_XsxGpVBnKgLnP8Cr5jhsG8mpZQzxHWA/view?usp=drivesdk',
      badge: 'Audio Practice',
      hasPreview: true,
    },
    {
      id: 'card-3',
      iconName: 'Moon',
      title: '😴 Better Sleep Blueprint',
      description:
        'Learn a simple nighttime routine to improve sleep quality, relax your mind, and wake up feeling refreshed.',
      buttonText: '🌙 Open Sleep Blueprint',
      buttonActionUrl: 'https://better-sleep-blueprint.ai.studio',
      badge: 'Sleep Guide',
      hasPreview: true,
    },
    {
      id: 'card-4',
      iconName: 'BookOpen',
      title: '📖 Mental Reset Starter Guide',
      description:
        'A practical beginner\'s guide with powerful mental exercises, daily habits, and simple techniques to create lasting inner peace.',
      buttonText: '📘 Read Starter Guide',
      buttonActionUrl: 'https://path-to-inner-peace.ai.studio',
      badge: 'Starter Toolkit',
      hasPreview: true,
    },
  ];

  const handleOpenPreview = (cardId: string) => {
    if (!userData) {
      setActiveModal('registration');
      return;
    }
    if (cardId === 'card-2') {
      setActiveModal('audio');
    } else {
      const found = resourceCards.find((c) => c.id === cardId) || null;
      setSelectedTeaserCard(found);
      setActiveModal('teaser');
    }
  };

  return (
    <div className="min-h-screen bg-wellness-gradient text-slate-100 relative overflow-hidden flex flex-col justify-between selection:bg-[#D4AF37]/30 selection:text-[#FFF2BE]">
      {/* Canvas element for celebratory confetti */}
      <canvas
        ref={confettiCanvasRef}
        className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      />

      {/* Background Floating Embers / Particles */}
      <FloatingParticles />

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-3 sm:px-6 py-6 sm:py-10 flex-1">
        {/* Header Logo Section */}
        <HeaderLogo
          onOpenShare={() => setActiveModal('share')}
          onOpenRegistration={() => setActiveModal('registration')}
          userData={userData}
        />

        {/* User Registration Status Notification Bar */}
        {userData ? (
          <div className="w-full max-w-2xl mx-auto mb-6 px-4 py-2.5 rounded-2xl bg-[#0F4C45]/50 border border-[#D4AF37]/40 backdrop-blur-md flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-200">
                Registered Pass for <strong className="text-[#FFF2BE]">{userData.name}</strong> ({userData.email})
              </span>
            </div>
            <button
              onClick={() => setActiveModal('registration')}
              className="text-[#D4AF37] font-semibold hover:underline cursor-pointer"
            >
              Update Info
            </button>
          </div>
        ) : (
          <div className="w-full max-w-2xl mx-auto mb-6 px-4 py-3 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/50 backdrop-blur-md flex flex-wrap items-center justify-between gap-2 text-xs shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            <span className="text-[#FFF2BE] font-medium">
              🎁 Enter your Name, Mobile & Email to claim your Welcome Kit
            </span>
            <button
              onClick={() => setActiveModal('registration')}
              className="btn-gold px-3.5 py-1 rounded-xl text-xs font-bold text-[#07231F] cursor-pointer"
            >
              Enter Details
            </button>
          </div>
        )}

        {/* Resource Cards Grid */}
        <section className="w-full max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 my-6">
          {resourceCards.map((card, idx) => (
            <ResourceCard
              key={card.id}
              card={card}
              index={idx}
              onOpenPreview={handleOpenPreview}
              userData={userData}
              onRequireRegistration={() => setActiveModal('registration')}
            />
          ))}
        </section>

        {/* Beautiful Divider */}
        <BeautifulDivider />

        {/* Final CTA Challenge Section */}
        <ChallengeSection onJoinChallenge={() => setActiveModal('challenge')} />
      </main>

      {/* Footer */}
      <Footer onOpenAdminLeads={() => setActiveModal('adminLeads')} />

      {/* Interactive Modals */}
      <RegistrationModal
        isOpen={activeModal === 'registration'}
        onClose={() => setActiveModal(null)}
        userData={userData}
        onSaveUserData={handleSaveUserData}
      />

      <AdminLeadsModal
        isOpen={activeModal === 'adminLeads'}
        onClose={() => setActiveModal(null)}
      />

      <BreathingPlayerModal
        isOpen={activeModal === 'audio'}
        onClose={() => setActiveModal(null)}
        driveAudioUrl={resourceCards[1].buttonActionUrl}
      />

      <ChallengeModal
        isOpen={activeModal === 'challenge'}
        onClose={() => setActiveModal(null)}
      />

      <ShareModal
        isOpen={activeModal === 'share'}
        onClose={() => setActiveModal(null)}
      />

      <TeaserModal
        card={selectedTeaserCard}
        onClose={() => {
          setActiveModal(null);
          setSelectedTeaserCard(null);
        }}
      />
    </div>
  );
}
