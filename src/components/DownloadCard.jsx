import React from 'react';
import { ZipFileIcon } from './Icons';
import { StatusBadge } from './StatusBadge';
import { ProgressBar } from './ProgressBar';
import { FileDetails } from './FileDetails';
import { ActionButtons } from './ActionButtons';
import { HelpSection } from './HelpSection';
import { DOWNLOAD_CONFIG } from '../config';

export function DownloadCard({
  state,
  countdown,
  progress,
  fileSize,
  errorMessage,
  onManualDownload,
  onResetTrigger,
}) {
  return (
    <div className="w-full max-w-lg mx-auto px-4">
      <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/60 border border-slate-200/90 text-center relative overflow-hidden transition-all duration-300">
        {/* Subtle decorative top highlight */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-400 via-sky-400 to-indigo-400" />

        {/* Central ZIP Illustration */}
        <div className="mb-4 flex justify-center">
          <ZipFileIcon className="w-24 h-24 sm:w-28 sm:h-28" />
        </div>

        {/* Dynamic Status Badge */}
        <div className="mb-3 flex justify-center">
          <StatusBadge state={state} countdown={countdown} />
        </div>

        {/* Main Heading */}
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          {state === 'triggered'
            ? 'Download Initiated!'
            : state === 'error'
            ? 'Package Unavailable'
            : state === 'blocked'
            ? 'Ready for Manual Download'
            : 'Your download is starting...'}
        </h2>

        {/* Subheading / Status hint */}
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
          {state === 'triggered'
            ? `We've requested your browser to save "${DOWNLOAD_CONFIG.fileName}".`
            : state === 'error'
            ? errorMessage || 'The configured ZIP file could not be located in public/downloads/'
            : state === 'blocked'
            ? 'Automatic download was blocked by browser policy. Click below to begin.'
            : 'Connecting to server and transferring official package.'}
        </p>

        {/* Visual Progress Bar during countdown */}
        <ProgressBar progress={progress} state={state} />

        {/* File Metadata Details */}
        <FileDetails
          fileName={DOWNLOAD_CONFIG.fileName}
          fileSize={fileSize}
          fileFormat={DOWNLOAD_CONFIG.fileFormatLabel}
        />

        {/* Action Buttons (Manual Fallback, Copy Link, Reset) */}
        {state !== 'error' && (
          <ActionButtons
            onManualDownload={onManualDownload}
            onResetTrigger={onResetTrigger}
            fileUrl={DOWNLOAD_CONFIG.filePath}
            fileName={DOWNLOAD_CONFIG.fileName}
            fileSize={fileSize}
            state={state}
          />
        )}

        {/* Error Retry Button if file missing */}
        {state === 'error' && (
          <div className="mt-4 p-4 bg-rose-50 border border-rose-200 rounded-xl text-left">
            <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wide">Developer Action Required:</h4>
            <p className="text-xs text-rose-700 mt-1">
              Please verify that <code className="bg-rose-100 px-1 py-0.5 rounded font-mono text-[11px]">{DOWNLOAD_CONFIG.filePath}</code> exists in the <code className="bg-rose-100 px-1 py-0.5 rounded font-mono text-[11px]">public/</code> directory.
            </p>
            <button
              onClick={onResetTrigger}
              className="mt-3 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold"
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* Troubleshooting & Browser FAQ Accordion */}
        <HelpSection />
      </div>
    </div>
  );
}
