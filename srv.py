#!/usr/bin/env python3
# server.py

import http.server
import socketserver
import os

# Répertoire où se trouvent tes fichiers HTML/CSS/JS
WEB_DIR = "/serveurLocal/srv"  # change si nécessaire

# Port sur lequel le serveur sera accessible
PORT = 8000

# Déplace le dossier courant dans le répertoire web
os.chdir(WEB_DIR)

# Crée le serveur HTTP
Handler = http.server.SimpleHTTPRequestHandler
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serveur démarré sur http://localhost:{PORT}")
    print(f"Servant les fichiers depuis {WEB_DIR}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nArrêt du serveur...")
        httpd.server_close()
