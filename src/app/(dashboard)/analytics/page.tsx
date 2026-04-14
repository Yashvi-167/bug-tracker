import React from 'react';
import { BarChart3, TrendingUp, Users, Globe, Zap } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Analytics</h1>
        <p className="text-slate-500 mt-1">Deep insights into application performance and user behavior.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Avg. Uptime', value: '99.98%', icon: Globe, color: 'text-emerald-500' },
          { label: 'Error Rate', value: '0.04%', icon: TrendingUp, color: 'text-rose-500' },
          { label: 'Unique Users', value: '12.4k', icon: Users, color: 'text-indigo-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <stat.icon className={`w-8 h-8 ${stat.color} mb-4`} />
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="w-16 h-16 bg-indigo-600/10 rounded-full flex items-center justify-center mb-6">
          <Zap className="w-8 h-8 text-indigo-500" />
        </div>
        <h2 className="text-xl font-bold text-white">Advanced Insights Coming Soon</h2>
        <p className="text-slate-500 max-w-md mt-2">
          We're building powerful heatmaps and conversion tracking to help you understand your users better.
        </p>
      </div>
    </div>
  );
}
