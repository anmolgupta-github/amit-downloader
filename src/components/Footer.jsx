import React from 'react';
import { DOWNLOAD_CONFIG } from '../config';

export function Footer() {
  return (
    <footer className="w-full max-w-4xl mx-auto py-8 px-4 text-center text-xs text-slate-400 space-y-2 mt-auto">
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
        <span>Ready for deployment at <strong className="text-slate-600 font-mono-code">{DOWNLOAD_CONFIG.siteDomain}</strong></span>
        <span>•</span>
        <span>Hosted on Vercel Global Edge</span>
        <span>•</span>
        <span>Safe &amp; Unmodified ZIP</span>
      </div>
      <p className="text-[11px] text-slate-400">
        &copy; {DOWNLOAD_CONFIG.copyrightYear} {DOWNLOAD_CONFIG.copyrightHolder}. All rights reserved.
      </p>
    </footer>
  );
}
