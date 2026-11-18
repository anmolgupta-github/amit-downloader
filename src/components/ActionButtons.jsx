import React, { useState } from 'react';
import { DownloadIcon, CopyIcon, CheckCircleIcon, RefreshCwIcon } from './Icons';
import { copyText } from '../utils/formatters';

export function ActionButtons({
  onManualDownload,
  onResetTrigger,
  fileUrl,
  fileName,
  fileSize,
  state
}) {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = async () => {
    // Construct absolute URL
    const fullUrl = window.location.origin + fileUrl;
    const success = await copyText(fullUrl);
    if (success) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const isTriggered = state === 'triggered';

  return (
    <div className="w-full flex flex-col items-center space-y-3 mt-4">
      {/* Primary Manual Download Button */}
      <button
        onClick={onManualDownload}
        type="button"
        className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-brand-600 via-brand-500 to-sky-600 hover:from-brand-700 hover:to-sky-700 active:scale-[0.99] transition-all shadow-md shadow-brand-500/25 flex items-center justify-center space-x-2.5 text-base sm:text-lg focus:outline-hidden focus:ring-3 focus:ring-brand-400/50 cursor-pointer"
        aria-label={`Download ${fileName}`}
      >
        <DownloadIcon className="w-5 h-5 text-white animate-bounce-soft" />
        <span>Download {fileName}</span>
        {fileSize && (
          <span className="text-xs font-normal opacity-90 ml-1 py-0.5 px-2 bg-white/20 rounded-md">
            ({fileSize})
          </span>
        )}
      </button>

      {/* Helper text under button */}
      <p className="text-xs text-slate-500 text-center">
        {isTriggered ? (
          <span className="text-emerald-700 font-medium">
            Download command sent. If your browser didn't save the file automatically, click the button above.
          </span>
        ) : (
          <span>Safe direct download • No login required • Standard browser storage</span>
        )}
      </p>

      {/* Secondary utility actions */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
        <button
          onClick={handleCopyLink}
          type="button"
          className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-800 transition-colors flex items-center space-x-1.5 font-medium shadow-2xs cursor-pointer"
        >
          {copiedLink ? (
            <>
              <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-semibold">Link Copied!</span>
            </>
          ) : (
            <>
              <CopyIcon className="w-3.5 h-3.5 text-slate-400" />
              <span>Copy Direct File Link</span>
            </>
          )}
        </button>

        <button
          onClick={onResetTrigger}
          type="button"
          className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-800 transition-colors flex items-center space-x-1.5 font-medium shadow-2xs cursor-pointer"
          title="Restart auto-download sequence"
        >
          <RefreshCwIcon className="w-3.5 h-3.5 text-slate-400" />
          <span>Restart Auto-Download</span>
        </button>
      </div>
    </div>
  );
}
