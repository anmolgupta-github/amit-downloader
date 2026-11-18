/**
 * Central Configuration for the Automatic ZIP File Downloader
 * 
 * To replace or update the downloadable file:
 * 1. Drop your file into the `public/downloads/` folder (e.g. `public/downloads/YOUR_FILE.zip`)
 * 2. Update `fileName` and `filePath` below.
 */
export const DOWNLOAD_CONFIG = {
  // Project & Domain Identity
  siteName: "AMIT Downloader",
  siteDomain: "amit.vercel.app",
  targetProductionUrl: "https://amit.vercel.app",
  
  // Download Target Configuration
  fileName: "AMIT.zip",
  filePath: "/downloads/AMIT.zip",
  fileMimeType: "application/zip",
  fileFormatLabel: "ZIP Compressed Archive",

  // Countdown & Trigger Settings
  autoDownloadDelayMs: 1500, // 1.5 seconds countdown before initiating auto-download
  progressUpdateIntervalMs: 50, // smooth animation refresh rate

  // Guard against duplicate / loop triggers
  sessionStorageKey: "amit_zip_auto_downloaded_session_v1",

  // Fallback metadata if HEAD request is blocked by local server headers
  fallbackFileSize: "11.63 MB",
  
  // Copyright & Branding
  copyrightYear: 2026,
  copyrightHolder: "AMIT",
};
