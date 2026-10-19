import React, { useState } from 'react';
import {
  FileCheck2,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Loader2,
  RotateCcw,
  FileText,
  Percent,
  Check
} from 'lucide-react';
import { UserProfile, ResumeAudit } from '../types';
import { auditResumeViaAI } from '../lib/gemini';
import { INITIAL_USER_PROFILE } from '../lib/storage';

interface ResumeAnalyzerProps {
  profile: UserProfile;
  onUpdateProfile: (updater: (prev: UserProfile) => UserProfile) => void;
}

export const ResumeAnalyzer: React.FC<ResumeAnalyzerProps> = ({
  profile,
  onUpdateProfile
}) => {
  const [resumeText, setResumeText] = useState(profile.resumeDraft || INITIAL_USER_PROFILE.resumeDraft);
  const [auditResult, setAuditResult] = useState<ResumeAudit | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sourceBadge, setSourceBadge] = useState<string>('');

  const runAudit = async () => {
    if (!resumeText.trim()) return;
    setIsLoading(true);
    const result = await auditResumeViaAI(resumeText, profile.targetRole);
    setAuditResult(result.data);
    setSourceBadge(result.modelBadge);

    // Save draft and update readiness checklist if score > 75
    onUpdateProfile((prev) => ({
      ...prev,
      resumeDraft: resumeText,
      readinessChecklist: {
        ...prev.readinessChecklist,
        'ats-resume-screened': result.data.score >= 70
      }
    }));
    setIsLoading(false);
  };

  const handleApplyImprovement = (improvedText: string) => {
    setResumeText((prev) => `${prev}\n\n[Applied Improvement]:\n- ${improvedText}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              ATS Resume Reviewer & Semantic Inspector
            </h1>
            {sourceBadge && (
              <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700 border border-indigo-100">
                <Sparkles className="h-3 w-3" />
                {sourceBadge}
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Evaluates format readability, keyword alignment, and applies the{' '}
            <strong>Google X-Y-Z formula</strong> for <strong>{profile.targetRole}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setResumeText(INITIAL_USER_PROFILE.resumeDraft)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Load Sample</span>
          </button>
          <button
            onClick={runAudit}
            disabled={isLoading || !resumeText.trim()}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 disabled:opacity-50 transition"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Auditing...</span>
              </>
            ) : (
              <>
                <FileCheck2 className="h-4 w-4" />
                <span>Run ATS Audit</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Side-by-Side Document & Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Pane: Resume Editor */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Resume Content (Markdown / Plain Text)
              </label>
              <span className="text-[11px] text-slate-400 font-mono">
                {resumeText.length} characters
              </span>
            </div>
            <textarea
              rows={16}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your education, skills, projects, and work experience bullets here..."
              className="w-full rounded-xl border border-slate-300 p-4 text-xs font-mono leading-relaxed focus:border-indigo-600 focus:outline-none resize-y"
            />
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
            <span>Target Role: <strong className="text-slate-700">{profile.targetRole}</strong></span>
            <button
              onClick={runAudit}
              className="text-xs font-bold text-indigo-600 hover:underline"
            >
              Scan Document →
            </button>
          </div>
        </div>

        {/* Right Pane: ATS Intelligence Inspector */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
          {!auditResult ? (
            <div className="h-full min-h-[320px] flex flex-col items-center justify-center text-center p-8 text-slate-400">
              <FileCheck2 className="h-10 w-10 mb-3 text-slate-300" />
              <h3 className="text-sm font-bold text-slate-700">No ATS Audit Run Yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                Click &ldquo;Run ATS Audit&rdquo; to analyze your resume against {profile.targetRole} standards.
              </p>
              <button
                onClick={runAudit}
                className="mt-4 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700"
              >
                Scan Now
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Score Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    ATS Compatibility Rating
                  </span>
                  <div className="text-3xl font-extrabold text-indigo-600">
                    {auditResult.score} <span className="text-sm font-normal text-slate-400">/ 100</span>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      auditResult.score >= 75
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {auditResult.score >= 75 ? 'ATS Optimized ✓' : 'Requires Optimization'}
                  </span>
                </div>
              </div>

              {/* Summary */}
              <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Recruiter Evaluation Summary:
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">{auditResult.summary}</p>
              </div>

              {/* Formatting & ATS Warnings */}
              {auditResult.atsWarnings?.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 block mb-1.5 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3 text-rose-600" />
                    ATS Formatting Alerts:
                  </span>
                  <ul className="space-y-1">
                    {auditResult.atsWarnings.map((warn, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5 leading-snug">
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                        <span>{warn}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Keywords Matrix */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-emerald-50/60 p-3 border border-emerald-200/80">
                  <span className="text-[10px] font-bold uppercase text-emerald-800 block mb-1">
                    Detected Keywords:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {auditResult.matchedSkills.map((m) => (
                      <span key={m} className="text-[10px] bg-white text-emerald-900 font-semibold px-2 py-0.5 rounded border border-emerald-200">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl bg-rose-50/60 p-3 border border-rose-200/80">
                  <span className="text-[10px] font-bold uppercase text-rose-800 block mb-1">
                    Critical Missing:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {auditResult.missingCriticalSkills.map((m) => (
                      <span key={m} className="text-[10px] bg-white text-rose-900 font-semibold px-2 py-0.5 rounded border border-rose-200">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Revised Bullets using Google X-Y-Z formula */}
              {auditResult.revisedBullets?.length > 0 && (
                <div className="space-y-3 pt-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 block">
                    Google X-Y-Z Bullet Point Transformations:
                  </span>
                  {auditResult.revisedBullets.map((rev, idx) => (
                    <div key={idx} className="rounded-xl border border-slate-200 p-3 bg-white space-y-2 text-xs">
                      <div className="text-slate-400 line-through">
                        &ldquo;{rev.original}&rdquo;
                      </div>
                      <div className="font-semibold text-indigo-900 bg-indigo-50/60 p-2 rounded-lg border border-indigo-100 flex items-start justify-between gap-2">
                        <span>&ldquo;{rev.improved}&rdquo;</span>
                        <button
                          onClick={() => handleApplyImprovement(rev.improved)}
                          className="shrink-0 text-[10px] font-bold text-indigo-600 hover:text-indigo-800 underline"
                        >
                          Append
                        </button>
                      </div>
                      <div className="text-[10px] text-slate-500 italic">
                        <strong>Rationale:</strong> {rev.reason}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
