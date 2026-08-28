# ChatGPT-like web demo

This directory contains a minimal ChatGPT-like web UI and a small Express server that proxies requests to OpenAI's Chat Completions API. It is intended as a starting point — do NOT put your OpenAI API key in client-side code.

Files:
- index.html — frontend chat UI
- style.css — simple styles
- script.js — frontend logic (calls /api/chat)
- server.js — Express proxy server (reads OPENAI_API_KEY from env)
- package.json — dependencies and start script
- README.md — this file

Run locally:
1. cd chatgpt-web
2. npm install
3. Set your OpenAI API key:
   - macOS / Linux: export OPENAI_API_KEY=sk-...
   - Windows (PowerShell): $env:OPENAI_API_KEY="sk-..."
4. npm start
5. Open http://localhost:3000

Security note: Keep your API key secret. Deploy the server only to trusted hosting and keep the key in environment variables.
