'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

export default function BugsListPage() {
  const [bugs, setBugs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/bugs')
      .then(res => res.json())
      .then(d => {
        setBugs(Array.isArray(d) ? d : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'high':
      case 'critical': return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
      case 'medium': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      default: return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Issues</h1>
          <p className="text-slate-500 mt-1">Manage and track all reported bugs and sessions.</p>
        </div>
        <Link 
          href="/bugs/new" 
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20"
        >
          <Plus className="w-5 h-5" />
          Report Bug
        </Link>
      </div>

      <div className="flex gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-300 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
            placeholder="Search by title, ID or description..."
          />
        </div>
        <button className="bg-slate-900 border border-slate-800 text-slate-300 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-slate-800 transition-colors">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950/50 border-b border-slate-800">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Issue</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Severity</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Assigned To</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {loading ? (
              [1, 2, 3].map(i => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={5} className="px-6 py-8 h-16 bg-slate-900/50"></td>
                </tr>
              ))
            ) : bugs.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-20 text-center text-slate-500">
                  <div className="flex flex-col items-center gap-2">
                    <AlertCircle className="w-10 h-10 opacity-20" />
                    <p>No issues found. Everything looks good!</p>
                  </div>
                </td>
              </tr>
            ) : bugs.map((bug) => (
              <tr 
                key={bug.id} 
                className="hover:bg-slate-800/30 transition-colors group cursor-pointer"
                onClick={() => window.location.href = `/bugs/${bug.id}`}
              >
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-slate-200 font-semibold group-hover:text-white transition-colors">
                      {bug.title}
                    </span>
                    <span className="text-xs text-slate-500 mt-1 uppercase tracking-tight font-mono">
                      #{bug.id.substring(0, 8)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-medium">
                    {bug.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2.5 py-1 rounded-full border font-medium ${getSeverityStyles(bug.severity)}`}>
                    {bug.severity}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-400">
                  {bug.assignedTo || '--'}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 hover:bg-slate-700 rounded-md text-slate-500 transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
