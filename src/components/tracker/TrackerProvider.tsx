'use client';

import React, { useEffect, createContext, useContext } from 'react';
import { tracker } from '@/lib/tracker';

const TrackerContext = createContext<ReturnType<typeof tracker> | null>(null);

export function TrackerProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const btTracker = tracker({
      endpoint: '/api/ingest/session',
      batchInterval: 5000,
    });

    btTracker.init();

    return () => {
      btTracker.stop();
    };
  }, []);

  return (
    <TrackerContext.Provider value={null}>
      {children}
    </TrackerContext.Provider>
  );
}

export const useTracker = () => useContext(TrackerContext);
