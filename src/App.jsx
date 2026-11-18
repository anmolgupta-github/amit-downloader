import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { DownloadCard } from './components/DownloadCard';
import { Footer } from './components/Footer';
import { DOWNLOAD_CONFIG } from './config';
import { formatBytes } from './utils/formatters';

export function App() {
  // State: 'checking' | 'counting' | 'triggered' | 'blocked' | 'error'
  const [state, setState] = useState('checking');
  const [countdown, setCountdown] = useState(
    Math.ceil(DOWNLOAD_CONFIG.autoDownloadDelayMs / 1000)
  );
  const [progress, setProgress] = useState(0);
  const [fileSize, setFileSize] = useState(DOWNLOAD_CONFIG.fallbackFileSize);
  const [errorMessage, setErrorMessage] = useState('');

  // Refs to prevent duplicate execution across React StrictMode & re-renders
  const hasTriggeredRef = useRef(false);
  const timerRef = useRef(null);

  /**
   * Helper to perform clean browser download preserving original filename
   */
  const executeDownload = (url, fileName) => {
    try {
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      link.setAttribute('rel', 'noopener noreferrer');
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      }, 500);
      return true;
    } catch (err) {
      console.error('Browser download trigger failed:', err);
      return false;
    }
  };

  /**
   * Check file existence & fetch dynamic Content-Length
   */
  const checkFileStatus = async () => {
    try {
      const response = await fetch(DOWNLOAD_CONFIG.filePath, { method: 'HEAD' });
      if (!response.ok) {
        setState('error');
        setErrorMessage(
          `File "${DOWNLOAD_CONFIG.fileName}" returned HTTP ${response.status}. Please ensure it is located in public/downloads/`
        );
        return false;
      }

      const contentLength = response.headers.get('content-length');
      if (contentLength && !isNaN(contentLength)) {
        setFileSize(formatBytes(parseInt(contentLength, 10)));
      }
      return true;
    } catch {
      // If HEAD is blocked or fails on some local setups, verify file by trying a range or fallback
      console.warn('HEAD request failed or blocked, proceeding with fallback metadata.');
      return true;
    }
  };

  /**
   * Manual download button handler
   */
  const handleManualDownload = () => {
    executeDownload(DOWNLOAD_CONFIG.filePath, DOWNLOAD_CONFIG.fileName);
    setState('triggered');
    try {
      sessionStorage.setItem(DOWNLOAD_CONFIG.sessionStorageKey, 'true');
    } catch {
      // sessionStorage unavailable
    }
  };

  /**
   * Reset / Restart sequence handler
   */
  const handleResetTrigger = () => {
    try {
      sessionStorage.removeItem(DOWNLOAD_CONFIG.sessionStorageKey);
    } catch {
      // ignore
    }
    hasTriggeredRef.current = false;
    if (timerRef.current) clearInterval(timerRef.current);
    setProgress(0);
    setCountdown(Math.ceil(DOWNLOAD_CONFIG.autoDownloadDelayMs / 1000));
    startDownloadSequence();
  };

  /**
   * Start auto-download sequence with countdown and progress bar
   */
  const startDownloadSequence = async () => {
    setState('checking');
    const fileAvailable = await checkFileStatus();
    if (!fileAvailable) return;

    // Check if user already auto-downloaded in this session
    let alreadyDownloaded = false;
    try {
      alreadyDownloaded = sessionStorage.getItem(DOWNLOAD_CONFIG.sessionStorageKey) === 'true';
    } catch {
      // ignore
    }

    if (alreadyDownloaded) {
      // Show ready state with manual button, avoid looping or re-triggering automatically
      setState('triggered');
      setProgress(100);
      return;
    }

    setState('counting');
    const totalMs = DOWNLOAD_CONFIG.autoDownloadDelayMs;
    const intervalMs = DOWNLOAD_CONFIG.progressUpdateIntervalMs;
    let elapsedMs = 0;

    timerRef.current = setInterval(() => {
      elapsedMs += intervalMs;
      const pct = Math.min(100, (elapsedMs / totalMs) * 100);
      setProgress(pct);

      const remainingSecs = Math.max(0, Math.ceil((totalMs - elapsedMs) / 1000));
      setCountdown(remainingSecs);

      if (elapsedMs >= totalMs) {
        clearInterval(timerRef.current);

        // Guard against duplicate execution in React StrictMode
        if (!hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          const success = executeDownload(DOWNLOAD_CONFIG.filePath, DOWNLOAD_CONFIG.fileName);
          try {
            sessionStorage.setItem(DOWNLOAD_CONFIG.sessionStorageKey, 'true');
          } catch {
            // ignore
          }

          if (success) {
            setState('triggered');
          } else {
            setState('blocked');
          }
        }
      }
    }, intervalMs);
  };

  useEffect(() => {
    startDownloadSequence();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-mesh-dots">
      {/* Top Navigation / Brand */}
      <Header />

      {/* Main Centered Content */}
      <main className="flex-1 flex items-center justify-center py-6">
        <DownloadCard
          state={state}
          countdown={countdown}
          progress={progress}
          fileSize={fileSize}
          errorMessage={errorMessage}
          onManualDownload={handleManualDownload}
          onResetTrigger={handleResetTrigger}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
