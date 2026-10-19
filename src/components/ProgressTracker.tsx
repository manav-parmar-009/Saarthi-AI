import React from 'react';
import {
  CheckCircle2,
  TrendingUp,
  Award,
  Calendar,
  FolderGit2,
  Mic,
  GitPullRequest,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { UserProfile } from '../types';
import { TelemetryReport } from '../lib/storage';

interface ProgressTrackerProps {
  profile: UserProfile;
  telemetry: TelemetryReport;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ profile, telemetry }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          Career Preparation Velocity & Progress Tracker
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Aggregated learning telemetry recording milestone completions, mock interview evaluations, and weekly study streaks for{' '}
          <strong>{profile.targetRole}</strong>.
        </p>
      </div>

      {/* Velocity Telemetry Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
            <span>Roadmap Nodes</span>
            <GitPullRequest className="h-4 w-4 text-indigo-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">
            {profile.roadmapCompletedNodes.length} Nodes
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {telemetry.roadmapPct}% curriculum progress
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
            <span>Interview Sessions</span>
            <Mic className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">
            {profile.interviewHistory.length} Sessions
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Average Score: {telemetry.interviewAvg} / 100
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
            <span>Tasks Completed</span>
            <Calendar className="h-4 w-4 text-sky-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">
            {telemetry.weeklyTasksDone} / {telemetry.weeklyTasksTotal}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Active study streak on track
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
            <span>Placement Index</span>
            <ShieldCheck className="h-4 w-4 text-amber-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">
            {telemetry.overallReadiness}%
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Composite scientific index
          </p>
        </div>
      </div>

      {/* Progress Breakdown Bars */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900">Competency Progress Burndown</h3>

        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold mb-1">
              <span className="text-slate-700">Core Technical Skills Verification</span>
              <span className="text-indigo-600 font-bold">{telemetry.skillMatchPct}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${telemetry.skillMatchPct}%` }} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-semibold mb-1">
              <span className="text-slate-700">Curriculum Roadmap Phase Completion</span>
              <span className="text-sky-600 font-bold">{telemetry.roadmapPct}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-sky-600 h-2 rounded-full" style={{ width: `${telemetry.roadmapPct}%` }} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-semibold mb-1">
              <span className="text-slate-700">Internship Readiness Pre-Requisite Checklist</span>
              <span className="text-emerald-600 font-bold">{telemetry.checklistPct}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-600 h-2 rounded-full" style={{ width: `${telemetry.checklistPct}%` }} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-semibold mb-1">
              <span className="text-slate-700">Technical Interview Rubric Performance</span>
              <span className="text-amber-600 font-bold">{telemetry.interviewAvg}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-amber-600 h-2 rounded-full" style={{ width: `${telemetry.interviewAvg}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Historical Interview Attempt Records */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900">
          Recorded Technical Mock Interview Attempts ({profile.interviewHistory.length})
        </h3>

        {profile.interviewHistory.length === 0 ? (
          <p className="text-xs text-slate-400 italic">No interview sessions recorded yet.</p>
        ) : (
          <div className="divide-y divide-slate-100">
            {profile.interviewHistory.map((rec) => (
              <div key={rec.id} className="py-4 space-y-2 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-[10px]">
                      {rec.category}
                    </span>
                    <span className="text-slate-400">{rec.date}</span>
                  </div>
                  <div className="flex items-center gap-1 font-extrabold text-indigo-600">
                    <Award className="h-3.5 w-3.5" />
                    <span>Score: {rec.score} / 10</span>
                  </div>
                </div>

                <h4 className="text-xs font-bold text-slate-900 leading-snug">
                  &ldquo;{rec.question}&rdquo;
                </h4>

                <p className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <strong>Evaluator Feedback:</strong> &ldquo;{rec.feedback}&rdquo;
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
