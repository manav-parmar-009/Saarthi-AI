import React, { useState } from 'react';
import {
  GraduationCap,
  ExternalLink,
  BookOpen,
  Code2,
  Bookmark,
  Search,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { UserProfile, TargetRole } from '../types';
import { CAREER_TAXONOMY } from '../data/taxonomy';

interface LearningResourcesProps {
  profile: UserProfile;
}

export const LearningResources: React.FC<LearningResourcesProps> = ({ profile }) => {
  const [selectedRole, setSelectedRole] = useState<TargetRole>(profile.targetRole);
  const [filterType, setFilterType] = useState<'all' | 'doc' | 'course' | 'practice'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const spec = CAREER_TAXONOMY[selectedRole];

  const filteredResources = spec.curatedResources.filter((res) => {
    const matchesType = filterType === 'all' || res.type === filterType;
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.provider.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Curated Technical Learning Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Direct, authentic links to official documentation, university lecture notes, and interactive practice platforms for engineering candidates.
          </p>
        </div>

        {/* Pathway Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Track:</span>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value as TargetRole)}
            className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-800 focus:border-indigo-600 focus:outline-none"
          >
            {Object.keys(CAREER_TAXONOMY).map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
        {/* Type Filters */}
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {[
            { id: 'all', label: 'All Resources' },
            { id: 'course', label: 'Courses & Handbooks' },
            { id: 'doc', label: 'Official Documentation' },
            { id: 'practice', label: 'Interactive Practice Labs' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilterType(item.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                filterType === item.id
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resources..."
            className="w-full rounded-lg border border-slate-300 pl-8 pr-3 py-1.5 text-xs focus:border-indigo-600 focus:outline-none"
          />
        </div>
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((res, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between hover:border-indigo-300 hover:shadow-sm transition"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-100">
                  {res.badge}
                </span>
                <span className="text-xs text-slate-400 font-semibold">{res.provider}</span>
              </div>

              <h3 className="text-base font-extrabold text-slate-900 mt-3 leading-snug">
                {res.title}
              </h3>
            </div>

            <div className="pt-6">
              <a
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition shadow-2xs"
              >
                <span>Access Learning Material</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
