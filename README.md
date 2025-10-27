# Ecommerce App

Minimal React + Node ecommerce application (frontend + backend).

## Table of contents
- Project overview
- Prerequisites
- Quick start (frontend)
- Quick start (backend)
- Available scripts
- Project structure
- Environment variables
- Secrets & push protection
- Contributing
- License

## Project overview
This repo contains a React frontend and a Node backend for an ecommerce app. The frontend consumes product data (via a ShopContext) and renders collection pages, product items and common UI components. The backend serves APIs for products, orders, auth, and file uploads.

## Prerequisites
- Node.js 16+ (or your project-specified version)
- npm or yarn
- Optional: MongoDB (Atlas or local) if backend requires it
- Optional: Cloudinary / Stripe accounts for uploads/payments

## Quick start (frontend)
1. cd frontend
2. Install dependencies:
   - npm install  OR  yarn
3. Start dev server:
   - npm start  OR  yarn start
4. Open http://localhost:3000

## Quick start (backend)
1. cd backend
2. Copy example env file and edit values:
   - cp .env.example .env
   - Edit .env locally (do not commit real secrets)
3. Install dependencies:
   - npm install  OR  yarn
4. Start backend in dev mode:
   - npm run dev
5. By default the API runs on a port defined in .env (commonly 5000).

## Available scripts
Frontend (in frontend/):
- npm start — start dev server
- npm run build — build production bundle
- npm test — run tests (if configured)
- npm run lint — run linter (if configured)

Backend (in backend/):
- npm run dev — start server with nodemon
- npm start — start server
- npm test — run tests (if configured)

## Project structure (high level)
- frontend/
  - src/
    - pages/ — page-level components (e.g., Collection.jsx)
    - components/ — reusable UI components (ProductItem, Hero, GlassPane, ...)
    - context/ — React contexts (ShopContext)
    - assets/ — images/static assets
    - App.jsx / index.jsx — entry
- backend/
  - routes/, controllers/, models/, utils/
  - .env (ignored in repo) for secrets and connection strings

## Environment variables
Do not commit .env with real secrets. Use backend/.env.example to document required variables, for example:
- MONGODB_URI
- JWT_SECRET
- CLOUDINARY_API_KEY / CLOUDINARY_SECRET / CLOUDINARY_NAME
- STRIPE_SECRET_KEY

## Secrets & push protection (important)
- Never commit real API keys, DB URIs, or private credentials.
- Add backend/.env to .gitignore and keep backend/.env.example in the repo.
- If a secret was accidentally committed and pushed:
  1. Revoke/rotate the exposed credential immediately (provider dashboard).
  2. Remove the secret from the repository history (recommended tools: git-filter-repo or BFG).
  3. Force-push the cleaned repository (coordinate with collaborators).
- Quick local steps to stop tracking .env (does not remove history):
  - git rm --cached backend/.env
  - git commit -m "Stop tracking backend/.env"
  - git push origin main
- For history removal see:
  - https://github.com/newren/git-filter-repo
  - https://rtyley.github.io/bfg-repo-cleaner/

## Contributing
- Fork → branch → PR
- Keep PRs focused and update README with noteworthy changes.
- If you add new required env vars, update backend/.env.example.

## License
Add or update LICENSE file with your chosen license (e.g., MIT).
