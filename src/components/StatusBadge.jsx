import React from 'react';
import { CheckCircleIcon, AlertCircleIcon, RefreshCwIcon } from './Icons';

export function StatusBadge({ state, countdown }) {
  if (state === 'checking') {
    return (
      <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs sm:text-sm font-medium border border-slate-200">
        <RefreshCwIcon className="w-3.5 h-3.5 animate-spin text-slate-500" />
        <span>Verifying package integrity...</span>
      </div>
    );
  }

  if (state === 'counting') {
    return (
      <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs sm:text-sm font-semibold border border-brand-200/80 shadow-xs animate-subtle-pulse">
        <span className="w-2 h-2 rounded-full bg-brand-500 animate-ping" />
        <span>Your download is starting in {countdown}s...</span>
      </div>
    );
  }

  if (state === 'triggered') {
    return (
      <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs sm:text-sm font-semibold border border-emerald-200/80 shadow-xs">
        <CheckCircleIcon className="w-4 h-4 text-emerald-600" />
        <span>Download request initiated successfully!</span>
      </div>
    );
  }

  if (state === 'blocked') {
    return (
      <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-800 text-xs sm:text-sm font-medium border border-amber-200">
        <AlertCircleIcon className="w-4 h-4 text-amber-600" />
        <span>Auto-download was restricted by your browser</span>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-rose-50 text-rose-700 text-xs sm:text-sm font-medium border border-rose-200">
        <AlertCircleIcon className="w-4 h-4 text-rose-600" />
        <span>File not found on server</span>
      </div>
    );
  }

  return null;
}
