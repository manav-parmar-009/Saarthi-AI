import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  GitPullRequest,
  CheckCircle2,
  Clock,
  BookOpen,
  Loader2,
  RotateCcw,
  Layers,
  Award,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { UserProfile, GeneratedRoadmap } from '../types';
import { generateRoadmapViaAI } from '../lib/gemini';

interface RoadmapGeneratorProps {
  profile: UserProfile;
  onUpdateProfile: (updater: (prev: UserProfile) => UserProfile) => void;
}

export const RoadmapGenerator: React.FC<RoadmapGeneratorProps> = ({
  profile,
  onUpdateProfile
}) => {
  const [roadmap, setRoadmap] = useState<GeneratedRoadmap | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sourceBadge, setSourceBadge] = useState<string>('');

  const fetchRoadmap = async () => {
    setIsLoading(true);
    const result = await generateRoadmapViaAI(
      profile.targetRole,
      profile.currentSkills,
      profile.weeklyCommitment,
      profile.education
    );
    setRoadmap(result.data);
    setSourceBadge(result.modelBadge);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRoadmap();
  }, [profile.targetRole, profile.weeklyCommitment]);

  const toggleNodeCompletion = (nodeId: string) => {
    onUpdateProfile((prev) => {
      const exists = prev.roadmapCompletedNodes.includes(nodeId);
      const updated = exists
        ? prev.roadmapCompletedNodes.filter((id) => id !== nodeId)
        : [...prev.roadmapCompletedNodes, nodeId];
      return { ...prev, roadmapCompletedNodes: updated };
    });
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Personalized AI Career Roadmap
            </h1>
            {sourceBadge && (
              <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700 border border-indigo-100">
                <Sparkles className="h-3 w-3" />
                {sourceBadge}
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Multi-phase learning path customized for <strong>{profile.targetRole}</strong>, calibrated for{' '}
            <strong>{profile.weeklyCommitment} hours/week</strong> of dedicated preparation.
          </p>
        </div>

        <button
          onClick={fetchRoadmap}
          disabled={isLoading}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 disabled:opacity-50 transition"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Synthesizing...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              <span>Regenerate Roadmap</span>
            </>
          )}
        </button>
      </div>

      {/* Summary Rationale */}
      {roadmap?.summary && (
        <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-4 text-xs text-indigo-900 leading-relaxed">
          <strong className="font-bold">Architectural Rationale:</strong> {roadmap.summary}
        </div>
      )}

      {/* Roadmap Phase Timeline */}
      {isLoading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-xs">
          <Loader2 className="mx-auto h-8 w-8 text-indigo-600 animate-spin mb-3" />
          <h3 className="text-sm font-bold text-slate-800">
            Synthesizing curriculum with Gemini 3.8 Flash...
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Analyzing current skills, time constraints, and prerequisite dependencies.
          </p>
        </div>
      ) : !roadmap ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <GitPullRequest className="mx-auto h-8 w-8 text-indigo-500 mb-2" />
          <h3 className="text-sm font-bold text-slate-900">No active roadmap loaded</h3>
          <button
            onClick={fetchRoadmap}
            className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700"
          >
            Generate Initial Roadmap
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {roadmap.phases.map((phase) => {
            const nodeId = `phase-${phase.phaseNumber}`;
            const isCompleted = profile.roadmapCompletedNodes.includes(nodeId);

            return (
              <div
                key={phase.phaseNumber}
                className={`rounded-2xl border transition-all duration-200 bg-white p-6 shadow-xs ${
                  isCompleted ? 'border-emerald-300 ring-1 ring-emerald-200/50' : 'border-slate-200'
                }`}
              >
                {/* Phase Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-lg font-bold text-xs ${
                        isCompleted
                          ? 'bg-emerald-600 text-white'
                          : 'bg-indigo-100 text-indigo-700'
                      }`}
                    >
                      P{phase.phaseNumber}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                        {phase.duration}
                      </span>
                      <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
                        {phase.title}
                      </h3>
                    </div>
                  </div>

                  {/* Mark Milestone Completed Button */}
                  <button
                    onClick={() => toggleNodeCompletion(nodeId)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      isCompleted
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                        : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <CheckCircle2
                      className={`h-4 w-4 ${isCompleted ? 'text-emerald-600' : 'text-slate-400'}`}
                    />
                    <span>{isCompleted ? 'Milestone Completed ✓' : 'Mark Phase Completed'}</span>
                  </button>
                </div>

                {/* Phase Description */}
                <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                  {phase.description}
                </p>

                {/* Key Skills Covered */}
                <div className="mt-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Target Competencies:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {phase.keySkills.map((k) => (
                      <span
                        key={k}
                        className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-800"
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Milestone Capstone Specification */}
                <div className="mt-4 rounded-xl bg-slate-50/80 p-3.5 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                      Phase Capstone Milestone Deliverable:
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                      {phase.milestoneProject}
                    </h4>
                  </div>
                  <button
                    onClick={() => toggleNodeCompletion(nodeId)}
                    className="self-start sm:self-auto text-xs font-bold text-indigo-600 hover:underline"
                  >
                    {isCompleted ? 'Verified' : 'Verify Milestone →'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
