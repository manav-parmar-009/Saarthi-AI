import React, { useState } from 'react';
import {
  CalendarCheck2,
  Sparkles,
  Plus,
  CheckCircle2,
  Trash2,
  Clock,
  Loader2,
  RotateCcw,
  Calendar
} from 'lucide-react';
import { UserProfile, PlannerTask } from '../types';
import { generateStudyPlanViaAI } from '../lib/gemini';
import { TelemetryReport } from '../lib/storage';

interface WeeklyPlannerProps {
  profile: UserProfile;
  telemetry: TelemetryReport;
  onUpdateProfile: (updater: (prev: UserProfile) => UserProfile) => void;
}

const DAYS: PlannerTask['day'][] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

export const WeeklyPlanner: React.FC<WeeklyPlannerProps> = ({
  profile,
  telemetry,
  onUpdateProfile
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [sourceBadge, setSourceBadge] = useState('');
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskDay, setNewTaskDay] = useState<PlannerTask['day']>('Monday');
  const [newTaskHours, setNewTaskHours] = useState(2);
  const [newTaskCategory, setNewTaskCategory] = useState<PlannerTask['category']>('Coding');

  const handleGenerateAIPlan = async () => {
    setIsLoading(true);
    const result = await generateStudyPlanViaAI(
      profile.targetRole,
      profile.weeklyCommitment,
      telemetry.missingCoreSkills
    );

    onUpdateProfile((prev) => ({
      ...prev,
      plannerTasks: result.data
    }));
    setSourceBadge(result.modelBadge);
    setIsLoading(false);
  };

  const toggleTask = (taskId: string) => {
    onUpdateProfile((prev) => ({
      ...prev,
      plannerTasks: prev.plannerTasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    }));
  };

  const deleteTask = (taskId: string) => {
    onUpdateProfile((prev) => ({
      ...prev,
      plannerTasks: prev.plannerTasks.filter((t) => t.id !== taskId)
    }));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    const newTask: PlannerTask = {
      id: `task-${Date.now()}`,
      day: newTaskDay,
      task: newTaskText.trim(),
      durationHours: newTaskHours,
      completed: false,
      category: newTaskCategory
    };

    onUpdateProfile((prev) => ({
      ...prev,
      plannerTasks: [...prev.plannerTasks, newTask]
    }));
    setNewTaskText('');
  };

  const totalAllocatedHours = profile.plannerTasks.reduce((sum, t) => sum + t.durationHours, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Weekly Study Planner & Task Orchestrator
            </h1>
            {sourceBadge && (
              <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700 border border-indigo-100">
                <Sparkles className="h-3 w-3" />
                {sourceBadge}
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Organizes your <strong>{profile.weeklyCommitment} weekly hours</strong> across coding labs, theoretical foundations, and interview drills.
          </p>
        </div>

        <button
          onClick={handleGenerateAIPlan}
          disabled={isLoading}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 disabled:opacity-50 transition"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Scheduling Tasks...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              <span>AI Generate Schedule</span>
            </>
          )}
        </button>
      </div>

      {/* Allocation Status Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Weekly Target Commitment
            </span>
            <span className="text-lg font-extrabold text-slate-900">{profile.weeklyCommitment} hrs</span>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Currently Scheduled
            </span>
            <span className="text-lg font-extrabold text-indigo-600">{totalAllocatedHours} hrs</span>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Tasks Completed
            </span>
            <span className="text-lg font-extrabold text-emerald-600">
              {profile.plannerTasks.filter((t) => t.completed).length} / {profile.plannerTasks.length}
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            onUpdateProfile((prev) => ({
              ...prev,
              plannerTasks: prev.plannerTasks.map((t) => ({ ...t, completed: false }))
            }));
          }}
          className="text-xs font-bold text-slate-500 hover:text-slate-800 self-start sm:self-auto"
        >
          Reset Checked Status
        </button>
      </div>

      {/* 7-Day Calendar Tasks List */}
      <div className="space-y-3">
        {DAYS.map((day) => {
          const dayTasks = profile.plannerTasks.filter((t) => t.day === day);

          return (
            <div
              key={day}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-indigo-600" />
                  <h3 className="text-sm font-extrabold text-slate-900">{day}</h3>
                </div>
                <span className="text-xs text-slate-400 font-semibold">
                  {dayTasks.reduce((s, t) => s + t.durationHours, 0)} hrs scheduled
                </span>
              </div>

              {dayTasks.length === 0 ? (
                <p className="text-xs text-slate-400 italic py-2">Rest or flexible catch-up day.</p>
              ) : (
                <div className="divide-y divide-slate-100 mt-1">
                  {dayTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between py-2.5 px-1 hover:bg-slate-50 rounded-lg transition"
                    >
                      <div
                        onClick={() => toggleTask(task.id)}
                        className="flex items-center gap-3 cursor-pointer flex-1"
                      >
                        <div
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition ${
                            task.completed
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {task.completed && <CheckCircle2 className="h-3.5 w-3.5" />}
                        </div>
                        <div className="min-w-0">
                          <span
                            className={`text-xs block ${
                              task.completed
                                ? 'line-through text-slate-400'
                                : 'text-slate-900 font-semibold'
                            }`}
                          >
                            {task.task}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">
                            {task.durationHours} hrs • {task.category}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            task.completed
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {task.completed ? 'Done ✓' : task.category}
                        </span>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="p-1 text-slate-300 hover:text-rose-600 transition"
                          title="Delete Task"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Custom Task Form */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-3">Add Custom Study Task</h3>
        <form onSubmit={handleAddTask} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="e.g. Solve 3 LeetCode Mediums on Graphs..."
            className="sm:col-span-2 rounded-xl border border-slate-300 px-3.5 py-2 text-xs focus:border-indigo-600 focus:outline-none"
          />
          <div className="flex gap-2">
            <select
              value={newTaskDay}
              onChange={(e) => setNewTaskDay(e.target.value as any)}
              className="flex-1 rounded-xl border border-slate-300 bg-white px-2 py-2 text-xs focus:border-indigo-600 focus:outline-none"
            >
              {DAYS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <select
              value={newTaskCategory}
              onChange={(e) => setNewTaskCategory(e.target.value as any)}
              className="flex-1 rounded-xl border border-slate-300 bg-white px-2 py-2 text-xs focus:border-indigo-600 focus:outline-none"
            >
              <option value="Coding">Coding</option>
              <option value="Theory">Theory</option>
              <option value="Project">Project</option>
              <option value="Interview">Interview</option>
            </select>
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition"
          >
            <Plus className="h-4 w-4" />
            <span>Add to Schedule</span>
          </button>
        </form>
      </div>
    </div>
  );
};
