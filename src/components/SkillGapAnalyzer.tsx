import React, { useState } from 'react';
import {
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Plus,
  X,
  Target,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { UserProfile } from '../types';
import { CAREER_TAXONOMY } from '../data/taxonomy';
import { TelemetryReport } from '../lib/storage';

interface SkillGapAnalyzerProps {
  profile: UserProfile;
  telemetry: TelemetryReport;
  onUpdateProfile: (updater: (prev: UserProfile) => UserProfile) => void;
}

export const SkillGapAnalyzer: React.FC<SkillGapAnalyzerProps> = ({
  profile,
  telemetry,
  onUpdateProfile
}) => {
  const [newSkillInput, setNewSkillInput] = useState('');
  const spec = CAREER_TAXONOMY[profile.targetRole];

  const handleAddSkill = (skillToAdd: string) => {
    const trimmed = skillToAdd.trim();
    if (!trimmed) return;
    if (profile.currentSkills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) return;

    onUpdateProfile((prev) => ({
      ...prev,
      currentSkills: [...prev.currentSkills, trimmed]
    }));
    setNewSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onUpdateProfile((prev) => ({
      ...prev,
      currentSkills: prev.currentSkills.filter((s) => s !== skillToRemove)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Deterministic Skill Gap Analyzer
            </h1>
            <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700 border border-indigo-100">
              Set-Theory Overlap Math
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Evaluates your verified inventory against the official requirements for{' '}
            <strong>{profile.targetRole}</strong>.
          </p>
        </div>

        {/* Big Overall Match Percentage */}
        <div className="flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200">
          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Match Score
            </span>
            <span className="text-xl font-extrabold text-indigo-600">
              {telemetry.skillMatchPct}%
            </span>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div className="text-xs text-slate-500 leading-snug">
            {telemetry.verifiedCount} of {telemetry.totalCoreSkills} core requirements
          </div>
        </div>
      </div>

      {/* Split-Screen Diagnostic Console */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Console: User's Verified Inventory */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Your Verified Skills ({profile.currentSkills.length})
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Click any skill pill to remove it</p>
            </div>
            <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">
              Active Inventory
            </span>
          </div>

          {/* Current Skills Pillbox */}
          <div className="flex flex-wrap gap-2 min-h-[140px] p-3 rounded-xl bg-slate-50 border border-slate-200/80 items-start content-start">
            {profile.currentSkills.map((skill) => {
              const isTargetCore = spec.coreSkills.some(
                (cs) => cs.toLowerCase() === skill.toLowerCase()
              );
              return (
                <button
                  key={skill}
                  onClick={() => handleRemoveSkill(skill)}
                  title="Click to remove"
                  className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold shadow-2xs transition group ${
                    isTargetCore
                      ? 'bg-indigo-50 border border-indigo-200 text-indigo-900 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-700'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-700'
                  }`}
                >
                  <span>{skill}</span>
                  <X className="h-3 w-3 text-slate-400 group-hover:text-rose-600" />
                </button>
              );
            })}
          </div>

          {/* Add Skill Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddSkill(newSkillInput);
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={newSkillInput}
              onChange={(e) => setNewSkillInput(e.target.value)}
              placeholder="e.g. PyTorch, Docker, LangChain, SQL..."
              className="flex-1 rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-600 focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition"
            >
              <Plus className="h-4 w-4" />
              <span>Add Skill</span>
            </button>
          </form>

          {/* Quick Add Suggestions */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Common Industry Keywords:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Python',
                'SQL',
                'Docker',
                'Git',
                'FastAPI',
                'PyTorch',
                'TypeScript',
                'React',
                'Kubernetes',
                'AWS'
              ].map((suggestion) => {
                const alreadyHas = profile.currentSkills.some(
                  (s) => s.toLowerCase() === suggestion.toLowerCase()
                );
                if (alreadyHas) return null;
                return (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => handleAddSkill(suggestion)}
                    className="text-[11px] font-medium text-slate-600 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 px-2 py-0.5 rounded border border-slate-200/80 transition"
                  >
                    + {suggestion}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Console: Target Career Requirements & Gaps */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {profile.targetRole} Requirements
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Official competencies required for technical screenings
              </p>
            </div>
            <span className="text-xs font-extrabold text-indigo-600">
              {telemetry.verifiedCount} / {telemetry.totalCoreSkills} Satisfied
            </span>
          </div>

          {/* Core Competencies List */}
          <div className="space-y-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Essential Core Skills:
            </span>
            {spec.coreSkills.map((req) => {
              const isVerified = profile.currentSkills.some(
                (cs) => cs.toLowerCase() === req.toLowerCase()
              );

              return (
                <div
                  key={req}
                  className={`flex items-center justify-between p-3 rounded-xl border transition ${
                    isVerified
                      ? 'bg-emerald-50/60 border-emerald-200/80 text-slate-900'
                      : 'bg-rose-50/40 border-rose-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {isVerified ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0" />
                    )}
                    <span className="text-xs font-bold">{req}</span>
                  </div>

                  {isVerified ? (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">
                      Verified
                    </span>
                  ) : (
                    <button
                      onClick={() => handleAddSkill(req)}
                      className="text-[10px] font-bold text-indigo-700 bg-white border border-indigo-200 hover:bg-indigo-50 px-2.5 py-1 rounded shadow-2xs transition"
                    >
                      + Mark Acquired
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Secondary / Specialized Tools */}
          <div className="pt-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Recommended Toolchain & Secondary Tools:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {spec.secondarySkills.map((sec) => {
                const hasSec = profile.currentSkills.some(
                  (cs) => cs.toLowerCase() === sec.toLowerCase()
                );
                return (
                  <span
                    key={sec}
                    onClick={() => !hasSec && handleAddSkill(sec)}
                    className={`text-xs px-2.5 py-1 rounded-lg border font-medium cursor-pointer transition ${
                      hasSec
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-indigo-300'
                    }`}
                  >
                    {sec} {hasSec ? '✓' : '+'}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
