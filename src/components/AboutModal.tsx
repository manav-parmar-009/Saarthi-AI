import React from 'react';
import { X, Award, GraduationCap, ShieldCheck, Cpu, Code2, Sparkles, Heart, Compass, Navigation } from 'lucide-react';
import { SaarthiLogo } from './SaarthiLogo';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white border border-slate-200/90 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header Strip with Glow */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-linear-to-r from-slate-50 via-indigo-50/30 to-slate-50 px-6 py-4">
          <SaarthiLogo size="md" showTagline={true} />
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="max-h-[78vh] overflow-y-auto p-6 space-y-6 text-sm text-slate-600">
          {/* Creator Profile Box */}
          <div className="rounded-2xl border border-indigo-100 bg-linear-to-br from-indigo-50/70 via-white to-violet-50/50 p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-tr from-indigo-600 to-violet-600 text-white font-black text-xl shadow-md shadow-indigo-600/25 ring-2 ring-indigo-200">
                MP
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-0.5 text-[11px] font-bold text-indigo-700 border border-indigo-200 shadow-2xs">
                  <Award className="h-3.5 w-3.5 text-indigo-600" />
                  Creator & Lead Architect
                </div>
                <h4 className="text-lg font-black text-slate-900 tracking-tight font-heading">
                  Manav Parmar
                </h4>
                <p className="text-xs text-slate-600 leading-snug">
                  Designed & engineered <strong>Saarthi AI</strong> to give ambitious learners a personal navigator for technical career mastery.
                </p>
              </div>
            </div>
          </div>

          {/* Philosophy & Mission */}
          <div>
            <h5 className="font-extrabold text-slate-900 flex items-center gap-2 mb-2 font-heading">
              <Compass className="h-4 w-4 text-indigo-600" />
              The Saarthi Philosophy
            </h5>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              In timeless tradition, a <em>Saarthi</em> is a trusted charioteer and strategic guide who navigates challenging terrain so the hero can achieve their destiny. 
              <strong> Saarthi AI</strong> brings this guidance into the modern tech ecosystem: replacing confusion with crystal-clear direction, actionable roadmaps, and verified career readiness.
            </p>
          </div>

          {/* Architectural Distinction: Dual-Layer Engine */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            <div className="rounded-xl border border-slate-200/90 p-4 bg-slate-50/70 hover:border-indigo-200 transition">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-slate-800 mb-1.5 font-heading">
                <Code2 className="h-4 w-4 text-emerald-600" />
                Deterministic Analytics
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Mathematical set-theory skill matching, weighted readiness scoring, and local persistence. Unbiased, verifiable numbers with zero hallucination.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200/90 p-4 bg-slate-50/70 hover:border-indigo-200 transition">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-slate-800 mb-1.5 font-heading">
                <Sparkles className="h-4 w-4 text-indigo-600" />
                Gemini 3.8 Flash AI
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Semantic resume auditing with Google X-Y-Z transformations, adaptive curriculum generation, and interactive technical interview simulations.
              </p>
            </div>
          </div>

          {/* Bottom attribution */}
          <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium text-slate-700">
              Saarthi AI — Your Career. Your Journey. Your Saarthi.
            </span>
            <span className="inline-flex items-center gap-1 font-semibold text-slate-900">
              Made with <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500 inline animate-pulse" /> by Manav Parmar
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-100 bg-slate-50 px-6 py-3.5 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-900 px-5 py-2 text-xs font-bold text-white hover:bg-slate-800 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
