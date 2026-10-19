import React, { useState, useEffect } from 'react';
import {
  Mic,
  Sparkles,
  Send,
  Loader2,
  Clock,
  CheckCircle2,
  AlertCircle,
  Award,
  ChevronRight,
  BookOpen,
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import { UserProfile, InterviewQuestion, InterviewCritique } from '../types';
import { generateInterviewQuestionsViaAI, critiqueInterviewAnswerViaAI } from '../lib/gemini';

interface InterviewPracticeProps {
  profile: UserProfile;
  onUpdateProfile: (updater: (prev: UserProfile) => UserProfile) => void;
}

const CATEGORIES = [
  'DSA & Algorithms',
  'AI/ML Math & Deep Learning',
  'System Design & Microservices',
  'Python & Backend Engineering',
  'SQL & Database Optimization',
  'Behavioral & HR (STAR Method)'
];

export const InterviewPractice: React.FC<InterviewPracticeProps> = ({
  profile,
  onUpdateProfile
}) => {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [activeQIndex, setActiveQIndex] = useState(0);
  const [candidateAnswer, setCandidateAnswer] = useState('');
  const [critique, setCritique] = useState<InterviewCritique | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sourceBadge, setSourceBadge] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Timer interval
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const loadQuestions = async (cat: string) => {
    setSelectedCategory(cat);
    setIsLoading(true);
    setCandidateAnswer('');
    setCritique(null);
    setShowHints(false);
    setTimerSeconds(0);
    setIsTimerRunning(true);

    const result = await generateInterviewQuestionsViaAI(profile.targetRole, cat);
    setQuestions(result.data);
    setActiveQIndex(0);
    setSourceBadge(result.modelBadge);
    setIsLoading(false);
  };

  useEffect(() => {
    loadQuestions(CATEGORIES[0]);
  }, [profile.targetRole]);

  const handleEvaluateAnswer = async () => {
    if (!candidateAnswer.trim() || !questions[activeQIndex]) return;
    setIsLoading(true);
    setIsTimerRunning(false);

    const activeQ = questions[activeQIndex];
    const result = await critiqueInterviewAnswerViaAI(
      profile.targetRole,
      activeQ.question,
      candidateAnswer,
      activeQ.sampleAnswer
    );

    setCritique(result.data);

    // Save to user interview history
    onUpdateProfile((prev) => ({
      ...prev,
      interviewHistory: [
        {
          id: `int-${Date.now()}`,
          question: activeQ.question,
          category: selectedCategory,
          answer: candidateAnswer,
          score: result.data.score,
          feedback: result.data.feedback,
          strengths: result.data.strengths || [],
          omissions: result.data.omissions || [],
          date: 'Just now'
        },
        ...prev.interviewHistory.slice(0, 7)
      ],
      readinessChecklist: {
        ...prev.readinessChecklist,
        'mock-interview-passed': result.data.score >= 7
      }
    }));

    setIsLoading(false);
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const activeQ = questions[activeQIndex];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Interactive Mock Technical Interviewer
            </h1>
            {sourceBadge && (
              <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700 border border-indigo-100">
                <Sparkles className="h-3 w-3" />
                {sourceBadge}
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Practice technical screenings for <strong>{profile.targetRole}</strong> with live rubric scoring and guidance.
          </p>
        </div>

        {/* Category Selector Pills */}
        <div className="flex flex-wrap gap-1.5 max-w-md">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => loadQuestions(cat)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Simulation Room */}
      {isLoading && !activeQ ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-xs">
          <Loader2 className="mx-auto h-8 w-8 text-indigo-600 animate-spin mb-3" />
          <h3 className="text-sm font-bold text-slate-800">
            Generating questions with Gemini 3.8 Flash...
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Setting up interview rubric for {selectedCategory}.
          </p>
        </div>
      ) : !activeQ ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <Mic className="mx-auto h-8 w-8 text-indigo-500 mb-2" />
          <h3 className="text-sm font-bold text-slate-900">No session initialized</h3>
          <button
            onClick={() => loadQuestions(CATEGORIES[0])}
            className="mt-3 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700"
          >
            Start Technical Simulation
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Console: Interviewer Question & Candidate Response */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            {/* Top Bar with Timer */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Question {activeQIndex + 1} of {questions.length} • {selectedCategory}
              </span>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 font-mono text-xs font-bold text-slate-700">
                <Clock className="h-3.5 w-3.5 text-slate-500" />
                <span>{formatTimer(timerSeconds)}</span>
              </div>
            </div>

            {/* Question Card */}
            <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Lead Technical Interviewer asks:
              </span>
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                &ldquo;{activeQ.question}&rdquo;
              </h2>
            </div>

            {/* Hints Accordion */}
            <div>
              <button
                onClick={() => setShowHints(!showHints)}
                className="text-xs font-semibold text-slate-500 hover:text-indigo-600 flex items-center gap-1"
              >
                <HelpCircle className="h-3.5 w-3.5" />
                <span>{showHints ? 'Hide Interviewer Hints' : 'View Interviewer Hints'}</span>
              </button>
              {showHints && (
                <div className="mt-2 p-3 rounded-lg bg-indigo-50/50 border border-indigo-100 text-xs text-indigo-900 space-y-1 animate-in fade-in">
                  <span className="font-bold block text-[10px] uppercase tracking-wider">
                    Rubric Anchors to Cover:
                  </span>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                    {activeQ.hints?.map((hint, i) => (
                      <li key={i}>{hint}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Candidate Response Textarea */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                Your Technical Response:
              </label>
              <textarea
                rows={6}
                value={candidateAnswer}
                onChange={(e) => setCandidateAnswer(e.target.value)}
                placeholder="Structure your answer clearly: state the core mechanism, complexity trade-offs, and failure edge cases..."
                className="w-full rounded-xl border border-slate-300 p-3.5 text-xs font-mono leading-relaxed focus:border-indigo-600 focus:outline-none"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={handleEvaluateAnswer}
                disabled={isLoading || !candidateAnswer.trim()}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 disabled:opacity-50 transition shadow-xs"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Grading with Gemini...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Submit Response for AI Score</span>
                  </>
                )}
              </button>

              {activeQIndex < questions.length - 1 && (
                <button
                  onClick={() => {
                    setActiveQIndex((prev) => prev + 1);
                    setCandidateAnswer('');
                    setCritique(null);
                    setTimerSeconds(0);
                    setIsTimerRunning(true);
                  }}
                  className="text-xs font-bold text-slate-700 hover:text-indigo-600 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition"
                >
                  Next Question →
                </button>
              )}
            </div>
          </div>

          {/* Right Console: Live AI Evaluation & Rubric Feedback */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
              Technical Rubric Evaluation
            </h3>

            {!critique ? (
              <div className="h-full min-h-[280px] flex flex-col items-center justify-center text-center p-8 text-slate-400">
                <Mic className="h-10 w-10 mb-3 text-slate-300" />
                <h4 className="text-sm font-bold text-slate-700">Awaiting Your Answer</h4>
                <p className="text-xs text-slate-500 max-w-sm mt-1">
                  Type your structured response on the left and submit. Gemini 3.8 Flash will evaluate clarity, accuracy, and depth on a 1-10 scale.
                </p>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in">
                {/* Score Banner */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-indigo-50/70 border border-indigo-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 block">
                      Assigned Rubric Score
                    </span>
                    <div className="text-3xl font-extrabold text-indigo-950">
                      {critique.score} <span className="text-sm font-normal text-slate-400">/ 10</span>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      critique.score >= 8
                        ? 'bg-emerald-100 text-emerald-800'
                        : critique.score >= 6
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {critique.score >= 8 ? 'Interview Ready ✓' : critique.score >= 6 ? 'Competent' : 'Needs Polish'}
                  </span>
                </div>

                {/* Feedback */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Interviewer Critique:
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                    {critique.feedback}
                  </p>
                </div>

                {/* Strengths & Omissions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-xl bg-emerald-50/60 p-3 border border-emerald-200/80">
                    <span className="text-[10px] font-bold uppercase text-emerald-800 block mb-1">
                      Strengths Identified:
                    </span>
                    <ul className="text-xs text-emerald-900 space-y-1">
                      {critique.strengths?.map((s, i) => (
                        <li key={i} className="flex items-start gap-1.5 leading-snug">
                          <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl bg-rose-50/60 p-3 border border-rose-200/80">
                    <span className="text-[10px] font-bold uppercase text-rose-800 block mb-1">
                      Nuances Missed:
                    </span>
                    <ul className="text-xs text-rose-900 space-y-1">
                      {critique.omissions?.map((o, i) => (
                        <li key={i} className="flex items-start gap-1.5 leading-snug">
                          <AlertCircle className="h-3 w-3 text-rose-500 shrink-0 mt-0.5" />
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Reference Ideal Answer */}
                <div className="rounded-xl bg-slate-50 p-3 border border-slate-200/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    Benchmark Expected Answer:
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed font-mono">
                    {activeQ.sampleAnswer}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
