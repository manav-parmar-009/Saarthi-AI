import React, { useState } from 'react';
import {
  UserCheck,
  RotateCcw,
  Save,
  CheckCircle2,
  Trash2,
  Sliders,
  Award,
  GraduationCap
} from 'lucide-react';
import { UserProfile, TargetRole } from '../types';
import { CAREER_TAXONOMY } from '../data/taxonomy';
import { resetUserProfile } from '../lib/storage';

interface ProfileSettingsProps {
  profile: UserProfile;
  onUpdateProfile: (updater: (prev: UserProfile) => UserProfile) => void;
  onOpenAbout: () => void;
}

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  profile,
  onUpdateProfile,
  onOpenAbout
}) => {
  const [name, setName] = useState(profile.name);
  const [education, setEducation] = useState(profile.education);
  const [targetRole, setTargetRole] = useState<TargetRole>(profile.targetRole);
  const [weeklyHours, setWeeklyHours] = useState(profile.weeklyCommitment);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile((prev) => ({
      ...prev,
      name: name.trim() || 'Engineering Scholar',
      education: education.trim() || 'B.Tech Student',
      targetRole,
      weeklyCommitment: weeklyHours
    }));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleFullReset = () => {
    if (window.confirm('Are you sure you want to reset all stored progress, interview records, and task completions to defaults?')) {
      const defaultState = resetUserProfile();
      onUpdateProfile(() => defaultState);
      setName(defaultState.name);
      setEducation(defaultState.education);
      setTargetRole(defaultState.targetRole);
      setWeeklyHours(defaultState.weeklyCommitment);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          Profile Settings & Career Goals
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Manage your personal target engineering pathway, weekly study bandwidth, and academic context. All updates persist locally in your browser.
        </p>
      </div>

      {savedSuccess && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs font-semibold text-emerald-800 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>Profile settings successfully synchronized and saved to local storage!</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSave} className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        {/* Full Name */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
            Student Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full max-w-lg rounded-xl border border-slate-300 px-4 py-2.5 text-xs font-semibold text-slate-900 focus:border-indigo-600 focus:outline-none"
            placeholder="e.g. Alex Sharma"
          />
        </div>

        {/* Education Background */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
            Education / Academic Affiliation
          </label>
          <input
            type="text"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            className="w-full max-w-lg rounded-xl border border-slate-300 px-4 py-2.5 text-xs font-semibold text-slate-900 focus:border-indigo-600 focus:outline-none"
            placeholder="e.g. B.Tech in CSE (AI, ML & DS) — 3rd Year"
          />
        </div>

        {/* Target Role Dropdown */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
            Target Engineering Career Pathway
          </label>
          <select
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value as TargetRole)}
            className="w-full max-w-lg rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-900 focus:border-indigo-600 focus:outline-none"
          >
            {Object.keys(CAREER_TAXONOMY).map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <p className="text-[11px] text-slate-400 mt-1">
            Updating your target role recalibrates your skill gap calculations, interview questions, and recommended project blueprints.
          </p>
        </div>

        {/* Weekly Study Commitment Slider */}
        <div>
          <div className="flex items-center justify-between max-w-lg mb-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Weekly Study Commitment:
            </label>
            <span className="text-sm font-extrabold text-indigo-600">
              {weeklyHours} Hours / Week
            </span>
          </div>
          <input
            type="range"
            min={5}
            max={40}
            step={1}
            value={weeklyHours}
            onChange={(e) => setWeeklyHours(Number(e.target.value))}
            className="w-full max-w-lg accent-indigo-600 cursor-pointer"
          />
          <div className="flex justify-between max-w-lg text-[10px] text-slate-400 font-semibold mt-1">
            <span>5 hrs (Casual Pace)</span>
            <span>20 hrs (Recommended)</span>
            <span>40 hrs (Intensive Bootcamp)</span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition shadow-xs"
          >
            <Save className="h-4 w-4" />
            <span>Save Profile Preferences</span>
          </button>
        </div>
      </form>

      {/* Danger Zone / Reset */}
      <div className="rounded-2xl border border-rose-200 bg-white p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-rose-900">Reset Application Data</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Clears locally cached task progress, customized skills, and mock interview attempts.
          </p>
        </div>

        <button
          onClick={handleFullReset}
          className="inline-flex items-center gap-1.5 rounded-xl border border-rose-300 bg-rose-50 px-4 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100 transition self-start sm:self-auto"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset All Data</span>
        </button>
      </div>

      {/* Academic Citation Box */}
      <div
        onClick={onOpenAbout}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-indigo-300 cursor-pointer transition flex items-center justify-between"
      >
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700 font-bold text-sm">
            MP
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 font-heading">Saarthi AI</h4>
            <p className="text-xs text-slate-500">
              Created by Manav Parmar • &ldquo;Your Career. Your Journey. Your Saarthi.&rdquo;
            </p>
          </div>
        </div>
        <span className="text-xs font-bold text-indigo-600 hover:underline">
          View Details →
        </span>
      </div>
    </div>
  );
};
