'use client';

import React, { useEffect, useRef } from 'react';
import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';

interface ReplayPlayerProps {
  events: any[];
}

const ReplayPlayer: React.FC<ReplayPlayerProps> = ({ events }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current || events.length === 0) return;

    // Clear previous player instance if any
    if (containerRef.current.innerHTML !== '') {
      containerRef.current.innerHTML = '';
    }

    playerRef.current = new rrwebPlayer({
      target: containerRef.current,
      props: {
        events,
        autoPlay: false,
        width: 1024,
        height: 576,
      },
    });

    return () => {
      // Cleanup if player has a method, otherwise the innerHTML clear handles it
    };
  }, [events]);

  return (
    <div className="w-full h-full bg-slate-950 rounded-lg overflow-hidden border border-slate-800 shadow-2xl">
      <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-300">Session Replay</h3>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-[10px] items-center flex font-bold text-slate-500 tracking-widest uppercase">Recording Reconstruction</span>
        </div>
      </div>
      <div ref={containerRef} className="rrweb-player-container" />
    </div>
  );
};

export default ReplayPlayer;
