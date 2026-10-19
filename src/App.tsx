import React, { useState, useEffect } from 'react';
import { UserProfile, TargetRole } from './types';
import {
  loadUserProfile,
  saveUserProfile,
  calculateReadinessTelemetry
} from './lib/storage';
import { Sidebar, ActiveTab } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { CareerDashboard } from './components/CareerDashboard';
import { RoadmapGenerator } from './components/RoadmapGenerator';
import { SkillGapAnalyzer } from './components/SkillGapAnalyzer';
import { ProjectRecommender } from './components/ProjectRecommender';
import { ResumeAnalyzer } from './components/ResumeAnalyzer';
import { InterviewPractice } from './components/InterviewPractice';
import { LearningResources } from './components/LearningResources';
import { WeeklyPlanner } from './components/WeeklyPlanner';
import { ProgressTracker } from './components/ProgressTracker';
import { ReadinessChecker } from './components/ReadinessChecker';
import { ProfileSettings } from './components/ProfileSettings';
import { AboutModal } from './components/AboutModal';

export default function App() {
  const [view, setView] = useState<'landing' | 'app'>('landing');
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [userProfile, setUserProfile] = useState<UserProfile>(loadUserProfile());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);

  // Sync state changes back to localStorage
  const handleUpdateProfile = (updater: (prev: UserProfile) => UserProfile) => {
    setUserProfile((prev) => {
      const next = updater(prev);
      saveUserProfile(next);
      return next;
    });
  };

  const telemetry = calculateReadinessTelemetry(userProfile);

  const handleStartDashboard = (role?: TargetRole) => {
    if (role && role !== userProfile.targetRole) {
      handleUpdateProfile((prev) => ({ ...prev, targetRole: role }));
    }
    setView('app');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectRole = (role: TargetRole) => {
    handleUpdateProfile((prev) => ({ ...prev, targetRole: role }));
  };

  const handleToggleTask = (taskId: string) => {
    handleUpdateProfile((prev) => ({
      ...prev,
      plannerTasks: prev.plannerTasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-indigo-600 selection:text-white">
      {/* Global About Creator Modal */}
      <AboutModal isOpen={aboutModalOpen} onClose={() => setAboutModalOpen(false)} />

      {/* VIEW 1: LANDING PAGE */}
      {view === 'landing' ? (
        <LandingPage
          onStartDashboard={handleStartDashboard}
          onOpenAbout={() => setAboutModalOpen(true)}
        />
      ) : (
        /* VIEW 2: UNIFIED DASHBOARD APPLICATION SHELL */
        <div className="flex h-screen overflow-hidden bg-slate-50">
          {/* Collapsible Left Sidebar */}
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isOpen={sidebarOpen}
            setIsOpen={setSidebarOpen}
            isCollapsed={sidebarCollapsed}
            setIsCollapsed={setSidebarCollapsed}
            targetRole={userProfile.targetRole}
            onOpenAbout={() => setAboutModalOpen(true)}
            onGoToLanding={() => setView('landing')}
          />

          {/* Right Main Content Panel */}
          <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
            {/* Top Navigation */}
            <Navbar
              onToggleSidebar={() => setSidebarOpen(true)}
              targetRole={userProfile.targetRole}
              onSelectRole={handleSelectRole}
              readinessPct={telemetry.overallReadiness}
              userName={userProfile.name}
              onGoToLanding={() => setView('landing')}
              onOpenAbout={() => setAboutModalOpen(true)}
            />

            {/* Main Application Content Area */}
            <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
              {activeTab === 'dashboard' && (
                <CareerDashboard
                  profile={userProfile}
                  telemetry={telemetry}
                  setActiveTab={setActiveTab}
                  onToggleTask={handleToggleTask}
                  onOpenAbout={() => setAboutModalOpen(true)}
                />
              )}

              {activeTab === 'roadmap' && (
                <RoadmapGenerator
                  profile={userProfile}
                  onUpdateProfile={handleUpdateProfile}
                />
              )}

              {activeTab === 'skills' && (
                <SkillGapAnalyzer
                  profile={userProfile}
                  telemetry={telemetry}
                  onUpdateProfile={handleUpdateProfile}
                />
              )}

              {activeTab === 'projects' && (
                <ProjectRecommender
                  profile={userProfile}
                  onUpdateProfile={handleUpdateProfile}
                />
              )}

              {activeTab === 'resume' && (
                <ResumeAnalyzer
                  profile={userProfile}
                  onUpdateProfile={handleUpdateProfile}
                />
              )}

              {activeTab === 'interview' && (
                <InterviewPractice
                  profile={userProfile}
                  onUpdateProfile={handleUpdateProfile}
                />
              )}

              {activeTab === 'resources' && (
                <LearningResources profile={userProfile} />
              )}

              {activeTab === 'planner' && (
                <WeeklyPlanner
                  profile={userProfile}
                  telemetry={telemetry}
                  onUpdateProfile={handleUpdateProfile}
                />
              )}

              {activeTab === 'tracker' && (
                <ProgressTracker profile={userProfile} telemetry={telemetry} />
              )}

              {activeTab === 'readiness' && (
                <ReadinessChecker
                  profile={userProfile}
                  telemetry={telemetry}
                  onUpdateProfile={handleUpdateProfile}
                />
              )}

              {activeTab === 'profile' && (
                <ProfileSettings
                  profile={userProfile}
                  onUpdateProfile={handleUpdateProfile}
                  onOpenAbout={() => setAboutModalOpen(true)}
                />
              )}
            </main>
          </div>
        </div>
      )}
    </div>
  );
}
