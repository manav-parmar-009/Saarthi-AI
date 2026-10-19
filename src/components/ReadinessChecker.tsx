import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Award,
  Download,
  Share2,
  ExternalLink,
  GraduationCap,
  Sparkles,
  Heart
} from 'lucide-react';
import { UserProfile } from '../types';
import { TelemetryReport } from '../lib/storage';

interface ReadinessCheckerProps {
  profile: UserProfile;
  telemetry: TelemetryReport;
  onUpdateProfile: (updater: (prev: UserProfile) => UserProfile) => void;
}

const CHECKLIST_ITEMS = [
  {
    key: 'skill-core-verified',
    category: 'Core Competencies',
    title: 'Core Technical Requirements Verified',
    description: 'At least 70% of mandatory core skills verified against industry job specs.'
  },
  {
    key: 'github-portfolio-live',
    category: 'Code Quality',
    title: 'Public GitHub Repositories with Clean Code',
    description: 'Active GitHub profile with descriptive READMEs, architectural diagrams, and license files.'
  },
  {
    key: 'capstone-deployed',
    category: 'Applied Projects',
    title: 'Production Capstone Service Deployed',
    description: 'At least one full-stack or model microservice deployed on live cloud infrastructure with public URL.'
  },
  {
    key: 'ats-resume-screened',
    category: 'Resume & Screening',
    title: 'ATS-Screened Resume Scored Above 75%',
    description: 'Resume content parsed through ATS analyzer with Google X-Y-Z quantifiable bullet points.'
  },
  {
    key: 'mock-interview-passed',
    category: 'Interview Preparedness',
    title: 'Technical Mock Interview Passed (Score >= 7.0)',
    description: 'Completed at least one simulated technical screening with affirmative rubric grading.'
  }
];

export const ReadinessChecker: React.FC<ReadinessCheckerProps> = ({
  profile,
  telemetry,
  onUpdateProfile
}) => {
  const [showCertificate, setShowCertificate] = useState(false);

  const toggleCheck = (key: string) => {
    onUpdateProfile((prev) => ({
      ...prev,
      readinessChecklist: {
        ...prev.readinessChecklist,
        [key]: !prev.readinessChecklist[key]
      }
    }));
  };

  const isCertified = telemetry.overallReadiness >= 75;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Internship Readiness Checker & Official Scorecard
            </h1>
            <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
              Composite Evaluation
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Standardized evaluation matrix determining university placement and internship eligibility for{' '}
            <strong>{profile.targetRole}</strong>.
          </p>
        </div>

        {/* Overall Score Badge */}
        <div className="flex items-center gap-3 bg-slate-50 px-5 py-3 rounded-2xl border border-slate-200">
          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Readiness Score
            </span>
            <span
              className={`text-2xl font-extrabold ${
                isCertified ? 'text-emerald-600' : 'text-indigo-600'
              }`}
            >
              {telemetry.overallReadiness}%
            </span>
          </div>
          <div className="h-9 w-px bg-slate-200" />
          <div>
            <span
              className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                isCertified
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {isCertified ? 'Placement Certified ✓' : 'In Preparation'}
            </span>
          </div>
        </div>
      </div>

      {/* 5-Domain Checklist */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Pre-Requisite Verification Checklist
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Click any criterion to verify or unverify based on your current academic evidence
            </p>
          </div>
          <span className="text-xs font-extrabold text-indigo-600">
            {Object.values(profile.readinessChecklist).filter(Boolean).length} of {CHECKLIST_ITEMS.length} Verified
          </span>
        </div>

        <div className="space-y-3">
          {CHECKLIST_ITEMS.map((item) => {
            const isChecked = Boolean(profile.readinessChecklist[item.key]);

            return (
              <div
                key={item.key}
                onClick={() => toggleCheck(item.key)}
                className={`flex items-start justify-between p-4 rounded-xl border transition cursor-pointer ${
                  isChecked
                    ? 'bg-emerald-50/50 border-emerald-200/80'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border mt-0.5 transition ${
                      isChecked
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isChecked && <CheckCircle2 className="h-3.5 w-3.5" />}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block">
                      {item.category}
                    </span>
                    <h4
                      className={`text-sm font-bold ${
                        isChecked ? 'text-slate-900' : 'text-slate-800'
                      }`}
                    >
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded shrink-0 ${
                    isChecked
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {isChecked ? 'Verified ✓' : 'Pending'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Official Certificate Preview Section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Department Placement Certification
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Official verification scorecard preview for college examiners and recruiters
            </p>
          </div>
          <button
            onClick={() => setShowCertificate(!showCertificate)}
            className="rounded-xl bg-slate-900 text-white px-4 py-2 text-xs font-bold hover:bg-slate-800 transition"
          >
            {showCertificate ? 'Hide Certificate' : 'Preview Official Certificate'}
          </button>
        </div>

        {showCertificate && (
          <div className="rounded-2xl border-4 border-indigo-900/10 bg-linear-to-b from-white to-slate-50 p-8 sm:p-12 shadow-md relative overflow-hidden animate-in fade-in">
            {/* Watermark Logo */}
            <div className="absolute right-6 -bottom-10 opacity-5 pointer-events-none select-none text-9xl font-black text-indigo-950 font-heading">
              SA
            </div>

            <div className="text-center space-y-4 max-w-xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-700">
                <Award className="h-4 w-4" />
                Saarthi AI Placement Certification
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
                Certificate of Career Readiness
              </h2>

              <p className="text-xs sm:text-sm text-slate-500">
                This verified credential certifies that
              </p>

              <div className="text-2xl font-black text-indigo-600 underline decoration-indigo-300 underline-offset-8 font-heading">
                {profile.name}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto pt-2">
                has satisfied deterministic skill taxonomy requirements, curriculum roadmap milestones, and technical interview simulations for the position of
              </p>

              <div className="text-lg font-extrabold text-slate-900 font-heading">
                {profile.targetRole}
              </div>

              {/* Metrics Grid on Certificate */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200/80 text-center">
                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    Skills Overlap
                  </span>
                  <span className="text-base font-extrabold text-slate-900">
                    {telemetry.skillMatchPct}%
                  </span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    Interview Rating
                  </span>
                  <span className="text-base font-extrabold text-slate-900">
                    {telemetry.interviewAvg}/100
                  </span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    Composite Score
                  </span>
                  <span className="text-base font-extrabold text-emerald-600">
                    {telemetry.overallReadiness}%
                  </span>
                </div>
              </div>

              {/* Creator Attribution on Certificate */}
              <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
                <div className="text-left">
                  <span className="font-bold text-slate-800 block">Saarthi AI Career Platform</span>
                  <span className="text-[11px] text-indigo-600 font-medium">Your Career. Your Journey. Your Saarthi.</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-800 block">Created by Manav Parmar</span>
                  <span className="text-[11px] text-slate-400">Lead Architect & Developer</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
