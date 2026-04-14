import React from 'react';
import { Settings, Shield, Bell, Code, CreditCard } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-slate-500 mt-1">Configure your LogStream project and team access.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: Shield, title: 'Authentication', desc: 'Secure your account with 2FA and SSO.' },
          { icon: Bell, title: 'Notifications', desc: 'Manage email and Slack alerts for critical bugs.' },
          { icon: Code, title: 'Project API Keys', desc: 'Regenerate your secret keys for ingestion.' },
          { icon: CreditCard, title: 'Billing', desc: 'Upgrade your plan to unlock more session storage.' },
          { icon: Settings, title: 'Team Access', desc: 'Invite developers and set their roles.' },
        ].map((item, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-slate-700 transition-colors group cursor-pointer">
            <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-600 transition-all">
              <item.icon className="w-5 h-5 text-slate-300 group-hover:text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
            <p className="text-slate-500 text-sm font-medium">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
