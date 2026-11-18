import React, { useState } from 'react';

export function HelpSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full mt-6 pt-4 border-t border-slate-200/70 text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors py-1 cursor-pointer"
        type="button"
      >
        <span>Download troubleshooting & browser tips</span>
        <span className="text-slate-400 font-mono text-sm">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="mt-3 text-xs text-slate-600 bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/80 space-y-2 animate-fade-in leading-relaxed">
          <div className="flex items-start space-x-2">
            <span className="font-bold text-brand-600">•</span>
            <p>
              <strong>Where is my file?</strong> Check your browser's download shelf (top-right icon in Chrome, Firefox & Edge, or bottom bar in older versions) or your system's <code>Downloads</code> folder.
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="font-bold text-brand-600">•</span>
            <p>
              <strong>Blocked pop-up?</strong> Some mobile browsers or security extensions block automated downloads. If nothing happened, click the <em>Download ZIP</em> button above.
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="font-bold text-brand-600">•</span>
            <p>
              <strong>Status note:</strong> Due to browser sandboxing and privacy standards, websites cannot detect when file write operations finish on your local disk.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
