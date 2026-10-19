import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  AlertCircle,
  GraduationCap,
  Clock,
  TrendingUp,
  Award,
  Zap,
  Target
} from 'lucide-react';
import { UserProfile, TargetRole } from '../types';
import { CAREER_TAXONOMY } from '../data/taxonomy';
import { TelemetryReport } from '../lib/storage';
import { ActiveTab } from './Sidebar';

interface CareerDashboardProps {
  profile: UserProfile;
  telemetry: TelemetryReport;
  setActiveTab: (tab: ActiveTab) => void;
  onToggleTask: (taskId: string) => void;
  onOpenAbout: () => void;
}

export const CareerDashboard: React.FC<CareerDashboardProps> = ({
  profile,
  telemetry,
  setActiveTab,
  onToggleTask,
  onOpenAbout
}) => {
  const spec = CAREER_TAXONOMY[profile.targetRole];

  // Determine Next Best Action
  const nextMissingSkill = telemetry.missingCoreSkills[0];
  const hasPendingTasks = profile.plannerTasks.some(t => !t.completed);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 mb-2">
              <Target className="h-3.5 w-3.5" />
              Active Target Role: {profile.targetRole}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome back, {profile.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
              {profile.education} • Tracking placement readiness for {profile.targetRole} roles with a commitment of {profile.weeklyCommitment} hours/week.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('roadmap')}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition"
            >
              <span>View Learning Roadmap</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
            >
              <span>Audit Skill Gaps</span>
            </button>
          </div>
        </div>

        {/* Telemetry Metric Cards Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100">
          {/* Card 1: Internship Readiness */}
          <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/70">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold">Internship Readiness</span>
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {telemetry.overallReadiness}%
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-emerald-600 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${telemetry.overallReadiness}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              {telemetry.overallReadiness >= 75 ? 'Industry Ready' : 'In Preparation'}
            </span>
          </div>

          {/* Card 2: Skill Match */}
          <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/70">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold">Core Skills Match</span>
              <CheckCircle2 className="h-4 w-4 text-indigo-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {telemetry.skillMatchPct}%
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${telemetry.skillMatchPct}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              {telemetry.verifiedCount} of {telemetry.totalCoreSkills} core requirements
            </span>
          </div>

          {/* Card 3: Weekly Tasks */}
          <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/70">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold">Weekly Tasks</span>
              <Calendar className="h-4 w-4 text-sky-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {telemetry.weeklyTasksDone} / {telemetry.weeklyTasksTotal}
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-sky-600 h-1.5 rounded-full transition-all duration-500"
                style={{
                  width: `${
                    telemetry.weeklyTasksTotal > 0
                      ? Math.round((telemetry.weeklyTasksDone / telemetry.weeklyTasksTotal) * 100)
                      : 0
                  }%`
                }}
              />
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              {profile.weeklyCommitment} hours allocated
            </span>
          </div>

          {/* Card 4: Interview Average */}
          <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/70">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold">Interview Average</span>
              <Award className="h-4 w-4 text-amber-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {telemetry.interviewAvg} <span className="text-sm font-normal text-slate-400">/ 100</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-amber-600 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${telemetry.interviewAvg}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              {profile.interviewHistory.length} mock sessions recorded
            </span>
          </div>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Priority Action & Weekly Schedule */}
        <div className="lg:col-span-2 space-y-6">
          {/* Priority Next Action Card */}
          <div className="rounded-xl border border-indigo-200 bg-linear-to-r from-indigo-50/70 to-white p-5 shadow-2xs">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200 shadow-2xs">
                  <Zap className="h-3 w-3 text-indigo-600" />
                  Recommended Next Best Action
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {nextMissingSkill
                    ? `Resolve Missing Competency: Master ${nextMissingSkill}`
                    : `Reinforce Interview Practice: Complete System Design Drill`}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                  {nextMissingSkill
                    ? `Our deterministic skill scan identified ${nextMissingSkill} as a critical requirement for ${profile.targetRole} internships. Adding this will boost your readiness score.`
                    : `You have satisfied baseline skills for ${profile.targetRole}. Run an AI technical mock interview to validate your verbal communication.`}
                </p>
              </div>

              <button
                onClick={() => (nextMissingSkill ? setActiveTab('skills') : setActiveTab('interview'))}
                className="shrink-0 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition"
              >
                {nextMissingSkill ? 'View Gap Analysis' : 'Start Mock Interview'}
              </button>
            </div>
          </div>

          {/* Weekly Study Planner Tasks Box */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">Current Week Study Tasks</h3>
              </div>
              <button
                onClick={() => setActiveTab('planner')}
                className="text-xs font-bold text-indigo-600 hover:underline"
              >
                Manage Full Planner →
              </button>
            </div>

            <div className="divide-y divide-slate-100 mt-2">
              {profile.plannerTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => onToggleTask(task.id)}
                  className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-slate-50 cursor-pointer transition"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition ${
                        task.completed
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {task.completed && <CheckCircle2 className="h-3.5 w-3.5" />}
                    </div>
                    <div>
                      <span
                        className={`text-xs ${
                          task.completed
                            ? 'line-through text-slate-400'
                            : 'text-slate-800 font-semibold'
                        }`}
                      >
                        {task.task}
                      </span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-slate-400 font-medium">{task.day}</span>
                        <span className="text-[10px] text-slate-400">•</span>
                        <span className="text-[10px] text-indigo-600 font-semibold">
                          {task.durationHours} hrs
                        </span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      task.completed
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {task.completed ? 'Done' : task.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Target Role Details & Skills Inventory */}
        <div className="space-y-6">
          {/* Target Role Spec Card */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                Pathway Blueprint
              </span>
              <h3 className="text-base font-extrabold text-slate-900 mt-0.5">{spec.title}</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{spec.description}</p>
            </div>

            <div className="rounded-lg bg-slate-50 p-3 border border-slate-200/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Median Junior Compensation:
              </span>
              <span className="text-sm font-extrabold text-slate-900">{spec.medianJuniorSalary}</span>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Core Skills Evaluation:
              </span>
              <div className="space-y-1.5">
                {spec.coreSkills.map((s) => {
                  const verified = profile.currentSkills.some(
                    (cs) => cs.toLowerCase() === s.toLowerCase()
                  );
                  return (
                    <div
                      key={s}
                      className="flex items-center justify-between text-xs py-1 px-2 rounded-md bg-slate-50 border border-slate-100"
                    >
                      <span className="font-semibold text-slate-800">{s}</span>
                      {verified ? (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Verified ✓
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                          Gap ✕
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => setActiveTab('skills')}
              className="w-full py-2 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
            >
              Update Verified Skills
            </button>
          </div>

          {/* Quick Academic Attribution Box */}
          <div
            onClick={onOpenAbout}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs hover:border-indigo-300 cursor-pointer transition"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs">
                MP
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-heading">
                  Creator & Architect
                </span>
                <span className="text-xs font-bold text-slate-900">Made by Manav Parmar</span>
                <p className="text-[10px] text-indigo-600 font-medium">Your Career. Your Journey. Your Saarthi.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
