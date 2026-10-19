import React from 'react';

interface SaarthiLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  showTagline?: boolean;
  className?: string;
  variant?: 'light' | 'dark' | 'auto';
}

export const SaarthiLogo: React.FC<SaarthiLogoProps> = ({
  size = 'md',
  showWordmark = true,
  showTagline = false,
  className = '',
  variant = 'auto'
}) => {
  // Dimensions for the icon
  const iconSizes = {
    sm: 'h-7 w-7',
    md: 'h-9 w-9',
    lg: 'h-11 w-11',
    xl: 'h-14 w-14'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-2xl'
  };

  const badgeSizes = {
    sm: 'text-[9px] px-1.5 py-0.2',
    md: 'text-[10px] px-2 py-0.5',
    lg: 'text-xs px-2.5 py-0.5',
    xl: 'text-sm px-3 py-1'
  };

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Compass & Guiding Path SVG Icon */}
      <div
        className={`relative flex ${iconSizes[size]} shrink-0 items-center justify-center rounded-xl bg-linear-to-tr from-indigo-700 via-indigo-600 to-violet-600 p-1.5 text-white shadow-md shadow-indigo-600/20 ring-1 ring-white/20`}
      >
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          {/* Subtle Outer Compass Ring */}
          <circle
            cx="18"
            cy="18"
            r="15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="2 3"
            strokeOpacity="0.45"
          />

          {/* Dynamic Guiding Path / Orbit Arc */}
          <path
            d="M 6 22 C 10 12, 22 8, 30 14"
            stroke="#38BDF8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeOpacity="0.9"
          />

          {/* AI Energy Node on Path */}
          <circle cx="21" cy="9.8" r="2.2" fill="#38BDF8" />
          <circle cx="21" cy="9.8" r="4" stroke="#38BDF8" strokeWidth="0.8" strokeOpacity="0.5" />

          {/* 4-Point Precision Compass Star Needle */}
          {/* North Point */}
          <path
            d="M 18 5 L 20.8 15.2 L 18 18 Z"
            fill="#FFFFFF"
          />
          {/* South Point */}
          <path
            d="M 18 31 L 15.2 20.8 L 18 18 Z"
            fill="currentColor"
            fillOpacity="0.75"
          />
          {/* East Point */}
          <path
            d="M 31 18 L 20.8 15.2 L 18 18 Z"
            fill="currentColor"
            fillOpacity="0.85"
          />
          {/* West Point */}
          <path
            d="M 5 18 L 15.2 20.8 L 18 18 Z"
            fill="#FFFFFF"
            fillOpacity="0.95"
          />

          {/* Central AI Nucleus Core */}
          <circle cx="18" cy="18" r="2.8" fill="#FFFFFF" />
          <circle cx="18" cy="18" r="1.4" fill="#4F46E5" />
        </svg>
      </div>

      {/* Wordmark and Tagline */}
      {showWordmark && (
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-tight text-slate-900 ${textSizes[size]} font-heading`}
            >
              Saarthi
            </span>
            <span
              className={`font-extrabold uppercase tracking-wider rounded-md bg-linear-to-r from-indigo-600 to-violet-600 text-white ${badgeSizes[size]} shadow-2xs`}
            >
              AI
            </span>
          </div>
          {showTagline && (
            <span className="text-[10px] font-medium text-slate-500 tracking-tight mt-1">
              Your Career. Your Journey. Your Saarthi.
            </span>
          )}
        </div>
      )}
    </div>
  );
};
