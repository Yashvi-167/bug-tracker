'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send, AlertTriangle } from 'lucide-react';

export default function ReportBugPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'medium',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const sessionId = sessionStorage.getItem('bt_session_id');

    try {
      const response = await fetch('/api/bugs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          sessionId,
        }),
      });

      if (response.ok) {
        const bug = await response.json();
        router.push(`/bugs/${bug.id}`);
      }
    } catch (error) {
      console.error('Failed to report bug', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-amber-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Report an Issue</h1>
          <p className="text-slate-500">Your session replay will be automatically attached for debugging.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6 shadow-xl">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300">Bug Title</label>
          <input 
            required
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
            placeholder="e.g. Navigation fails on mobile"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300">Severity Level</label>
          <div className="grid grid-cols-3 gap-4">
            {['low', 'medium', 'high'].map((level) => (
              <button
                key={level}
                type="button"
                className={`py-2 px-4 rounded-lg border text-sm font-bold uppercase tracking-wider transition-all ${
                  formData.severity === level 
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
                  : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'
                }`}
                onClick={() => setFormData({ ...formData, severity: level })}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300">Description</label>
          <textarea 
            required
            rows={5}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-1 focus:ring-indigo-500 outline-none transition-all resize-none"
            placeholder="Describe the steps to reproduce..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="pt-4">
          <button 
            disabled={submitting}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {submitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                Submit Report
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
