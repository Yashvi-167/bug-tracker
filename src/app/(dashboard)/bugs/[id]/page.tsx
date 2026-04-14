'use client';

import React, { useEffect, useState } from 'react';
import ReplayPlayer from '@/components/replay/ReplayPlayer';
import { 
  BadgeAlert, 
  MessageSquare, 
  History, 
  User, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function BugDetailPage({ params }: { params: { id: string } }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, we'd use SWR or React Query
    fetch(`/api/bugs/${params.id}`)
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  if (loading) return (
    <div className="flex items-center justify-center h-96">
      <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!data?.bug) return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-bold text-slate-300">Bug not found</h2>
      <p className="text-slate-500">The issue you're looking for doesn't exist or has been deleted.</p>
    </div>
  );

  const { bug, session, events } = data;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <span>Bugs</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-slate-300">#{bug.id.substring(0, 8)}</span>
      </div>

      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-white">{bug.title}</h1>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-full text-xs font-bold uppercase tracking-wider">
              <BadgeAlert className="w-3 h-3" />
              {bug.severity}
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 text-slate-300 border border-slate-700 rounded-full text-xs font-bold uppercase tracking-wider">
              {bug.status}
            </div>
            <span className="text-sm text-slate-500 items-center flex gap-1">
              <User className="w-4 h-4" />
              Assigned to: <span className="text-slate-300 font-medium ml-1">{bug.assignedTo || 'Unassigned'}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          {/* Replay Section */}
          <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden shadow-2xl">
            {events && events.length > 0 ? (
              <ReplayPlayer events={events} />
            ) : (
              <div className="flex items-center justify-center h-full flex-col gap-4 text-slate-500 bg-slate-900">
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center">
                  <History className="w-8 h-8 opacity-20" />
                </div>
                <p>No replay data available for this session</p>
              </div>
            )}
          </div>

          {/* Description & Timeline */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Description</h3>
              <p className="text-slate-400 leading-relaxed whitespace-pre-wrap">{bug.description}</p>
            </div>

            <div className="pt-6 border-t border-slate-800">
              <h3 className="text-lg font-bold text-white mb-6">Activity Timeline</h3>
              <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-slate-800">
                <div className="flex gap-6 relative">
                  <div className="w-6 h-6 rounded-full bg-indigo-600 border-4 border-slate-900 z-10" />
                  <div>
                    <p className="text-slate-200 font-medium small">Bug reported by User</p>
                    <p className="text-xs text-slate-500 mt-1">April 12, 2024 at 10:42 PM</p>
                  </div>
                </div>
                <div className="flex gap-6 relative">
                  <div className="w-6 h-6 rounded-full bg-slate-800 border-4 border-slate-900 z-10" />
                  <div>
                    <p className="text-slate-400 font-medium small italic">No further activity</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Device Info</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm py-2 border-b border-slate-800/50">
                <span className="text-slate-500">Browser</span>
                <span className="text-slate-300 font-medium">{session?.browser || 'Unknown'}</span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-slate-800/50">
                <span className="text-slate-500">Operating System</span>
                <span className="text-slate-300 font-medium">{session?.os || 'Unknown'}</span>
              </div>
              <div className="flex justify-between text-sm py-2">
                <span className="text-slate-500">Current URL</span>
                <span className="text-indigo-400 font-medium truncate ml-4 flex items-center gap-1 max-w-[150px]">
                  {session?.url || '/unknown'} <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-900/20 to-slate-900 border border-indigo-500/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <MessageSquare className="w-5 h-5 text-indigo-400" />
              <h3 className="text-lg font-bold text-white">Add Comment</h3>
            </div>
            <textarea 
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:ring-1 focus:ring-indigo-500 outline-none h-24 text-slate-300 placeholder:text-slate-600"
              placeholder="Suggest a fix or ask for clarification..."
            />
            <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">
              Post Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
