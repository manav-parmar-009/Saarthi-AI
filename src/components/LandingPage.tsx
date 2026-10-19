import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  GitPullRequest,
  Sliders,
  FolderGit2,
  FileCheck2,
  Mic,
  GraduationCap,
  CalendarCheck2,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  Award,
  Layers,
  Cpu,
  Code2,
  ExternalLink,
  Heart,
  Compass,
  Navigation,
  Check,
  Zap,
  TrendingUp,
  Target
} from 'lucide-react';
import { TargetRole } from '../types';
import { CAREER_TAXONOMY } from '../data/taxonomy';
import { SaarthiLogo } from './SaarthiLogo';

interface LandingPageProps {
  onStartDashboard: (role?: TargetRole) => void;
  onOpenAbout: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartDashboard, onOpenAbout }) => {
  const [selectedPreviewRole, setSelectedPreviewRole] = useState<TargetRole>('Machine Learning Engineer');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const spec = CAREER_TAXONOMY[selectedPreviewRole];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-indigo-600 selection:text-white">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <SaarthiLogo size="md" showTagline={false} />
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-600">
            <a href="#how-it-works" className="hover:text-indigo-600 transition">How It Works</a>
            <a href="#career-tracks" className="hover:text-indigo-600 transition">Career Tracks</a>
            <a href="#features" className="hover:text-indigo-600 transition">AI Modules</a>
            <button onClick={onOpenAbout} className="hover:text-indigo-600 transition">About</button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAbout}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition"
            >
              <Award className="h-3.5 w-3.5 text-indigo-600" />
              <span>By Manav Parmar</span>
            </button>
            <button
              onClick={() => onStartDashboard(selectedPreviewRole)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-linear-to-r from-indigo-600 to-indigo-700 px-4 py-2.5 text-xs sm:text-sm font-extrabold text-white shadow-md shadow-indigo-600/20 hover:from-indigo-700 hover:to-indigo-800 transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Launch Saarthi</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-14 pb-20 sm:pt-24 sm:pb-32 border-b border-slate-200 bg-linear-to-b from-white via-indigo-50/20 to-slate-50">
        {/* Subtle background ambient mesh */}
        <div className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-indigo-500 to-violet-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-linear-to-r from-indigo-50 to-violet-50 border border-indigo-200/80 text-xs font-extrabold text-indigo-700 mb-6 shadow-2xs">
              <Compass className="h-3.5 w-3.5 text-indigo-600 animate-spin" style={{ animationDuration: '18s' }} />
              <span>Your Career. Your Journey. Your Saarthi.</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 leading-[1.1] font-heading">
              Navigate your tech career with clarity and conviction.
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              <strong>Saarthi AI</strong> is your intelligent career guidance platform. Discover exact skill gaps, generate adaptive learning roadmaps, build recruiter-ready capstones, and master technical interviews with real-time AI evaluation.
            </p>

            {/* Main CTAs */}
            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <button
                onClick={() => onStartDashboard(selectedPreviewRole)}
                className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 via-indigo-700 to-violet-700 px-7 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/35 hover:-translate-y-0.5 transition-all"
              >
                <span>Build My Career Roadmap</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="#career-tracks"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition shadow-2xs"
              >
                <Compass className="h-4 w-4 text-indigo-600" />
                <span>Explore 8 Career Pathways</span>
              </a>
            </div>
          </div>

          {/* Interactive Live Preview Console */}
          <div className="mt-14 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xl lg:p-8 relative overflow-hidden">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 font-heading">
                  Interactive Career Console
                </span>
                <h3 className="text-xl font-extrabold text-slate-950 mt-0.5 font-heading">
                  {spec.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{spec.tagline}</p>
              </div>

              {/* 8 Career Selector Pills */}
              <div className="flex flex-wrap gap-1.5 max-w-lg">
                {(Object.keys(CAREER_TAXONOMY) as TargetRole[]).map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedPreviewRole(role)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition font-heading ${
                      selectedPreviewRole === role
                        ? 'bg-linear-to-r from-indigo-600 to-violet-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Diagnostic Metrics Matrix */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Box 1: Core Skills */}
              <div className="rounded-2xl bg-linear-to-br from-slate-50 to-white p-5 border border-slate-200/80 shadow-2xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider font-heading">
                    Core Technical Stack
                  </span>
                  <span className="text-[10px] font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                    {spec.coreSkills.length} Standards
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {spec.coreSkills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 text-xs font-semibold text-slate-800 border border-slate-200 shadow-2xs"
                    >
                      <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Box 2: Interview Focus */}
              <div className="rounded-2xl bg-linear-to-br from-slate-50 to-white p-5 border border-slate-200/80 shadow-2xs">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-3 font-heading">
                  Technical Screening Topics
                </span>
                <ul className="space-y-1.5">
                  {spec.interviewFocus.slice(0, 3).map((topic, i) => (
                    <li key={i} className="text-xs text-slate-600 flex items-start gap-2 leading-snug">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 shrink-0 mt-1.5" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Box 3: Market Benchmark & CTA */}
              <div className="rounded-2xl bg-linear-to-br from-indigo-50/50 via-white to-violet-50/30 p-5 border border-indigo-100 shadow-2xs flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1 font-heading">
                    Junior Compensation Benchmark
                  </span>
                  <div className="text-xl font-black text-slate-900 font-heading">
                    {spec.medianJuniorSalary}
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-snug">
                    Standard industry entry compensation calibrated from high-growth hiring telemetry.
                  </p>
                </div>

                <button
                  onClick={() => onStartDashboard(selectedPreviewRole)}
                  className="mt-4 w-full py-2.5 rounded-xl bg-linear-to-r from-indigo-600 to-indigo-700 text-white text-xs font-extrabold hover:from-indigo-700 hover:to-indigo-800 transition shadow-xs flex items-center justify-center gap-1.5"
                >
                  <span>Launch Pathway for {spec.title}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Pillars Banner */}
      <section className="border-b border-slate-200 bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900">Saarthi AI</span>
            <span>•</span>
            <span className="italic">Your Career. Your Journey. Your Saarthi.</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-700 font-semibold shadow-2xs">
            <span>Created by</span>
            <span className="font-black text-slate-900">Manav Parmar</span>
            <Heart className="h-3 w-3 text-rose-500 fill-rose-500 inline" />
          </div>
          <div className="text-slate-500">Autonomous Career Operating System</div>
        </div>
      </section>

      {/* 3-Step Guided Workflow */}
      <section id="how-it-works" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 font-heading">
              The Guiding Journey
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-1 font-heading">
              How Saarthi AI Guides You
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Combining exact deterministic set math with Google Gemini 3.8 Flash structured intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs hover:border-indigo-300 hover:shadow-md transition">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 font-black text-base mb-4 font-heading">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                1. Precision Skill Diagnostic
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Evaluate your current verified coding languages and tools against target career requirements with mathematical set-theory formulas. Zero guesswork.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs hover:border-indigo-300 hover:shadow-md transition">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 font-black text-base mb-4 font-heading">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                2. Adaptive AI Roadmaps
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Gemini 3.8 Flash structures a customized multi-phase curriculum pacing deliverables to your exact weekly available hours and university schedule.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs hover:border-indigo-300 hover:shadow-md transition">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 font-black text-base mb-4 font-heading">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                3. Placement Readiness Audit
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Rubric-scored mock technical interviews, ATS resume audits, and capstone milestones roll up into an official Internship Readiness Scorecard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Feature Suite (12 Modules Overview) */}
      <section id="features" className="py-20 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 font-heading">
              Complete Feature Suite
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-1 font-heading">
              Engineered for Placement Success
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Every tool is fully interactive and saves your progress locally on your device.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: GitPullRequest,
                title: 'AI Career Roadmap Generator',
                desc: 'Tailors multi-phase technical milestones according to weekly study commitment.'
              },
              {
                icon: Sliders,
                title: 'Skill Gap Analyzer',
                desc: 'Real-time diagnostic comparison between current skills and industry job specs.'
              },
              {
                icon: FolderGit2,
                title: 'AI Project Recommender',
                desc: 'Curates beginner, intermediate, and capstone architectures with tech stacks.'
              },
              {
                icon: FileCheck2,
                title: 'ATS Resume Reviewer',
                desc: 'Detects weak bullets, missing keywords, and translates experience using Google X-Y-Z.'
              },
              {
                icon: Mic,
                title: 'Mock Interview Simulator',
                desc: 'Role-specific coding, math, and architecture questions scored in real-time (0-10).'
              },
              {
                icon: GraduationCap,
                title: 'Curated Learning Catalog',
                desc: 'Official documentation and courses verified for all 8 engineering pathways.'
              },
              {
                icon: CalendarCheck2,
                title: 'Weekly Study Scheduler',
                desc: 'Allocates daily coding drills and milestone deliverables without burnout.'
              },
              {
                icon: ShieldCheck,
                title: 'Internship Readiness Checker',
                desc: '5-domain verification scorecard covering portfolio, resume, code, and interviews.'
              },
              {
                icon: CheckCircle2,
                title: 'Progress Velocity Tracker',
                desc: 'Metrics telemetry capturing milestone burndown and interview progression.'
              }
            ].map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/90 p-6 hover:border-indigo-400 hover:shadow-md transition bg-slate-50/50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-tr from-indigo-50 to-violet-50 text-indigo-600 mb-3.5 border border-indigo-100">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 font-heading">{feat.title}</h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8 Career Pathways */}
      <section id="career-tracks" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 font-heading">
              Comprehensive Taxonomies
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-1 font-heading">
              8 Supported Technical Tracks
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Select any role to jump directly into customized roadmap generation and skill audits.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {(Object.keys(CAREER_TAXONOMY) as TargetRole[]).map((role) => {
              const rSpec = CAREER_TAXONOMY[role];
              return (
                <div
                  key={role}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs hover:border-indigo-400 hover:shadow-sm transition flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-100">
                      Track
                    </span>
                    <h4 className="text-base font-extrabold text-slate-900 mt-2 font-heading">{rSpec.title}</h4>
                    <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                      {rSpec.tagline}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-heading">
                        Core Tech:
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {rSpec.coreSkills.slice(0, 3).map((s) => (
                          <span
                            key={s}
                            className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onStartDashboard(role)}
                    className="mt-5 w-full py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 hover:bg-linear-to-r hover:from-indigo-600 hover:to-indigo-700 hover:text-white hover:border-indigo-600 transition flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <span>Launch Track</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About the Creator & Mission Section */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-indigo-100 bg-linear-to-br from-indigo-50/50 via-white to-violet-50/30 p-8 sm:p-10 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-tr from-indigo-600 to-violet-600 text-white font-black text-2xl shadow-md shadow-indigo-600/25 ring-2 ring-indigo-200">
                MP
              </div>
              <div className="space-y-3 flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-100 text-indigo-800 text-xs font-extrabold uppercase tracking-wider">
                  About the Creator & Mission
                </div>
                <p className="text-slate-700 leading-relaxed text-sm sm:text-base italic font-serif">
                  &ldquo;A true Saarthi does not walk the path for you; rather, they illuminate the way so you can advance with absolute conviction. 
                  Saarthi AI was designed to replace career confusion with surgical clarity, structured roadmaps, and verified technical readiness.&rdquo;
                </p>
                <div className="pt-3 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-black text-slate-900 font-heading">Manav Parmar</h4>
                    <p className="text-xs text-slate-500">
                      Creator & Lead Software Architect • Saarthi AI
                    </p>
                  </div>
                  <button
                    onClick={onOpenAbout}
                    className="self-start sm:self-auto text-xs font-bold text-indigo-600 hover:text-indigo-800 underline"
                  >
                    View Project Philosophy →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-black text-slate-900 font-heading">Frequently Asked Questions</h3>
            <p className="text-xs text-slate-500 mt-1">Everything you need to know about Saarthi AI</p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'What is the philosophy behind Saarthi AI?',
                a: 'Saarthi AI is inspired by the timeless concept of a trusted guide and navigator. It unifies disconnected tools—roadmaps, skill gap audits, resume reviewers, and mock interviews—into one continuous companion for engineering students and developers.'
              },
              {
                q: 'How does Saarthi AI balance AI with Deterministic logic?',
                a: 'Saarthi AI uses deterministic mathematical logic for exact metrics (such as skill match percentage, weekly hours, and readiness scoring) to guarantee zero hallucination, while Gemini 3.8 Flash handles generative tasks like semantic resume reviews and mock interviews.'
              },
              {
                q: 'Does Saarthi AI work offline or when API keys are unconfigured?',
                a: 'Yes. Saarthi AI incorporates a seamless deterministic fallback engine so you never encounter broken pages or white screens during demonstrations.'
              },
              {
                q: 'Who created Saarthi AI?',
                a: 'Saarthi AI was designed and developed by Manav Parmar.'
              }
            ].map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex w-full items-center justify-between p-4.5 text-left text-xs sm:text-sm font-bold text-slate-900 hover:bg-slate-50 font-heading"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 transition-transform ${
                      openFaq === idx ? 'rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="p-4.5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 bg-linear-to-r from-indigo-700 via-indigo-600 to-violet-700 text-white text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold mb-4 text-indigo-100">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Start Your Technical Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight font-heading">
            Your Career. Your Journey. Your Saarthi.
          </h2>
          <p className="mt-3 text-base text-indigo-100 max-w-xl mx-auto">
            Diagnose your skill gaps, generate your industry roadmap, and prepare for placement interviews with Saarthi AI.
          </p>
          <div className="mt-8">
            <button
              onClick={() => onStartDashboard(selectedPreviewRole)}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-black text-indigo-700 shadow-xl hover:bg-indigo-50 hover:translate-y-[-1px] transition-all font-heading"
            >
              <span>Launch Free Career Assessment</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Creator Branding Landing Page Footer */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <SaarthiLogo size="sm" showTagline={true} />
            </div>

            {/* Primary Attribution Required: "Made with ♥ by Manav Parmar" */}
            <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-700 font-semibold shadow-2xs">
              <span>Made with</span>
              <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500 inline animate-pulse" />
              <span>by</span>
              <span className="font-extrabold text-slate-900 hover:text-indigo-600 transition cursor-default">
                Manav Parmar
              </span>
            </div>

            <div className="text-center md:text-right text-xs text-slate-400">
              Saarthi AI © 2025 • All Rights Reserved
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
