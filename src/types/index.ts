export type TargetRole =
  | 'AI Engineer'
  | 'Machine Learning Engineer'
  | 'Data Scientist'
  | 'Data Analyst'
  | 'Software Development Engineer'
  | 'Web Developer'
  | 'Cybersecurity Analyst'
  | 'Cloud Engineer';

export interface CareerSpec {
  title: TargetRole;
  tagline: string;
  description: string;
  coreSkills: string[];
  secondarySkills: string[];
  medianJuniorSalary: string;
  interviewFocus: string[];
  curatedResources: {
    title: string;
    provider: string;
    url: string;
    type: 'doc' | 'course' | 'practice';
    badge: string;
  }[];
}

export interface UserProfile {
  name: string;
  targetRole: TargetRole;
  education: string;
  weeklyCommitment: number;
  currentSkills: string[];
  roadmapCompletedNodes: string[];
  plannerTasks: PlannerTask[];
  interviewHistory: InterviewRecord[];
  readinessChecklist: Record<string, boolean>;
  resumeDraft: string;
}

export interface PlannerTask {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  task: string;
  durationHours: number;
  completed: boolean;
  category: 'Coding' | 'Theory' | 'Project' | 'Interview';
}

export interface InterviewRecord {
  id: string;
  question: string;
  category: string;
  answer: string;
  score: number;
  feedback: string;
  strengths: string[];
  omissions: string[];
  date: string;
}

export interface RoadmapPhase {
  phaseNumber: number;
  title: string;
  duration: string;
  description: string;
  keySkills: string[];
  milestoneProject: string;
  learningOutcomes: string[];
}

export interface GeneratedRoadmap {
  career: TargetRole;
  weeklyCommitment: number;
  summary: string;
  phases: RoadmapPhase[];
}

export interface ProjectConcept {
  id: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced / Capstone';
  title: string;
  description: string;
  techStack: string[];
  estimatedHours: number;
  milestones: string[];
  resumeBullet: string;
}

export interface ResumeAudit {
  score: number;
  summary: string;
  atsWarnings: string[];
  matchedSkills: string[];
  missingCriticalSkills: string[];
  actionableFixes: string[];
  revisedBullets: {
    original: string;
    improved: string;
    reason: string;
  }[];
}

export interface InterviewQuestion {
  id: string;
  category: string;
  question: string;
  sampleAnswer: string;
  hints: string[];
}

export interface InterviewCritique {
  score: number;
  feedback: string;
  strengths: string[];
  omissions: string[];
}
