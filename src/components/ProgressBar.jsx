import React from 'react';

export function ProgressBar({ progress, state }) {
  if (state === 'error' || state === 'blocked') {
    return null;
  }

  const isComplete = state === 'triggered';

  return (
    <div className="w-full my-5">
      <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 font-medium">
        <span>{isComplete ? 'Handed off to browser' : 'Preparing automatic download'}</span>
        <span className="font-mono-code">{Math.min(100, Math.round(progress))}%</span>
      </div>
      
      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/80">
        <div
          className={`h-full rounded-full transition-all duration-150 ease-out ${
            isComplete
              ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
              : 'bg-gradient-to-r from-brand-500 to-sky-400'
          }`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
        <span>1. Server Handshake</span>
        <span>2. Checksum Valid</span>
        <span>3. Browser Transfer</span>
      </div>
    </div>
  );
}
