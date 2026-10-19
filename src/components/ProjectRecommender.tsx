import React, { useState, useEffect } from 'react';
import {
  FolderGit2,
  Sparkles,
  Clock,
  Layers,
  CheckCircle2,
  ArrowRight,
  Loader2,
  Code2,
  FileText
} from 'lucide-react';
import { UserProfile, ProjectConcept } from '../types';
import { recommendProjectsViaAI } from '../lib/gemini';

interface ProjectRecommenderProps {
  profile: UserProfile;
  onUpdateProfile: (updater: (prev: UserProfile) => UserProfile) => void;
}

export const ProjectRecommender: React.FC<ProjectRecommenderProps> = ({
  profile,
  onUpdateProfile
}) => {
  const [projects, setProjects] = useState<ProjectConcept[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sourceBadge, setSourceBadge] = useState<string>('');
  const [activeNotification, setActiveNotification] = useState<string | null>(null);

  const fetchProjects = async () => {
    setIsLoading(true);
    const result = await recommendProjectsViaAI(profile.targetRole, profile.currentSkills);
    setProjects(result.data);
    setSourceBadge(result.modelBadge);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, [profile.targetRole]);

  const handleAddToPortfolio = (projectTitle: string) => {
    onUpdateProfile((prev) => ({
      ...prev,
      readinessChecklist: {
        ...prev.readinessChecklist,
        'capstone-deployed': true
      }
    }));
    setActiveNotification(`"${projectTitle}" has been verified in your Internship Readiness Portfolio!`);
    setTimeout(() => setActiveNotification(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              AI Project Recommender
            </h1>
            {sourceBadge && (
              <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700 border border-indigo-100">
                <Sparkles className="h-3 w-3" />
                {sourceBadge}
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Portfolio-grade blueprints targeting your unverified skills in <strong>{profile.targetRole}</strong>.
          </p>
        </div>

        <button
          onClick={fetchProjects}
          disabled={isLoading}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 disabled:opacity-50 transition"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Curating Blueprints...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              <span>Regenerate Projects</span>
            </>
          )}
        </button>
      </div>

      {/* Temporary Success Toast */}
      {activeNotification && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs font-semibold text-emerald-800 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{activeNotification}</span>
        </div>
      )}

      {/* Projects Grid */}
      {isLoading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-xs">
          <Loader2 className="mx-auto h-8 w-8 text-indigo-600 animate-spin mb-3" />
          <h3 className="text-sm font-bold text-slate-800">
            Synthesizing production blueprints with Gemini 3.8 Flash...
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Formulating problem statements, tech stacks, and Google X-Y-Z resume points.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between hover:border-indigo-300 transition"
            >
              <div className="space-y-4">
                {/* Level & Hours Tag */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded ${
                      proj.level === 'Beginner'
                        ? 'bg-sky-50 text-sky-700 border border-sky-200'
                        : proj.level === 'Intermediate'
                        ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {proj.level}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-slate-400 font-semibold">
                    <Clock className="h-3.5 w-3.5" />
                    <span>~{proj.estimatedHours} hrs</span>
                  </div>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                  {proj.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {proj.description}
                </p>

                {/* Tech Stack */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Recommended Tech Stack:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {proj.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Architecture Milestones */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Architecture Implementation Steps:
                  </span>
                  <ul className="space-y-1">
                    {proj.milestones.map((m, mIdx) => (
                      <li key={mIdx} className="text-xs text-slate-600 flex items-start gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 shrink-0 mt-1.5" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Google X-Y-Z Resume Bullet */}
                <div className="rounded-xl bg-slate-50 p-3 border border-slate-200/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1 mb-1">
                    <FileText className="h-3 w-3 text-indigo-600" />
                    ATS Resume Bullet (Google X-Y-Z):
                  </span>
                  <p className="text-xs text-slate-700 font-mono italic leading-relaxed">
                    &ldquo;{proj.resumeBullet}&rdquo;
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleAddToPortfolio(proj.title)}
                className="mt-6 w-full py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Add to My Portfolio</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
