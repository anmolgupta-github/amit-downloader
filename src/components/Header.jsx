import React from 'react';
import { ShieldCheckIcon } from './Icons';
import { DOWNLOAD_CONFIG } from '../config';

export function Header() {
  return (
    <header className="w-full max-w-4xl mx-auto pt-6 px-4 pb-4 flex items-center justify-between border-b border-slate-200/60 mb-6 sm:mb-8">
      <div className="flex items-center space-x-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-brand-500/20">
          A
        </div>
        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-none">
            {DOWNLOAD_CONFIG.siteName}
          </h1>
          <span className="text-xs text-slate-500 font-mono-code">
            {DOWNLOAD_CONFIG.siteDomain}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-200/60 shadow-xs">
        <ShieldCheckIcon className="w-3.5 h-3.5 text-emerald-600" />
        <span className="hidden sm:inline">Verified Secure Package</span>
        <span className="sm:hidden">Secure</span>
      </div>
    </header>
  );
}
