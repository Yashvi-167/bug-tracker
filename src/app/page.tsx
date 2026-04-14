import React from 'react';
import Link from 'next/link';
import { 
  Zap, 
  Eye, 
  Shield, 
  Layers, 
  ArrowRight,
  Monitor,
  MousePointer2,
  Bug
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-slate-900 absolute top-0 w-full z-50 backdrop-blur-md bg-slate-950/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white">
            <Zap className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">LogStream</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#docs" className="hover:text-white transition-colors">Documentation</Link>
          <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
        </nav>
        <div className="flex gap-4 font-bold">
          <Link href="/dashboard" className="text-sm px-4 py-2 text-slate-300 hover:text-white transition-colors">
            Login
          </Link>
          <Link href="/dashboard" className="text-sm bg-white text-slate-950 px-4 py-2 rounded-lg hover:bg-slate-200 transition-colors">
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="pt-32 pb-20 px-6 relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full -z-10" />
          
          <div className="max-w-6xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mx-auto">
              <Zap className="w-3 h-3" />
              Revolutionizing Bug Tracking
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9]">
              Debug with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-100">Superpowers.</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-xl text-slate-400 leading-relaxed font-medium">
              See exactly what your users did before an error occurred. 
              LogStream combines session replay with production error monitoring for the ultimate developer experience.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-lg shadow-2xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 group">
                Start Debugging Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/dashboard" className="px-8 py-4 bg-slate-900 border border-slate-800 text-white rounded-xl font-bold text-lg hover:bg-slate-800 transition-all">
                Watch Replay Demo
              </Link>
            </div>

            {/* Mockup */}
            <div className="mt-20 relative group">
              <div className="absolute inset-0 bg-indigo-600/20 blur-[100px] group-hover:bg-indigo-600/30 transition-all -z-10" />
              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-4 shadow-[0_0_80px_rgba(30,27,75,0.5)]">
                <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden aspect-video relative">
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <div className="h-full w-full flex items-center justify-center">
                    <div className="max-w-md w-full p-8 bg-slate-950/50 backdrop-blur-xl border border-white/5 rounded-2xl space-y-4">
                      <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                        <div className="w-12 h-12 bg-rose-500/20 rounded-xl flex items-center justify-center">
                          <Bug className="w-6 h-6 text-rose-500" />
                        </div>
                        <div className="text-left">
                          <p className="text-white font-bold">Uncaught TypeError</p>
                          <p className="text-slate-500 text-xs tracking-wide uppercase">Reading properties of undefined (reading 'user')</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full w-2/3 bg-indigo-500 animate-[loading_2s_ease-in-out_infinite]" />
                        </div>
                        <p className="text-center text-[10px] text-slate-600 font-bold tracking-widest uppercase">Reconstructing Session DOM...</p>
                      </div>
                    </div>
                  </div>
                  {/* Floating Elements */}
                  <div className="absolute bottom-8 right-8 p-4 bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md rounded-xl text-emerald-400 text-sm font-bold flex gap-3 animate-bounce">
                    <MousePointer2 className="w-5 h-5" />
                    Click Captured
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 px-6 border-t border-slate-900">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Session Replay",
                description: "Watch a high-fidelity reconstruction of user behavior. Native DOM events, not heavy video.",
                icon: Eye
              },
              {
                title: "Error Aggregation",
                description: "Group similar errors automatically. Track frequency, impact, and affected environments.",
                icon: Layers
              },
              {
                title: "Real-time Monitoring",
                description: "Get alerted the moment a critical bug hits your production env via Serverless functions.",
                icon: Zap
              }
            ].map((f, i) => (
              <div key={i} className="text-left space-y-4 p-8 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-slate-700 transition-all group">
                <div className="w-12 h-12 bg-indigo-600/10 rounded-xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all text-indigo-400">
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{f.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-900 bg-slate-950">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center font-bold text-white text-xs">
              <Zap className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">LogStream</span>
          </div>
          <p className="text-slate-600 text-sm">© 2024 LogStream Inc. Built for high-performance engineering teams.</p>
          <div className="flex gap-6 text-slate-600">
            <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-white transition-colors">GitHub</Link>
            <Link href="#" className="hover:text-white transition-colors">Discord</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
