import { UserProfile, TargetRole } from '../types';
import { CAREER_TAXONOMY } from '../data/taxonomy';

const STORAGE_KEY = 'saarthi_user_profile_v3';

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Alex Sharma',
  targetRole: 'Machine Learning Engineer',
  education: 'B.Tech in Computer Science & Engineering — 3rd Year',
  weeklyCommitment: 15,
  currentSkills: ['Python', 'SQL', 'Scikit-Learn', 'Pandas & NumPy', 'Git'],
  roadmapCompletedNodes: ['phase-1-node-1', 'phase-1-node-2'],
  plannerTasks: [
    {
      id: 'task-1',
      day: 'Monday',
      task: 'Study Vector Calculus & Derivation of Backpropagation',
      durationHours: 2.5,
      completed: true,
      category: 'Theory'
    },
    {
      id: 'task-2',
      day: 'Tuesday',
      task: 'Implement Multi-Head Attention mechanism in pure PyTorch',
      durationHours: 3.0,
      completed: true,
      category: 'Coding'
    },
    {
      id: 'task-3',
      day: 'Thursday',
      task: 'Containerize FastAPI ML inference model with Docker',
      durationHours: 2.5,
      completed: false,
      category: 'Project'
    },
    {
      id: 'task-4',
      day: 'Saturday',
      task: 'Mock technical interview: Bias-Variance & Regularization',
      durationHours: 2.0,
      completed: false,
      category: 'Interview'
    },
    {
      id: 'task-5',
      day: 'Sunday',
      task: 'Review ATS resume bullet revisions using Google X-Y-Z formula',
      durationHours: 1.5,
      completed: false,
      category: 'Theory'
    }
  ],
  interviewHistory: [
    {
      id: 'rec-1',
      question: 'Explain the mathematical purpose of scaling the dot product by 1/sqrt(d_k) in Attention(Q, K, V).',
      category: 'AI/ML Math',
      answer: 'For large values of d_k, the dot products grow large in magnitude, which pushes the softmax function into regions where it has extremely small gradients (vanishing gradients). Scaling by 1/sqrt(d_k) stabilizes the variance around 1.',
      score: 9,
      feedback: 'Excellent explanation connecting vector dimension scaling directly to vanishing gradient behavior in softmax.',
      strengths: ['Identified vanishing gradient problem', 'Referenced variance stabilization mathematically'],
      omissions: ['Could briefly mention alternative normalization techniques like LayerNorm'],
      date: 'Yesterday'
    },
    {
      id: 'rec-2',
      question: 'How do you detect and prevent Data Leakage during time-series feature engineering?',
      category: 'Machine Learning',
      answer: 'Never use future data to normalize past data. Use expanding or rolling window validation instead of random K-Fold cross validation, and fit scalers only on training splits.',
      score: 8,
      feedback: 'Strong operational grasp of temporal boundary constraints.',
      strengths: ['Mentioned temporal cross-validation correctly', 'Pointed out scaler fitting contamination'],
      omissions: ['Could mention target leakage via lag features'],
      date: '3 days ago'
    }
  ],
  readinessChecklist: {
    'skill-core-verified': true,
    'github-portfolio-live': true,
    'capstone-deployed': false,
    'ats-resume-screened': true,
    'mock-interview-passed': true
  },
  resumeDraft: `Alex Sharma
Email: alex.sharma@example.edu | GitHub: github.com/alex-sharma | LinkedIn: linkedin.com/in/alex-sharma

EDUCATION
Bachelor of Technology in Computer Science & Engineering
University Institute of Technology | Expected Graduation: 2026 | CGPA: 8.7/10

TECHNICAL SKILLS
Languages: Python, SQL, C++, Bash
Frameworks & Libraries: PyTorch, Scikit-Learn, Pandas, NumPy, FastAPI
Developer Tools: Git, Docker, Linux, VS Code, Jupyter

PROJECTS
Predictive Customer Churn Pipeline (Python, Scikit-Learn, FastAPI)
- Built an end-to-end churn prediction classifier using Random Forest and XGBoost on a 150k record telco dataset.
- Evaluated models using ROC-AUC (0.89) and precision-recall trade-offs to minimize false negatives.
- Deployed a RESTful API using FastAPI with response latency under 45ms.

Interactive Financial Dashboard (Python, Streamlit, SQL)
- Analyzed stock market time-series volatility using rolling moving averages and Bollinger Bands.
- Integrated PostgreSQL backend to execute complex aggregations and window queries.

EXPERIENCE & LEADERSHIP
Technical Core Member | ACM Student Chapter (2024 - Present)
- Conducted hands-on workshops on Python for Data Science and Machine Learning basics for 120+ first-year students.`
};

export function loadUserProfile(): UserProfile {
  if (typeof window === 'undefined') return INITIAL_USER_PROFILE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_USER_PROFILE));
      return INITIAL_USER_PROFILE;
    }
    const parsed = JSON.parse(raw);
    return { ...INITIAL_USER_PROFILE, ...parsed };
  } catch (err) {
    console.error('Failed to load profile from storage, fallback to default:', err);
    return INITIAL_USER_PROFILE;
  }
}

export function saveUserProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error('Failed to save profile to storage:', err);
  }
}

export function resetUserProfile(): UserProfile {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
  return INITIAL_USER_PROFILE;
}

export interface TelemetryReport {
  overallReadiness: number;
  skillMatchPct: number;
  verifiedCount: number;
  totalCoreSkills: number;
  missingCoreSkills: string[];
  roadmapPct: number;
  checklistPct: number;
  interviewAvg: number;
  weeklyTasksDone: number;
  weeklyTasksTotal: number;
}

export function calculateReadinessTelemetry(profile: UserProfile): TelemetryReport {
  const spec = CAREER_TAXONOMY[profile.targetRole] || CAREER_TAXONOMY['Machine Learning Engineer'];
  const totalCoreSkills = spec.coreSkills.length;
  
  // Case-insensitive match check
  const missingCoreSkills: string[] = [];
  let verifiedCount = 0;

  for (const core of spec.coreSkills) {
    const exists = profile.currentSkills.some(
      s => s.trim().toLowerCase() === core.trim().toLowerCase()
    );
    if (exists) {
      verifiedCount++;
    } else {
      missingCoreSkills.push(core);
    }
  }

  const skillMatchPct = Math.min(100, Math.round((verifiedCount / totalCoreSkills) * 100));

  // Roadmap progress: based on completed nodes (5 target nodes default)
  const roadmapPct = Math.min(100, Math.round((profile.roadmapCompletedNodes.length / 5) * 100));

  // Checklist score
  const checks = Object.values(profile.readinessChecklist);
  const checklistPct = checks.length > 0 
    ? Math.round((checks.filter(Boolean).length / checks.length) * 100)
    : 0;

  // Interview Average
  const scores = profile.interviewHistory.map(h => h.score);
  const interviewAvg = scores.length > 0
    ? Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10)
    : 70;

  // Weekly tasks
  const weeklyTasksDone = profile.plannerTasks.filter(t => t.completed).length;
  const weeklyTasksTotal = profile.plannerTasks.length;

  // Scientific deterministic formula: 
  // Readiness = 0.35(Skill Gap) + 0.25(Roadmap %) + 0.20(Checklist) + 0.20(Interview Avg)
  const overallReadiness = Math.round(
    skillMatchPct * 0.35 +
    roadmapPct * 0.25 +
    checklistPct * 0.20 +
    interviewAvg * 0.20
  );

  return {
    overallReadiness,
    skillMatchPct,
    verifiedCount,
    totalCoreSkills,
    missingCoreSkills,
    roadmapPct,
    checklistPct,
    interviewAvg,
    weeklyTasksDone,
    weeklyTasksTotal
  };
}
