import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Bug, 
  BarChart3, 
  Settings, 
  ShieldCheck,
  Zap
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Bugs', icon: Bug, href: '/bugs' },
    { name: 'Analytics', icon: BarChart3, href: '/analytics' },
    { name: 'Settings', icon: Settings, href: '/settings' },
  ];

  return (
    <div className="h-screen w-64 bg-slate-950 border-r border-slate-800 flex flex-col fixed left-0 top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-xl text-slate-100 tracking-tight">LogStream</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-md transition-all group"
          >
            <item.icon className="w-5 h-5 group-hover:text-indigo-400" />
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-3 py-2 text-slate-400">
          <ShieldCheck className="w-5 h-5" />
          <span className="text-xs font-semibold uppercase tracking-wider">Enterprise Plan</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
