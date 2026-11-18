import React, { useState } from 'react';
import { CopyIcon, CheckCircleIcon, HardDriveIcon } from './Icons';
import { copyText } from '../utils/formatters';

export function FileDetails({ fileName, fileSize, fileFormat }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyText(fileName);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full bg-slate-50/80 rounded-2xl p-4 border border-slate-200/90 text-left my-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
        {/* Filename with copy button */}
        <div className="bg-white p-3 rounded-xl border border-slate-200/70 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              File Name
            </div>
            <div className="font-mono-code font-bold text-slate-800 text-sm truncate max-w-[180px] sm:max-w-[200px]" title={fileName}>
              {fileName}
            </div>
          </div>
          <button
            onClick={handleCopy}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-800 transition-colors"
            title="Copy filename"
            type="button"
          >
            {copied ? (
              <CheckCircleIcon className="w-4 h-4 text-emerald-600" />
            ) : (
              <CopyIcon className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Dynamic File Size */}
        <div className="bg-white p-3 rounded-xl border border-slate-200/70 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              File Size
            </div>
            <div className="font-semibold text-slate-800 text-sm">
              {fileSize || 'Calculating...'}
            </div>
          </div>
          <div className="p-1.5 text-slate-400">
            <HardDriveIcon className="w-4 h-4" />
          </div>
        </div>

        {/* File Format */}
        <div className="bg-white p-3 rounded-xl border border-slate-200/70 shadow-2xs sm:col-span-2 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Format & Compression
            </div>
            <div className="text-slate-700 font-medium text-xs sm:text-sm">
              {fileFormat} • Unmodified Original
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-brand-50 text-brand-700 text-[11px] font-semibold border border-brand-100">
            .ZIP
          </span>
        </div>
      </div>
    </div>
  );
}
