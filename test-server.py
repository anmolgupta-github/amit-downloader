"""
Local Test Server for AMIT Automatic ZIP Downloader
Simulates Vercel production headers (MIME types, Content-Disposition, Cache-Control).
"""

import http.server
import socketserver
import os
import sys

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class VercelSimulatedHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_HEAD(self):
        # Handle HEAD request for /downloads/AMIT.zip or any download file
        if self.path.startswith('/downloads/'):
            rel_path = self.path.lstrip('/')
            # Check in public/downloads
            disk_path = os.path.join(DIRECTORY, 'public', rel_path)
            if not os.path.exists(disk_path):
                disk_path = os.path.join(DIRECTORY, rel_path)

            if os.path.isfile(disk_path):
                size = os.path.getsize(disk_path)
                filename = os.path.basename(disk_path)
                self.send_response(200)
                self.send_header('Content-Type', 'application/zip')
                self.send_header('Content-Length', str(size))
                self.send_header('Content-Disposition', f'attachment; filename="{filename}"')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.send_header('Access-Control-Expose-Headers', 'Content-Length, Content-Disposition')
                self.end_headers()
                return

        return super().do_HEAD()

    def do_GET(self):
        # Route root to preview.html or index.html
        if self.path == '/' or self.path == '':
            if os.path.exists(os.path.join(DIRECTORY, 'preview.html')):
                self.path = '/preview.html'

        # Route /downloads/ to public/downloads/
        if self.path.startswith('/downloads/'):
            filename = os.path.basename(self.path.split('?')[0])
            disk_path = os.path.join(DIRECTORY, 'public', 'downloads', filename)
            if os.path.isfile(disk_path):
                size = os.path.getsize(disk_path)
                self.send_response(200)
                self.send_header('Content-Type', 'application/zip')
                self.send_header('Content-Length', str(size))
                self.send_header('Content-Disposition', f'attachment; filename="{filename}"')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                with open(disk_path, 'rb') as f:
                    self.wfile.write(f.read())
                return

        return super().do_GET()

def run_server():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), VercelSimulatedHandler) as httpd:
        print(f"[OK] Local test server running at http://localhost:{PORT}")
        print(f"[OK] Serving directory: {DIRECTORY}")
        print(f"[OK] Download endpoint: http://localhost:{PORT}/downloads/AMIT.zip")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")

if __name__ == '__main__':
    run_server()
