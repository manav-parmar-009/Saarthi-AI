import React from 'react';
import {
  LayoutDashboard,
  GitPullRequest,
  Sliders,
  FolderGit2,
  FileCheck2,
  Mic,
  GraduationCap,
  CalendarCheck2,
  CheckCircle2,
  ShieldCheck,
  UserCheck,
  X,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Info,
  Compass
} from 'lucide-react';
import { TargetRole } from '../types';
import { SaarthiLogo } from './SaarthiLogo';

export type ActiveTab =
  | 'dashboard'
  | 'roadmap'
  | 'skills'
  | 'projects'
  | 'resume'
  | 'interview'
  | 'resources'
  | 'planner'
  | 'tracker'
  | 'readiness'
  | 'profile';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  targetRole: TargetRole;
  onOpenAbout: () => void;
  onGoToLanding: () => void;
}

const NAV_ITEMS: { id: ActiveTab; label: string; icon: any; category: string }[] = [
  { id: 'dashboard', label: 'Career Dashboard', icon: LayoutDashboard, category: 'Core' },
  { id: 'roadmap', label: 'AI Career Roadmap', icon: GitPullRequest, category: 'Planning' },
  { id: 'skills', label: 'Skill Gap Analyzer', icon: Sliders, category: 'Planning' },
  { id: 'projects', label: 'AI Project Recommender', icon: FolderGit2, category: 'Preparation' },
  { id: 'resume', label: 'ATS Resume Reviewer', icon: FileCheck2, category: 'Preparation' },
  { id: 'interview', label: 'Interview Practice', icon: Mic, category: 'Preparation' },
  { id: 'resources', label: 'Learning Resources', icon: GraduationCap, category: 'Learning' },
  { id: 'planner', label: 'Weekly Study Planner', icon: CalendarCheck2, category: 'Learning' },
  { id: 'tracker', label: 'Progress Tracker', icon: CheckCircle2, category: 'Metrics' },
  { id: 'readiness', label: 'Internship Readiness', icon: ShieldCheck, category: 'Metrics' },
  { id: 'profile', label: 'Profile & Settings', icon: UserCheck, category: 'Settings' }
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpen,
  setIsOpen,
  isCollapsed,
  setIsCollapsed,
  targetRole,
  onOpenAbout,
  onGoToLanding
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Shell */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200/90 bg-white transition-all duration-200 ease-in-out lg:static ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'w-20' : 'w-64'}`}
      >
        {/* Brand Header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 px-4">
          <div
            onClick={onGoToLanding}
            className="flex items-center cursor-pointer overflow-hidden group"
          >
            {isCollapsed ? (
              <SaarthiLogo size="sm" showWordmark={false} />
            ) : (
              <SaarthiLogo size="sm" showWordmark={true} />
            )}
          </div>

          {/* Close for mobile */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Current Track Pill */}
        {!isCollapsed && (
          <div className="px-3 pt-3 pb-1">
            <div className="flex items-center justify-between rounded-xl bg-linear-to-r from-indigo-50/80 to-violet-50/50 border border-indigo-100/90 px-3 py-2 text-xs">
              <div className="flex items-center gap-1.5 min-w-0">
                <Compass className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
                <span className="text-[11px] font-bold text-indigo-950 truncate font-heading">
                  {targetRole}
                </span>
              </div>
              <button
                onClick={() => setActiveTab('profile')}
                className="text-[10px] text-indigo-600 hover:text-indigo-800 font-extrabold uppercase tracking-wider"
              >
                Change
              </button>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-2.5 py-2 space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                title={isCollapsed ? item.label : undefined}
                className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition ${
                  isActive
                    ? 'bg-linear-to-r from-indigo-600 to-indigo-700 text-white shadow-xs font-bold'
                    : 'text-slate-600 hover:bg-slate-100/90 hover:text-slate-900'
                }`}
              >
                <Icon
                  className={`h-4 w-4 shrink-0 transition ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-700'
                  }`}
                />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Creator Branding Anchored at Bottom */}
        <div className="border-t border-slate-100 p-3 shrink-0 bg-slate-50/70">
          <div
            onClick={onOpenAbout}
            className={`flex items-center gap-2.5 rounded-xl border border-slate-200/90 bg-white p-2.5 shadow-2xs hover:border-indigo-300 hover:bg-indigo-50/40 cursor-pointer transition ${
              isCollapsed ? 'justify-center p-2' : ''
            }`}
            title="Saarthi AI • Made by Manav Parmar"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-linear-to-tr from-indigo-600 to-violet-600 text-[10px] font-black text-white shadow-2xs">
              MP
            </div>
            {!isCollapsed && (
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                  Creator
                </span>
                <span className="text-xs font-bold text-slate-900 truncate">
                  Made by Manav Parmar
                </span>
              </div>
            )}
            {!isCollapsed && <Info className="h-3.5 w-3.5 text-slate-400 shrink-0" />}
          </div>
        </div>
      </aside>
    </>
  );
};
