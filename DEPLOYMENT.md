# Deployment Guide

This project has three deployable parts:

- Frontend: React + Vite (`frontend`)
- Node API: Express + MongoDB auth (`backend/server.js`)
- Python API: Flask spam detector (`backend/spam_api.py`)

## 1) Deploy backend services on Render

Use the Render Blueprint in `render.yaml`.

### Steps

1. Push this repository to GitHub.
2. In Render, choose **New +** -> **Blueprint**.
3. Select this repository.
4. Render will detect `render.yaml` and create:
   - `sms-spam-node-api`
   - `sms-spam-python-api`
5. Set required env vars for `sms-spam-node-api`:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `CORS_ORIGIN` (your frontend URL)
6. Set required env vars for `sms-spam-python-api`:
   - `CORS_ORIGIN` (your frontend URL)

## 2) Deploy frontend on Vercel

`frontend/vercel.json` is configured for SPA route fallback.

### Steps

1. In Vercel, import this repository.
2. Set **Root Directory** to `frontend`.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add frontend env vars:
   - `VITE_NODE_API_BASE_URL=https://<your-node-render-url>/api`
   - `VITE_API_BASE_URL=https://<your-python-render-url>/api`
6. Deploy.

## 3) Post-deploy checks

1. Open frontend and verify pages load directly by URL (`/login`, `/dashboard`).
2. Register and login from the app.
3. Test spam detection endpoint from UI.
4. Confirm CORS works for both APIs.

## Notes

- Python service runs with `gunicorn` in production.
- Flask API includes a health route at `/`.
- Never commit real `.env` files. Use `.env.example` templates.

## 4) Continuous Integration (GitHub Actions)

This repository now includes a CI workflow at `.github/workflows/ci.yml`.

The workflow runs on every push and pull request and checks:

1. Frontend build in `frontend`.
2. Node backend syntax in `backend`.
3. Python backend dependency installation and imports.

If any of these checks fail, the workflow blocks the merge until fixed.
