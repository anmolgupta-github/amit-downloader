# AMIT • Automatic ZIP File Downloader

A production-ready React + Vite web application built to automatically initiate the download of a predefined ZIP archive whenever a visitor visits the website, deployed at [https://amit.vercel.app](https://amit.vercel.app).

---

## 🚀 Key Features

- **Automatic Download Trigger:** Initiates browser download automatically after a smooth 1.5-second countdown with visual progress indicator.
- **Strict-Mode & Re-render Guard:** Uses `useRef` + `sessionStorage` protection to prevent duplicate downloads or infinite download loops during component re-renders and page navigation.
- **Original Filename Preserved:** Direct link with `<a download="...">` combined with server-side `Content-Disposition: attachment; filename="..."` via `vercel.json` guarantees the exact original `.zip` filename is preserved on all browsers.
- **Dynamic File Size Detection:** Sends a lightweight `HEAD` request on load to read `Content-Length` and display the formatted size (e.g. `11.63 MB`) dynamically.
- **Manual Fallback Button:** If a browser's pop-up blocker or mobile policy blocks the auto-trigger, a prominent, high-contrast manual "Download ZIP" button is immediately available.
- **Missing File Protection:** Gracefully detects missing or 404 files and displays actionable instructions rather than failing silently.
- **Single-Location Configuration:** Change the target file in one line in `src/config.js`.

---

## 📂 Project Structure

```text
amit-downloader/
├── public/
│   ├── favicon.svg              # Crisp SVG favicon
│   └── downloads/
│       └── AMIT.zip             # 📦 Exact original ZIP file (11.63 MB)
├── src/
│   ├── components/
│   │   ├── ActionButtons.jsx    # Manual download, copy link & restart trigger
│   │   ├── DownloadCard.jsx     # Centered hero card UI
│   │   ├── FileDetails.jsx      # Filename, size & compression details
│   │   ├── Footer.jsx           # Clean copyright & edge deployment status
│   │   ├── Header.jsx           # Top brand header & SSL badge
│   │   ├── HelpSection.jsx      # Accordion for download troubleshooting
│   │   ├── Icons.jsx            # High-res SVG icons & ZIP archive artwork
│   │   ├── ProgressBar.jsx      # Visual countdown & progress indicator
│   │   └── StatusBadge.jsx      # Dynamic status pills (checking, starting, done)
│   ├── utils/
│   │   └── formatters.js        # Byte formatter and clipboard copy helper
│   ├── App.jsx                  # Main application & auto-download lifecycle
│   ├── config.js                # ⚙️ Centralized configuration
│   ├── index.css                # Tailwind CSS styling & gradients
│   └── main.jsx                 # React root entry point
├── index.html                   # HTML entry point with meta tags & fonts
├── package.json                 # Dependencies & scripts
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.js           # Tailwind CSS theme & keyframes
├── vercel.json                  # Vercel routing, MIME types & headers
└── vite.config.js               # Vite build configuration
```

---

## 📍 Where to Place Your ZIP File

1. Place your ZIP file into the `public/downloads/` folder:
   ```text
   public/downloads/YOUR_FILE.zip
   ```
2. Open `src/config.js` and update the filename:
   ```javascript
   export const DOWNLOAD_CONFIG = {
     fileName: "YOUR_FILE.zip",
     filePath: "/downloads/YOUR_FILE.zip",
     // ...
   };
   ```
*(The user-provided file `AMIT.zip` is already placed in `public/downloads/AMIT.zip` and pre-configured).*

---

## 🛠️ Local Development

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm or yarn

### Run Locally:
```bash
# 1. Navigate to the project directory
cd amit-downloader

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Test Production Build Locally:
```bash
npm run build
npm run preview
```

---

## 🌐 Deploying to Vercel (Production at https://amit.vercel.app)

### Option 1: Deploy via GitHub (Recommended)

1. **Initialize Git & Push to GitHub:**
   ```bash
   cd amit-downloader
   git init
   git add .
   git commit -m "feat: complete automatic zip downloader"
   git branch -M main
   git remote add origin https://github.com/<your-username>/amit-downloader.git
   git push -u origin main
   ```

2. **Import into Vercel:**
   - Go to [vercel.com](https://vercel.com) and log in.
   - Click **"Add New..."** → **"Project"**.
   - Select your GitHub repository (`amit-downloader`).
   - Framework Preset will automatically be detected as **Vite**.
   - Click **Deploy**.

3. **Assign Domain `amit.vercel.app`:**
   - Once deployment completes, navigate to **Project Settings** → **Domains**.
   - Click **Add Domain** and enter `amit.vercel.app`.
   - Vercel will verify and attach the domain immediately.

### Option 2: Deploy via Vercel CLI

```bash
# 1. Install Vercel CLI (if not already installed)
npm install -g vercel

# 2. Login to your Vercel account
vercel login

# 3. Deploy to production
cd amit-downloader
vercel --prod
```

When prompted:
- Set project name to `amit` (so Vercel defaults to `amit.vercel.app`).
- Link to your Vercel account.
- Build settings will automatically be read from `vercel.json`.

---

## 🛡️ Technical Edge Cases Handled

1. **Strict-Mode Double Execution:** In development, React StrictMode mounts twice. `hasTriggeredRef` combined with `sessionStorage` guarantees only **1** download triggers.
2. **Page Refresh Loop Prevention:** The session key prevents a refresh from causing an annoying infinite loop of download prompts. Visitors who refresh can click "Restart Auto-Download" or "Download ZIP".
3. **MIME Type & Attachment Header:** In `vercel.json`, `/downloads/(.*)` is explicitly configured with `Content-Disposition: attachment` and `Content-Type: application/zip`, ensuring mobile Safari, Chrome, and Edge download the file rather than attempting to render it as text.
4. **Mobile Browser Fallback:** If browser security blocks script-initiated clicks (`link.click()`), the prominent manual button is styled and ready immediately.
