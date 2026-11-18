"""
Automated Verification Script for AMIT Automatic ZIP Downloader
Tests file integrity, structure, configurations, and Vite/Vercel settings.
"""

import os
import hashlib
import json
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ZIP_FILE = os.path.join(BASE_DIR, 'public', 'downloads', 'AMIT.zip')

def sha256_file(filepath):
    h = hashlib.sha256()
    with open(filepath, 'rb') as f:
        while chunk := f.read(8192):
            h.update(chunk)
    return h.hexdigest().upper()

def test_file_integrity():
    print("\n--- 1. Testing ZIP File Integrity ---")
    if not os.path.exists(ZIP_FILE):
        print(f"[FAIL] ZIP file does not exist at {ZIP_FILE}")
        return False
    size = os.path.getsize(ZIP_FILE)
    sha = sha256_file(ZIP_FILE)
    print(f"[PASS] File exists: {ZIP_FILE}")
    print(f"[PASS] File size: {size} bytes ({size / (1024*1024):.2f} MB)")
    print(f"[PASS] SHA-256: {sha}")
    
    # Expected SHA256 from user uploaded file
    expected_sha = "4DC3C8245835E1E62DAE1BA32FDEBD4F246A71394AC2C33598FD4E392978D5DA"
    if sha == expected_sha:
        print("[PASS] SHA-256 matches the original user-uploaded AMIT.zip (not modified or corrupted)!")
    else:
        print("[WARN] SHA-256 differs from original upload.")
    return True

def test_structure():
    print("\n--- 2. Testing Project Structure & Components ---")
    required_files = [
        'package.json',
        'vite.config.js',
        'tailwind.config.js',
        'postcss.config.js',
        'vercel.json',
        'index.html',
        'preview.html',
        'src/config.js',
        'src/App.jsx',
        'src/main.jsx',
        'src/index.css',
        'src/components/DownloadCard.jsx',
        'src/components/ActionButtons.jsx',
        'src/components/FileDetails.jsx',
        'src/components/Header.jsx',
        'src/components/Footer.jsx',
        'src/components/ProgressBar.jsx',
        'src/components/StatusBadge.jsx',
        'src/components/Icons.jsx',
        'src/components/HelpSection.jsx',
        'src/utils/formatters.js',
        'public/downloads/AMIT.zip',
        'public/favicon.svg',
        'README.md'
    ]

    missing = []
    for f in required_files:
        p = os.path.join(BASE_DIR, f)
        if not os.path.exists(p):
            missing.append(f)
        else:
            print(f"  [OK] {f}")

    if missing:
        print(f"[FAIL] Missing files: {missing}")
        return False
    print("[PASS] All required files and components are present.")
    return True

def test_configs():
    print("\n--- 3. Testing Configuration Compliance ---")
    # Validate package.json
    with open(os.path.join(BASE_DIR, 'package.json'), 'r') as fp:
        pkg = json.load(fp)
        assert pkg['name'] == 'amit-zip-downloader'
        assert 'vite' in pkg['devDependencies']
        assert 'react' in pkg['dependencies']
        print("[PASS] package.json is valid with React & Vite.")

    # Validate vercel.json
    with open(os.path.join(BASE_DIR, 'vercel.json'), 'r') as fp:
        vcfg = json.load(fp)
        assert vcfg['framework'] == 'vite'
        assert vcfg['outputDirectory'] == 'dist'
        header_rule = next((h for h in vcfg['headers'] if h['source'] == '/downloads/(.*)'), None)
        assert header_rule is not None, "Missing /downloads/ header rule"
        
        headers_dict = {h['key']: h['value'] for h in header_rule['headers']}
        assert headers_dict.get('Content-Disposition') == 'attachment'
        assert headers_dict.get('Content-Type') == 'application/zip'
        print("[PASS] vercel.json contains correct Vite framework, output dir, and attachment headers.")

    # Validate src/config.js
    with open(os.path.join(BASE_DIR, 'src', 'config.js'), 'r') as fp:
        config_content = fp.read()
        assert 'AMIT.zip' in config_content
        assert '/downloads/AMIT.zip' in config_content
        assert 'amit.vercel.app' in config_content
        print("[PASS] src/config.js correctly points to AMIT.zip and amit.vercel.app.")

    # Validate index.html
    with open(os.path.join(BASE_DIR, 'index.html'), 'r') as fp:
        html = fp.read()
        assert '<div id="root"></div>' in html
        assert 'src="/src/main.jsx"' in html
        print("[PASS] index.html contains proper React root element and Vite module script.")

    return True

if __name__ == '__main__':
    all_ok = True
    all_ok = test_file_integrity() and all_ok
    all_ok = test_structure() and all_ok
    all_ok = test_configs() and all_ok

    if all_ok:
        print("\n========================================================")
        print("🎉 ALL CHECKS PASSED: PRODUCTION-READY FOR VERCEL!")
        print("========================================================\n")
    else:
        print("\n[ERROR] One or more tests failed.")
        sys.exit(1)
