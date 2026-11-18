import React from 'react';

export function ZipFileIcon({ className = "w-24 h-24" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Outer ambient glow */}
      <div className="absolute inset-0 bg-brand-400/20 rounded-3xl blur-xl transform scale-90 pointer-events-none animate-subtle-pulse" />
      
      {/* Main Folder / Archive SVG */}
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
        {/* Document Shadow */}
        <rect x="22" y="16" width="76" height="92" rx="14" fill="#0c3d6f" fillOpacity="0.08" />
        
        {/* Document Base */}
        <rect x="20" y="14" width="80" height="92" rx="14" fill="url(#cardGrad)" stroke="#bfdbfe" strokeWidth="1.5" />
        
        {/* Folded Top-Right Corner */}
        <path d="M72 14v16a4 4 0 0 0 4 4h24" fill="#e0effe" />
        <path d="M72 14l28 28h-24a4 4 0 0 1-4-4V14z" stroke="#93c5fd" strokeWidth="1.5" />
        
        {/* Zip Teeth Track */}
        <line x1="38" y1="28" x2="38" y2="76" stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="3 3" />
        <line x1="42" y1="30" x2="42" y2="78" stroke="#cbd5e1" strokeWidth="2.5" strokeDasharray="3 3" />
        
        {/* Zipper Pull Slider */}
        <rect x="34" y="52" width="12" height="18" rx="3" fill="#026bc9" />
        <rect x="37" y="56" width="6" height="10" rx="1.5" fill="#f0f7ff" />
        
        {/* File Extension Tag */}
        <rect x="42" y="80" width="46" height="20" rx="6" fill="#0c87eb" />
        <text x="65" y="94" fill="#ffffff" fontSize="11" fontWeight="800" textAnchor="middle" letterSpacing="0.08em" fontFamily="sans-serif">
          ZIP
        </text>

        <defs>
          <linearGradient id="cardGrad" x1="20" y1="14" x2="100" y2="106" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" />
            <stop offset="1" stopColor="#f0f7ff" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function DownloadIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}

export function CheckCircleIcon({ className = "w-5 h-5 text-emerald-500" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export function ShieldCheckIcon({ className = "w-4 h-4 text-emerald-600" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

export function AlertCircleIcon({ className = "w-5 h-5 text-amber-500" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );
}

export function RefreshCwIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );
}

export function CopyIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}

export function ExternalLinkIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

export function HardDriveIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
  );
}
