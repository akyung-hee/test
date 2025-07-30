import React from 'react';

interface PraiseCharacterProps {
  state?: 'idle' | 'loading' | 'success';
}

export const PraiseCharacter: React.FC<PraiseCharacterProps> = ({ state = 'idle' }) => {
  const stateClasses: { [key: string]: string } = {
    idle: 'animate-float',
    loading: 'animate-excited-spin',
    success: 'animate-fade-in-up',
  };

  return (
    <div className={`relative w-32 h-32 sm:w-40 sm:h-40 ${stateClasses[state]}`}>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <g style={{ filter: 'url(#glow)' }}>
           <path d="M50 0 L61.2 34.5 L97.5 34.5 L68.1 55.9 L79.4 90.5 L50 69.1 L20.6 90.5 L31.9 55.9 L2.5 34.5 L38.8 34.5 Z" fill="#FFD700" stroke="#FDB813" strokeWidth="1"/>
        </g>
        {/* Face */}
        <circle cx="42" cy="45" r="4" fill="#4A2511" />
        <circle cx="58" cy="45" r="4" fill="#4A2511" />
        <path d="M40 58 Q50 68 60 58" stroke="#4A2511" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Blush */}
        <ellipse cx="35" cy="53" rx="7" ry="4" fill="#FF8C8C" opacity="0.6"/>
        <ellipse cx="65" cy="53" rx="7" ry="4" fill="#FF8C8C" opacity="0.6"/>
      </svg>
    </div>
  );
};