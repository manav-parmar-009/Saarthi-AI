import { TargetRole, GeneratedRoadmap, ProjectConcept, ResumeAudit, InterviewQuestion, InterviewCritique, PlannerTask } from '../types';
import { CAREER_TAXONOMY } from '../data/taxonomy';

export interface AIResult<T> {
  data: T;
  isAiGenerated: boolean;
  modelBadge: string;
}

async function callServerGemini<T>(prompt: string, fallback: T): Promise<AIResult<T>> {
  try {
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
      console.warn(`[Gemini Proxy] Returned status ${res.status}. Falling back to deterministic engine.`);
      return {
        data: fallback,
        isAiGenerated: false,
        modelBadge: 'Deterministic Rule Engine (Offline Resilient)',
      };
    }

    const json = await res.json();
    if (!json.content) {
      return {
        data: fallback,
        isAiGenerated: false,
        modelBadge: 'Deterministic Rule Engine (Offline Resilient)',
      };
    }

    // Strip markdown code fences if model outputted them despite system instruction
    let raw = json.content.trim();
    if (raw.startsWith('```json')) {
      raw = raw.replace(/^```json/, '').replace(/```$/, '').trim();
    } else if (raw.startsWith('```')) {
      raw = raw.replace(/^```/, '').replace(/```$/, '').trim();
    }

    const parsed: T = JSON.parse(raw);
    return {
      data: parsed,
      isAiGenerated: true,
      modelBadge: 'Gemini 3.8 Flash (Google AI Studio)',
    };
  } catch (err) {
    console.warn('[Gemini Client] Inference fallback triggered:', err);
    return {
      data: fallback,
      isAiGenerated: false,
      modelBadge: 'Deterministic Rule Engine (Offline Resilient)',
    };
  }
}

// 1. ROADMAP GENERATION
export async function generateRoadmapViaAI(
  role: TargetRole,
  currentSkills: string[],
  weeklyHours: number,
  education: string
): Promise<AIResult<GeneratedRoadmap>> {
  const spec = CAREER_TAXONOMY[role];
  const fallback: GeneratedRoadmap = {
    career: role,
    weeklyCommitment: weeklyHours,
    summary: `Structured academic-to-industry curriculum calibrated for ${weeklyHours} hours/week for ${role}. Bridges classroom theory to industry standards.`,
    phases: [
      {
        phaseNumber: 1,
        title: 'Foundational Theory & Core Algorithms',
        duration: 'Weeks 1–4',
        description: `Master fundamental syntax, computational complexity, and essential libraries for ${role}.`,
        keySkills: [spec.coreSkills[0], spec.coreSkills[1] || 'Core Theory', 'Git'],
        milestoneProject: `${role} Baseline Prototype with Documentation`,
        learningOutcomes: [
          `Solidify mastery in ${spec.coreSkills[0]} idiomatic patterns`,
          'Write reproducible clean code with unit testing'
        ]
      },
      {
        phaseNumber: 2,
        title: 'Applied Frameworks & System Integration',
        duration: 'Weeks 5–8',
        description: `Transition into modern engineering frameworks, API pipelines, and specialized libraries.`,
        keySkills: [spec.coreSkills[2] || 'Pipelines', spec.coreSkills[3] || 'APIs', 'Docker'],
        milestoneProject: `Automated Pipeline & REST API Microservice`,
        learningOutcomes: [
          `Connect database backends with structured schemas`,
          'Containerize workloads for consistent cross-environment deployment'
        ]
      },
      {
        phaseNumber: 3,
        title: 'Production Engineering & Capstone Deployment',
        duration: 'Weeks 9–12',
        description: `Enterprise-grade deployment, performance optimization, monitoring, and portfolio readiness.`,
        keySkills: [spec.secondarySkills[0] || 'Cloud', spec.secondarySkills[1] || 'CI/CD', 'Telemetry'],
        milestoneProject: `Cloud-Deployed Production Capstone with Metrics Dashboard`,
        learningOutcomes: [
          'Deploy live portfolio showcase with real user traffic',
          'Prepare for technical interview defense on architecture design'
        ]
      }
    ]
  };

  const prompt = `You are a senior software architect and technical career mentor at Saarthi AI ("Your Career. Your Journey. Your Saarthi.").
Generate a personalized 3-phase technical learning roadmap for an ambitious learner aiming for the role "${role}".
Student's Current Verified Skills: ${currentSkills.join(', ') || 'Beginner in programming'}.
Weekly Study Availability: ${weeklyHours} hours per week.
Academic Context: ${education}.

Return strictly this JSON schema:
{
  "career": "${role}",
  "weeklyCommitment": ${weeklyHours},
  "summary": "2 sentences explaining the rationale behind this tailored path",
  "phases": [
    {
      "phaseNumber": 1,
      "title": "Phase title",
      "duration": "Weeks 1-4",
      "description": "2 sentences on scope",
      "keySkills": ["skill1", "skill2", "skill3"],
      "milestoneProject": "Milestone project name",
      "learningOutcomes": ["Outcome 1", "Outcome 2"]
    },
    {
      "phaseNumber": 2,
      "title": "Phase title",
      "duration": "Weeks 5-8",
      "description": "2 sentences on scope",
      "keySkills": ["skill1", "skill2"],
      "milestoneProject": "Milestone project name",
      "learningOutcomes": ["Outcome 1", "Outcome 2"]
    },
    {
      "phaseNumber": 3,
      "title": "Phase title",
      "duration": "Weeks 9-12",
      "description": "2 sentences on scope",
      "keySkills": ["skill1", "skill2"],
      "milestoneProject": "Milestone project name",
      "learningOutcomes": ["Outcome 1", "Outcome 2"]
    }
  ]
}`;

  return callServerGemini<GeneratedRoadmap>(prompt, fallback);
}

// 2. PROJECT RECOMMENDER
export async function recommendProjectsViaAI(
  role: TargetRole,
  currentSkills: string[]
): Promise<AIResult<ProjectConcept[]>> {
  const spec = CAREER_TAXONOMY[role];
  const fallback: ProjectConcept[] = [
    {
      id: 'proj-1',
      level: 'Beginner',
      title: `${role} Algorithmic Sandbox & Diagnostic Suite`,
      description: `A hands-on implementation focusing on core principles, automated unit tests, and foundational pipelines using ${spec.coreSkills[0]}.`,
      techStack: [spec.coreSkills[0], spec.coreSkills[1] || 'SQL', 'Git', 'pytest'],
      estimatedHours: 25,
      milestones: [
        'Dataset / baseline schema configuration',
        'Algorithm implementation with Big-O complexity analysis',
        'Automated testing suite & comprehensive README'
      ],
      resumeBullet: `Engineered a modular ${spec.coreSkills[0]} sandbox benchmark, achieving 98% test coverage and reducing execution latency by 35%.`
    },
    {
      id: 'proj-2',
      level: 'Intermediate',
      title: `Enterprise ${role} Automated Service Pipeline`,
      description: `End-to-end service featuring streaming ingestion, RESTful API endpoints, and Docker containerization ready for cloud staging.`,
      techStack: [spec.coreSkills[0], spec.coreSkills[2] || 'FastAPI', 'Docker', 'PostgreSQL'],
      estimatedHours: 50,
      milestones: [
        'Relational schema design and indexing strategy',
        'Asynchronous API service design with error handling',
        'Docker container build and local Docker Compose orchestration'
      ],
      resumeBullet: `Architected an asynchronous ${role} ingestion pipeline with FastAPI and Docker, handling 1,200+ requests/sec with p99 latency < 60ms.`
    },
    {
      id: 'proj-3',
      level: 'Advanced / Capstone',
      title: `Production Distributed ${role} Ecosystem`,
      description: `High-availability cloud capstone featuring live telemetry, distributed processing, CI/CD automation, and real-time dashboarding.`,
      techStack: [spec.coreSkills[0], spec.secondarySkills[0] || 'Kubernetes', 'Cloud (AWS/GCP)', 'Prometheus & Grafana'],
      estimatedHours: 85,
      milestones: [
        'Distributed cluster configuration and load balancing',
        'Real-time metrics export with Prometheus and Grafana alerts',
        'GitHub Actions continuous deployment with automated health checks'
      ],
      resumeBullet: `Constructed a cloud-native distributed ${role} architecture deployed on Kubernetes with automated CI/CD and sub-second failover recovery.`
    }
  ];

  const prompt = `You are an engineering hiring manager at a top technology company.
Recommend 3 distinct, portfolio-grade capstone projects for a university student preparing for the role "${role}".
Their current skills: ${currentSkills.join(', ') || 'Foundational coding'}.

Return strictly this JSON schema array of 3 objects:
[
  {
    "id": "proj-1",
    "level": "Beginner",
    "title": "Clear Project Title",
    "description": "2-3 sentences explaining the architecture and what makes it impressive to recruiters",
    "techStack": ["tech1", "tech2", "tech3", "tech4"],
    "estimatedHours": 25,
    "milestones": ["Milestone 1", "Milestone 2", "Milestone 3"],
    "resumeBullet": "High impact bullet point following Google X-Y-Z formula: Accomplished [X] as measured by [Y] by doing [Z]"
  },
  {
    "id": "proj-2",
    "level": "Intermediate",
    "title": "Clear Project Title",
    "description": "2-3 sentences explaining the architecture",
    "techStack": ["tech1", "tech2", "tech3", "tech4"],
    "estimatedHours": 50,
    "milestones": ["Milestone 1", "Milestone 2", "Milestone 3"],
    "resumeBullet": "High impact bullet point following Google X-Y-Z formula"
  },
  {
    "id": "proj-3",
    "level": "Advanced / Capstone",
    "title": "Clear Project Title",
    "description": "2-3 sentences explaining the architecture",
    "techStack": ["tech1", "tech2", "tech3", "tech4"],
    "estimatedHours": 85,
    "milestones": ["Milestone 1", "Milestone 2", "Milestone 3"],
    "resumeBullet": "High impact bullet point following Google X-Y-Z formula"
  }
]`;

  return callServerGemini<ProjectConcept[]>(prompt, fallback);
}

// 3. ATS RESUME ANALYZER
export async function auditResumeViaAI(
  resumeText: string,
  targetRole: TargetRole
): Promise<AIResult<ResumeAudit>> {
  const spec = CAREER_TAXONOMY[targetRole];
  const lower = resumeText.toLowerCase();
  const matched = spec.coreSkills.filter(s => lower.includes(s.toLowerCase()));
  const missing = spec.coreSkills.filter(s => !lower.includes(s.toLowerCase()));

  const fallback: ResumeAudit = {
    score: Math.min(88, Math.max(52, Math.round((matched.length / spec.coreSkills.length) * 100))),
    summary: `Your resume demonstrates good foundational coursework, but requires more quantified business metrics and explicit citations of production frameworks for ${targetRole}.`,
    atsWarnings: [
      'Avoid unformatted multi-column layouts or tables that confuse legacy ATS parsers.',
      'Ensure standard section headers are used (EDUCATION, TECHNICAL SKILLS, PROJECTS, EXPERIENCE).',
      'Replace vague responsibility statements with action-driven achievements.'
    ],
    matchedSkills: matched.length > 0 ? matched : [spec.coreSkills[0]],
    missingCriticalSkills: missing.length > 0 ? missing : [spec.secondarySkills[0]],
    actionableFixes: [
      `Prominently showcase key required competencies: ${spec.coreSkills.slice(0, 3).join(', ')}.`,
      'Apply Google\'s X-Y-Z formula to project bullets: "Accomplished [X] as measured by [Y] by doing [Z]".',
      'Include live GitHub repository URLs with clean README documentation for all listed projects.'
    ],
    revisedBullets: [
      {
        original: 'Worked on building machine learning models for customer churn prediction.',
        improved: 'Developed Random Forest and XGBoost classifiers on 150k telco records, improving recall by 18% and cutting churn misclassification by 24%.',
        reason: 'Quantifies the exact dataset size, model types, and measurable metric improvement.'
      },
      {
        original: 'Created a REST API backend with FastAPI and SQL database.',
        improved: 'Architected async FastAPI endpoints connected to PostgreSQL with indexed queries, maintaining p95 response times under 38ms.',
        reason: 'Adds latency benchmarks and demonstrates database optimization expertise.'
      }
    ]
  };

  const prompt = `You are a senior technical recruiter and ATS parsing specialist for Tier-1 technology companies.
Audit the following student resume for the target role "${targetRole}":
"""
${resumeText}
"""
Target Role Core Requirements: ${spec.coreSkills.join(', ')}.

Return strictly this JSON schema:
{
  "score": 78,
  "summary": "2-3 sentences summarizing readiness for ${targetRole} internships",
  "atsWarnings": ["Warning 1", "Warning 2"],
  "matchedSkills": ["skill1", "skill2"],
  "missingCriticalSkills": ["missingSkill1", "missingSkill2"],
  "actionableFixes": ["Fix 1", "Fix 2", "Fix 3"],
  "revisedBullets": [
    {
      "original": "Weak bullet found in or inferred from the resume",
      "improved": "High-impact revision following Google X-Y-Z formula with metrics",
      "reason": "Why this change satisfies technical recruiters"
    },
    {
      "original": "Another weak bullet",
      "improved": "High-impact revision with quantitative metrics",
      "reason": "Why this improves ATS ranking"
    }
  ]
}`;

  return callServerGemini<ResumeAudit>(prompt, fallback);
}

// 4. INTERVIEW QUESTION GENERATOR
export async function generateInterviewQuestionsViaAI(
  role: TargetRole,
  category: string
): Promise<AIResult<InterviewQuestion[]>> {
  const spec = CAREER_TAXONOMY[role];
  const fallback: InterviewQuestion[] = [
    {
      id: 'q1',
      category,
      question: `For a junior ${role}, explain how you evaluate algorithmic bottlenecks when working with ${spec.coreSkills[0]} under heavy throughput.`,
      sampleAnswer: `I profile memory and CPU bottlenecks using specialized profilers, analyze time/space asymptotic complexity, minimize redundant loops or object allocations, and apply caching or vectorization.`,
      hints: [
        'Mention Big-O time and space complexity',
        'Cite specific profiling tools (e.g., cProfile, line_profiler)',
        'Discuss memory allocation vs computational speed tradeoffs'
      ]
    },
    {
      id: 'q2',
      category,
      question: `Walk through your methodical approach to debugging a production failure involving ${spec.coreSkills[1] || 'distributed components'}.`,
      sampleAnswer: `I isolate the reproduction steps, inspect structured application and system logs, form a falsifiable hypothesis, verify using unit/integration tests, and implement a regression guard.`,
      hints: [
        'Structure your answer using the STAR method (Situation, Task, Action, Result)',
        'Emphasize root-cause isolation over guesswork',
        'Explain how you ensure the bug never recurs'
      ]
    }
  ];

  const prompt = `You are a Principal Engineering Interviewer conducting a technical interview for a junior "${role}".
Generate 2 technical interview questions in category "${category}".

Return strictly this JSON schema array of 2 objects:
[
  {
    "id": "q1",
    "category": "${category}",
    "question": "Clear, technically rigorous interview question",
    "sampleAnswer": "Comprehensive ideal answer that an interviewer expects from a top candidate",
    "hints": ["Hint 1", "Hint 2", "Hint 3"]
  },
  {
    "id": "q2",
    "category": "${category}",
    "question": "Another realistic technical question",
    "sampleAnswer": "Comprehensive ideal answer",
    "hints": ["Hint 1", "Hint 2"]
  }
]`;

  return callServerGemini<InterviewQuestion[]>(prompt, fallback);
}

// 5. INTERVIEW CRITIQUE
export async function critiqueInterviewAnswerViaAI(
  role: TargetRole,
  question: string,
  candidateAnswer: string,
  sampleAnswer: string
): Promise<AIResult<InterviewCritique>> {
  const fallback: InterviewCritique = {
    score: candidateAnswer.length > 80 ? 8 : 6,
    feedback: candidateAnswer.length > 80
      ? 'Good solid explanation demonstrating core technical understanding. Could be elevated by mentioning trade-offs and real-world scale.'
      : 'Basic conceptual response. Needs deeper technical specificity, architectural considerations, and concrete edge cases.',
    strengths: [
      'Directly addressed the primary concept',
      'Used correct engineering vocabulary'
    ],
    omissions: [
      'Did not explore asymptotic complexity or performance trade-offs',
      'Could cite specific frameworks or production tooling'
    ]
  };

  const prompt = `You are a Principal Engineering Interviewer evaluating a candidate's answer for the role "${role}".
Question Asked: "${question}"
Expected Benchmark Answer: "${sampleAnswer}"
Candidate's Response: "${candidateAnswer}"

Grade the candidate on a strict scale of 1 to 10.
Return strictly this JSON schema:
{
  "score": 8,
  "feedback": "2-3 sentences of constructive, balanced feedback highlighting strengths and room for growth",
  "strengths": ["Strength 1", "Strength 2"],
  "omissions": ["Critical missing point or nuance 1", "Missing point 2"]
}`;

  return callServerGemini<InterviewCritique>(prompt, fallback);
}

// 6. WEEKLY STUDY PLANNER GENERATOR
export async function generateStudyPlanViaAI(
  role: TargetRole,
  weeklyHours: number,
  missingSkills: string[]
): Promise<AIResult<PlannerTask[]>> {
  const spec = CAREER_TAXONOMY[role];
  const primaryGap = missingSkills[0] || spec.coreSkills[0];
  const secondaryGap = missingSkills[1] || spec.coreSkills[1] || 'System Architecture';

  const fallback: PlannerTask[] = [
    {
      id: `task-${Date.now()}-1`,
      day: 'Monday',
      task: `Master theory and mathematical foundations of ${primaryGap}`,
      durationHours: Math.round(weeklyHours * 0.25),
      completed: false,
      category: 'Theory'
    },
    {
      id: `task-${Date.now()}-2`,
      day: 'Wednesday',
      task: `Hands-on coding lab: Implement ${primaryGap} prototype module`,
      durationHours: Math.round(weeklyHours * 0.3),
      completed: false,
      category: 'Coding'
    },
    {
      id: `task-${Date.now()}-3`,
      day: 'Friday',
      task: `Build integrated service integrating ${secondaryGap}`,
      durationHours: Math.round(weeklyHours * 0.25),
      completed: false,
      category: 'Project'
    },
    {
      id: `task-${Date.now()}-4`,
      day: 'Sunday',
      task: `Conduct 30-min mock technical interview on ${role} fundamentals`,
      durationHours: Math.round(weeklyHours * 0.2),
      completed: false,
      category: 'Interview'
    }
  ];

  const prompt = `Create a realistic 4-5 task weekly study schedule totaling ${weeklyHours} hours for a student targeting "${role}".
Focus especially on their missing skills: ${missingSkills.join(', ') || 'Core competencies'}.

Return strictly this JSON schema array:
[
  {
    "id": "task-1",
    "day": "Monday",
    "task": "Specific actionable study or coding task",
    "durationHours": 3,
    "completed": false,
    "category": "Theory"
  },
  {
    "id": "task-2",
    "day": "Wednesday",
    "task": "Specific actionable task",
    "durationHours": 4,
    "completed": false,
    "category": "Coding"
  },
  {
    "id": "task-3",
    "day": "Friday",
    "task": "Specific actionable task",
    "durationHours": 4,
    "completed": false,
    "category": "Project"
  },
  {
    "id": "task-4",
    "day": "Sunday",
    "task": "Specific actionable task",
    "durationHours": 2,
    "completed": false,
    "category": "Interview"
  }
]`;

  return callServerGemini<PlannerTask[]>(prompt, fallback);
}
