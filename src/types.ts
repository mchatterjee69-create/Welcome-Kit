export interface UserData {
  name: string;
  mobile: string;
  email: string;
  registeredAt?: string;
}

export interface ResourceCardData {
  id: string;
  iconName: 'Brain' | 'Wind' | 'Moon' | 'BookOpen';
  title: string;
  description: string;
  buttonText: string;
  buttonActionUrl: string;
  badge?: string;
  hasPreview?: boolean;
}

export interface ChallengeBenefit {
  text: string;
}

export type ModalType = 'audio' | 'assessment' | 'sleep' | 'guide' | 'challenge' | 'share' | 'registration' | null;

