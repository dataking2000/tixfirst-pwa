
TixFirst PWA + Proxy

Files:
- public/index.html        -> Frontend PWA (adapted mobile UI)
- public/manifest.json
- public/service-worker.js
- server.js                -> Express proxy that forwards to Skiddle API
- package.json

Setup:
1. Install Node.js (v14+)
2. (Recommended) set your Skiddle API key:
   export SKIDDLE_API_KEY=your_skiddle_api_key

3. Install dependencies:
   npm install

4. Start server:
   node server.js

5. Open in browser:
   http://localhost:3000

Notes:
- The proxy endpoint is /api/events. Frontend calls this endpoint which forwards to Skiddle with your API key.
- For production, do NOT hardcode your API key in server.js. Use environment variables (SKIDDLE_API_KEY).
- If hosting remotely, configure HTTPS.

