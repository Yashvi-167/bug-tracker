import React from 'react';
import { 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Clock,
  ArrowUpRight
} from 'lucide-react';

const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
  <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-slate-700 transition-colors">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="flex items-center gap-1 text-emerald-400 text-sm font-medium">
        <span>{change}</span>
        <TrendingUp className="w-4 h-4" />
      </div>
    </div>
    <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-white mt-1">{value}</p>
  </div>
);

export default function DashboardPage() {
  const stats = [
    { title: 'Total Bugs', value: '1,284', change: '+12%', icon: AlertCircle, color: 'bg-indigo-600' },
    { title: 'Active Sessions', value: '42', change: '+5%', icon: Clock, color: 'bg-amber-600' },
    { title: 'Resolved', value: '892', change: '+18%', icon: CheckCircle2, color: 'bg-emerald-600' },
    { title: 'Response Time', value: '1.4h', change: '-8%', icon: TrendingUp, color: 'bg-rose-600' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">System Overview</h1>
        <p className="text-slate-400 mt-1">Real-time bug tracking and session monitoring across all projects.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Error Frequency</h2>
            <button className="text-sm text-indigo-400 font-medium flex items-center gap-1 hover:text-indigo-300">
              View Analytics <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          <div className="h-64 flex items-end gap-2 px-2">
            {[40, 70, 45, 90, 65, 80, 50, 60, 75, 55, 30, 85].map((h, i) => (
              <div 
                key={i} 
                className="flex-1 bg-indigo-600/20 hover:bg-indigo-600/40 transition-colors rounded-t-sm relative group"
                style={{ height: `${h}%` }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-slate-700">
                  {h} errors
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-slate-500 px-2">
            <span>00:00</span>
            <span>04:00</span>
            <span>08:00</span>
            <span>12:00</span>
            <span>16:00</span>
            <span>20:00</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Critical Issues</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 p-3 hover:bg-slate-800/50 rounded-lg transition-colors cursor-pointer group">
                <div className="w-2 h-12 bg-rose-600 rounded-full" />
                <div>
                  <h4 className="font-semibold text-slate-200 group-hover:text-white transition-colors">ChunkLoadError: Failed to load...</h4>
                  <p className="text-xs text-slate-500 mt-1">5 minutes ago • /checkout</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
