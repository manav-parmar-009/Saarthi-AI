import React from 'react';
import { Menu, Sparkles, ShieldCheck, UserCheck, ArrowLeft, Heart, Award, Compass } from 'lucide-react';
import { TargetRole } from '../types';
import { CAREER_TAXONOMY } from '../data/taxonomy';

interface NavbarProps {
  onToggleSidebar: () => void;
  targetRole: TargetRole;
  onSelectRole: (role: TargetRole) => void;
  readinessPct: number;
  userName: string;
  onGoToLanding: () => void;
  onOpenAbout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleSidebar,
  targetRole,
  onSelectRole,
  readinessPct,
  userName,
  onGoToLanding,
  onOpenAbout
}) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-slate-200/90 bg-white/95 px-4 sm:px-6 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100"
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Back to Home CTA */}
        <button
          onClick={onGoToLanding}
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Home</span>
        </button>

        <div className="h-4 w-px bg-slate-200 hidden sm:block" />

        {/* Role Selector Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider hidden md:inline font-heading">
            Active Track:
          </span>
          <div className="relative">
            <select
              value={targetRole}
              onChange={(e) => onSelectRole(e.target.value as TargetRole)}
              className="appearance-none rounded-xl border border-slate-200 bg-slate-50/90 pl-3 pr-8 py-1.5 text-xs font-bold text-slate-900 hover:border-slate-300 focus:border-indigo-600 focus:outline-none cursor-pointer transition shadow-2xs font-heading"
            >
              {Object.keys(CAREER_TAXONOMY).map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <Compass className="pointer-events-none absolute right-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Readiness Pill */}
        <div className="flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50/80 px-3.5 py-1 text-xs font-bold text-emerald-800 shadow-2xs">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          <span>Readiness: {readinessPct}%</span>
        </div>

        {/* Creator Attribution */}
        <button
          onClick={onOpenAbout}
          className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-indigo-300 transition shadow-2xs"
        >
          <Award className="h-3.5 w-3.5 text-indigo-600" />
          <span>By Manav Parmar</span>
        </button>

        {/* User Avatar */}
        <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-tr from-indigo-600 to-violet-600 text-xs font-black text-white shadow-xs">
            {userName ? userName.charAt(0).toUpperCase() : 'A'}
          </div>
          <span className="hidden md:inline-block text-xs font-bold text-slate-900 max-w-[120px] truncate font-heading">
            {userName}
          </span>
        </div>
      </div>
    </header>
  );
};
