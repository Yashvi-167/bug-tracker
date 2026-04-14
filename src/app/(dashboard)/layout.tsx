import Sidebar from '@/components/Sidebar';
import { TrackerProvider } from '@/components/tracker/TrackerProvider';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Sidebar />
      <main className="pl-64 min-h-screen">
        <TrackerProvider>
          <div className="p-8">
            {children}
          </div>
        </TrackerProvider>
      </main>
    </div>
  );
}
